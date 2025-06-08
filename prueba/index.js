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
                
                // Aquí iría la lógica para generar la imagen
                generateImage(file);
            };
            reader.readAsDataURL(file);
        }
    }
    
    async function generateImage(file) {
        // Mostrar loading
        generatedImage.src = '/src/loading.png';
        generatedImage.hidden = false;
        
        try {
            // Aquí iría la llamada a tu API para generar la imagen
            // Por ahora solo simulamos una espera
            await new Promise(resolve => setTimeout(resolve, 2000));
            
            // Simular una imagen generada
            generatedImage.src = '/src/img_post.png';
            
            // Agregar a la galería
            if (characterName.value) {
                addToGallery(generatedImage.src, characterName.value);
            }
        } catch (error) {
            console.error('Error generando la imagen:', error);
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
        { name: 'Personaje 3', image: '/src/img_post.png' }
    ];
    
    mockCharacters.forEach(char => {
        addToGallery(char.image, char.name);
    });
});
