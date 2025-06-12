import { messages_user } from '/js/messages_user.js';  
const socket = io(messages_user); // Utiliza la IP de tu máquina en la red local
var Type = "";
let Base64Image;
const Id = "1234567890"

// let Id = localStorage.getItem("Id");

// if(Id == null || Id == ""){
//     localStorage.removeItem('Id');
//     window.location.href = "/expired_session";
// }


document.addEventListener('DOMContentLoaded', () => {
    const uploadArea = document.getElementById('upload-area');
    const fileInput = document.getElementById('file-input');
    const generatedImage = document.getElementById('generated-image');
    const characterName = document.getElementById('character-name');
    const gallery = document.getElementById('character-gallery');
    
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
                uploadArea.innerHTML = '';
                uploadArea.appendChild(img);
                img.style.width = '100%';
                img.style.height = '100%';
                img.style.objectFit = 'contain';  
                Base64Image = e.target.result;              
            };
            reader.readAsDataURL(file);
        }
    }
       
    function addToGallery(imageSrc, name) {
        const item = document.createElement('div');
        item.className = 'gallery-item';
        
        const img = document.createElement('img');
        img.src = imageSrc;
        
        const nameLabel = document.createElement('div');
        nameLabel.className = 'character-name';
        nameLabel.textContent = name;
        
        item.appendChild(img);
        item.appendChild(nameLabel);
        gallery.insertBefore(item, gallery.firstChild);
    }
    
    // Cargar personajes existentes (simulado)
    const mockCharacters = [
        { name: 'Personaje 1', image: '/src/img_post.png' },
        { name: 'Personaje 2', image: '/src/img_post.png' },
        { name: 'Personaje 3', image: '/src/img_post.png' },
        { name: 'Personaje 1', image: '/src/img_post.png' },
        { name: 'Personaje 2', image: '/src/img_post.png' },
        { name: 'Personaje 3', image: '/src/img_post.png' }
    ];
    
    mockCharacters.forEach(char => {
        addToGallery(char.image, char.name);
    });
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




socket.on('Profile_Response', async (data) => { 
        
    if(data.Status == true && Type == "Grok_Description_Image"){
        document.getElementById("generated_image").src = "../src/loading.png";
        document.getElementById("generated_image").style.display = "inline-block";
        Grok_Image_Generator(data.Message);
    }
    
    else if(data.Status == false && Type == "Grok_Description_Image"){
        Notification(data.Message);
        return;
    }

    else if(data.Status == true && Type == "Grok_Image_Generator"){

        document.getElementById("generated_image").src = data.Message;
        document.getElementById("create_character").style.display = "inline-block";
        

        // Agregar la imagen generada a la galería
        // addToGallery(data.Message, characterName.value || 'Nuevo Personaje');

    }
    else if(data.Status == false && Type == "Grok_Image_Generator"){
        Notification(data.Message);
        return;
    }

});


async function Notification(Text){
    scrollTo(0, 0);

    document.getElementById("Div_Notification").style.display = "inline-flex";
    document.getElementById("Notification").innerHTML = Text;  

    await new Promise(resolve => setTimeout(resolve, 1000)); // Espera 10 segundos
    document.getElementById("Div_Notification").style.display = "none";
}