export type JointStatus = 'HEALTHY' | 'WATCH' | 'DEGRADING' | 'HIGH RISK' | 'CRITICAL' | 'UNKNOWN'

export type Joint = {
  id: string
  conveyor: string
  status: JointStatus
  jhi: number
  risk: string
  position: string
  confidence: number
}

export const joints: Joint[] = [
  { id: 'J-001', conveyor: 'CV-01', status: 'HEALTHY', jhi: 94, risk: 'LOW', position: '112 m', confidence: 97 },
  { id: 'J-002', conveyor: 'CV-01', status: 'WATCH', jhi: 83, risk: 'MEDIUM', position: '221 m', confidence: 92 },
  { id: 'J-003', conveyor: 'CV-01', status: 'HEALTHY', jhi: 90, risk: 'LOW', position: '345 m', confidence: 96 },
  { id: 'J-004', conveyor: 'CV-02', status: 'DEGRADING', jhi: 71, risk: 'MEDIUM', position: '482 m', confidence: 88 },
  { id: 'J-005', conveyor: 'CV-02', status: 'HIGH RISK', jhi: 52, risk: 'HIGH', position: '604 m', confidence: 84 },
  { id: 'J-006', conveyor: 'CV-02', status: 'CRITICAL', jhi: 29, risk: 'CRITICAL', position: '746 m', confidence: 81 },
  { id: 'J-007', conveyor: 'CV-03', status: 'UNKNOWN', jhi: 61, risk: 'UNKNOWN', position: '918 m', confidence: 56 },
  { id: 'J-008', conveyor: 'CV-03', status: 'HEALTHY', jhi: 88, risk: 'LOW', position: '1027 m', confidence: 95 },
]

export const telemetry = {
  vibration: { current: 4.21, baseline: 2.83, unit: 'mm/s', confidence: 94 },
  temperature: { current: 42.6, baseline: 37.8, unit: '°C', confidence: 91 },
  load: { current: 1.84, baseline: 1.62, unit: 'kN', confidence: 96 },
  speed: { current: 2.9, baseline: 3.1, unit: 'm/s', confidence: 93 },
  alignment: { current: 4.2, baseline: 2.6, unit: 'mm', confidence: 89 },
  acoustic: { current: 72.8, baseline: 61.9, unit: 'dB', confidence: 83 },
}

export const alerts = [
  { id: 'ALT-201', joint: 'J-006', conveyor: 'CV-02', severity: 'Critical', detected: '08:42', evidence: 'Vibration +38% / crack pattern', status: 'Open', action: 'Inspect' },
  { id: 'ALT-202', joint: 'J-005', conveyor: 'CV-02', severity: 'High', detected: '08:16', evidence: 'Thermal drift +11%', status: 'Assigned', action: 'Acknowledge' },
  { id: 'ALT-203', joint: 'J-007', conveyor: 'CV-03', severity: 'Unknown', detected: '07:54', evidence: 'Vision confidence low', status: 'Pending', action: 'Review' },
]

export const riskCards = [
  { label: 'Overall Conveyor Health', value: '76 / 100', delta: '-8.2%' },
  { label: 'Joint Health', value: '61 / 100', delta: '-12.4%' },
  { label: 'Active Alerts', value: '03', delta: '2 critical' },
  { label: 'Sensor Connectivity', value: '94%', delta: '6 offline' },
  { label: 'AI Confidence', value: '92%', delta: '+3.1%' },
  { label: 'System Uptime', value: '99.6%', delta: 'stable' },
]
