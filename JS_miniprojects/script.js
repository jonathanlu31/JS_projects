let hamburger = document.querySelector('.ham-menu');
function openNav() {
    hamburger.classList.toggle('active');
    document.querySelector('ul').classList.toggle('active');
}

hamburger.addEventListener('click', openNav);

let toaster = document.getElementById('toasts');
toasts.addEventListener('click', () => {
    let toast = document.createElement('div');
    toast.className = 'alert alert-primary';
    toast.textContent = 'a toast for a start to a new project series!';
    toast.style.position = 'fixed';
    document.body.append(toast);
    setInterval(() => {
        toast.remove();
    }, 2000);
})