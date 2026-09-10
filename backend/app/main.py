from __future__ import annotations

import sys
from pathlib import Path

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

REPO_ROOT = Path(__file__).resolve().parents[2]
if str(REPO_ROOT) not in sys.path:
    sys.path.insert(0, str(REPO_ROOT))

from app.schemas.ai import InferenceRequest, InferenceResponse
from app.services.explanation_service import ExplanationService
from ai.inference.predict import predict_demo

app = FastAPI(title='BELTCORE API', version='0.1.0')

app.add_middleware(
    CORSMiddleware,
    allow_origins=['*'],
    allow_credentials=True,
    allow_methods=['*'],
    allow_headers=['*'],
)


@app.get('/')
def root():
    return {
        'project': 'BELTCORE',
        'status': 'demo-ready',
        'mode': 'simulated telemetry',
        'message': 'Event-synchronized multimodal edge AI monitoring for conveyor belt joints.'
    }


@app.get('/conveyors')
def conveyors():
    return [
        {'id': 'CV-01', 'name': 'Primary haulage conveyor', 'status': 'ACTIVE'},
        {'id': 'CV-02', 'name': 'Transfer conveyor', 'status': 'ACTIVE'},
        {'id': 'CV-03', 'name': 'Loading conveyor', 'status': 'MONITORING'},
    ]


@app.get('/joints')
def joints():
    return [
        {'id': 'J-001', 'conveyor': 'CV-01', 'status': 'HEALTHY', 'jhi': 94},
        {'id': 'J-005', 'conveyor': 'CV-02', 'status': 'HIGH RISK', 'jhi': 52},
        {'id': 'J-007', 'conveyor': 'CV-03', 'status': 'UNKNOWN', 'jhi': 61},
    ]


@app.post('/ai/inference', response_model=InferenceResponse)
def ai_inference(payload: InferenceRequest):
    result = predict_demo(payload.joint_id)
    if payload.mode.lower() == 'demo':
        result['demo_mode'] = True
    return {
        'joint_id': result['joint_id'],
        'detections': result['detections'],
        'vision_risk': float(result['vision_risk']),
        'confidence': float(result['confidence']),
        'inference_time_ms': int(result['inference_time_ms']),
        'model': result.get('model', 'BELTCORE-YOLO'),
        'model_version': result.get('model_version', '0.1.0'),
    }


@app.get('/ai/jmaf')
def jmaf_fusion():
    weights = {
        'vision': 0.32,
        'vibration': 0.28,
        'temperature': 0.12,
        'load': 0.18,
        'other': 0.10,
    }
    return {
        'vision': {'risk': 0.72, 'confidence': 0.91},
        'vibration': {'risk': 0.64, 'confidence': 0.87},
        'temperature': {'risk': 0.31, 'confidence': 0.79},
        'load': {'risk': 0.48, 'confidence': 0.84},
        'risk_score': 0.58,
        'reliability_weights': weights,
        'status': 'DEGRADING',
        'note': 'Demonstration fusion values are labeled as demonstration values unless field data is validated.'
    }


@app.post('/ai/explanation')
def ai_explanation(payload: dict):
    service = ExplanationService()
    return service.generate_explanation(payload)
