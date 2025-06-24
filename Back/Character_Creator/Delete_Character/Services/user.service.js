import {Mongo_Character} from "../Config/mongo.config.js";  

export class UserService {

    async character_process(Id_Character) { 
        
        const resultado = await Mongo_Character.findByIdAndDelete(Id_Character);      
    }
}