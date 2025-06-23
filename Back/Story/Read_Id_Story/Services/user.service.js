import {Mongo_Story} from "../Config/mongo.config.js";  

export class UserService {

    async character_process(Id_Character) {   
        const result = await Mongo_Story.findById(Id_Character);
        return result;
    }
}