import { messages_user } from '/js/messages_user.js';  
const socket = io(messages_user); // Utiliza la IP de tu máquina en la red local
var Type = "";
let Base64Image;
let Description = "";
let Image = "";
let Image_Real = "";
let Last_Id;
let Id_Character;

var retryAttempts = 0;
const maxRetries = 5;
var responseReceived = false;
var retryInterval = 3000; // 5 seconds
var message_information = true;

let Id = localStorage.getItem("Id");
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
                Filter: {
                    User_Id: Id             
                }
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

        return Read_User();
    }

    

}



document.addEventListener('DOMContentLoaded', () => {
    const uploadArea = document.getElementById('upload-area');
    const fileInput = document.getElementById('file-input');
    
    // Manejar la subida de archivos
    uploadArea.addEventListener('click', () => {
        fileInput.click();
    });
    
    uploadArea.addEventListener('dragover', (e) => {
        e.preventDefault();
        uploadArea.style.borderColor = '#3498db';
    });
    
    uploadArea.addEventListener('dragleave', () => {
        uploadArea.style.borderColor = '#ddd';
    });
    
    uploadArea.addEventListener('drop', (e) => {
        e.preventDefault();
        uploadArea.style.borderColor = '#ddd';
        const files = e.dataTransfer.files;
        handleFile(files[0]);
    });
    
    fileInput.addEventListener('change', (e) => {
        handleFile(e.target.files[0]);
    });
    
    function handleFile(file) {

        const MAX_SIZE_MB = 0.5; // Tamaño máximo permitido
        const MAX_SIZE_BYTES = MAX_SIZE_MB * 1024 * 1024; // 0.5 MB en bytes

        // Validar tamaño
        if (file.size > MAX_SIZE_BYTES) {
            Notification("The selected file exceeds the maximum allowed size of 5 MB.");
            return;
        }

        if (file && file.type.startsWith('image/')) {
            const reader = new FileReader();
            reader.onload = (e) => {
                const img = document.createElement('img');
                img.src = e.target.result;
                img.id = 'uploaded_image';
                uploadArea.innerHTML = '';
                uploadArea.appendChild(img);
                img.style.width = '100%';
                img.style.height = '100%';
                img.style.objectFit = 'contain';  
                Base64Image = e.target.result;              
            };
            reader.readAsDataURL(file);
            document.getElementById("generated_image").src = "/src/loading.png";
            document.getElementById("btn_generated_image").style.display = "inline-block";
            document.getElementById("delete_character").style.display = "none";
            document.getElementById("Inp_character_name").value = "";
        }
    }
              
});


document.getElementById('btn_generated_image').addEventListener('click', async() => {    

    if(Base64Image === undefined || Base64Image === null || Base64Image === ""){
        Notification("Please select an image");
        return;
    }  

    try {

        await socket.emit('joinRoom', Id+"_Grok_Description_Image");
        Type = "Grok_Description_Image";

        const Request = await fetch(`api/router_generator/Grok_Description_Image`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                Id: Id,
                Prompt: Base64Image     
            })
        });

        const Server_Response = await Request.json();
    
        Notification(Server_Response.Response);

        if(Server_Response.Status == true){
            document.getElementById("loading").style.display = "inline-block"; 
            document.getElementById("container").style.display = "none";           
        }

    } catch (error) {
        Notification("Try again");     
    }
        
});


async function Grok_Image_Generator (Prompt) {

    try {

        await socket.emit('joinRoom', Id+"_Grok_Image_Generator");
        Type = "Grok_Image_Generator";

        const Request = await fetch(`api/router_generator/Grok_Image_Generator`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                Id: Id,
                Prompt: Prompt     
            })
        });

        const Server_Response = await Request.json();

        if(Server_Response.Status == false){
            return Grok_Image_Generator(Prompt); // Retry if there's an error
        }
    
        Notification(Server_Response.Response);

    } catch (error) {
        return Grok_Image_Generator(Prompt); // Retry if there's an error
    }

}

document.getElementById('create_character').addEventListener('click', async() => {

    const characterName = document.getElementById('Inp_character_name').value;

    if(characterName === undefined || characterName === null || characterName === ""){
        Notification("Please enter a character name");
        return;
    }
    if(Image === undefined || Image === null || Image === ""){
        Notification("Please generate an image for the character");
        return;
    }
    if(Description === undefined || Description === null || Description === ""){
        Notification("Please generate a description for the character");
        return;
    }

    try {

        await socket.emit('joinRoom', Id+"_Create_Character");

        Type = "Create_Character";

        const Request = await fetch(`api/router_character/Create_Character`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                Id: Id,
                Name: characterName,
                Description: Description,
                Image: Image,
                Image_Real: Image_Real
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


function addToGallery(imageReal ,imageSrc, name, Id_Character) {
        const gallery = document.getElementById('character-gallery');

        const item = document.createElement('div');
        item.className = 'gallery-item';

        item.onclick = () => {
            document.getElementById("Inp_character_name").value = name;
            document.getElementById("generated_image").src = imageSrc;
            document.getElementById("delete_character").style.display = "inline-block";
            document.getElementById("btn_generated_image").style.display = "none";
            document.getElementById("create_character").style.display = "none";
            document.getElementById("uploaded_image").src = imageReal;
            Id_Character = Id_Character;
        };
        
        const img = document.createElement('img');
        img.src = imageSrc;
        
        const nameLabel = document.createElement('div');
        nameLabel.className = 'character-name';
        nameLabel.textContent = name;
        
        item.appendChild(img);
        item.appendChild(nameLabel);
        gallery.insertBefore(item, gallery.firstChild);
}


socket.on('Profile_Response', async (data) => { 

     if(data.Status && Type == "Read_Character"){

        responseReceived = true;

        document.getElementById("container").style.display = "block";
        document.getElementById("loading").style.display = "none";

        for (let i = 0; i < data.Message.length; i++) {
            const character = data.Message[i];
            const imageSrc = character.Image ;
            const name = character.Name;
            const imageReal = character.Image_Real;
            Id_Character = character.Id; 

            addToGallery(imageReal,imageSrc, name, Id_Character);
        }

    }
    else if (data.Status == false && Type == "Read_Character") {
        return Read_Character();
    }
        
    else if(data.Status == true && Type == "Grok_Description_Image"){       
        Description = data.Message;
        Grok_Image_Generator(data.Message);
    }
    
    else if(data.Status == false && Type == "Grok_Description_Image"){
        document.getElementById("loading").style.display = "none";   
        document.getElementById("container").style.display = "block";         
        Notification(data.Message);
        return;
    }

    else if(data.Status == true && Type == "Grok_Image_Generator"){

        Image = data.Message;
        Image_Real = Base64Image;
        document.getElementById("generated_image").src = data.Message;
        document.getElementById("create_character").style.display = "inline-block";
        document.getElementById("loading").style.display = "none";  
        document.getElementById("container").style.display = "block";          

    }
    else if(data.Status == false && Type == "Grok_Image_Generator"){
        Notification(data.Message);
        document.getElementById("loading").style.display = "none";            
        document.getElementById("container").style.display = "block";
        return;
    }

    else if(data.Status == true && Type == "Create_Character"){
       location.reload(); // Reload the page to show the new character
       return;
    }
    else if(data.Status == false && Type == "Create_Character"){
        Notification(data.Message);        
        document.getElementById("loading").style.display = "none";            
        document.getElementById("container").style.display = "block";
    }
});


async function Notification(Text){
    scrollTo(0, 0);

    document.getElementById("Div_Notification").style.display = "inline-flex";
    document.getElementById("Notification").innerHTML = Text;  

    await new Promise(resolve => setTimeout(resolve, 1000)); // Espera 10 segundos
    document.getElementById("Div_Notification").style.display = "none";
}