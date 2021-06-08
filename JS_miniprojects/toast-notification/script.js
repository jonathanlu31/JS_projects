let toaster = document.getElementById('toasts');
let toastContainer = document.querySelector('.toast-container');
toasts.addEventListener('click', () => {
    let toast = document.createElement('div');
    toast.className = 'alert alert-primary';
    toast.textContent = 'a toast for a start to a new project series!';
    toastContainer.append(toast);
    setInterval(() => {
        toast.remove();
    }, 2000);
})