import { messages_user } from '/js/messages_user.js';  
const socket = io(messages_user); // Utiliza la IP de tu máquina en la red local
let Id = localStorage.getItem("Id");
var Type = "";
let List_Character = [];
let List_Description = [];
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
                item.classList.toggle('selected');                          
                
            }
            else{

                if(List_Selected.length == 2){
                    Notification("You can only select up to 2 characters");                    
                }
                else{
                    List_Selected.push(Character);
                    List_Description.push(Description);
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
    const isInteractiveSelected = document.getElementById('interactive').checked;
    const selectedValues = getSelectedValues();


    if(selectedModel == "" ){
        Notification("Select a model");
        return;
    }


    console.log(selectedModel);
    console.log(audience);
    console.log(genre);
    console.log(isInteractiveSelected);
    console.log(selectedValues);   
    console.log(List_Description)

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
   
});



async function Notification(Text){
    scrollTo(0, 0);

    document.getElementById("Div_Notification").style.display = "inline-flex";
    document.getElementById("Notification").innerHTML = Text;  

    await new Promise(resolve => setTimeout(resolve, 1000)); // Espera 10 segundos
    document.getElementById("Div_Notification").style.display = "none";
}