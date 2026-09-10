from __future__ import annotations

import os


class LLMService:
    def __init__(self) -> None:
        self.provider = os.getenv('LLM_PROVIDER', 'DEMO').upper()
        self.model = os.getenv('LLM_MODEL', '')
        self.api_key = os.getenv('LLM_API_KEY', '')

    def get_mode(self) -> str:
        if not self.api_key and self.provider in {'LOCAL', 'API'}:
            return 'DEMO'
        return self.provider if self.provider in {'LOCAL', 'API', 'DISABLED', 'DEMO'} else 'DEMO'

    def build_summary(self, evidence: dict) -> str:
        if self.get_mode() == 'DISABLED':
            return 'LLM explanation disabled by configuration.'
        if self.get_mode() == 'DEMO':
            return (
                'Joint J-0042 is showing signs of degradation.\n'
                'Primary evidence:\n'
                '1. Vision anomaly detected\n'
                '2. Elevated vibration pattern\n'
                '3. Supporting load variation\n\n'
                'Recommended action:\n'
                'Schedule inspection of the splice during the next maintenance window.\n\n'
                'Confidence:\n'
                'Medium\n\n'
                'Note:\n'
                'This is an AI-generated decision-support summary and must be verified by qualified maintenance personnel.'
            )
        return f'LLM provider {self.provider} is configured for structured evidence explanation.'
