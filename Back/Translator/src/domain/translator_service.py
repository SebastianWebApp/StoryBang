from abc import ABC, abstractmethod
from typing import List

class TranslatorService(ABC):
    @abstractmethod
    def translate(self, text: str, target_language: str) -> str:
        pass

    @abstractmethod
    def translate_batch(self, texts: List[str], target_language: str) -> List[str]:
        pass