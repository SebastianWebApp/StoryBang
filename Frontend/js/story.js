import { messages_user } from "/js/messages_user.js";
const socket = io(messages_user); // Utiliza la IP de tu máquina en la red local

let Id = localStorage.getItem("Id");
let Id_Story = localStorage.getItem("Id_Story");
var Story;
var Content_Story;
var Image;
var Posicion_Story = 0;
var Posicion_Image = 0;
var Content = [];
var retryAttempts = 0;
const maxRetries = 5;
var responseReceived = false;
var retryInterval = 3000; // 5 seconds
var message_information = true;
var check = 0;
var Type = "Read_Story";

if (Id == null || Id == "") {
  localStorage.removeItem("Id");
  window.location.href = "/expired_session";
}

if(Id_Story == "" || Id_Story == null){
  localStorage.removeItem("Id_Story");
  window.location.href = "/story_creator"
}



function toggleLanguageMenu() {
  document.getElementById('languageMenu').classList.toggle('active');
}

// Set up event listeners when the DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  const languageButton = document.getElementById('languageButton');
  const languageOptions = document.querySelectorAll('.language-option');

  languageButton.addEventListener('click', toggleLanguageMenu);

  languageOptions.forEach(option => {
    option.addEventListener('click', () => {
      const lang = option.getAttribute('data-lang');

      for (let index = 0; index < Story.length; index++) {
          if(Story[index].Language == lang){
            Story_Create(lang);
            return;
          }
      }

      Translate(Story[0].Story, lang);

    });
  });
});

await socket.emit("joinRoom", Id + "_Read_Id_Story");


Read_Story()

async function Read_Story() {

  try {
    const Request = await fetch(`api/router_story/Read_Id_Story`, {
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



function Story_Create(Language){

  Content = [];
  var Posicion = 0;
  var index_n = 0;

  for (let index = 0; index < Story.length; index++) {
      if(Story[index].Language == Language){
        Posicion = index;
      }    
  }

  Content_Story = Story[Posicion].Story
  .split(/\[Content(?: \d*)?\]:\s*/)
  .filter(s => s.trim() !== "");


  if(Story[Posicion].Story.includes("[Title]: ")){ 
    index_n = 1;   
    document.getElementById("title").innerText = Content_Story[0].replace("[Title]: ", "").replace("\n", "");
  }

  for (let index = index_n; index < Content_Story.length; index++) {
      Content.push(Content_Story[index]);  
  }

  document.getElementById("content").innerText = Content_Story[index_n].replace("\n", "");
  document.getElementById("Image").src = Image[0];

  // Posicion_Story = index_n + 1;
  // Posicion_Image = 1;  
  document.getElementById("back").style.display = "none";
  document.getElementById("next").style.display = "block";
}


async function Translate(Text, Language){
    try {

            document.getElementById("loading").style.display = "inline-block";     
            document.getElementById("container").style.display = "none";   

            const Request = await fetch(`api/router_generator/Translate`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    Text: Text,
                    Tgt_lang: Language
                })
            });

            const Server_Response = await Request.json();
            
            document.getElementById("loading").style.display = "none";     
            document.getElementById("container").style.display = "flex";

            if(Server_Response.Status == true){
                Story.push({
                    Story: Server_Response.Response,
                    Language: Language
                })
                
                Story_Create(Language);
                Update();
            }       
            else{
                Notification(Server_Response.Response);
            }
            

        } catch (error) {
            Notification("Failed to create character. Please try again.");
            document.getElementById("loading").style.display = "none";     
            document.getElementById("container").style.display = "flex";
        }
}


async function Update() {    

    await socket.emit('joinRoom', Id+"_Update_Story");
    Type = "Update";


    try {
        const Request = await fetch(`api/router_story/Update_Story`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                Id: Id,
                Id_Story: Id_Story,
                Content: {
                  Storys: Story,
                  Image: Image
                }
            })
        });


        const Server_Response = await Request.json();

        if(Server_Response.Status == false){
            return Update();
        }
        
        Notification(Server_Response.Response);     

    } catch (error) {
        return Update();
    }


}

document.getElementById("next").addEventListener("click", async () => {
  Posicion_Story += 1;
  Posicion_Image += 1;

  console.log(Posicion_Image)
  console.log(Posicion_Story)

  if (Posicion_Story < Content_Story.length) {
    document.getElementById("content").innerText = Content_Story[Posicion_Story].replace("\n", "");
    document.getElementById("Image").src = Image[Posicion_Image];
    document.getElementById("back").style.display = "block";
  }

  if (Posicion_Story >= Content_Story.length - 1) {
    document.getElementById("next").style.display = "none";
  }
});
document.getElementById("back").addEventListener("click", async () => {
  Posicion_Story -= 1;
  Posicion_Image -= 1;

  console.log(Posicion_Image)
  console.log(Posicion_Story)
  if (Posicion_Story >= 0) {
    document.getElementById("content").innerText = Content_Story[Posicion_Story].replace("\n", "");
    document.getElementById("Image").src = Image[Posicion_Image];
    document.getElementById("next").style.display = "block";
  }

  if (Posicion_Image === 0) {
    document.getElementById("back").style.display = "none";
  }
});



socket.on("Profile_Response", async (data) => {
  if (data.Status && Type == "Read_Story") {

    if(data.Message == null){
      location.href = "/home";
      return;
    }

    responseReceived = true;
    check = check + 1;
    if(check == 1){
      document.getElementById("loading").style.display = "none";     
      document.getElementById("container").style.display = "flex"; 
      

      Story = data.Message.Content.Storys;
      Image = data.Message.Content.Image;
      Story_Create("eng_Latn");

    }    

  } else if (data.Status == false && Type == "Read_Story") {
    return Read_Story();
  }

  else if(data.Status && Type == "Update"){
    Notification(data.Message);
  }
  else if(data.Status == false && Type == "Update"){
    Update();
  }


});



async function Notification(Text){
    scrollTo(0, 0);

    document.getElementById("Div_Notification").style.display = "inline-flex";
    document.getElementById("Notification").innerHTML = Text;  

    await new Promise(resolve => setTimeout(resolve, 1000)); // Espera 10 segundos
    document.getElementById("Div_Notification").style.display = "none";
}

