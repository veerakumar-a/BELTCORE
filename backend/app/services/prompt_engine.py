from __future__ import annotations


def build_evidence_package(payload: dict) -> dict:
    return {
        'joint_id': payload.get('joint_id', 'J-0001'),
        'health_index': payload.get('health_index', 61),
        'risk_level': payload.get('risk_level', 'DEGRADING'),
        'vision': payload.get('vision', {'risk': 0.72, 'confidence': 0.91}),
        'vibration': payload.get('vibration', {'risk': 0.64}),
        'temperature': payload.get('temperature', {'risk': 0.31}),
        'load': payload.get('load', {'risk': 0.48}),
        'explainability': {
            'measured_evidence': [
                {'name': 'Vision anomaly', 'level': 'HIGH'},
                {'name': 'Vibration anomaly', 'level': 'HIGH'},
                {'name': 'Load variation', 'level': 'MEDIUM'},
                {'name': 'Temperature', 'level': 'LOW'},
            ],
            'ai_generated_interpretation': 'AI-generated interpretation is decision-support only and requires maintenance verification.'
        }
    }
