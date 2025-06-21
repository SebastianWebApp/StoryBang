import {Mongo_Character} from "../Config/mongo.config.js";  

export class UserService {

    async character_process(Filter) {  
            
        const result = await Mongo_Character.find(Filter)
        .sort({ createdAt: -1 }) // Descending order by date (most recent first).
        .limit(3); // Limit to 5 results.

        return result;    

    }
}