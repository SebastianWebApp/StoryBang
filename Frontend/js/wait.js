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


if(savedStory == null){
    location.href = "/story_creator"
}


var Story;
var Content = [];
var Complet = [];
var Complet_Number = [];
var Type = "Image";
var New_Story;

// Dividir en secciones y eliminar vacíos
Story = savedStory[0].Story
    .split(/\[Content(?: \d*)?\]:\s*/)
    .filter(s => s.trim() !== "");  // elimina vacíos o solo saltos

// Story = savedStory[0].Story.split(/\[Content(?: \d*)?\]:\s*/);
var index_n = 0;

if(savedStory[0].Story.includes("[Title]: ")){    
    index_n = 1;  
}

for (let index = index_n; index < Story.length; index++) {

    var Cap = Story[index] + "\n Character description: \n";

    for (let j = 0; j < savedName.length; j++) {
        if(Story[index].includes(savedName[j])){
            Cap = Cap + savedDescription[j] + "\n\n";
        }
    }

    Content.push(Cap);  
    await Image(index - index_n);     
}


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
        
    } catch (error) {
        return Image(Number);
    }

}


async function Create(Create_Story) {    

    await socket.emit('joinRoom', Id+"_Create_Story");
    Type = "Create";

    try {
        const Request = await fetch(`api/router_story/Create_Story`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                Id: Id,
                Content: Create_Story
            })
        });


        const Server_Response = await Request.json();

        if(Server_Response.Status == false){
            return Create(Create_Story);
        }
        
        Notification(Server_Response.Response);     

    } catch (error) {
        return Create(Create_Story);
    }


}



socket.on('Profile_Response', async (data) => { 


    if(Type == "Image"){

          if(data.Status == false){
            Image(data.Number);
        }

        if(data.Status && !Complet_Number.includes(data.Number)){
            Complet_Number.push(data.Number);
            Complet.push(data.Message);
        }
        

        if(Complet.length == Content.length){


            const sortedIndices = Complet_Number
                .map((value, index) => ({ value, index }))
                .sort((a, b) => a.value - b.value)
                .map(obj => obj.index);

            const OrderedComplet = sortedIndices.map(i => Complet[i]);

            New_Story = {

                Storys: savedStory,
                Image: OrderedComplet

            }

            Create(New_Story);
            
        }

    }
    else{
        if(data.Status == false){
            Create(New_Story);
        }
        else{
            Notification(data.Message);
            localStorage.removeItem("Story");
            localStorage.removeItem("Name");
            localStorage.removeItem("Description");
            localStorage.setItem('Id_Story', data.Number);
            location.href = "/story";
        }
    }

    
});




async function Notification(Text){
    scrollTo(0, 0);

    document.getElementById("Div_Notification").style.display = "inline-flex";
    document.getElementById("Notification").innerHTML = Text;  

    await new Promise(resolve => setTimeout(resolve, 1000)); // Espera 10 segundos
    document.getElementById("Div_Notification").style.display = "none";
}

