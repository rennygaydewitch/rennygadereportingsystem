document.addEventListener('DOMContentLoaded', function() {  
    const tomeContainer = document.querySelector('.tome-container');

    if (tomeContainer) {
        fetch('tomes.json')
            .then(response => {
                console.log("Fetching JSON...");
                if (!response.ok) {
                    throw new Error('Network response was not ok: ' + response.statusText);
                }
                return response.json();
            })
            .then(data => {
                console.log("JSON data loaded:", data);
                data.tomes.forEach(tome => {
                    addTome(tome.title, tome.link, tome.image);
                });
            })
            .catch(error => console.error('Error loading tomes:', error));
    } else {
        console.log('No tome container found on this page.');
    }
    const menuToggle = document.getElementById('menuToggle');
    const menuOptions = document.getElementById('menuOptions');
    if (menuToggle && menuOptions) {
        menuToggle.addEventListener('click', () => {
            menuOptions.classList.toggle('show');
            menuToggle.classList.toggle('flipped');
            if (menuOptions.classList.contains('show')) {
                tomeContainer?.classList.add('slide-down');
            } else {
                tomeContainer?.classList.remove('slide-down');
            }
        });
    }

    const clickableElements = document.querySelectorAll('.menu-toggle, .menu-options a, .tome, #socomImage, #tmhIcon');
    clickableElements.forEach(element => {
        element.addEventListener('mouseenter', () => {
            const beepSound = document.getElementById('beepSound');
            if (beepSound) {
                beepSound.currentTime = 0;
                beepSound.play();
            }
        });
    });

    clickableElements.forEach(element => {
        element.addEventListener('click', () => {
            const selectSound = document.getElementById('selectSound');
            if (selectSound) {
                selectSound.currentTime = 0;
                selectSound.play();
            }
        });
    });

    const staticCanvas = document.getElementById('staticCanvas');
    if (staticCanvas) {
        const ctx = staticCanvas.getContext('2d');
        staticCanvas.width = window.innerWidth;
        staticCanvas.height = window.innerHeight;

        function drawStatic() {
            const imageData = ctx.createImageData(staticCanvas.width, staticCanvas.height);
            for (let i = 0; i < imageData.data.length; i += 4) {
                const color = Math.random() * 255;
                imageData.data[i] = color;
                imageData.data[i + 1] = color;
                imageData.data[i + 2] = color;
                imageData.data[i + 3] = 20;
            }
            ctx.putImageData(imageData, 0, 0);
        }
        setInterval(drawStatic, 100);
    }

    const socomImage = document.getElementById('socomImage');
    if (socomImage) {
        socomImage.style.opacity = '0';
        socomImage.style.transition = 'opacity 2s ease';
        setTimeout(() => {
            socomImage.style.opacity = '1';
        }, 2000);

        socomImage.addEventListener('click', () => {
            socomImage.style.display = 'none';
            document.body.style.cursor = 'url(media/socom.png), auto';
            const gunshotSound = document.getElementById('gunshotSound');
            if (gunshotSound) {
                gunshotSound.currentTime = 0;
                gunshotSound.play();
            }
        });
    }

    window.addEventListener('load', () => {
        const tmhIcon = document.getElementById('tmhIcon');
        const qrCodeCanvas = document.getElementById('qrCode');
        if (tmhIcon && qrCodeCanvas) {
            tmhIcon.addEventListener('click', (e) => {
                e.preventDefault();
                console.log("Generating QR Code...");
                try {
                    if (typeof QRious !== 'undefined') {
                        const qr = new QRious({
                            element: qrCodeCanvas,
                            value: 'https://discord.gg/TMH',
                            size: 100
                        });
                        qrCodeCanvas.style.display = 'block';
                        qrCodeCanvas.style.opacity = '0';
                        setTimeout(() => {
                            qrCodeCanvas.style.transition = 'opacity 2s';
                            qrCodeCanvas.style.opacity = '1';
                        }, 10);
                    } else {
                        console.error('QRious library is not loaded.');
                    }
                } catch (error) {
                    console.error('Error generating QR Code:', error);
                }
            });
        } else {
            console.error('TMH Icon or QR Code canvas not found.');
        }
    });
});

function addTome(title, link, imgSrc) {
    const tomeContainer = document.querySelector('.tome-container');

    if (!tomeContainer) {
        console.error('Tome container element not found. Please make sure the element with class "tome-container" exists.');
        return;
    }

    const newTome = document.createElement('a');
    newTome.href = link;
    newTome.className = 'tome';
    newTome.target = '_blank';

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

window.addEventListener('DOMContentLoaded', function() {
    const introText = document.getElementById('introText');

    if (introText) {
        introText.classList.add('visible');
    } else {
        console.error('Intro text element not found. Please make sure the element with id "introText" exists.');
    }
});

document.addEventListener('DOMContentLoaded', () => {
    const infoText = document.getElementById('introText');
    const searchBar = document.getElementById('searchBar');
    const searchResults = document.getElementById('searchResults');

    fetch('resources.json')
        .then(response => response.json())
        .then(resources => {
            searchBar.addEventListener('input', () => {
                const query = searchBar.value.toLowerCase();
                searchResults.innerHTML = '';
                searchResults.style.display = query ? 'block' : 'none';

                resources.filter(resource => resource.name.toLowerCase().includes(query))
                    .forEach(match => {
                        const div = document.createElement('div');
                        div.classList.add('search-item');
                        div.textContent = match.name;
                        div.addEventListener('click', () => {
                            infoText.textContent = match.info;
                            searchResults.style.display = 'none';
                            searchBar.value = '';
                        });
                        searchResults.appendChild(div);
                    });
            });
        })
});

