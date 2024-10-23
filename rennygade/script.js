const text = "Loading reporting system.....please wait!";
const speed = 80;
let index = 0;

function typeWriter() {
    if (index < text.length) {
        document.getElementById("typewriter").innerHTML += text.charAt(index);
        index++;
        setTimeout(typeWriter, speed);
    } else {
        setTimeout(showVideo, 5000);
    }
}

function showVideo() {
    const video = document.getElementById("reportVideo");
    document.getElementById("typewriter").style.display = "none";
    video.style.display = "block";
    video.volume = 1;
    video.play();
    speakText("THIS IS ANOTHER RENNYGADE CLASSIC");
    const overlayText = document.getElementById("overlayText");
    overlayText.style.display = "block";
}

function speakText(text) {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.volume = 1;
    speechSynthesis.speak(utterance);
    setInterval(() => speakText("THIS IS ANOTHER RENNYGADE CLASSIC"), 5000);
}

window.onload = function() {
    typeWriter();
};
