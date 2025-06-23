import { messages_user } from '/js/messages_user.js';  
const socket = io(messages_user); // Utiliza la IP de tu máquina en la red local
const inputImage = document.getElementById("Inp_Selected_Image");
const selectedImage = document.getElementById("Img_F2_Profile");
let file;
let Base64Image;
var Type = "";

document.getElementById("Btn_Log_In").addEventListener("click", async () => {
    try {
        window.location.href = "/";
    } catch (error) {
        Notification("Try again");
    }
});

document.getElementById("Btn_Create_Account").addEventListener("click", async () => {
    const Input_ID_Number = document.getElementById("Inp_ID_Number").value;
    const Input_Username = document.getElementById("Inp_Username").value;
    const Input_Phone = document.getElementById("Inp_Phone").value;
    const Input_Password = document.getElementById("Inp_Password").value;

    if (Input_ID_Number === "") {
        Notification("Enter the ID Number");
        return;
    }
    if (Input_ID_Number.length !== 10) {
        Notification("The number of digits is incorrect");
        return;
    }
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
    if (!Base64Image) {
        Notification("Select an image");
        return;
    }

    document.getElementById("main").style.display = "none";
    document.getElementById("loading").style.display = "inline";

   try {
        await socket.emit('joinRoom', Input_ID_Number+"_Verification");
        Type = "Verification";

        const Request = await fetch(`api/create_account/Verification`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                Id: Input_ID_Number,
                Phone: Input_Phone
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


document.getElementById("Btn_Verification_Code").addEventListener("click", async () => {

    var Inp_ID_Code = document.getElementById("Inp_ID_Code").value;
    const Input_ID_Number = document.getElementById("Inp_ID_Number").value;
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
    if (!Base64Image) {
        Notification("Select an image");
        return;
    }

    if(Inp_ID_Code == ""){
        Notification("Enter the code");
        return;
    }
    if(Inp_ID_Code.length != 6){
        Notification("The number of digits is incorrect");
        return;
    }

    document.getElementById("main").style.display = "none";
    document.getElementById("loading").style.display = "inline";
    document.getElementById('alertContainer').style.display = 'none';

    try {

        await socket.emit('joinRoom', Input_ID_Number+"_Create_User");
        Type = "Create_User";

        const Request = await fetch(`api/create_account/Create_User`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                Id: Input_ID_Number,
                Username: Input_Username,
                Phone: Input_Phone,               
                Image: Base64Image,
                Password: Input_Password,
                Code: Inp_ID_Code
            })
        });

        const Server_Response = await Request.json();

        if(Server_Response.Status == false){
            document.getElementById("main").style.display = "flex";
            document.getElementById("loading").style.display = "none";
            document.getElementById('alertContainer').style.display = 'flex';
        }
        
        Notification(Server_Response.Response);

    } catch (error) {
        Notification("Try again");
        document.getElementById("main").style.display = "flex";
        document.getElementById("loading").style.display = "none";
        document.getElementById('alertContainer').style.display = 'flex';
    }

});

document.getElementById("Btn_Back").addEventListener("click", () => {
    document.getElementById('alertContainer').style.display = 'none';
});

document.getElementById("Btn_Alert_Code").addEventListener("click", () => {
    document.getElementById('alertContainer').style.display = 'flex';
});




// Function to trigger the file selection dialog when clicking the image
selectedImage.addEventListener("click", function () {
    inputImage.click();
});

// Handle file change
inputImage.addEventListener("change", () => {
    const file = inputImage.files[0];

    if (file) {
        // Verify that the file size does not exceed 0.5 MB (0.5 * 1024 * 1024 bytes)
        const maxSize = 0.5 * 1024 * 1024; // 0.5 MB
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



socket.on('Profile_Response', async (data) => {

    Notification(data.Message);

    if(data.Status){

        document.getElementById("Inp_ID_Number").disabled = true;

        if(Type == "Create_User"){
            
              try {

                    const Input_ID_Number = document.getElementById("Inp_ID_Number").value;


                    const Request = await fetch(`api/create_account/JWT`, {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json"
                        },
                        body: JSON.stringify({
                            Id: Input_ID_Number                          
                        })
                    });

                    const Server_Response = await Request.json();

                    if(Server_Response.Status == true){
                        localStorage.setItem('Id', Input_ID_Number);
                        window.location.href = "/home";
                    }
                    else{
                        Notification("Failed to create security. Please log in again to try.");
                        document.getElementById("main").style.display = "flex";
                        document.getElementById("loading").style.display = "none";
                        document.getElementById('alertContainer').style.display = 'none';
                    }
                    
                } catch (error) {
                    Notification("Failed to create security. Please log in again to try.");
                    document.getElementById("main").style.display = "flex";
                    document.getElementById("loading").style.display = "none";
                    document.getElementById('alertContainer').style.display = 'none';
                }


        }
        else{
            document.getElementById('alertContainer').style.display = 'flex';
            document.getElementById("main").style.display = "flex";
            document.getElementById("loading").style.display = "none";
            document.getElementById("Btn_Alert_Code").style.display = "inline";
        }

        
    }
    else{
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