export type ScenarioName =
  | 'HEALTHY'
  | 'CRACK DETECTED'
  | 'VIBRATION ANOMALY'
  | 'THERMAL ANOMALY'
  | 'LOAD ANOMALY'
  | 'MULTIMODAL DEGRADATION'
  | 'SENSOR FAILURE'
  | 'CAMERA OCCLUSION'
  | 'REPAIR CONFIRMED'

export type HealthInput = {
  vibration: number
  temperature: number
  load: number
  acoustic: number
  vision: number
  confidence: number
}

export function calculateJhi(values: HealthInput): number {
  const weighted =
    values.vibration * 0.26 +
    values.temperature * 0.19 +
    values.load * 0.18 +
    values.acoustic * 0.15 +
    values.vision * 0.22

  const confidenceFactor = values.confidence / 100
  return Math.max(0, Math.min(100, Math.round(weighted * confidenceFactor)))
}

export function classifyRisk(jhi: number, confidence = 100): string {
  if (confidence < 60) return 'UNKNOWN'
  if (jhi >= 90) return 'HEALTHY'
  if (jhi >= 75) return 'WATCH'
  if (jhi >= 60) return 'DEGRADING'
  if (jhi >= 40) return 'HIGH RISK'
  if (jhi >= 0) return 'CRITICAL'
  return 'UNKNOWN'
}

export function isUnknownState(confidence: number, sensorAvailable: boolean, disagreement: number): boolean {
  return confidence < 0.6 || !sensorAvailable || disagreement > 0.32
}

export function computeScenarioMetrics(scenario: ScenarioName) {
  const scenarioMap: Record<ScenarioName, { jhi: number; alerts: string[]; confidence: number }> = {
    HEALTHY: { jhi: 92, alerts: [], confidence: 96 },
    'CRACK DETECTED': { jhi: 68, alerts: ['Visual crack detected', 'Splice fatigue signal elevated'], confidence: 88 },
    'VIBRATION ANOMALY': { jhi: 61, alerts: ['Vibration deviation +27%'], confidence: 85 },
    'THERMAL ANOMALY': { jhi: 72, alerts: ['Thermal drift detected'], confidence: 89 },
    'LOAD ANOMALY': { jhi: 77, alerts: ['Load fluctuation pattern'], confidence: 90 },
    'MULTIMODAL DEGRADATION': { jhi: 44, alerts: ['Multi-sensor degradation detected'], confidence: 82 },
    'SENSOR FAILURE': { jhi: 54, alerts: ['Sensor disagreement high', 'Manual inspection required'], confidence: 49 },
    'CAMERA OCCLUSION': { jhi: 74, alerts: ['Vision confidence degraded'], confidence: 58 },
    'REPAIR CONFIRMED': { jhi: 87, alerts: ['Repair event logged', 'Baseline reset scheduled'], confidence: 93 },
  }

  return scenarioMap[scenario]
}
