import { messages_user } from '/js/messages_user.js';  
const socket = io(messages_user); // Utiliza la IP de tu máquina en la red local

let Id = localStorage.getItem("Id");

if(Id == null || Id == ""){
    localStorage.removeItem('Id');
    window.location.href = "/expired_session";
}

await socket.emit('joinRoom', Id+"_Grok_Image_Generator");

const savedStory = JSON.parse(localStorage.getItem("Story"));
const savedName = JSON.parse(localStorage.getItem("Name"));
const savedDescription = JSON.parse(localStorage.getItem("Description"));

var Title = "";
var Story;
var Content = [];

Story = savedStory[0].Story.split(/\[Content(?: \d*)?\]:\s*/);

if(savedStory[0].Story.includes("[Title]: ")){    
    Title = Story[0];
}

for (let index = 1; index < Story.length; index++) {

    var Cap = Story[index] + "\n Character description: \n";

    for (let j = 0; j < savedName.length; j++) {
        if(Story[index].includes(savedName[j])){
            Cap = Cap + savedDescription[j] + "\n\n";
        }
    }

    Content.push(Cap);       
}

// Image(0);

async function Image(Number) {    

    try {
        const Request = await fetch(`api/router_generator/Grok_Image_Generator`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                Id: Id,
                Number: Number,
                Prompt: Content[Number]
            })
        });


        const Server_Response = await Request.json();

        if(Server_Response.Status == false){
            return Image(Number);
        }
        
        console.log(Number)

        if(Content.length != Number){
            Image(Number + 1);
        }        

    } catch (error) {
        return Image(Number);
    }

}


// async function Create(Number) {    

//     try {
//         const Request = await fetch(`api/router_story/Create_Story`, {
//             method: "POST",
//             headers: {
//                 "Content-Type": "application/json"
//             },
//             body: JSON.stringify({
//                 Id: Id,
//                 Content: Content[Number]
//             })
//         });


//         const Server_Response = await Request.json();

//         if(Server_Response.Status == false){
//             return Create();
//         }
        
//         Notification(Server_Response.Response);     

//     } catch (error) {
//         return Create();
//     }


// }



socket.on('Profile_Response', async (data) => { 

    console.log(data);
    
});




async function Notification(Text){
    scrollTo(0, 0);

    document.getElementById("Div_Notification").style.display = "inline-flex";
    document.getElementById("Notification").innerHTML = Text;  

    await new Promise(resolve => setTimeout(resolve, 1000)); // Espera 10 segundos
    document.getElementById("Div_Notification").style.display = "none";
}

