const imgStrip = document.querySelector('.img-container');
const prevBtn = document.getElementById('left-btn');
const nextBtn = document.getElementById('right-btn');
const carouselImgs = document.querySelectorAll('.img-container img');

let counter = 1;
const WIDTH = 700;

prevBtn.addEventListener('click', () => moveStrip(-1))
nextBtn.addEventListener('click', () => moveStrip(1))

imgStrip.addEventListener('transitionend', loopImgs);

function moveStrip(dir) {
    if (!counter) {
        return;
    } else if (counter === carouselImgs.length - 1) {
        return;
    }
    counter += dir;
    imgStrip.style.transform = `translateX(${-counter * WIDTH}px)`;
}

function loopImgs() {
    if (!counter) {
        counter = carouselImgs.length - 2;
    } else if (counter === carouselImgs.length - 1) {
        counter = 1;
    }
    imgStrip.style.transition = 'none';
    imgStrip.style.transform = `translateX(${-counter * WIDTH}px)`;
    setTimeout(() => imgStrip.style.transition = 'transform 400ms', 0);
}