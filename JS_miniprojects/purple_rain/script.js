const heart = document.createElement('i');
heart.className = 'fas fa-heart';

function addHeart() {
    const heartCopy = heart.cloneNode(false);
    const xPos = Math.round(Math.random() * 100);
    const fallDuration = Math.round(Math.random() * 800) + 2000; 
    heartCopy.style.left = xPos + 'vh';
    heartCopy.style.animationDuration = fallDuration + 'ms';
    document.body.append(heartCopy);
    setTimeout(() => heartCopy.remove(), 5000);
}

setInterval(addHeart, 300);