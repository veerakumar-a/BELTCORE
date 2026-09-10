from __future__ import annotations

from pydantic import BaseModel, Field


class InferenceRequest(BaseModel):
    joint_id: str = Field(default='J-0042')
    mode: str = Field(default='demo')


class InferenceResponse(BaseModel):
    joint_id: str
    detections: list[dict]
    vision_risk: float
    confidence: float
    inference_time_ms: int
    model: str = 'BELTCORE-YOLO'
    model_version: str = '0.1.0'
