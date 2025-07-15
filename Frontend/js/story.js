import { messages_user } from "/js/messages_user.js";
import { PDFDocument, rgb, StandardFonts } from 'https://cdn.skypack.dev/pdf-lib';
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

  Posicion_Story = index_n;
  Posicion_Image = 0;  
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


document.getElementById("download").addEventListener("click", async () => {
  if (Content_Story.length === 0) {
    Notification("No hay contenido para descargar.");
    return;
  }
  document.getElementById("loading").style.display = "inline-block";     
  document.getElementById("container").style.display = "none";
  await generarPDF();
  document.getElementById("loading").style.display = "none";     
  document.getElementById("container").style.display = "flex";
});

// async function generarPDF() {
//   const pdfDoc = await PDFDocument.create();

//   const font = await pdfDoc.embedFont(StandardFonts.Helvetica);
//   const fontBold = await pdfDoc.embedFont(StandardFonts.HelveticaBold);

//   const pageWidth = 600;
//   const pageHeight = 400;
//   const margin = 30;
//   const gutter = 30; // espacio entre texto e imagen

//   let textosFinales = [];
//   let tieneTitulo = false;
//   let titulo = "";

//   if (Content_Story[0].startsWith("[Title]:")) {
//     tieneTitulo = true;
//     titulo = Content_Story[0].replace("[Title]:", "").trim();
//     textosFinales.push(Content_Story[1]?.trim() || "");
//     for (let i = 2; i < Content_Story.length; i++) {
//       textosFinales.push(Content_Story[i].trim());
//     }
//   } else {
//     textosFinales = Content_Story.map(s => s.trim());
//   }

//   for (let i = 0; i < textosFinales.length; i++) {
//     const page = pdfDoc.addPage([pageWidth, pageHeight]);

//     // Fondo con textura sutil
//     const backgroundColor1 = rgb(0.99, 0.985, 0.97);
//     const backgroundColor2 = rgb(1, 1, 0.99);
//     for (let y = 0; y < pageHeight; y += 4) {
//       page.drawRectangle({
//         x: 0,
//         y: y,
//         width: pageWidth,
//         height: 2,
//         color: y % 8 === 0 ? backgroundColor1 : backgroundColor2,
//       });
//     }

//     // Banner título primera página
//     if (i === 0 && tieneTitulo) {
//       const bannerHeight = 60;

//       page.drawRectangle({
//         x: 0,
//         y: pageHeight - bannerHeight,
//         width: pageWidth,
//         height: bannerHeight,
//         color: rgb(0.91, 0.94, 1),
//       });

//       page.drawRectangle({
//         x: 0,
//         y: pageHeight - bannerHeight - 5,
//         width: pageWidth,
//         height: 5,
//         color: rgb(0.6, 0.6, 0.85),
//         opacity: 0.2,
//       });

//       const titleWidth = fontBold.widthOfTextAtSize(titulo, 20);
//       const titleX = (pageWidth - titleWidth) / 2;
//       const titleY = pageHeight - bannerHeight + (bannerHeight - 30) / 2 + 8;

//       page.drawText(titulo, {
//         x: titleX,
//         y: titleY,
//         size: 20,
//         font: fontBold,
//         color: rgb(0.25, 0.22, 0.65),
//       });

//       page.drawRectangle({
//         x: titleX,
//         y: titleY - 8,
//         width: titleWidth,
//         height: 3,
//         color: rgb(0.25, 0.22, 0.65),
//         opacity: 0.7,
//       });
//     }

//     // Áreas para texto e imagen
//     // Ancho del área de texto: mitad izquierda menos margen derecho y gutter
//     const textAreaWidth = pageWidth / 2 - margin - gutter;
//     const textStartX = margin;

//     // Texto alineado a la izquierda, no centrado horizontalmente
//     const texto = textosFinales[i];
//     const fontSize = 14;
//     const lineHeight = 18;

//     // Dividir texto en líneas según ancho máximo usando font.widthOfTextAtSize
//     let lines = [];
//     let currentLine = "";

//     const words = texto.split(" ");
//     for (let word of words) {
//       const testLine = currentLine ? currentLine + " " + word : word;
//       const testLineWidth = font.widthOfTextAtSize(testLine, fontSize);
//       if (testLineWidth <= textAreaWidth) {
//         currentLine = testLine;
//       } else {
//         if (currentLine) lines.push(currentLine);
//         currentLine = word;
//       }
//     }
//     if (currentLine) lines.push(currentLine);

//     const totalTextHeight = lines.length * lineHeight;
//     const textStartY = (pageHeight + totalTextHeight) / 2 - lineHeight;

//     // Dibujar texto
//     lines.forEach((line, idx) => {
//       page.drawText(line, {
//         x: textStartX,
//         y: textStartY - idx * lineHeight,
//         size: fontSize,
//         font: font,
//         color: rgb(0.15, 0.15, 0.15),
//         maxWidth: textAreaWidth,
//       });
//     });

//     // Imagen en mitad derecha, con margen correcto para no superponer
//     if (Image[i]) {
//       try {
//         const imgBase64 = Image[i];
//         const imgBuffer = await fetch(imgBase64).then((res) => res.arrayBuffer());
//         let image;

//         if (imgBase64.startsWith("data:image/png")) {
//           image = await pdfDoc.embedPng(imgBuffer);
//         } else if (
//           imgBase64.startsWith("data:image/jpeg") ||
//           imgBase64.startsWith("data:image/jpg")
//         ) {
//           image = await pdfDoc.embedJpg(imgBuffer);
//         } else {
//           console.warn("Formato imagen no soportado en página", i);
//           image = null;
//         }

//         if (image) {
//           // El área de imagen empieza justo después del área de texto + gutter
//           const imageAreaX = textStartX + textAreaWidth + gutter;
//           const maxImgWidth = pageWidth - imageAreaX - margin;
//           const maxImgHeight = pageHeight - margin * 2;
//           const imgDims = image.scaleToFit(maxImgWidth, maxImgHeight);

//           const imgX = imageAreaX;
//           const imgY = (pageHeight - imgDims.height) / 2;

//           // Sombra para imagen
//           page.drawRectangle({
//             x: imgX - 7,
//             y: imgY - 7,
//             width: imgDims.width + 14,
//             height: imgDims.height + 14,
//             color: rgb(0, 0, 0),
//             opacity: 0.1,
//             borderWidth: 0,
//           });

//           // Borde decorativo imagen
//           page.drawRectangle({
//             x: imgX - 5,
//             y: imgY - 5,
//             width: imgDims.width + 10,
//             height: imgDims.height + 10,
//             borderColor: rgb(0.7, 0.55, 0.3),
//             borderWidth: 3,
//           });

//           page.drawImage(image, {
//             x: imgX,
//             y: imgY,
//             width: imgDims.width,
//             height: imgDims.height,
//           });
//         }
//       } catch (error) {
//         console.error("Error cargando imagen en página", i, error);
//       }
//     }

//     // Numeración página
//     const pageNumX = pageWidth - 40;
//     const pageNumY = 30;
//     const radiusX = 18;
//     const radiusY = 18;

//     page.drawEllipse({
//       x: pageNumX,
//       y: pageNumY,
//       xScale: radiusX,
//       yScale: radiusY,
//       color: rgb(0.95, 0.95, 0.95),
//       opacity: 0.85,
//       borderColor: rgb(0.7, 0.7, 0.7),
//       borderWidth: 1,
//     });

//     page.drawText(`Pág. ${i + 1}`, {
//       x: pageNumX - 10,
//       y: pageNumY - 4,
//       size: 8,
//       font: font,
//       color: rgb(0.4, 0.4, 0.4),
//     });
//   }

//   const pdfBytes = await pdfDoc.save();
//   const blob = new Blob([pdfBytes], { type: "application/pdf" });
//   const link = document.createElement("a");
//   link.href = URL.createObjectURL(blob);
//   link.download = `${titulo || "historia"}.pdf`;
//   link.click();
// }


async function generarPDF() {
  const pdfDoc = await PDFDocument.create();

  const font = await pdfDoc.embedFont(StandardFonts.Helvetica);
  const fontBold = await pdfDoc.embedFont(StandardFonts.HelveticaBold);

  const pageWidth = 600;
  const pageHeight = 400;
  const margin = 20;
  const gutter = 30;
  const fontSize = 14;
  const lineHeight = 18;

  let textosFinales = [];
  let tieneTitulo = false;
  let titulo = "";

  if (Content_Story[0].startsWith("[Title]:")) {
    tieneTitulo = true;
    titulo = Content_Story[0].replace("[Title]:", "").trim();
    textosFinales.push(Content_Story[1]?.trim() || "");
    for (let i = 2; i < Content_Story.length; i++) {
      textosFinales.push(Content_Story[i].trim());
    }
  } else {
    textosFinales = Content_Story.map(s => s.trim());
  }

  const textAreaWidth = pageWidth / 2 - margin - gutter;
  const textStartX = margin;
  const maxLinesPerPage = Math.floor((pageHeight - margin * 2) / lineHeight);

  for (let i = 0; i < textosFinales.length; i++) {
    const texto = textosFinales[i];
    const words = texto.split(" ");
    let lines = [];
    let currentLine = "";

    for (let word of words) {
      const testLine = currentLine ? currentLine + " " + word : word;
      const testLineWidth = font.widthOfTextAtSize(testLine, fontSize);
      if (testLineWidth <= textAreaWidth) {
        currentLine = testLine;
      } else {
        if (currentLine) lines.push(currentLine);
        currentLine = word;
      }
    }
    if (currentLine) lines.push(currentLine);

    // Prepara la imagen una sola vez
    let image = null;
    let imgDims = null;
    if (Image[i]) {
      try {
        const imgBase64 = Image[i];
        const imgBuffer = await fetch(imgBase64).then(res => res.arrayBuffer());
        if (imgBase64.startsWith("data:image/png")) {
          image = await pdfDoc.embedPng(imgBuffer);
        } else if (imgBase64.startsWith("data:image/jpeg") || imgBase64.startsWith("data:image/jpg")) {
          image = await pdfDoc.embedJpg(imgBuffer);
        }

        if (image) {
          const imageAreaX = textStartX + textAreaWidth + gutter;
          const maxImgWidth = pageWidth - imageAreaX - margin;
          const maxImgHeight = pageHeight - margin * 2;
          imgDims = image.scaleToFit(maxImgWidth, maxImgHeight);
        }
      } catch (err) {
        console.error("Error cargando imagen:", err);
      }
    }

    let pageIndex = 0;
    while (lines.length > 0) {
      const pageLines = lines.splice(0, maxLinesPerPage);
      const page = pdfDoc.addPage([pageWidth, pageHeight]);

      // Fondo
      const backgroundColor1 = rgb(0.99, 0.985, 0.97);
      const backgroundColor2 = rgb(1, 1, 0.99);
      for (let y = 0; y < pageHeight; y += 4) {
        page.drawRectangle({
          x: 0,
          y: y,
          width: pageWidth,
          height: 2,
          color: y % 8 === 0 ? backgroundColor1 : backgroundColor2,
        });
      }

      // Título en la primera página
      if (i === 0 && tieneTitulo && pageIndex === 0) {
        const bannerHeight = 60;
        page.drawRectangle({
          x: 0,
          y: pageHeight - bannerHeight,
          width: pageWidth,
          height: bannerHeight,
          color: rgb(0.91, 0.94, 1),
        });
        page.drawRectangle({
          x: 0,
          y: pageHeight - bannerHeight - 5,
          width: pageWidth,
          height: 5,
          color: rgb(0.6, 0.6, 0.85),
          opacity: 0.2,
        });

        const titleWidth = fontBold.widthOfTextAtSize(titulo, 20);
        const titleX = (pageWidth - titleWidth) / 2;
        const titleY = pageHeight - bannerHeight + (bannerHeight - 30) / 2 + 8;

        page.drawText(titulo, {
          x: titleX,
          y: titleY,
          size: 20,
          font: fontBold,
          color: rgb(0.25, 0.22, 0.65),
        });

        page.drawRectangle({
          x: titleX,
          y: titleY - 8,
          width: titleWidth,
          height: 3,
          color: rgb(0.25, 0.22, 0.65),
          opacity: 0.7,
        });
      }

      // Texto
      const totalTextHeight = pageLines.length * lineHeight;

      let textStartY = (pageHeight + totalTextHeight) / 2 - lineHeight;

      if (i === 0 && tieneTitulo && pageIndex === 0) {
        // Baja el texto en la primera página que contiene el título
        textStartY -= 20;
      }


      pageLines.forEach((line, idx) => {
        page.drawText(line, {
          x: textStartX,
          y: textStartY - idx * lineHeight,
          size: fontSize,
          font: font,
          color: rgb(0.15, 0.15, 0.15),
        });
      });

      // Imagen repetida en cada subpágina
      if (image && imgDims) {
        const imageAreaX = textStartX + textAreaWidth + gutter;
        const imgX = imageAreaX;
        const imgY = (pageHeight - imgDims.height) / 2;

        page.drawRectangle({
          x: imgX - 7,
          y: imgY - 7,
          width: imgDims.width + 14,
          height: imgDims.height + 14,
          color: rgb(0, 0, 0),
          opacity: 0.1,
        });

        page.drawRectangle({
          x: imgX - 5,
          y: imgY - 5,
          width: imgDims.width + 10,
          height: imgDims.height + 10,
          borderColor: rgb(0.7, 0.55, 0.3),
          borderWidth: 3,
        });

        page.drawImage(image, {
          x: imgX,
          y: imgY,
          width: imgDims.width,
          height: imgDims.height,
        });
      }

      // Número de página
      const pageNumX = pageWidth - 40;
      const pageNumY = 30;

      page.drawEllipse({
        x: pageNumX,
        y: pageNumY,
        xScale: 18,
        yScale: 18,
        color: rgb(0.95, 0.95, 0.95),
        opacity: 0.85,
        borderColor: rgb(0.7, 0.7, 0.7),
        borderWidth: 1,
      });

      page.drawText(`Pág. ${pdfDoc.getPageCount()}`, {
        x: pageNumX - 10,
        y: pageNumY - 4,
        size: 8,
        font: font,
        color: rgb(0.4, 0.4, 0.4),
      });

      pageIndex++;
    }
  }

  const pdfBytes = await pdfDoc.save();
  const blob = new Blob([pdfBytes], { type: "application/pdf" });
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = `${titulo || "historia"}.pdf`;
  link.click();
}
