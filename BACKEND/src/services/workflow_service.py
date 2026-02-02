from typing import List, Dict, Optional
from datetime import datetime
import logging

from infrastructure.databases.mysql import SessionLocal
from infrastructure.models.reviewWorkflow import ReviewWorkflowModel
from infrastructure.models.user import UserModel
from infrastructure.models.role import RoleModel
from services.event_service import emit_syllabus_action, emit_event


# Example workflow definitions. In production these could be stored in DB or config files.
WORKFLOW_DEFINITIONS: Dict[str, Dict] = {
    "default": {
        "name": "Default Syllabus Approval",
        "mode": "sequential",  # overall workflow mode if needed
        "steps": [
            {"step": 1, "role": "LECTURER", "type": "submit"},
            {"step": 2, "role": "HOD", "type": "approve"},
            {"step": 3, "role": "ACADEMIC_AFFAIRS", "type": "approve"}
        ]
    }
}


def _get_user_role(user_id: int) -> Optional[str]:
    db = SessionLocal()
    try:
        u = db.get(UserModel, user_id)
        if not u:
            return None
        role = db.get(RoleModel, u.roleID) if u.roleID else None
        return role.roleName if role else None
    finally:
        db.close()


def start_workflow(version_id: int, initiator_id: int, workflow_name: str = "default") -> Dict:
    """Start a workflow for a syllabus version. Emits a syllabus.submitted event."""
    # In this simplified implementation we only emit event and record nothing until approvals
    emit_syllabus_action('submitted', syllabus_id=None, version_id=version_id, actor_id=initiator_id)
    emit_event('workflow.started', {"versionID": version_id, "workflow": workflow_name, "initiator": initiator_id})
    return {"status": "started", "versionID": version_id, "workflow": workflow_name}


def get_workflow_status(version_id: int, workflow_name: str = "default") -> Dict:
    db = SessionLocal()
    try:
        rows = db.query(ReviewWorkflowModel).filter(ReviewWorkflowModel.versionID == version_id).all()
        items = []
        for r in rows:
            items.append({
                "reviewerID": r.reviewerID,
                "decision": r.decision,
                "comment": r.comment,
                "reviewedAt": r.reviewedAt.isoformat() if r.reviewedAt else None
            })
        return {"versionID": version_id, "reviews": items}
    finally:
        db.close()


def _step_allowed_for_user(step_def: Dict, user_role: str) -> bool:
    return step_def.get("role") == user_role


def approve(version_id: int, actor_id: int, decision: str, comment: str = "", workflow_name: str = "default") -> Dict:
    """Actor approves/rejects a workflow step. Handles sequential and parallel step logic."""
    wf = WORKFLOW_DEFINITIONS.get(workflow_name)
    if not wf:
        raise ValueError("Unknown workflow")

    user_role = _get_user_role(actor_id)
    if not user_role:
        raise ValueError("Actor not found or role undefined")

    steps = wf.get("steps", [])

    db = SessionLocal()
    try:
        # fetch existing approvals
        approvals = db.query(ReviewWorkflowModel).filter(ReviewWorkflowModel.versionID == version_id).all()

        # Determine eligible step(s)
        if wf.get("mode") == "sequential":
            # find first step that doesn't have an approval from matching role
            target_step = None
            for s in steps:
                role = s.get("role")
                found = any((r for r in approvals if _get_user_role(r.reviewerID) == role and r.decision == 'approved'))
                if not found:
                    target_step = s
                    break
            if not target_step:
                return {"status": "already_completed"}
            if not _step_allowed_for_user(target_step, user_role):
                raise PermissionError("User not authorized for current approval step")
        else:
            # parallel: find a step matching user role
            target_step = next((s for s in steps if s.get("role") == user_role), None)
            if not target_step:
                raise PermissionError("User role not part of workflow steps")

        # record approval
        rw = ReviewWorkflowModel(
            versionID=version_id,
            reviewerID=actor_id,
            decision=decision,
            comment=comment,
            reviewedAt=datetime.utcnow()
        )
        db.add(rw)
        db.commit()

        emit_event('workflow.step.completed', {"versionID": version_id, "actor": actor_id, "decision": decision})

        # if any rejection, emit overall rejected
        if decision.lower() == 'rejected':
            emit_syllabus_action('rejected', syllabus_id=None, version_id=version_id, actor_id=actor_id)
            return {"status": "rejected"}

        # Check if all approval steps completed
        completed_roles = set(_get_user_role(r.reviewerID) for r in db.query(ReviewWorkflowModel).filter(ReviewWorkflowModel.versionID == version_id, ReviewWorkflowModel.decision == 'approved').all())
        required_roles = set(s.get('role') for s in steps if s.get('type') == 'approve')
        if required_roles.issubset(completed_roles):
            emit_syllabus_action('published', syllabus_id=None, version_id=version_id, actor_id=actor_id)
            emit_event('workflow.completed', {"versionID": version_id})
            return {"status": "approved_and_published"}

        return {"status": "step_recorded"}
    finally:
        db.close()
