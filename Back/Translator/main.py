from flask import Flask
from flask_cors import CORS
from src.infrastructure.nllb_translator_service import NLLBTranslatorService
from src.infrastructure.regex_text_processor import RegexTextProcessor
from src.api.translation_controller import TranslationController

def create_app():
    app = Flask(__name__)
    CORS(app)

    # Initialize services
    translator_service = NLLBTranslatorService()
    text_processor = RegexTextProcessor()

    # Initialize controller
    translation_controller = TranslationController(translator_service, text_processor)
    
    # Register blueprints
    app.register_blueprint(translation_controller.blueprint)

    return app

if __name__ == "__main__":
    app = create_app()
    app.run(host="0.0.0.0", port=4020)