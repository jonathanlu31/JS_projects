const slider = $('.img-container')
let interval;

function moveSlider() {
    slider.animate({
        left: '-=700px'
    }, 1000, () => {
        if (Math.abs(+slider.css('left').slice(0, -2)) > 700 * 4) {
            slider.css('left', 0);
        }
    });
}

function startSlider() {
    interval = setInterval(moveSlider, 2000)
}

function stopSlider() {
    clearInterval(interval);
}

slider.on('mouseenter', stopSlider).on('mouseleave', startSlider);

$(window).on('load', startSlider);