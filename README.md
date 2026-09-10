# BELTCORE

Event-Synchronized Multimodal Edge AI for Joint-Level Conveyor Belt Health Intelligence

## Overview
BELTCORE is an AI + IoT prototype for conveyor belt joint health monitoring. The project combines a dataset-driven vision pipeline, multimodal event sensing, explainable risk interpretation, and a dashboard that presents the system as a realistic smart-industry monitoring concept for SIH evaluation.

## Problem
Industrial conveyor belt joints and splices are exposed to fatigue, misalignment, heat, vibration, and load imbalance. Without a continuous, joint-level view, late-stage degradation may remain hidden until major downtime or maintenance interruption occurs.

## Solution
BELTCORE proposes a layered monitoring workflow:
- dataset inspection and validation for the provided SIH dataset
- vision-based defect detection using a computer-vision pipeline
- multimodal sensor fusion and J-MAF-based risk interpretation
- explainable AI outputs for maintenance decision support
- dashboard and digital joint passport UI for operational visibility

## AI Pipeline
```mermaid
flowchart LR
A[SIH Dataset] --> B[Dataset Validation]
B --> C[Preprocessing]
C --> D[Train / Validate / Test Split]
D --> E[Model Training]
E --> F[Evaluation]
F --> G[Edge Optimization]
G --> H[Inference]
H --> I[J-MAF Fusion]
I --> J[Joint Health Index]
J --> K[Dashboard & Alerts]
```

## Repository Structure
- `frontend/` – Vite + React dashboard and project profile UI
- `backend/` – FastAPI app and API endpoints
- `ai/` – dataset, training, validation and inference code
- `SIH/` – extracted dataset assets

## Current Status
This repository is a working prototype and demo pipeline with clearly labeled development states:
- frontend dashboard is active and buildable
- backend API is active and testable
- dataset inspection and validation scripts are integrated
- training and inference remain in a reproducible development/demo configuration until the prepared dataset is fully validated and model runs are executed

## Run Locally
### Frontend
```bash
cd frontend
npm install
npm run dev
```

### Backend
```bash
cd backend
python -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
uvicorn app.main:app --reload
```

### AI Dataset Check
```bash
cd ai/dataset
python inspect_dataset.py
python validate_dataset.py
```

### AI Training Demo
```bash
cd ai/training
python train.py
```

## Important Note
BELTCORE is designed for prototype evaluation and research demonstration. AI recommendations require human maintenance verification and do not replace validated industrial safety controls or engineering diagnosis.

## License
This project is an SIH 2026 prototype for demonstration and evaluation use.
