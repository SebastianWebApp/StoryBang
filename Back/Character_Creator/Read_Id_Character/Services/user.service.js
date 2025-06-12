import {Mongo_Character} from "../Config/mongo.config.js";  

export class UserService {

    async character_process(Id_Character) {   
        const result = await Mongo_Character.findById(Id_Character);
        return result;
    }
}