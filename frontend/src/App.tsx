import { useMemo, useState } from 'react'
import { NavLink, Route, Routes } from 'react-router-dom'
import { AlertTriangle, Bell, Cpu, Menu, Search, ShieldCheck, Wrench } from 'lucide-react'
import { Area, AreaChart, Bar, BarChart, CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'
import './App.css'
import { alerts, joints, riskCards } from './data/demoData'
import { calculateJhi, classifyRisk, computeScenarioMetrics } from './utils/health'

const navItems = [
  { label: 'Home', path: '/' },
  { label: 'Monitoring', path: '/monitoring' },
  { label: 'AI Vision', path: '/ai-vision' },
  { label: 'Dataset', path: '/dataset' },
  { label: 'Models', path: '/models' },
  { label: 'Project Profile', path: '/project' },
  { label: 'Digital Joint Passport', path: '/passport' },
  { label: 'J-MAF', path: '/jmaf' },
  { label: 'Documentation', path: '/docs' },
]

const trendData = [
  { name: 'T-1', value: 100 },
  { name: 'T-2', value: 96 },
  { name: 'T-3', value: 93 },
  { name: 'T-4', value: 88 },
  { name: 'T-5', value: 82 },
  { name: 'T-6', value: 75 },
]

const barData = [
  { name: 'Healthy', value: 19 },
  { name: 'Watch', value: 3 },
  { name: 'Degrading', value: 1 },
  { name: 'High Risk', value: 1 },
]

const pieData = [
  { name: 'Vision', value: 94 },
  { name: 'Vibration', value: 97 },
  { name: 'Temperature', value: 91 },
  { name: 'Load', value: 96 },
  { name: 'Acoustic', value: 83 },
]

const sensorRows = [
  { name: 'Vibration', current: '4.21 mm/s', baseline: '2.83', deviation: '+48%', confidence: '94%' },
  { name: 'Temperature', current: '42.6°C', baseline: '37.8°C', deviation: '+12.7%', confidence: '91%' },
  { name: 'Load', current: '1.84 kN', baseline: '1.62 kN', deviation: '+13.5%', confidence: '96%' },
  { name: 'Speed', current: '2.9 m/s', baseline: '3.1 m/s', deviation: '-6.4%', confidence: '93%' },
  { name: 'Alignment', current: '4.2 mm', baseline: '2.6 mm', deviation: '+61%', confidence: '89%' },
  { name: 'Acoustic', current: '72.8 dB', baseline: '61.9 dB', deviation: '+17.6%', confidence: '83%' },
]

const aiDataset = {
  name: 'SIH Dataset',
  classes: ['defect', 'healthy'],
  images: 376,
  train: 263,
  val: 75,
  test: 38,
}

const profileBadges = [
  'SMART INDIA HACKATHON 2026',
  'HARDWARE',
  'SMART AUTOMATION',
  'AI + IOT',
  'EDGE AI',
  'INDUSTRIAL MONITORING',
]

function HomePage() {
  const [selectedScenario, setSelectedScenario] = useState('HEALTHY')
  const [selectedJoint, setSelectedJoint] = useState(joints[0])
  const healthSummary = useMemo(() => {
    const summary = computeScenarioMetrics(selectedScenario as any)
    const derived = calculateJhi({
      vibration: 82,
      temperature: 70,
      load: 60,
      acoustic: 68,
      vision: 76,
      confidence: summary.confidence,
    })

    return {
      ...summary,
      risk: classifyRisk(derived, summary.confidence),
      jhi: derived,
    }
  }, [selectedScenario])

  return (
    <>
      <section className="hero-grid">
        <div className="hero-copy">
          <div className="eyebrow">SYSTEM STATUS</div>
          <h1>BELTCORE</h1>
          <h2>Event-Synchronized Multimodal Edge AI for Joint-Level Conveyor Belt Health Intelligence</h2>
          <p>Continuous, explainable and edge-first monitoring of conveyor belt joints and splices.</p>
          <div className="hero-actions">
            <button className="primary-button">LIVE MONITORING</button>
            <button className="secondary-button">EXPLORE SYSTEM</button>
          </div>
          <div className="status-row">
            <span className="status-pill online">ONLINE</span>
            <span className="status-pill">EDGE AI ACTIVE</span>
            <span className="status-pill">DATA STREAM ACTIVE</span>
          </div>
        </div>

        <div className="hero-visual">
          <div className="conveyor-illustration">
            <div className="belt-line" />
            <div className="belt-line small" />
            <div className="joint-node healthy">J-001</div>
            <div className="joint-node watch">J-002</div>
            <div className="joint-node degrading">J-003</div>
            <div className="joint-node risk">J-004</div>
            <div className="joint-node critical">J-005</div>
            <div className="flow-stack">
              <span>CONVEYOR</span>
              <span>JOINT DETECTION</span>
              <span>MULTIMODAL SENSORS</span>
              <span>EDGE AI</span>
              <span>J-MAF FUSION</span>
              <span>JOINT HEALTH INDEX</span>
              <span>MAINTENANCE DECISION</span>
            </div>
          </div>
        </div>
      </section>

      <section className="stats-grid">
        <div className="stat-card"><span>ACTIVE CONVEYORS</span><strong>03</strong></div>
        <div className="stat-card"><span>MONITORED JOINTS</span><strong>24</strong></div>
        <div className="stat-card"><span>HEALTHY JOINTS</span><strong>19</strong></div>
        <div className="stat-card"><span>WATCH</span><strong>03</strong></div>
        <div className="stat-card"><span>DEGRADING</span><strong>01</strong></div>
        <div className="stat-card"><span>HIGH RISK</span><strong>01</strong></div>
      </section>

      <section className="page-section dashboard-section">
        <div className="section-header">
          <div>
            <p className="section-kicker">LIVE MONITORING</p>
            <h3>Control Room Overview</h3>
          </div>
          <div className="scenario-controls">
            <label htmlFor="scenario-select">Scenario</label>
            <select id="scenario-select" value={selectedScenario} onChange={(e) => setSelectedScenario(e.target.value)}>
              <option>HEALTHY</option>
              <option>CRACK DETECTED</option>
              <option>VIBRATION ANOMALY</option>
              <option>THERMAL ANOMALY</option>
              <option>LOAD ANOMALY</option>
              <option>MULTIMODAL DEGRADATION</option>
              <option>SENSOR FAILURE</option>
              <option>CAMERA OCCLUSION</option>
              <option>REPAIR CONFIRMED</option>
            </select>
          </div>
        </div>

        <div className="metric-grid">
          {riskCards.map((card) => (
            <div className="metric-card" key={card.label}>
              <span>{card.label}</span>
              <strong>{card.value}</strong>
              <small>{card.delta}</small>
            </div>
          ))}
        </div>

        <div className="dashboard-grid">
          <div className="main-panel conveyor-panel">
            <div className="panel-header">
              <h4>Conveyor Belt Layout</h4>
              <span className="tag">J-001 to J-008</span>
            </div>
            <div className="belt-layout">
              {joints.map((joint) => (
                <button key={joint.id} className={`joint-node large ${joint.status.toLowerCase().replace(/\s+/g, '-')}`} onClick={() => setSelectedJoint(joint)}>
                  {joint.id}
                  <small>{joint.status}</small>
                </button>
              ))}
            </div>
          </div>

          <div className="side-panel">
            <div className="panel-header">
              <h4>Digital Joint Passport</h4>
              <span className="tag">Selected</span>
            </div>
            <div className="passport-card">
              <div className="passport-row"><span>JOINT ID</span><strong>{selectedJoint.id}</strong></div>
              <div className="passport-row"><span>CONVEYOR</span><strong>{selectedJoint.conveyor}</strong></div>
              <div className="passport-row"><span>CURRENT JHI</span><strong>{selectedJoint.jhi} / 100</strong></div>
              <div className="passport-row"><span>RISK</span><strong>{selectedJoint.risk}</strong></div>
              <div className="passport-row"><span>STATUS</span><strong>{selectedJoint.status}</strong></div>
              <button className="primary-button small full">Open Digital Joint Passport</button>
            </div>
          </div>
        </div>
      </section>

      <section className="page-section">
        <div className="section-header">
          <div>
            <p className="section-kicker">LIVE SENSOR TELEMETRY</p>
            <h3>Demonstration telemetry</h3>
          </div>
        </div>

        <div className="sensor-table-wrap">
          <table className="sensor-table">
            <thead>
              <tr>
                <th>Sensor</th>
                <th>Current value</th>
                <th>Baseline</th>
                <th>Deviation</th>
                <th>Confidence</th>
              </tr>
            </thead>
            <tbody>
              {sensorRows.map((row) => (
                <tr key={row.name}>
                  <td>{row.name}</td>
                  <td>{row.current}</td>
                  <td>{row.baseline}</td>
                  <td>{row.deviation}</td>
                  <td>{row.confidence}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="page-section two-col">
        <div className="panel-box">
          <div className="section-header small-header">
            <p className="section-kicker">J-MAF</p>
            <h3>Joint Multimodal Adaptive Fusion</h3>
          </div>
          <div className="fusion-grid">
            {[
              ['VISION', '72', '91%', '0.31'],
              ['VIBRATION', '81', '96%', '0.27'],
              ['THERMAL', '63', '89%', '0.18'],
              ['ACOUSTIC', '77', '83%', '0.13'],
              ['LOAD', '58', '95%', '0.11'],
            ].map(([name, risk, conf, weight]) => (
              <div className="fusion-card" key={name}>
                <strong>{name}</strong>
                <span>Risk: {risk}</span>
                <span>Confidence: {conf}</span>
                <span>Weight: {weight}</span>
              </div>
            ))}
          </div>
          <div className="fusion-summary">
            <div><span>FUSED RISK</span><strong>71</strong></div>
            <div><span>FUSED CONFIDENCE</span><strong>92%</strong></div>
            <div><span>STATE</span><strong>DEGRADING</strong></div>
          </div>
        </div>

        <div className="panel-box">
          <div className="section-header small-header">
            <p className="section-kicker">EXPLAINABLE AI</p>
            <h3>AI-generated hypothesis</h3>
          </div>
          <div className="hypothesis-box">
            <div className="alert-strip">
              <AlertTriangle size={18} />
              <span>AI-GENERATED HYPOTHESIS</span>
            </div>
            <p>Evidence:</p>
            <ul>
              <li>+27% vibration deviation</li>
              <li>+11% thermal deviation</li>
              <li>+13% tension fluctuation</li>
              <li>Visual crack detected</li>
            </ul>
            <p className="hypothesis-text">Possible mechanical degradation / splice fatigue</p>
            <div className="confidence-line">
              <span>Confidence</span>
              <strong>78%</strong>
            </div>
            <p className="disclaimer">NOT A CERTIFIED ROOT-CAUSE DIAGNOSIS</p>
          </div>
        </div>
      </section>

      <section className="page-section analytics-grid">
        <div className="panel-box wide-panel">
          <div className="section-header small-header">
            <p className="section-kicker">DEGRADATION TRAJECTORY</p>
            <h3>JHI history</h3>
          </div>
          <div className="chart-box">
            <ResponsiveContainer width="100%" height={220}>
              <LineChart data={trendData}>
                <CartesianGrid stroke="#d9dee5" strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis domain={[60, 100]} />
                <Tooltip />
                <Line type="monotone" dataKey="value" stroke="#123B68" strokeWidth={3} dot={{ r: 4 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="panel-box">
          <div className="section-header small-header">
            <p className="section-kicker">SENSOR RELIABILITY</p>
            <h3>Signal reliability</h3>
          </div>
          <div className="reliability-stack">
            {pieData.map((item) => (
              <div className="reliability-item" key={item.name}>
                <span>{item.name}</span>
                <strong>{item.value}%</strong>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="page-section two-col">
        <div className="panel-box">
          <div className="section-header small-header">
            <p className="section-kicker">ALERT CENTER</p>
            <h3>Active alerts</h3>
          </div>
          <div className="alert-list">
            {alerts.map((alert) => (
              <div className="alert-row" key={alert.id}>
                <div><strong>{alert.id}</strong><span>{alert.joint}</span></div>
                <div><span>{alert.severity}</span><small>{alert.evidence}</small></div>
                <div><span>{alert.status}</span></div>
              </div>
            ))}
          </div>
        </div>

        <div className="panel-box">
          <div className="section-header small-header">
            <p className="section-kicker">MAINTENANCE</p>
            <h3>Decision engine</h3>
          </div>
          <div className="decision-box">
            <div className="decision-row"><span>RISK LEVEL</span><strong>{healthSummary.risk}</strong></div>
            <div className="decision-row"><span>AI JHI</span><strong>{healthSummary.jhi}</strong></div>
            <div className="decision-row"><span>SCENARIO</span><strong>{selectedScenario}</strong></div>
            <div className="decision-note">BELTCORE does not bypass or override validated industrial safety interlocks.</div>
          </div>
        </div>
      </section>

      <section className="page-section">
        <div className="section-header">
          <div>
            <p className="section-kicker">ANALYTICS</p>
            <h3>Fleet-level intelligence</h3>
          </div>
        </div>

        <div className="chart-row">
          <div className="chart-box">
            <ResponsiveContainer width="100%" height={220}>
              <AreaChart data={trendData}>
                <defs>
                  <linearGradient id="healthStroke" x1="0" x2="0" y1="0" y2="1">
                    <stop offset="5%" stopColor="#1E5A96" stopOpacity={0.5} />
                    <stop offset="95%" stopColor="#1E5A96" stopOpacity={0.05} />
                  </linearGradient>
                </defs>
                <CartesianGrid stroke="#d9dee5" strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Area type="monotone" dataKey="value" stroke="#123B68" fill="url(#healthStroke)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
          <div className="chart-box">
            <ResponsiveContainer width="100%" height={220}>
              <BarChart data={barData}>
                <CartesianGrid stroke="#d9dee5" strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="value" fill="#1E5A96" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </section>

      <section className="page-section footer-feature">
        <div className="feature-box">
          <Cpu size={28} />
          <div>
            <strong>Edge-first architecture</strong>
            <p>Offline monitoring continues with local inference and local buffering.</p>
          </div>
        </div>
        <div className="feature-box">
          <ShieldCheck size={28} />
          <div>
            <strong>Prototype / Demo Model</strong>
            <p>Simulated inference for GitHub Pages and public demonstration.</p>
          </div>
        </div>
        <div className="feature-box">
          <Wrench size={28} />
          <div>
            <strong>Self-rebaseline workflow</strong>
            <p>Repair confirmed triggers archive, relearn and normal monitoring.</p>
          </div>
        </div>
      </section>
    </>
  )
}

function AIVisionPage() {
  return (
    <section className="page-section content-panel">
      <div className="section-header">
        <div>
          <p className="section-kicker">AI VISION</p>
          <h3>YOLO-based Conveyor Joint Inspection</h3>
        </div>
      </div>
      <div className="detail-grid">
        <div className="info-panel">
          <h4>Model Information</h4>
          <div className="passport-row"><span>Model</span><strong>YOLO-based Conveyor Joint Inspection</strong></div>
          <div className="passport-row"><span>Dataset</span><strong>SIH Dataset</strong></div>
          <div className="passport-row"><span>Classes</span><strong>{aiDataset.classes.join(', ')}</strong></div>
          <div className="passport-row"><span>Model Status</span><strong>DEMO MODE / SIMULATION</strong></div>
          <div className="passport-row"><span>Inference Mode</span><strong>EDGE / SIMULATION</strong></div>
        </div>

        <div className="info-panel">
          <h4>Live Detection</h4>
          <div className="alert-strip"><AlertTriangle size={18} /><span>JOINT J-0042</span></div>
          <p className="hypothesis-text">Detection: Potential splice anomaly</p>
          <div className="confidence-line"><span>Confidence</span><strong>0.91</strong></div>
          <div className="confidence-line"><span>Vision Risk</span><strong>HIGH</strong></div>
          <div className="confidence-line"><span>Processing Time</span><strong>86 ms</strong></div>
          <div className="confidence-line"><span>FPS</span><strong>13.8</strong></div>
        </div>
      </div>

      <div className="info-panel info-block">
        <h4>Upload Conveyor Image</h4>
        <div className="file-upload-box">
          <button className="primary-button small">Run YOLO Inference</button>
          <span>DEMO MODE: Synthetic inference data</span>
        </div>
      </div>
    </section>
  )
}

function DatasetPage() {
  return (
    <section className="page-section content-panel">
      <div className="section-header">
        <div>
          <p className="section-kicker">DATASET</p>
          <h3>SIH Dataset Gallery</h3>
        </div>
      </div>
      <div className="detail-grid">
        <div className="info-panel">
          <h4>Dataset Summary</h4>
          <div className="passport-row"><span>Dataset Name</span><strong>{aiDataset.name}</strong></div>
          <div className="passport-row"><span>Images</span><strong>{aiDataset.images}</strong></div>
          <div className="passport-row"><span>Classes</span><strong>{aiDataset.classes.length}</strong></div>
          <div className="passport-row"><span>Train</span><strong>{aiDataset.train}</strong></div>
          <div className="passport-row"><span>Validation</span><strong>{aiDataset.val}</strong></div>
          <div className="passport-row"><span>Test</span><strong>{aiDataset.test}</strong></div>
        </div>
        <div className="info-panel">
          <h4>Sample images</h4>
          <div className="sample-gallery">
            <div className="sample-card">healthy_belt_006</div>
            <div className="sample-card">healthy_belt_054</div>
            <div className="sample-card">crack_001</div>
            <div className="sample-card">crack_099</div>
          </div>
        </div>
      </div>
    </section>
  )
}

function ModelPage() {
  return (
    <section className="page-section content-panel">
      <div className="section-header">
        <div>
          <p className="section-kicker">MODEL PERFORMANCE</p>
          <h3>Dataset Evaluation</h3>
        </div>
      </div>
      <div className="detail-grid">
        <div className="info-panel">
          <h4>Performance</h4>
          <div className="passport-row"><span>Precision</span><strong>Evaluation pending</strong></div>
          <div className="passport-row"><span>Recall</span><strong>Evaluation pending</strong></div>
          <div className="passport-row"><span>mAP50</span><strong>Evaluation pending</strong></div>
          <div className="passport-row"><span>mAP50-95</span><strong>Evaluation pending</strong></div>
          <div className="passport-row"><span>F1 Score</span><strong>Evaluation pending</strong></div>
        </div>
        <div className="info-panel">
          <h4>Training Curves</h4>
          <div className="chart-box compact">
            <ResponsiveContainer width="100%" height={220}>
              <LineChart data={trendData}>
                <CartesianGrid stroke="#d9dee5" strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="value" stroke="#123B68" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </section>
  )
}

function ProjectProfilePage() {
  const technologies = {
    ai: ['Python', 'Ultralytics YOLO', 'OpenCV', 'NumPy', 'SciPy', 'scikit-learn'],
    edge: ['ESP32', 'Raspberry Pi / Jetson', 'MQTT', 'Encoder', 'Industrial Sensors'],
    backend: ['FastAPI', 'Python', 'SQLite / PostgreSQL', 'Pydantic'],
    frontend: ['React', 'TypeScript', 'Vite', 'Tailwind CSS', 'Recharts', 'Lucide'],
    integration: ['MQTT', 'Modbus', 'OPC-UA', 'PLC / SCADA Gateway'],
  }

  const innovationCards = [
    'Joint-Level Intelligence',
    'Event Synchronization',
    'J-MAF',
    'Joint Health Index',
    'Digital Joint Passport',
    'Uncertainty Awareness',
  ]

  const impactCards = [
    'Joint-level visibility',
    'Multimodal intelligence',
    'Edge processing',
    'Explainable alerts',
    'Traceable maintenance history',
    'Uncertainty-aware decisions',
  ]

  const demoSequence = [
    'Healthy Belt',
    'Joint Detection',
    'Sensor Acquisition',
    'Vision AI',
    'J-MAF Fusion',
    'JHI',
    'Risk Classification',
    'Cause Fingerprint',
    'Maintenance Recommendation',
    'Repair + Re-baseline',
  ]

  return (
    <div className="project-profile">
      <section className="project-hero">
        <div>
          <p className="section-kicker">PROJECT PROFILE</p>
          <h1>BELTCORE</h1>
          <h2>Event-Synchronized Multimodal Edge AI for Joint-Level Conveyor Belt Health Intelligence</h2>
          <p>An Edge AI and IoT platform for continuous, joint-level conveyor splice monitoring, multimodal anomaly detection and explainable maintenance intelligence.</p>
          <div className="badge-row">
            {profileBadges.map((badge) => (
              <span key={badge} className="soft-badge">{badge}</span>
            ))}
          </div>
        </div>
      </section>

      <section className="project-card">
        <h3>PROJECT OVERVIEW</h3>
        <p>
          BELTCORE transforms conveyor belt monitoring from periodic inspection into continuous, joint-level health intelligence.
          The platform synchronizes conveyor events with multimodal sensor and computer-vision data to identify abnormal joint behaviour,
          estimate joint health, classify risk and provide maintenance decision support.
        </p>
      </section>

      <section className="two-panel-grid">
        <div className="project-card">
          <h3>THE PROBLEM</h3>
          <p>Conveyor belt splice and joint failures can affect material movement, maintenance planning and operational continuity.</p>
          <p>Traditional monitoring may involve periodic inspection or independent sensor observations, making it difficult to maintain a continuous history for every individual splice.</p>
          <div className="flow-stack-vertical">
            <span>Periodic Inspection</span>
            <span>Limited Historical Context</span>
            <span>Independent Sensor Signals</span>
            <span>Delayed Recognition</span>
            <span>Reactive Maintenance</span>
          </div>
        </div>

        <div className="project-card">
          <h3>THE BELTCORE APPROACH</h3>
          <div className="vertical-flow">
            <span>CONVEYOR</span>
            <span>JOINT IDENTIFICATION</span>
            <span>EVENT SYNCHRONIZATION</span>
            <span>MULTIMODAL DATA</span>
            <span>EDGE AI</span>
            <span>J-MAF FUSION</span>
            <span>JOINT HEALTH INDEX</span>
            <span>RISK CLASSIFICATION</span>
            <span>EXPLAINABLE MAINTENANCE INTELLIGENCE</span>
          </div>
        </div>
      </section>

      <section className="project-card">
        <h3>KEY INNOVATIONS</h3>
        <div className="innovation-grid">
          {innovationCards.map((item, index) => (
            <div key={item} className="mini-card">
              <span>0{index + 1}</span>
              <strong>{item}</strong>
              <p>{item === 'Joint-Level Intelligence' && 'Every splice receives a persistent Joint ID and health history.'}
                {item === 'Event Synchronization' && 'Encoder and speed information associates sensor and vision observations with the correct joint.'}
                {item === 'J-MAF' && 'Adaptive multimodal fusion dynamically considers reliability across data sources.'}
                {item === 'Joint Health Index' && 'A prototype 0–100 health score represents the current joint condition.'}
                {item === 'Digital Joint Passport' && 'Each joint keeps a traceable history of detections, health and maintenance.'}
                {item === 'Uncertainty Awareness' && 'When evidence is weak, the system can return UNKNOWN or NEEDS INSPECTION.'}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className="project-card">
        <h3>TECHNOLOGY STACK</h3>
        <div className="tech-grid">
          {Object.entries(technologies).map(([category, items]) => (
            <div key={category} className="tech-card">
              <h4>{category.toUpperCase()}</h4>
              <ul>
                {items.map((item) => <li key={item}>{item}</li>)}
              </ul>
            </div>
          ))}
        </div>
      </section>

      <section className="project-card">
        <h3>AI PIPELINE PROFILE</h3>
        <div className="pipeline-row">
          {['DATASET', 'DATA VALIDATION', 'ANNOTATION', 'AUGMENTATION', 'MODEL TRAINING', 'VALIDATION', 'EVALUATION', 'EDGE OPTIMIZATION', 'INFERENCE', 'MONITORING'].map((step, index) => (
            <div key={step} className="pipeline-step">
              <span>{step}</span>
              {index < 9 && <small>↓</small>}
            </div>
          ))}
        </div>
        <p className="muted">The repository integrates the uploaded SIH dataset and exposes its inspection and validation workflow through the AI dataset scripts.</p>
      </section>

      <section className="project-card">
        <h3>BELTCORE AI MODEL</h3>
        <div className="model-table">
          <div><span>Model</span><strong>YOLO-based Vision Model</strong></div>
          <div><span>Purpose</span><strong>Conveyor splice and joint visual inspection</strong></div>
          <div><span>Dataset</span><strong>SIH dataset</strong></div>
          <div><span>Input</span><strong>Conveyor image or video frame</strong></div>
          <div><span>Output</span><strong>Object and anomaly detections</strong></div>
          <div><span>Deployment</span><strong>Edge inference</strong></div>
          <div><span>Status</span><strong>Development / Demo</strong></div>
          <div><span>Model Version</span><strong>Not fabricated</strong></div>
          <div><span>Dataset Version</span><strong>Source-dependent</strong></div>
          <div><span>Training Date</span><strong>Not declared</strong></div>
          <div><span>Inference Mode</span><strong>Demo / Edge-ready</strong></div>
        </div>
      </section>

      <section className="project-card">
        <h3>MODEL PERFORMANCE</h3>
        <div className="model-metrics">
          <div><span>Precision</span><strong>Evaluation pending</strong></div>
          <div><span>Recall</span><strong>Evaluation pending</strong></div>
          <div><span>mAP@50</span><strong>Evaluation pending</strong></div>
          <div><span>mAP@50–95</span><strong>Evaluation pending</strong></div>
          <div><span>F1 Score</span><strong>Evaluation pending</strong></div>
          <div><span>Inference Time</span><strong>Evaluation pending</strong></div>
          <div><span>FPS</span><strong>Evaluation pending</strong></div>
        </div>
      </section>

      <section className="project-card">
        <h3>HARDWARE PROFILE</h3>
        <div className="hardware-arch">
          <div className="hardware-node">CAMERA</div>
          <div className="hardware-arrow">▼</div>
          <div className="hardware-node multi">ESP32</div>
          <div className="hardware-arrow">▼</div>
          <div className="hardware-node">EDGE COMPUTER</div>
          <div className="hardware-arrow">▼</div>
          <div className="hardware-node">AI INFERENCE</div>
        </div>
        <div className="hardware-grid">
          {['ESP32', 'Camera', 'Vibration Sensor', 'Temperature Sensor', 'Load Sensor', 'Encoder', 'Edge Computer', 'Mini Conveyor Prototype'].map((item) => (
            <div key={item} className="mini-card hardware-item">
              <strong>{item}</strong>
              <p>Purpose and status vary by prototype configuration.</p>
            </div>
          ))}
        </div>
      </section>

      <section className="project-card">
        <h3>DIGITAL JOINT PASSPORT</h3>
        <div className="passport-showcase">
          <div className="passport-header">JOINT J-0042</div>
          <div className="passport-grid">
            <span>Health Index</span><strong>61 / 100</strong>
            <span>Risk Level</span><strong>DEGRADING</strong>
            <span>Operating Hours</span><strong>Not declared</strong>
            <span>Last Inspection</span><strong>Pending</strong>
            <span>Last Maintenance</span><strong>Pending</strong>
            <span>Vision Status</span><strong>Monitoring</strong>
            <span>Sensor Status</span><strong>Monitoring</strong>
            <span>Trend</span><strong>Watchlist</strong>
          </div>
        </div>
      </section>

      <section className="project-card">
        <h3>CAUSE FINGERPRINT</h3>
        <div className="cause-grid">
          <div className="cause-bar"><span>VISION</span><div className="bar"><i style={{ width: '80%' }} /></div><strong>HIGH</strong></div>
          <div className="cause-bar"><span>VIBRATION</span><div className="bar"><i style={{ width: '78%' }} /></div><strong>HIGH</strong></div>
          <div className="cause-bar"><span>TEMPERATURE</span><div className="bar"><i style={{ width: '35%' }} /></div><strong>LOW</strong></div>
          <div className="cause-bar"><span>LOAD</span><div className="bar"><i style={{ width: '52%' }} /></div><strong>MEDIUM</strong></div>
        </div>
        <p className="muted">AI-generated explanations are presented as interpretations and do not replace engineering diagnosis or validated plant safety logic.</p>
      </section>

      <section className="project-card">
        <h3>J-MAF VISUALIZATION</h3>
        <div className="jmaf-visual">
          <div>VISION</div>
          <div>VIBRATION</div>
          <div>TEMPERATURE</div>
          <div>LOAD</div>
          <div className="fusion-core">J-MAF</div>
          <div className="fused-risk">FUSED RISK</div>
        </div>
      </section>

      <section className="project-card">
        <h3>EDGE-FIRST INTELLIGENCE</h3>
        <div className="offline-grid">
          <span>Sensors</span>
          <span>ESP32</span>
          <span>Edge Computer</span>
          <span>Local AI</span>
          <span>Local Database</span>
          <span>Local Alerts</span>
        </div>
      </section>

      <section className="project-card">
        <h3>INDUSTRIAL INTEGRATION</h3>
        <div className="integration-row">
          <span>BELTCORE EDGE</span>
          <span>OPC-UA / MODBUS GATEWAY</span>
          <span>PLC</span>
          <span>SCADA</span>
          <span>CONTROL ROOM</span>
        </div>
        <p className="muted">BELTCORE provides decision support. Safety-critical machine control must remain under validated plant safety and interlock logic.</p>
      </section>

      <section className="project-card">
        <h3>PROJECT IMPACT</h3>
        <div className="impact-grid">
          {impactCards.map((item) => (
            <div key={item} className="mini-card"><strong>{item}</strong></div>
          ))}
        </div>
      </section>

      <section className="project-card">
        <h3>PROJECT ROADMAP</h3>
        <div className="roadmap">
          <div><span>PHASE 01</span><strong>SIH MVP</strong><em>CURRENT</em></div>
          <div><span>PHASE 02</span><strong>Advanced Prototype</strong><em>IN DEVELOPMENT</em></div>
          <div><span>PHASE 03</span><strong>Industrial Pilot</strong><em>FUTURE</em></div>
          <div><span>PHASE 04</span><strong>Mine Deployment</strong><em>FUTURE</em></div>
          <div><span>PHASE 05</span><strong>Enterprise Platform</strong><em>FUTURE</em></div>
        </div>
      </section>

      <section className="project-card">
        <h3>BELTCORE DEVELOPMENT STATUS</h3>
        <div className="status-grid">
          <div><span>Frontend</span><strong>READY</strong></div>
          <div><span>Dashboard</span><strong>READY</strong></div>
          <div><span>Dataset Pipeline</span><strong>READY / DEVELOPMENT</strong></div>
          <div><span>AI Model</span><strong>DEVELOPMENT</strong></div>
          <div><span>J-MAF</span><strong>DEVELOPMENT</strong></div>
          <div><span>Sensor Integration</span><strong>DEVELOPMENT</strong></div>
          <div><span>Mechanical Rig</span><strong>DEVELOPMENT</strong></div>
          <div><span>Edge Deployment</span><strong>DEVELOPMENT</strong></div>
        </div>
      </section>

      <section className="project-card">
        <h3>PROJECT GALLERY</h3>
        <div className="gallery-grid">
          {['Conveyor prototype', 'AI detection examples', 'Dataset examples', 'Architecture', 'Dashboard', 'Hardware', 'Sensor setup', 'Training results'].map((item) => (
            <div key={item} className="gallery-item">{item}</div>
          ))}
        </div>
      </section>

      <section className="project-card">
        <h3>5-MINUTE JURY DEMO</h3>
        <div className="demo-timeline">
          {demoSequence.map((item, index) => (
            <div key={item} className="demo-step">
              <span>{String(index + 1).padStart(2, '0')}</span>
              <strong>{item}</strong>
            </div>
          ))}
        </div>
      </section>

      <section className="project-card">
        <h3>TEAM</h3>
        <div className="team-grid">
          {['AI / ML', 'Computer Vision', 'Embedded / IoT', 'Mechanical', 'Backend', 'Frontend', 'Integration', 'Testing & Documentation'].map((role) => (
            <div key={role} className="mini-card"><strong>{role}</strong></div>
          ))}
        </div>
      </section>

      <section className="project-card compact-card">
        <h3>SIH PROJECT PROFILE CARD</h3>
        <div className="profile-card-box">
          <h4>BELTCORE</h4>
          <p>Event-Synchronized Multimodal Edge AI for Conveyor Health Intelligence</p>
          <small>SIH 2026 | Smart Automation | Hardware | AI • IoT • Edge AI • Computer Vision</small>
        </div>
      </section>

      <section className="project-card">
        <h3>PROJECT METADATA</h3>
        <div className="model-table">
          <div><span>Project Name</span><strong>BELTCORE</strong></div>
          <div><span>Category</span><strong>Hardware</strong></div>
          <div><span>Theme</span><strong>Smart Automation</strong></div>
          <div><span>Event</span><strong>Smart India Hackathon 2026</strong></div>
          <div><span>Organization</span><strong>Ministry of Steel / NMDC</strong></div>
          <div><span>Problem Statement</span><strong>SIH26008</strong></div>
          <div><span>Technology</span><strong>AI + IoT + Edge Computing</strong></div>
          <div><span>Domain</span><strong>Industrial Automation / Conveyor Monitoring</strong></div>
        </div>
      </section>
    </div>
  )
}

function PassportPage() {
  return (
    <section className="page-section content-panel">
      <div className="section-header">
        <div>
          <p className="section-kicker">DIGITAL JOINT PASSPORT</p>
          <h3>Joint J-0042</h3>
        </div>
      </div>
      <div className="info-panel">
        <div className="passport-row"><span>Joint ID</span><strong>J-0042</strong></div>
        <div className="passport-row"><span>Images</span><strong>14</strong></div>
        <div className="passport-row"><span>Detections</span><strong>7</strong></div>
        <div className="passport-row"><span>JHI</span><strong>61 / 100</strong></div>
        <div className="passport-row"><span>Risk State</span><strong>DEGRADING</strong></div>
        <div className="passport-row"><span>Model Version</span><strong>BELTCORE-YOLO 0.1.0</strong></div>
        <div className="passport-row"><span>Timestamp</span><strong>2026-09-10T12:00:00Z</strong></div>
      </div>
    </section>
  )
}

function JmafPage() {
  return (
    <section className="page-section content-panel">
      <div className="section-header">
        <div>
          <p className="section-kicker">J-MAF</p>
          <h3>Vision connected to adaptive fusion</h3>
        </div>
      </div>
      <div className="fusion-grid">
        {[
          ['Vision Risk', '0.72', '0.32'],
          ['Vibration Risk', '0.64', '0.28'],
          ['Temperature Risk', '0.31', '0.12'],
          ['Load Risk', '0.48', '0.18'],
          ['Other', '0.19', '0.10'],
        ].map(([label, risk, weight]) => (
          <div className="fusion-card" key={label}>
            <strong>{label}</strong>
            <span>Risk: {risk}</span>
            <span>Weight: {weight}</span>
          </div>
        ))}
      </div>
      <div className="info-panel info-block">
        <p className="hypothesis-text">AI recommendations require qualified maintenance verification and do not autonomously execute safety-critical shutdowns.</p>
      </div>
    </section>
  )
}

function DocsPage() {
  return (
    <section className="page-section content-panel">
      <div className="section-header">
        <div>
          <p className="section-kicker">DOCUMENTATION</p>
          <h3>AI explainability and safety</h3>
        </div>
      </div>
      <div className="info-panel info-block">
        <h4>WHY THIS ALERT?</h4>
        <ol>
          <li>Vision anomaly — HIGH</li>
          <li>Vibration anomaly — HIGH</li>
          <li>Load variation — MEDIUM</li>
          <li>Temperature — LOW</li>
        </ol>
        <p><strong>Measured Evidence:</strong> real sensor signal deviations and YOLO confidence metrics.</p>
        <p><strong>AI-Generated Interpretation:</strong> decision-support summary only; not an engineering certification.</p>
      </div>
    </section>
  )
}

function App() {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <div className="beltcore-app">
      <div className="demo-banner">
        <span>DEMO ENVIRONMENT</span>
        <p>Simulation mode is clearly labeled and does not claim field validation.</p>
      </div>

      <header className="topbar">
        <div className="top-strip">
          <div className="top-strip-inner">
            <span>SMART INDIA HACKATHON 2026</span>
            <span>BELTCORE</span>
          </div>
        </div>

        <div className="main-header">
          <div className="brand-block">
            <div className="brand-mark">B</div>
            <div>
              <div className="brand-name">BELTCORE</div>
              <div className="brand-tag">AI-POWERED CONVEYOR HEALTH INTELLIGENCE</div>
            </div>
          </div>

          <nav className={`nav ${menuOpen ? 'open' : ''}`}>
            {navItems.map((item) => (
              <NavLink key={item.path} to={item.path} end={item.path === '/'}>{item.label}</NavLink>
            ))}
          </nav>

          <div className="header-actions">
            <button className="icon-button" aria-label="Search"><Search size={16} /></button>
            <button className="icon-button" aria-label="Notifications"><Bell size={16} /></button>
            <button className="primary-button small">Dashboard</button>
            <button className="menu-button" onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle menu"><Menu size={18} /></button>
          </div>
        </div>
      </header>

      <main className="page-shell">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/monitoring" element={<HomePage />} />
          <Route path="/ai-vision" element={<AIVisionPage />} />
          <Route path="/dataset" element={<DatasetPage />} />
          <Route path="/models" element={<ModelPage />} />
          <Route path="/project" element={<ProjectProfilePage />} />
          <Route path="/about" element={<ProjectProfilePage />} />
          <Route path="/passport" element={<PassportPage />} />
          <Route path="/jmaf" element={<JmafPage />} />
          <Route path="/docs" element={<DocsPage />} />
        </Routes>
      </main>

      <footer className="site-footer">
        <div className="footer-grid">
          <div>
            <h4>BELTCORE</h4>
            <p>Event-Synchronized Multimodal Edge AI</p>
            <p>Project: Smart India Hackathon 2026</p>
            <p>Prototype developed for SIH 2026.</p>
          </div>
          <div>
            <h5>Project</h5>
            <ul>
              <li>Monitoring</li>
              <li>Documentation</li>
              <li>Architecture</li>
            </ul>
          </div>
          <div>
            <h5>API</h5>
            <ul>
              <li>/conveyors</li>
              <li>/joints</li>
              <li>/ai/inference</li>
            </ul>
          </div>
          <div>
            <h5>About</h5>
            <ul>
              <li>AI recommendations require maintenance verification.</li>
              <li>Prototype only; not official ministry website.</li>
            </ul>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default App
