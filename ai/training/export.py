from __future__ import annotations

import json
from pathlib import Path

ROOT = Path(__file__).resolve().parents[2]


def main() -> None:
    export = {
        'status': 'demo_export',
        'onnx': 'not generated',
        'tensorrt': 'not generated',
        'openvino': 'not generated',
        'note': 'Model export is supported by the pipeline specification and will run when a real YOLO checkpoint is available.'
    }
    print(json.dumps(export, indent=2))


if __name__ == '__main__':
    main()
