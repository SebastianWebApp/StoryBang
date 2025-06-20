import {Mongo_Story} from "../Config/mongo.config.js";  

export class UserService {

    async character_process(Id_Story, Content) {   


        const result = await Mongo_Story.findByIdAndUpdate(
            Id_Story ,
            {                   
                Content:Content  
            },{
            new: true
        });
    }
}