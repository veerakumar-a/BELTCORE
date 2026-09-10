from __future__ import annotations

from .llm_service import LLMService
from .prompt_engine import build_evidence_package


class ExplanationService:
    def __init__(self) -> None:
        self.llm = LLMService()

    def generate_explanation(self, payload: dict) -> dict:
        evidence = build_evidence_package(payload)
        return {
            'evidence': evidence,
            'summary': self.llm.build_summary(evidence),
            'provider_mode': self.llm.get_mode(),
            'safety_disclaimer': 'AI recommendations require qualified maintenance verification. BELTCORE does not autonomously execute safety-critical shutdowns.'
        }
