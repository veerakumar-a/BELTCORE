import { describe, expect, it } from 'vitest'
import { calculateJhi, classifyRisk, isUnknownState, computeScenarioMetrics } from './health'

describe('BELTCORE health logic', () => {
  it('calculates a JHI score from multimodal evidence', () => {
    const result = calculateJhi({
      vibration: 82,
      temperature: 70,
      load: 60,
      acoustic: 68,
      vision: 76,
      confidence: 92,
    })

    expect(result).toBeGreaterThan(0)
    expect(result).toBeLessThanOrEqual(100)
    expect(result).toBeTypeOf('number')
  })

  it('classifies high-risk states with explicit labels', () => {
    expect(classifyRisk(32, 88)).toBe('CRITICAL')
    expect(classifyRisk(58, 91)).toBe('HIGH RISK')
    expect(classifyRisk(72, 90)).toBe('DEGRADING')
    expect(classifyRisk(89, 93)).toBe('WATCH')
  })

  it('returns UNKNOWN when confidence is insufficient or sensor data is unavailable', () => {
    expect(isUnknownState(0.48, true, 0.4)).toBe(true)
    expect(isUnknownState(0.82, false, 0.25)).toBe(true)
    expect(isUnknownState(0.82, true, 0.25)).toBe(false)
  })

  it('maps scenarios to realistic telemetry', () => {
    const healthy = computeScenarioMetrics('HEALTHY')
    const crack = computeScenarioMetrics('CRACK DETECTED')

    expect(healthy.jhi).toBeGreaterThan(80)
    expect(crack.jhi).toBeLessThan(healthy.jhi)
    expect(crack.alerts.length).toBeGreaterThan(0)
  })
})
