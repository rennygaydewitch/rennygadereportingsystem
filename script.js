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

const menuToggle = document.getElementById('menuToggle');
const menuOptions = document.getElementById('menuOptions');
menuToggle.addEventListener('click', () => {
    menuOptions.classList.toggle('show');
    menuToggle.classList.toggle('flipped');
    selectSound.currentTime = 0;
    selectSound.play();
});

const tmhIcon = document.querySelector('.tmh-icon');
const qrCodeCanvas = document.getElementById('qrCode');

tmhIcon.addEventListener('click', (event) => {
    event.preventDefault();
    const qr = new QRious({
        element: qrCodeCanvas,
        value: 'https://discord.gg/TMH',
        size: 200
    });

    qrCodeCanvas.style.display = 'block';
    qrCodeCanvas.style.opacity = 0;
    qrCodeCanvas.style.transition = 'opacity 2s';
    setTimeout(() => {
        qrCodeCanvas.style.opacity = 1;
    }, 50);
});

const socomImage = document.getElementById('socomImage');
socomImage.addEventListener('click', () => {
    socomImage.style.display = 'none';
    document.body.style.cursor = 'url(media/socom.png), auto';
});
