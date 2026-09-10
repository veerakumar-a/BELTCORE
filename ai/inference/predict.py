from __future__ import annotations

import json
from datetime import datetime, timezone


def predict_demo(joint_id: str = 'J-0042') -> dict:
    return {
        'joint_id': joint_id,
        'detections': [{'class': 'crack', 'confidence': 0.91, 'bbox': [120, 80, 500, 360]}],
        'vision_risk': 0.72,
        'confidence': 0.91,
        'inference_time_ms': 86,
        'model': 'BELTCORE-YOLO',
        'model_version': '0.1.0',
        'dataset': 'SIH-v1',
        'timestamp': datetime.now(timezone.utc).isoformat(),
        'demo_mode': True,
    }


def main() -> None:
    print(json.dumps(predict_demo(), indent=2))


if __name__ == '__main__':
    main()
