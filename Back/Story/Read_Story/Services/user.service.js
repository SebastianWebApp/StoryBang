import { Mongo_Story } from "../Config/mongo.config.js";

export class UserService {
  async character_process(Filter) {

    const result = await Mongo_Story.find(Filter)
      .sort({ createdAt: -1 })
      .limit(10);

    const processed = result.map(doc => {
      const storyList = doc.Content?.Storys || [];

      return storyList.map(storyItem => {
        const { Story, Language } = storyItem;

        let Title = "Untitled";
        if (Story.includes("Title: ")) {
          const Content_Story = Story.split(/\[Content(?: \d*)?\]:\s*/);
          Title = Content_Story[0].replace("Title: ", "").trim();
        }

        return {
          Title,
          Language,
          createdAt: doc.createdAt
        };
      });
    });

    return processed.flat(); // flatten to have a single list
  }
}
