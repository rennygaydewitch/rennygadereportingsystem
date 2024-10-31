    const secretSequence = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a', 'Enter'];
    let keysPressed = [];

    function playSound() {
        const sound = document.getElementById('passcode');
        const gunsound = document.getElementById('gunshotSound');
        sound.play();
        gunsound.play();
        redirectToPage();
    }

    function flashScreen() {
        document.body.classList.add('flash');
        setTimeout(() => {
            document.body.classList.remove('flash');
        }, 300);
    }
    function redirectToPage() {
        setTimeout(() => {
            window.location.href = 'contra.html';
        }, 10000);
    }
    document.addEventListener('keydown', (event) => {
        keysPressed.push(event.key);

        if (keysPressed.join(',').includes(secretSequence.join(','))) {
            playSound();
            flashScreen();
            keysPressed = [];
        }
        if (keysPressed.length > secretSequence.length) {
            keysPressed.shift();
        }
    });