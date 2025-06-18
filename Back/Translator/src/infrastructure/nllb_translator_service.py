from typing import List
import torch
from transformers import AutoTokenizer, AutoModelForSeq2SeqLM
from ..domain.translator_service import TranslatorService

class NLLBTranslatorService(TranslatorService):
    def __init__(self, model_id: str = "facebook/nllb-200-distilled-600M"):
        self.tokenizer = AutoTokenizer.from_pretrained(model_id)
        self.model = AutoModelForSeq2SeqLM.from_pretrained(model_id)

    def translate(self, text: str, target_language: str) -> str:
        inputs = self.tokenizer(text, return_tensors="pt", padding=True, truncation=True)
        inputs["forced_bos_token_id"] = self.tokenizer.convert_tokens_to_ids(target_language)

        with torch.no_grad():
            outputs = self.model.generate(**inputs, max_length=1000)

        return self.tokenizer.decode(outputs[0], skip_special_tokens=True)

    def translate_batch(self, texts: List[str], target_language: str) -> List[str]:
        translations = []
        for text in texts:
            translated = self.translate(text, target_language)
            translations.append(translated)
        return translations