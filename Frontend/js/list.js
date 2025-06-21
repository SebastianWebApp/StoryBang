import { messages_user } from '/js/messages_user.js';  
const socket = io(messages_user); // Utiliza la IP de tu máquina en la red local
var retryAttempts = 0;
const maxRetries = 5;
var responseReceived = false;
var retryInterval = 3000; // 5 seconds
var message_information = true;
var check = 0;
let Id = localStorage.getItem("Id");

if(Id == null || Id == ""){
    localStorage.removeItem('Id');
    window.location.href = "/expired_session";
}

var Filter = {
    Id: Id
}
await socket.emit("joinRoom", Id + "_Read_Story");


Read_Story()

async function Read_Story() {

  try {
    const Request = await fetch(`api/router_story/Read_Story`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        Id: Id,
        Filter: Filter
      }),
    });

    const Server_Response = await Request.json();

    if (Server_Response.Status == false) {
      return Read_Story();
    }

    if (message_information) {
      Notification(Server_Response.Response);
      message_information = false;
    }

    setTimeout(() => {
      if (!responseReceived && retryAttempts < maxRetries) {
        retryAttempts++;
        Read_Story(); // Retry the request
      } else if (retryAttempts >= maxRetries) {
        Notification("Error loading information, we will try again.");
        location.reload();
      }
    }, retryInterval);
  } catch (error) {
    return Read_Story();
  }
}

function renderTable(messageArray) {
  const tableBody = document.getElementById("tableBody");
  tableBody.innerHTML = "";

  messageArray.forEach((item, index) => {
    const row = document.createElement("tr");

    row.innerHTML = `
      <td>${index + 1}</td>
      <td>${item.Title || ""}</td>
      <td>${item.Language}</td>
      <td>${new Date(item.createdAt).toLocaleString()}</td>
      <td>
        <button onclick="readStory(${index})">Read</button>
        <button onclick="deleteStory(${index})">Delete</button>
      </td>
    `;

    tableBody.appendChild(row);
  });

    document.getElementById("loading").style.display = "none";     
    document.getElementById("dataTable").style.display = "inline-table"; 
}

window.readStory = function(index) {
  console.log("Read story at index:", index);
}

window.deleteStory = function(index) {
  console.log("Delete story at index:", index);
}



socket.on("Profile_Response", async (data) => {
  if (data.Status) {
    responseReceived = true;
    check = check + 1;
    if(check == 1){        
        renderTable(data.Message); // Llama a la función que llena la tabla
    }    

  } else {
    return Read_Story();
  }



});




async function Notification(Text){
    scrollTo(0, 0);

    document.getElementById("Div_Notification").style.display = "inline-flex";
    document.getElementById("Notification").innerHTML = Text;  

    await new Promise(resolve => setTimeout(resolve, 1000)); // Espera 10 segundos
    document.getElementById("Div_Notification").style.display = "none";
}





