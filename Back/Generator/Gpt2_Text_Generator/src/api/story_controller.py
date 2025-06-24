from flask import Blueprint, request, jsonify
from ..domain.story_generator import StoryGenerator

class StoryController:
    def __init__(self, story_generator: StoryGenerator):
        self.story_generator = story_generator
        self.blueprint = Blueprint('story', __name__)
        self.setup_routes()

    def setup_routes(self):
        self.blueprint.route('/generate_story', methods=['POST'])(self.generate_story)

    def generate_story(self):
        data = request.json
        prompt = data.get("Prompt", "")
        audience = data.get("Audience", "")

        story = self.story_generator.generate(prompt, audience)

        if not story.status:
            return jsonify({"error": story.error}), 400

        return jsonify({
            "Status": story.status,
            "Content": f"[Content]: {story.content}"
        })