import { messages_user } from '/js/messages_user.js';  
const socket = io(messages_user); // Utiliza la IP de tu máquina en la red local
let Id = localStorage.getItem("Id");
var Type = "";
let List_Character = [];
let List_Description = [];
let List_Name = [];
let List_Selected = [];
let Filter = {
    User_Id: Id
};
var retryAttempts = 0;
const maxRetries = 5;
var responseReceived = false;
var retryInterval = 3000; // 5 seconds
var message_information = true;
let selectedModel = '';

let Storys = [];

if(Id == null || Id == ""){
    localStorage.removeItem('Id');
    window.location.href = "/expired_session";
}


Read_Character();

async function Read_Character(){

    await socket.emit('joinRoom', Id+"_Read_Character");
    Type = "Read_Character";

    try {
        const Request = await fetch(`api/router_character/Read_Character`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                Id: Id,
                Filter: Filter
            })
        });


        const Server_Response = await Request.json();

        if(Server_Response.Status == false){
            return Read_Character();
        }
        
        if(message_information){
            Notification(Server_Response.Response);
            message_information = false;
        }
        
           
        setTimeout(() => {
            if(!responseReceived && retryAttempts < maxRetries) {
                retryAttempts++;
                Read_Character(); // Retry the request
            }else if (retryAttempts >= maxRetries){
                Notification("Error loading information, we will try again.");
                location.reload();
            }
        }, retryInterval);

    } catch (error) {

        return Read_Character();
    }

    

}


document.addEventListener("DOMContentLoaded", () => {
    // Buscar el botón con data-model="grok"
    const defaultGrokButton = document.querySelector('.model-btn[data-model="grok"]');
    if (defaultGrokButton) {
        defaultGrokButton.click(); // Simular clic en "grok"
    }
});


// Model selection
const modelButtons = document.querySelectorAll('.model-btn');
modelButtons.forEach(button => {
    button.addEventListener('click', () => {
        modelButtons.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');
        selectedModel = button.dataset.model;

        if(selectedModel == "grok"){
            document.getElementById("lenght_selection").style.display = "block";
            document.getElementById("learning_values").style.display = "block";  
            document.getElementById("interactive_option").style.display = "block";  
            document.getElementById("gender_selection").style.display = "block"; 
            document.getElementById("interactive_option").style.display = "none";  
            document.getElementById("storyPromptSection").style.display = "block";
        }
        else if(selectedModel == "gpt2"){
            document.getElementById("lenght_selection").style.display = "none";
            document.getElementById("learning_values").style.display = "none";       
            document.getElementById("interactive_option").style.display = "none";  
            document.getElementById("gender_selection").style.display = "none"; 
            document.getElementById("storyPromptSection").style.display = "none";
        }
        else{
            document.getElementById("gender_selection").style.display = "block"; 
            document.getElementById("lenght_selection").style.display = "none";
            document.getElementById("learning_values").style.display = "none";       
            document.getElementById("interactive_option").style.display = "none";  
            document.getElementById("storyPromptSection").style.display = "none";
        }

    });
});


const select = document.getElementById("translator");
select.addEventListener("change", function () {
    const selectedText = select.options[select.selectedIndex].value;

    var Exist = false;
    for (let index = 0; index < Storys.length; index++) {
        if(Storys[index].Language == selectedText){
            document.getElementById("P_Text").innerText = Storys[index].Story;
            Exist = true;
            break;
        }
    }

    if(!Exist){
        Translate(Storys[0].Story, selectedText);
    }    
});


function addToGallery(imageSrc, name, Character, Description) {
        const gallery = document.getElementById('character-gallery');

        const item = document.createElement('div');
        item.className = 'gallery-item';
        item.addEventListener('click', () => {

            if(List_Selected.includes(Character)){

                var posicion = List_Selected.indexOf(Character);
                List_Selected.splice(posicion, 1);
                List_Description.splice(posicion, 1);  
                List_Name.splice(posicion, 1);
                item.classList.toggle('selected');                          
                
            }
            else{

                // if(List_Selected.length == 2){
                //     Notification("You can only select up to 2 characters");                    
                // }
                // else{
                //     List_Selected.push(Character);
                //     List_Description.push(Description);
                //     List_Name.push(name);
                //     item.classList.toggle('selected');            
                // }  
                
                List_Selected.push(Character);
                List_Description.push(Description);
                List_Name.push(name);
                item.classList.toggle('selected');    
            }

        });
                
        const img = document.createElement('img');
        img.src = imageSrc;
        
        const nameLabel = document.createElement('div');
        nameLabel.className = 'character-name';
        nameLabel.textContent = name;

        
        item.appendChild(img);
        item.appendChild(nameLabel);
        gallery.insertBefore(item, gallery.firstChild);
}

// Function to get selected checkbox values
function getSelectedValues() {
    // Query all checked checkboxes within .values-checkboxes
    const selectedCheckboxes = document.querySelectorAll('.values-checkboxes input[type="checkbox"]:checked');
            
    // Map the checked checkboxes to their values
    const selectedValues = Array.from(selectedCheckboxes).map(checkbox => checkbox.value);
            
    return selectedValues;
}


async function Translate(Text, Language){
    try {

            document.getElementById("loading").style.display = "inline-block";     
            document.getElementById("container").style.display = "none";   

            const Request = await fetch(`api/router_generator/Translate`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    Text: Text,
                    Tgt_lang: Language
                })
            });

            const Server_Response = await Request.json();
            
            document.getElementById("loading").style.display = "none";     
            document.getElementById("container").style.display = "flex";

            if(Server_Response.Status == true){
                document.getElementById("P_Text").innerText = Server_Response.Response;

                Storys.push({
                    Story: Server_Response.Response,
                    Language: Language
                })
            }       
            else{
                Notification(Server_Response.Response);
            }
            

        } catch (error) {
            Notification("Failed to create character. Please try again.");
            document.getElementById("loading").style.display = "none";     
            document.getElementById("container").style.display = "flex";
        }
}


document.getElementById("generateHistory").addEventListener('click', async() => {

    Storys = [];
    var audience = document.getElementById("audience").value;
    var genre = document.getElementById("genre").value;
    var lenght_story = document.getElementById("lenght_story").value;
    var gender = document.getElementById("gender").value;
    var storyPrompt = document.getElementById("storyPrompt").value;
    const isInteractiveSelected = document.getElementById('interactive').checked;
    const selectedValues = getSelectedValues();
    var Prompt = "";
    var Textarea_Promt = "";
    document.getElementById("translator").value = "eng_Latn";

    if(audience == "Children aged 7 to 9"){
        Textarea_Promt = "Audience: " + audience;
        audience = "children";
    }

    else if(audience == "Children aged 10 to 12"){
        Textarea_Promt = "Audience: " + audience;
        audience = "children";
    }

    else if(audience == "Teenagers aged 13 to 15"){
        Textarea_Promt = "Audience: " + audience;
        audience = "young";
    }

    else if(audience == "Teenagers aged 16 to 17"){
        Textarea_Promt = "Audience: " + audience;
        audience = "young";
    }

   


    if(selectedModel == "" ){
        Notification("Select a model");
        return;
    }    


    if(selectedModel == "grok"){

        if(isInteractiveSelected){

        Prompt = ``;


        }
        else{

            Prompt = `Create a complete and finished story for the following audience: ${audience}

Conditions:
- Main characters: ${List_Name}
- Story genre: ${genre}
- Values to convey: ${selectedValues}
- Target gender of the content: ${gender}
- Additional instructions: ${storyPrompt+ " "+Textarea_Promt}
- Number of paragraphs: ${lenght_story}

Remember:
- Each paragraph should begin with the [Content] tag.
- The story title should begin with the [Title] tag.
- The story must have a clear beginning, middle, and end.
`;
        
        }


        try {

            await socket.emit('joinRoom', Id+"_Grok_Text_Generator");

            Type = "Grok_Text_Generator";

            const Request = await fetch(`api/router_generator/Grok_Text_Generator`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    Id: Id,
                    Prompt: Prompt,
                    Audience: audience
                })
            });

            const Server_Response = await Request.json();

            Notification(Server_Response.Response);

            if(Server_Response.Status == true){
                document.getElementById("loading").style.display = "inline-block";     
                document.getElementById("container").style.display = "none";                  
            }       
            

        } catch (error) {
            Notification("Failed to create character. Please try again.");
        }

    }

    else{

        var model_gpt2 = "";
        if(selectedModel == "gpt2"){
            Prompt = `Write a short story in the ${genre} genre where the protagonists are ${List_Name}.`
            model_gpt2 = "Gpt2_Text_Generator";
        }
        else{
            Prompt = `### Prompt: Write a short story in the genre ${genre} for a ${gender} where the protagonists are ${List_Name}.
            ### Genre: ${genre}
            ### Story:

            `
            model_gpt2 = "Gpt2Medium_Text_Generator";
        }

        
        try {

            document.getElementById("loading").style.display = "inline-block";     
            document.getElementById("container").style.display = "none";   

            const Request = await fetch(`api/router_generator/${model_gpt2}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    Prompt: Prompt,
                    Audience: audience
                })
            });

            const Server_Response = await Request.json();
            
            document.getElementById("loading").style.display = "none";     
            document.getElementById("container").style.display = "flex";
            if(Server_Response.Status == true){
                document.getElementById("P_Text").innerText = Server_Response.Response;
                document.getElementById("translator").style.display = "block";    
                document.getElementById("createStory").style.display = "block";  
                           
                Storys.push({
                    Story: Server_Response.Response.replace("\n\n", ""),
                    Language: "eng_Latn"
                })                
            }       
            else{
                Notification(Server_Response.Response);
            }
            

        } catch (error) {
            Notification("Failed to create character. Please try again.");
            document.getElementById("loading").style.display = "none";     
            document.getElementById("container").style.display = "flex";
        }
    }

    



});

document.getElementById("createStory").addEventListener('click', async() =>{

    if(Storys.length == 0){
        Notification("No story has been created to continue.");
        return;
    }
    
    localStorage.setItem("Story", JSON.stringify(Storys));
    localStorage.setItem("Name", JSON.stringify(List_Name));
    localStorage.setItem("Description", JSON.stringify(List_Description));
    location.href = "/wait";

});




socket.on('Profile_Response', async (data) => { 

     if(data.Status && Type == "Read_Character"){
        
        responseReceived = true;

        for (let i = 0; i < data.Message.length; i++) {
            const character = data.Message[i];
            const imageSrc = character.Image ;
            const name = character.Name;
            var Description = character.Description;
            var Id_Character = character._id; 

            if(!List_Character.includes(Id_Character)){
                List_Character.push(Id_Character);
                addToGallery(imageSrc, name,Id_Character, Description);
            }

        }

        if(data.Message.length == 1){
            Filter._id = {$lt: Id_Character};
            return Read_Character();
        }
        else{
            document.getElementById("container").style.display = "flex";
            document.getElementById("loading").style.display = "none";
        }


    }
    else if (data.Status == false && Type == "Read_Character") {
        return Read_Character();
    }
    else if (data.Status && Type == "Grok_Text_Generator"){

        Storys.push({
            Story: data.Message,
            Language: "eng_Latn"
        })
        document.getElementById("translator").style.display = "block"; 
        document.getElementById("createStory").style.display = "block";                         
        document.getElementById("P_Text").innerText = data.Message;
        document.getElementById("container").style.display = "flex";
        document.getElementById("loading").style.display = "none";
    }
    else if (data.Status == false && Type == "Grok_Text_Generator"){
        Notification(data.Message);
        document.getElementById("container").style.display = "flex";
        document.getElementById("loading").style.display = "none";
    }
   
});



async function Notification(Text){
    scrollTo(0, 0);

    document.getElementById("Div_Notification").style.display = "inline-flex";
    document.getElementById("Notification").innerHTML = Text;  

    await new Promise(resolve => setTimeout(resolve, 1000)); // Espera 10 segundos
    document.getElementById("Div_Notification").style.display = "none";
}