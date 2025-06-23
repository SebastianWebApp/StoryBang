from abc import ABC, abstractmethod
from typing import Dict
from .story import Story

class StoryGenerator(ABC):
    @abstractmethod
    def generate(self, prompt: str, audience: str) -> Story:
        pass

    @abstractmethod
    def get_generation_params(self, audience: str) -> Dict:
        pass

    @abstractmethod
    def format_output(self, content: str) -> str:
        pass