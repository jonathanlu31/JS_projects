const slider = $('.img-container')
function moveSlider() {
    if (Math.abs(+slider.css('left').slice(0, -2)) > 700 * 4) {
        slider.css('left', 0);
    }
    slider.animate({
        left: '-=700px'
    }, 2000, moveSlider);
}

$(window).on('load', () => moveSlider());