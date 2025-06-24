import { Mongo_Story } from "../Config/mongo.config.js";

export class UserService {
  async character_process(Filter) {

    const result = await Mongo_Story.find(Filter)
      .sort({ createdAt: -1 })
      .limit(20);

    const processed = result.map(doc => {
      const storyList = doc.Content?.Storys || [];

      var Document = [];

      let Title = "Untitled";
      if (storyList[0].Story.includes("Title: ")) {
        const Content_Story = storyList[0].Story.split(/\[Content(?: \d*)?\]:\s*/);
        Title = Content_Story[0].replace("Title: ", "").trim();
      }

      storyList.map(storyItem => {
        const {Language} = storyItem;       

        Document.push(Language);
        
      });

      return {
          id: doc._id, 
          Title,
          Language: Document,
          createdAt: doc.createdAt
      };

    });

    return processed.flat(); // flatten to have a single list
  }
}
