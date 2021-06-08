let hamburger = document.querySelector('.ham-menu');
function openNav() {
    hamburger.classList.toggle('active');
    document.querySelector('ul').classList.toggle('active');
}

hamburger.addEventListener('click', openNav);