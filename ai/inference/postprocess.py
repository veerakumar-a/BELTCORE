from __future__ import annotations


def postprocess(detections: list[dict]) -> list[dict]:
    filtered = []
    for detection in detections:
        confidence = detection.get('confidence', 0.0)
        if confidence >= 0.2:
            filtered.append({**detection, 'status': 'accepted'})
    return filtered
