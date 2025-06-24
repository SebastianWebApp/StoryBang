import re
from typing import Dict, Tuple, List
from ..domain.text_processor import TextProcessor

class RegexTextProcessor(TextProcessor):
    def protect_tags(self, text: str) -> Tuple[str, Dict[str, str]]:
        tags = re.findall(r'\[.*?\]', text)
        replacements = {}
        for i, tag in enumerate(tags):
            marker = f"12{i}57"
            replacements[marker] = tag
            text = text.replace(tag, marker)
        return text, replacements

    def restore_tags(self, text: str, replacements: Dict[str, str]) -> str:
        for marker, tag in replacements.items():
            text = text.replace(marker, tag)
        return text

    def split_into_sections(self, text: str, max_tokens: int) -> List[str]:
        clean = text.replace('\n\n', '.')
        lines = clean.split('.')
        result = []
        current_text = ""
        current_length = 0

        for i, phrase in enumerate(lines):
            if i == 0:
                result.append(phrase)
                continue

            if len(phrase) + current_length <= max_tokens:
                current_text = current_text + " " + phrase
                current_length = current_length + len(phrase)
            else:
                result.append(current_text)
                current_text = phrase
                current_length = len(phrase)

        if current_text:
            result.append(current_text)
        return result

    def format_result(self, text: str) -> str:
        text = re.sub(r'(\[Content\s*\d+\])', r'\n\n\1', text)
        text = re.sub(r'(\[Content\])', r'\n\n\1', text)
        text = re.sub(r'(?<!\n)(\[Option\s*\d+\])', r'\n\n\1', text)
        text = re.sub(r'(?<!\n)(\[Option\s*\d+\s+Content\])', r'\n\n\1', text)
        text = re.sub(r'(?<!\n)(\[Option\s*\d+\s+(Continuing from chosen option)\])', r'\n\n\1', text)
        return text