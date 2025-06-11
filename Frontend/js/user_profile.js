import { messages_user } from '/js/messages_user.js';  
const socket = io(messages_user); // Utiliza la IP de tu máquina en la red local
const inputImage = document.getElementById("Inp_Selected_Image");
const selectedImage = document.getElementById("Img_F2_Profile");
let file;
let Base64Image;

let Id = localStorage.getItem("Id");
var Type = "";

var retryAttempts = 0;
const maxRetries = 5;
var responseReceived = false;
var retryInterval = 3000; // 5 seconds
var message_information = true;

if(Id == null || Id == ""){
    localStorage.removeItem('Id');
    window.location.href = "/expired_session";
}
Read_User();

async function Read_User(){

    await socket.emit('joinRoom', Id+"_Read_User");
    Type = "Read_User";

    document.getElementById("main").style.display = "none";
    document.getElementById("loading").style.display = "inline";

    try {
        const Request = await fetch(`api/create_account/Read_User`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                Id: Id
            })
        });


        const Server_Response = await Request.json();

        if(Server_Response.Status == false){
            return Read_User();
        }
        
        if(message_information){
            Notification(Server_Response.Response);
            message_information = false;
        }
        
        setTimeout(() => {
            if(!responseReceived && retryAttempts < maxRetries) {
                retryAttempts++;
                Read_User(); // Retry the request
            }else if (retryAttempts >= maxRetries){
                Notification("Error loading information, we will try again.");
                location.reload();
            }
        }, retryInterval);

    } catch (error) {

        return Read_User();
    }

    

}




// Function to trigger the file selection dialog when clicking the image
selectedImage.addEventListener("click", function () {
    inputImage.click();
});

// Handle file change
inputImage.addEventListener("change", () => {
    const file = inputImage.files[0];

    if (file) {
        // Verify that the file size does not exceed 5 MB (5 * 1024 * 1024 bytes)
        const maxSize = 5 * 1024 * 1024; // 5 MB
        if (file.size > maxSize) {
            Notification("The selected file exceeds the maximum allowed size of 5 MB.");
            inputImage.value = ""; // Optional: clear the input to avoid future issues
            return;
        }

        const reader = new FileReader();
        reader.readAsDataURL(file);

        // Read the image as a Data URL
        reader.onload = () => {
            selectedImage.src = reader.result; // Display the selected image
            Base64Image = reader.result; // Base64 of the selected image
        };
    }
});



document.getElementById("Btn_Update_User").addEventListener("click", async () => {
    const Input_Username = document.getElementById("Inp_Username").value;
    const Input_Phone = document.getElementById("Inp_Phone").value;
    const Input_Password = document.getElementById("Inp_Password").value;

   
    if (Input_Username.trim() === "") {
        Notification("Enter the username");
        return;
    }
    if (Input_Phone === "") {
        Notification("Enter the phone number");
        return;
    }
    if (Input_Phone.length !== 10) {
        Notification("The number of digits is incorrect");
        return;
    }
    if (Input_Password === "") {
        Notification("Enter the password");
        return;
    }
    if (Input_Password.length < 6) {
        Notification("The password must have at least 6 characters");
        return;
    }
   

    document.getElementById("main").style.display = "none";
    document.getElementById("loading").style.display = "inline";

   try {

        await socket.emit('joinRoom', Id+"_Update_User");
        Type = "Update_User";

        const Request = await fetch(`api/create_account/Update_User`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                Id: Id,
                Username: Input_Username,
                Phone: Input_Phone,               
                Image: Base64Image,
                Password: Input_Password
            })
        });

        const Server_Response = await Request.json();

        if(Server_Response.Status == false){
            document.getElementById("main").style.display = "flex";
            document.getElementById("loading").style.display = "none";
        }        
        
        Notification(Server_Response.Response);

    } catch (error) {
        Notification("Try again");
        document.getElementById("main").style.display = "flex";
        document.getElementById("loading").style.display = "none";
    }
        

});

document.getElementById("Btn_Delete_User").addEventListener("click", async () => {    

    document.getElementById("main").style.display = "none";
    document.getElementById("loading").style.display = "inline";

   try {

        await socket.emit('joinRoom', Id+"_Delete_User");
        Type = "Delete_User";

        const Request = await fetch(`api/create_account/Delete_User`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                Id: Id               
            })
        });

        const Server_Response = await Request.json();

        if(Server_Response.Status == false){
            document.getElementById("main").style.display = "flex";
            document.getElementById("loading").style.display = "none";
        }        
        
        Notification(Server_Response.Response);

    } catch (error) {
        Notification("Try again");
        document.getElementById("main").style.display = "flex";
        document.getElementById("loading").style.display = "none";
    }
        

});









socket.on('Profile_Response', async (data) => { 
        
    if(data.Status && Type == "Read_User"){

        responseReceived = true;

        document.getElementById("main").style.display = "flex";
        document.getElementById("loading").style.display = "none";

        Base64Image = data.Message.Image;
        document.getElementById("Inp_Username").value = data.Message.Name;
        document.getElementById("Inp_Phone").value = data.Message.Phone;
        document.getElementById("Inp_Password").value = data.Message.Password;
        document.getElementById("Img_F2_Profile").src = Base64Image;

    }
    else if (data.Status == false && Type == "Read_User") {
        return Read_User();
    }

    else if (Type == "Update_User") {
        Notification(data.Message);  
        document.getElementById("main").style.display = "flex";
        document.getElementById("loading").style.display = "none";      
    }
    else if(data.Status  && Type == "Delete_User"){
        localStorage.removeItem('Id');
        window.location.href = "/";
    }
    else{
        Notification(data.Message);  
        document.getElementById("main").style.display = "flex";
        document.getElementById("loading").style.display = "none"; 
    }


});


async function Notification(Text){
    document.getElementById("Div_Notification").style.display = "inline-flex";
    document.getElementById("Notification").innerHTML = Text;  

    await new Promise(resolve => setTimeout(resolve, 1000)); // Espera 10 segundos
    document.getElementById("Div_Notification").style.display = "none";
}