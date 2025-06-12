import {Mongo_Character} from "../Config/mongo.config.js";  

export class UserService {

    async character_process(User_Id, Name, Description, Image) {   
        const resultado = await Mongo_Character.create({
            Name: Name,
            Description:Description,
            Image:Image,
            User_Id:User_Id
        });

        await resultado.save();
    }
}