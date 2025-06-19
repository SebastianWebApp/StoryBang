import {Mongo_Story} from "../Config/mongo.config.js";  

export class UserService {

    async character_process(Id, Content) {   
        const resultado = await Mongo_Story.create({
            Id: Id,
            Content:Content            
        });

        await resultado.save();
    }
}