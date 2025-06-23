from dataclasses import dataclass
from typing import Optional

@dataclass
class Story:
    content: str
    audience_type: str
    prompt: str
    status: bool = True
    error: Optional[str] = None

    @staticmethod
    def create_error(message: str) -> 'Story':
        return Story(
            content='',
            audience_type='',
            prompt='',
            status=False,
            error=message
        )