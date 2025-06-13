import {Mongo_Character} from "../Config/mongo.config.js";  

export class UserService {

    async character_process(Id_Character, Name, Description, Image, Image_Real) {   


        const result = await Mongo_Character.findByIdAndUpdate(
            Id_Character ,
            {                   
                Name: Name,
                Description:Description,
                Image:Image,
                Image_Real:Image_Real
            },{
            new: true
        });
    }
}