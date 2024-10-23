
const beepSound = document.getElementById('beepSound');
const selectSound = document.getElementById('selectSound');


window.onload = () => {
    document.getElementById('introText').classList.add('visible');
    setTimeout(() => {
        document.getElementById('socomImage').classList.add('visible');
    }, 2000);
};


document.querySelectorAll('.menu-toggle, .menu-options a, .icon-container a').forEach(element => {
    element.addEventListener('mouseenter', () => {
        beepSound.currentTime = 0;
        beepSound.play();
    });
});

// Toggle the menu
const menuToggle = document.getElementById('menuToggle');
const menuOptions = document.getElementById('menuOptions');
menuToggle.addEventListener('click', () => {
    menuOptions.classList.toggle('show');
    menuToggle.classList.toggle('flipped');
});

// QR code functionality
const tmhIcon = document.querySelector('.icon-container a:last-child'); // TMH Icon
const qrCodeCanvas = document.getElementById('qrCode');

tmhIcon.addEventListener('click', () => {
    // Generate QR code
    const qr = new QRious({
        element: qrCodeCanvas,
        value: 'https://discord.gg/TMH',
        size: 100 // Size of the QR code
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
});

// Canvas for TV static
const staticCanvas = document.getElementById('staticCanvas');
const staticCtx = staticCanvas.getContext('2d');

function resizeStaticCanvas() {
    staticCanvas.width = window.innerWidth;
    staticCanvas.height = window.innerHeight;
}

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

