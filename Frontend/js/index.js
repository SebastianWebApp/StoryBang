import { messages_user } from '/js/messages_user.js';  
const socket = io(messages_user); // Utiliza la IP de tu máquina en la red local

document.getElementById("Btn_Create_Account").addEventListener("click", async() =>{

    try {
        
        window.location.href = "/create_account";

    } catch (error) {
        Notification("Try again");
    }


});

document.getElementById("Btn_Log_In").addEventListener("click", async() =>{

    const Input_ID_Number = document.getElementById("Inp_ID_Number").value;   
    const Input_Password = document.getElementById("Inp_Password").value;

    if (Input_ID_Number === "") {
        Notification("Enter the ID Number");
        return;
    }
    if (Input_ID_Number.length !== 10) {
        Notification("The number of digits is incorrect");
        return;
    }
   
    
    if (Input_Password === "") {
        Notification("Enter the password");
        return;
    }
 

    document.getElementById("main").style.display = "none";
    document.getElementById("loading").style.display = "inline";
    

    try {
        await socket.emit('joinRoom', Input_ID_Number+"_Verify_User");

        const Request = await fetch(`api/create_account/Verify_User`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                Id: Input_ID_Number,
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



socket.on('Profile_Response', async (data) => {

    
    if(data.Status){

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
                    }
            
        } catch (error) {
            Notification("Failed to create security. Please log in again to try.");
            document.getElementById("main").style.display = "flex";
            document.getElementById("loading").style.display = "none";
        }

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