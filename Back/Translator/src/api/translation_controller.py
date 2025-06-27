from flask import Blueprint, request, jsonify
from ..domain.translator_service import TranslatorService
from ..domain.text_processor import TextProcessor

class TranslationController:
    def __init__(self, translator_service: TranslatorService, text_processor: TextProcessor):
        self.translator_service = translator_service
        self.text_processor = text_processor
        self.blueprint = Blueprint('translator', __name__)
        self.setup_routes()

    def setup_routes(self):
        self.blueprint.route('/translate', methods=['POST'])(self.translate)

    def translate(self):
        data = request.json
        text = data.get("Text", "")
        target_language = data.get("Tgt_lang", "")

        if not text:
            return jsonify({"error": "No text provided", "Status": False}), 400

        try:
            # Proteger etiquetas
            protected_text, replacements = self.text_processor.protect_tags(text)

            # Dividir en secciones
            chunks = self.text_processor.split_into_sections(protected_text, 200)

            # Traducir todas las secciones
            translated_chunks = self.translator_service.translate_batch(chunks, target_language)

            # Unir las traducciones
            full_translation = " ".join(translated_chunks)

            # Restaurar etiquetas y formatear
            result = self.text_processor.restore_tags(full_translation, replacements)
            formatted_result = self.text_processor.format_result(result)

            print(formatted_result)
            return jsonify({"Content": formatted_result, "Status": True})

        except Exception as e:
            return jsonify({"error": str(e), "Status": False}), 500