from abc import ABC, abstractmethod
from typing import Dict, Tuple, List

class TextProcessor(ABC):
    @abstractmethod
    def protect_tags(self, text: str) -> Tuple[str, Dict[str, str]]:
        pass

    @abstractmethod
    def restore_tags(self, text: str, replacements: Dict[str, str]) -> str:
        pass

    @abstractmethod
    def split_into_sections(self, text: str, max_tokens: int) -> List[str]:
        pass

    @abstractmethod
    def format_result(self, text: str) -> str:
        pass