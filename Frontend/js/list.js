import { messages_user } from '/js/messages_user.js';  
const socket = io(messages_user); // Utiliza la IP de tu máquina en la red local
var retryAttempts = 0;
const maxRetries = 5;
var responseReceived = false;
var retryInterval = 3000; // 5 seconds
var message_information = true;
var check = 0;
let Id = localStorage.getItem("Id");
var Last_Id = "";
var List_Exist = [];
var Type = "Read_Story";
if(Id == null || Id == ""){
    localStorage.removeItem('Id');
    window.location.href = "/expired_session";
}

var Filter = {
    Id: Id
}

const etiquetas = {
  "eng_Latn": "English",
  "spa_Latn": "Español",
  "por_Latn": "Português",
  "fra_Latn": "Français",
  "ita_Latn": "Italiano",
  "rus_Cyrl": "Русский",
  "deu_Latn": "Deutsch"
};

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

async function Delete_Story(Id_Story) {

  await socket.emit("joinRoom", Id + "_Delete_Story");
  Type = "Delete_Story";

  try {
    const Request = await fetch(`api/router_story/Delete_Story`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        Id: Id,
        Id_Story: Id_Story
      }),
    });

    const Server_Response = await Request.json();

    if (Server_Response.Status == false) {
      return Delete_Story(Id_Story);
    }

    document.getElementById("loading").style.display = "inline-block";     
    document.getElementById("dataTable").style.display = "none"; 
    Notification(Server_Response.Response);

    
  } catch (error) {
    return Delete_Story(Id_Story);
  }
}

function renderTable(messageArray) {
  const tableBody = document.getElementById("tableBody");

  messageArray.forEach((item, index) => {

    if(List_Exist.includes(item.id)){
      return;
    }

    List_Exist.push(item.id)
    const row = document.createElement("tr");

    row.innerHTML = `
      <td>${index + 1}</td>
      <td>${item.Title || ""}</td>
      <td>${item.Language.map(code => etiquetas[code] || code).join(", ")}</td>
      <td>${new Date(item.createdAt).toLocaleString()}</td>
      <td>
        <button onclick="readStory('${item.id}')">Read</button>
        <button onclick="deleteStory('${item.id}')">Delete</button>
      </td>
    `;

    tableBody.appendChild(row);

    Last_Id = item.id;

  });

    document.getElementById("loading").style.display = "none";     
    document.getElementById("dataTable").style.display = "inline-table"; 
}

window.readStory = function(index) {
  localStorage.setItem("Id_Story", index);
  location.href = "/story";
}

window.deleteStory = function(index) {
  Delete_Story(index);
}



window.addEventListener("scroll", () => {
  const scrollTop = window.scrollY;
  const windowHeight = window.innerHeight;
  const documentHeight = document.documentElement.scrollHeight;

  if (scrollTop + windowHeight >= documentHeight - 10) {
    Filter._id = {$lt: Last_Id};
    check = 0;
    Read_Story();
  }
});


socket.on("Profile_Response", async (data) => {
  if (data.Status && Type == "Read_Story") {
    responseReceived = true;
    check = check + 1;
    if(check == 1){        
        renderTable(data.Message);
    }    

  } else if(data.Status == false && Type == "Read_Story") {
    return Read_Story();
  }

  else if(data.Status && Type == "Delete_Story"){
    location.reload();
  }
  else if(data.Status == false && Type == "Delete_Story"){
    Notification(data.Message);
    document.getElementById("loading").style.display = "none";     
    document.getElementById("dataTable").style.display = "inline-table"; 
  }


});


async function Notification(Text){
    scrollTo(0, 0);

    document.getElementById("Div_Notification").style.display = "inline-flex";
    document.getElementById("Notification").innerHTML = Text;  

    await new Promise(resolve => setTimeout(resolve, 1000)); // Espera 10 segundos
    document.getElementById("Div_Notification").style.display = "none";
}





