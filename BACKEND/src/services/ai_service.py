import difflib
from typing import Dict, Any, List

def semantic_diff(text_a: str, text_b: str) -> Dict[str, Any]:
    a_lines = (text_a or "").splitlines()
    b_lines = (text_b or "").splitlines()

    sm = difflib.SequenceMatcher(a=a_lines, b=b_lines)
    similarity = round(sm.ratio(), 4)
    diff = list(difflib.ndiff(a_lines, b_lines))

    added = [x[2:] for x in diff if x.startswith("+ ")]
    removed = [x[2:] for x in diff if x.startswith("- ")]

    def has_kw(lines: List[str], kws: List[str]) -> bool:
        s = "\n".join(lines).lower()
        return any(k.lower() in s for k in kws)

    clo_changed = has_kw(added + removed, ["clo", "course learning outcome"])
    assessment_changed = has_kw(added + removed, ["assessment", "grading", "midterm", "final"])

    level = "LOW"
    if similarity < 0.85:
        level = "MEDIUM"
    if similarity < 0.70:
        level = "HIGH"

    changed = similarity < 0.98

    return {
        "changed": changed,
        "similarity": similarity,
        "changeLevel": level,
        "cloChanged": clo_changed,
        "assessmentChanged": assessment_changed,
        "added": added[:40],
        "removed": removed[:40],
    }

def clo_plo_consistency(clos: List[Dict[str, Any]], plos: List[Dict[str, Any]], mappings: List[Dict[str, Any]]) -> Dict[str, Any]:
    clo_ids = {c["cloID"] for c in clos}
    plo_ids = {p["ploID"] for p in plos}

    map_by_clo = {}
    for m in mappings:
        map_by_clo.setdefault(m["cloID"], []).append(m)

    errors = []
    warnings = []

    for clo in clos:
        cid = clo["cloID"]
        if cid not in map_by_clo:
            errors.append({"cloID": cid, "message": "CLO has no PLO mapping"})
            continue

        for mm in map_by_clo[cid]:
            if mm["ploID"] not in plo_ids:
                errors.append({"cloID": cid, "message": "Mapped PLO not found in program"})
            if not mm.get("mappingLevel"):
                warnings.append({"cloID": cid, "message": "Mapping level is empty"})

    status = "OK"
    if warnings:
        status = "WARNING"
    if errors:
        status = "ERROR"

    return {"status": status, "errors": errors, "warnings": warnings}

def summarize_syllabus(text: str) -> Dict[str, Any]:
    lines = [x.strip() for x in (text or "").splitlines() if x.strip()]
    head = "\n".join(lines[:25])

    goals = [x for x in lines if "objective" in x.lower() or "mục tiêu" in x.lower()][:10]
    outcomes = [x for x in lines if "outcome" in x.lower() or "clo" in x.lower()][:10]
    assessment = [x for x in lines if "assessment" in x.lower() or "grading" in x.lower()][:10]

    return {
        "summary": head[:2500],
        "goals": goals,
        "outcomes": outcomes,
        "assessment": assessment
    }
