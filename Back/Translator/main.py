from flask import Flask, request
from flask_cors import CORS
from dotenv import load_dotenv
import os

from src.infrastructure.nllb_translator_service import NLLBTranslatorService
from src.infrastructure.regex_text_processor import RegexTextProcessor
from src.api.translation_controller import TranslationController

# Carga variables de entorno desde .env
load_dotenv()

def create_app():
    app = Flask(__name__)

    allowed_origins = os.getenv("CORS_ORIGIN", "")
    origins = [origin.strip() for origin in allowed_origins.split(",") if origin.strip()]

    # Configurar CORS con orígenes dinámicos
    cors = CORS(app, origins=origins, supports_credentials=True)

    # Initialize services
    translator_service = NLLBTranslatorService()
    text_processor = RegexTextProcessor()

    # Initialize controller
    translation_controller = TranslationController(translator_service, text_processor)
    
    # Register blueprints
    app.register_blueprint(translation_controller.blueprint)

    return app

if __name__ == "__main__":
    port = int(os.getenv("PORT", 4020))
    app = create_app()
    app.run(host="0.0.0.0", port=port)
