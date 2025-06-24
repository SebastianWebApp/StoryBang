from typing import Dict
from transformers import AutoTokenizer, AutoModelForCausalLM
import torch
from ..domain.story_generator import StoryGenerator
from ..domain.story import Story


class GPT2StoryGenerator(StoryGenerator):
    def __init__(self, checkpoint_path: str):
        self.tokenizer = AutoTokenizer.from_pretrained(checkpoint_path)
        self.model = AutoModelForCausalLM.from_pretrained(checkpoint_path)
        self.audience_params = {
            "children": {
                "max_length": 500,
                "do_sample": True,
                "top_p": 0.9,
                "temperature": 1.0,
                "repetition_penalty": 1.2
            },
            "young": {
                "max_length": 500,
                "do_sample": True,
                "top_p": 0.7,
                "temperature": 0.7,
                "repetition_penalty": 1.2
            },
            "adult": {
                "max_length": 500,
                "do_sample": True,
                "top_p": 0.5,
                "temperature": 0.3,
                "repetition_penalty": 1.2
            }
        }

    def generate(self, prompt: str, audience: str) -> Story:
        if not prompt:
            return Story.create_error("No prompt provided")

        input_ids = self.tokenizer(prompt, return_tensors="pt").input_ids
        params = self.get_generation_params(audience)
        
        output = self.model.generate(
            input_ids=input_ids,
            pad_token_id=self.tokenizer.eos_token_id,
            **params
        )
        
        content = self.tokenizer.decode(output[0], skip_special_tokens=True)
        story_parts = content.split("Story:")
        formatted_content = self.format_output(story_parts[1] if len(story_parts) > 1 else story_parts[0])

        parts = formatted_content.split("### Story:")

        story_text = ""
        if len(parts) > 1:
            story_text = parts[1].strip()
        else:
            # Si no encuentra "### Story:", devuelve todo el texto generado
            story_text = formatted_content.strip()

        return Story(
            content=story_text,
            audience_type=audience,
            prompt=prompt
        )

    def get_generation_params(self, audience: str) -> Dict:
        return self.audience_params.get(audience.lower(), self.audience_params["adult"])

    def format_output(self, content: str, tokens_per_paragraph: int = 100) -> str:
        words = content.split()
        result = []
        counter = 0
        buffer = []

        for word in words:
            buffer.append(word)
            counter += 1

            if counter >= tokens_per_paragraph and word.endswith('.'):
                result.append(' '.join(buffer))
                buffer = []
                counter = 0

        if buffer:
            result.append(' '.join(buffer))

        return '\n\n[Content]: '.join(result)