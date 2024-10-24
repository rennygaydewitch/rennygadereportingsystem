
const beepSound = document.getElementById('beepSound');
const selectSound = document.getElementById('selectSound');
const gunshotSound = document.getElementById('gunshotSound');


window.onload = () => {
    document.getElementById('introText').classList.add('visible');
    setTimeout(() => {
        document.getElementById('socomImage').classList.add('visible');
    }, 2000);
};


document.querySelectorAll('a, button, input, .menu-toggle, .icon-container img').forEach(element => {
    element.addEventListener('mouseenter', () => {
        beepSound.currentTime = 0;
        beepSound.play();
    });
});




document.querySelectorAll('a, button, input, .menu-toggle, .icon-container img').forEach(clickable => {
    clickable.addEventListener('click', () => {
        selectSound.currentTime = 0;
        selectSound.play();
    });
});


const menuToggle = document.getElementById('menuToggle');
const menuOptions = document.getElementById('menuOptions');
const tomeContainer = document.querySelector('.tome-container');
const tomeTitleDisplay = document.querySelector('.tome-title-display');


menuToggle.addEventListener('click', () => {
    menuOptions.classList.toggle('show');
    menuToggle.classList.toggle('flipped');
    
    tomeContainer.classList.toggle('shift-down');
});


document.querySelectorAll('.tome').forEach(tome => {
    const title = tome.querySelector('.book-title').innerText;

    tome.addEventListener('mouseenter', () => {
        tomeTitleDisplay.innerText = title;
        tomeTitleDisplay.classList.add('visible');
    });

    tome.addEventListener('mouseleave', () => {
        tomeTitleDisplay.classList.remove('visible');
    });
});


const tmhIcon = document.querySelector('.icon-container a:last-child');
const qrCodeCanvas = document.getElementById('qrCode');

tmhIcon.addEventListener('click', () => {
    const qr = new QRious({
        element: qrCodeCanvas,
        value: 'https://discord.gg/TMH',
        size: 100
    });

    qrCodeCanvas.style.display = 'block';
    qrCodeCanvas.style.opacity = 0;
    qrCodeCanvas.style.transition = 'opacity 1s';
    setTimeout(() => {
        qrCodeCanvas.style.opacity = 1;
    }, 100);
});


const socomImage = document.getElementById('socomImage');
socomImage.addEventListener('click', () => {
    socomImage.style.display = 'none';
    document.body.style.cursor = 'url(media/socom.png), auto'; 
    gunshotSound.currentTime = 0;
    gunshotSound.play();
});


const staticCanvas = document.getElementById('staticCanvas');
const staticCtx = staticCanvas.getContext('2d');

function resizeStaticCanvas() {
    staticCanvas.width = window.innerWidth;
    staticCanvas.height = window.innerHeight;
}

function addTome(title, link, imgSrc) {
    const tomeContainer = document.querySelector('.tome-container');

    const newTome = document.createElement('a');
    newTome.href = link;
    newTome.className = 'tome';
    
    const img = document.createElement('img');
    img.src = imgSrc;
    img.alt = title;
    img.className = 'tome-icon';
    

    const span = document.createElement('span');
    span.className = 'book-title';
    span.innerText = title;
    

    newTome.appendChild(img);
    newTome.appendChild(span);
    

    tomeContainer.appendChild(newTome);
}


function loadTomesFromJSON() {
    fetch('tomes.json')
        .then(response => response.json())
        .then(data => {
            data.tomes.forEach(tome => {
                addTome(tome.title, tome.link, tome.image);
            });
        })
        .catch(error => console.error('Error loading tomes:', error));
}

window.onload = function() {
    loadTomesFromJSON();
};

function drawStatic() {
    const imageData = staticCtx.createImageData(staticCanvas.width, staticCanvas.height);
    const data = imageData.data;

    for (let i = 0; i < data.length; i += 4) {
        const randomColor = Math.random() * 255;
        data[i] = randomColor;
        data[i + 1] = randomColor;
        data[i + 2] = randomColor; 
        data[i + 3] = 10;          
    }

    staticCtx.putImageData(imageData, 0, 0);
}


window.addEventListener('resize', () => {
    resizeStaticCanvas();
    drawStatic();
});


resizeStaticCanvas();
setInterval(drawStatic, 100);

