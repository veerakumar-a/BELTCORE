from fastapi.testclient import TestClient

from app.main import app

client = TestClient(app)


def test_root_endpoint():
    response = client.get('/')
    assert response.status_code == 200
    assert response.json()['project'] == 'BELTCORE'


def test_conveyors_endpoint():
    response = client.get('/conveyors')
    assert response.status_code == 200
    assert isinstance(response.json(), list)


def test_joints_endpoint():
    response = client.get('/joints')
    assert response.status_code == 200
    assert len(response.json()) >= 1


def test_ai_inference_demo_endpoint():
    response = client.post('/ai/inference', json={'joint_id': 'J-0042', 'mode': 'demo'})
    assert response.status_code == 200
    payload = response.json()
    assert 'joint_id' in payload
    assert 'detections' in payload
    assert 'vision_risk' in payload
    assert 'confidence' in payload


def test_jmaf_fusion_endpoint():
    response = client.get('/ai/jmaf')
    assert response.status_code == 200
    payload = response.json()
    assert 'vision' in payload
    assert 'risk_score' in payload
    assert 'reliability_weights' in payload
