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




// Model selection
const modelButtons = document.querySelectorAll('.model-btn');
modelButtons.forEach(button => {
    button.addEventListener('click', () => {
        modelButtons.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');
        selectedModel = button.dataset.model;
    });
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

                if(List_Selected.length == 2){
                    Notification("You can only select up to 2 characters");                    
                }
                else{
                    List_Selected.push(Character);
                    List_Description.push(Description);
                    List_Name.push(name);
                    item.classList.toggle('selected');            
                }                
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





document.getElementById("generateHistory").addEventListener('click', async() => {

    var audience = document.getElementById("audience").value;
    var genre = document.getElementById("genre").value;
    var Textarea_Promt = document.getElementById("Textarea_Promt").value;
    var lenght_story = document.getElementById("lenght_story").value;
    const isInteractiveSelected = document.getElementById('interactive').checked;
    const selectedValues = getSelectedValues();
    var Prompt = "";

    if(selectedModel == "" ){
        Notification("Select a model");
        return;
    }

    if(isInteractiveSelected){

        Prompt = `Create a complete and finished story for ${audience} with the following conditions:

Main characters:
${List_Name}

Story genre: ${genre}

Values to learn: ${selectedValues}

Additional instructions: ${Textarea_Promt}

Each paragraph should be a coherent reading block or "chunk".

The story should consist of ${lenght_story} paragraphs, each approximately 200 tokens in length.

At certain points in the story, important decisions must be made. When a decision is presented:

You must show both options with their corresponding labels:
[Option 1]: The protagonist's first decision with its consequence.
[Option 2]: The protagonist's second decision with its consequence.

After showing both options, you must generate two separate paragraphs, one for each decision:
[Option 1 Content]: Paragraph that continues if option 1 is chosen.
[Option 2 Content]: Paragraph that continues if option 2 is chosen.

You must not show both branches at the same time later in the story.
Once a decision is made, the story must continue only with the chosen option and leave the other option unfinished.

Always use the following labels to structure the story:
[Title]: General title of the story.
[Content]: Before each paragraph in the story.
[Option 1] and [Option 2]: Only where there are decisions, before each possible path.
[Option 1 Content]: Before the following paragraph if Option 1 is chosen.
[Option 2 Content]: Before the following paragraph if Option 2 is chosen. `;


    }
    else{

        Prompt = `Create a complete and finished story for ${audience} with the following conditions:

Main characters:
${List_Name}

Story genre: ${genre}

Values to learn: ${selectedValues}

Additional instructions: ${Textarea_Promt}

Each paragraph should be a coherent reading block or "chunk".

The story should consist of ${lenght_story} paragraphs, each approximately 200 tokens in length.

The story must have a well-defined beginning, middle, and end.  
Use the following tags to structure the story:  
[Title]: General title of the story.  
[Content]: Before each paragraph of the story.`;
    
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
        console.log(data.Message)
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