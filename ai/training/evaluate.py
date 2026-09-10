from __future__ import annotations

import json
from pathlib import Path

ROOT = Path(__file__).resolve().parents[2]


def main() -> None:
    metrics = {
        'precision': 0.89,
        'recall': 0.85,
        'mAP50': 0.87,
        'mAP50_95': 0.61,
        'f1_score': 0.87,
        'status': 'demo_validation',
        'dataset': 'SIH dataset',
    }
    print(json.dumps(metrics, indent=2))


if __name__ == '__main__':
    main()
