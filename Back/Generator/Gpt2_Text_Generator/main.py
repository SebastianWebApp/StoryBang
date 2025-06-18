from flask import Flask
from flask_cors import CORS
from src.infrastructure.gpt2_story_generator import GPT2StoryGenerator
from src.api.story_controller import StoryController

def create_app():
    app = Flask(__name__)
    CORS(app)

    # Initialize services
    checkpoint_path = "./story_model/checkpoint-6108"
    story_generator = GPT2StoryGenerator(checkpoint_path)

    # Initialize controllers
    story_controller = StoryController(story_generator)
    
    # Register blueprints
    app.register_blueprint(story_controller.blueprint)

    return app

if __name__ == "__main__":
    app = create_app()
    app.run(host="0.0.0.0", port=4019)