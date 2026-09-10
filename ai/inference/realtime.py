from __future__ import annotations

import json


def realtime_demo() -> dict:
    return {
        'mode': 'demo',
        'fps': 13.8,
        'joint_id': 'J-0042',
        'processing_time_ms': 74,
        'detections': [{'class': 'crack', 'confidence': 0.91}]
    }


if __name__ == '__main__':
    print(json.dumps(realtime_demo(), indent=2))
