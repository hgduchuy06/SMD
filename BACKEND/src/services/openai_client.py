import os
import logging

try:
    import openai
except Exception:
    openai = None


def summarize_with_openai(text: str, max_tokens: int = 300) -> dict:
    """Call OpenAI to produce a structured summary. Returns a dict with keys summary, goals, outcomes, assessment."""
    api_key = os.environ.get("OPENAI_API_KEY")
    if not api_key or openai is None:
        raise RuntimeError("OpenAI client not configured. Set OPENAI_API_KEY and install openai package.")

    openai.api_key = api_key

    prompt = (
        "You are an assistant that extracts a syllabus summary. "
        "Given the syllabus text, return a JSON object with keys: summary (short), objectives (list), mainContent (short), outputRequirements (short).\n\n"
        f"Syllabus:\n{text}\n\nReturn only JSON."
    )

    try:
        resp = openai.ChatCompletion.create(
            model=os.environ.get("OPENAI_MODEL", "gpt-4o-mini"),
            messages=[{"role": "user", "content": prompt}],
            max_tokens=max_tokens,
            temperature=0.2,
        )
        content = resp["choices"][0]["message"]["content"]
        # attempt to parse JSON from response
        import json as _json
        try:
            return _json.loads(content)
        except Exception:
            return {"summary": content}
    except Exception as e:
        logging.exception("OpenAI request failed")
        raise
