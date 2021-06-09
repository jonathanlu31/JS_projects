let modal = document.querySelector('.my-modal');
let openButton = document.querySelector('#open-modal');

function createCover() {
    let cover = document.createElement('div');
    cover.className = 'cover';
    document.body.append(cover);
}

function openModal() {
    createCover();
    openButton.style.display = 'none';
    showModal();
}

function showModal() {
    modal.style.display = 'block';
    modal.style.opacity = 1;
    let closeButton = document.getElementById('close-button');
    closeButton.addEventListener('click', hideModal);
}

function hideModal() {
    document.querySelector('.cover').remove();
    modal.style.display = 'none';
    modal.style.opacity = 0;
    this.removeEventListener('click', hideModal);
    openButton.style.display = 'block'
}

document.querySelector('#open-modal').addEventListener('click', openModal);