import { messages_user } from '/js/messages_user.js';  
const socket = io(messages_user); // Utiliza la IP de tu máquina en la red local


document.getElementById("Btn_Log_In").addEventListener("click", async() =>{

    try {
        
        window.location.href = "/";

    } catch (error) {
        Notification("Try again");
    }


});

document.getElementById("Btn_Send_Code").addEventListener("click", async() =>{
  
    const Input_ID_Number = document.getElementById("Inp_ID_Number").value;
    

    if (Input_ID_Number === "") {
        Notification("Enter the ID Number");
        return;
    }
    if (Input_ID_Number.length !== 10) {
        Notification("The number of digits is incorrect");
        return;
    }
   

    document.getElementById("main").style.display = "none";
    document.getElementById("loading").style.display = "inline";
    

    try {
        await socket.emit('joinRoom', Input_ID_Number+"_Recover_Password");

        const Request = await fetch(`api/create_account/Recover_Password`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                Id: Input_ID_Number
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

socket.on('Profile_Response', (data) => {

    
    Notification(data.Message);
    document.getElementById("main").style.display = "flex";
    document.getElementById("loading").style.display = "none";

});


async function Notification(Text){
    document.getElementById("Div_Notification").style.display = "inline-flex";
    document.getElementById("Notification").innerHTML = Text;  

    await new Promise(resolve => setTimeout(resolve, 1000)); // Espera 10 segundos
    document.getElementById("Div_Notification").style.display = "none";
}