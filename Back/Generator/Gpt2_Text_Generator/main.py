# from flask import Flask
# from flask_cors import CORS
# from src.infrastructure.gpt2_story_generator import GPT2StoryGenerator
# from src.api.story_controller import StoryController

# def create_app():
#     app = Flask(__name__)
#     CORS(app)

#     # Initialize services
#     checkpoint_path = "./story_model"
#     story_generator = GPT2StoryGenerator(checkpoint_path)

#     # Initialize controllers
#     story_controller = StoryController(story_generator)
    
#     # Register blueprints
#     app.register_blueprint(story_controller.blueprint)

#     return app

# if __name__ == "__main__":
#     app = create_app()
#     app.run(host="0.0.0.0", port=4019)


from flask import Flask
from flask_cors import CORS
from dotenv import load_dotenv
import os

from src.infrastructure.gpt2_story_generator import GPT2StoryGenerator
from src.api.story_controller import StoryController

# Carga variables de entorno desde .env
load_dotenv()

def create_app():
    app = Flask(__name__)

    allowed_origins = os.getenv("CORS_ORIGIN", "")
    origins = [origin.strip() for origin in allowed_origins.split(",") if origin.strip()]

    CORS(app, origins=origins, supports_credentials=True)

    checkpoint_path = "./story_model"
    story_generator = GPT2StoryGenerator(checkpoint_path)

    story_controller = StoryController(story_generator)
    app.register_blueprint(story_controller.blueprint)

    return app

if __name__ == "__main__":
    port = int(os.getenv("PORT", 4019))
    app = create_app()
    app.run(host="0.0.0.0", port=port)
