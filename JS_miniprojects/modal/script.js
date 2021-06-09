// let modal = document.querySelector('.my-modal');
// let openButton = document.querySelector('#open-modal');

// function createCover() {
//     let cover = document.createElement('div');
//     cover.className = 'cover';
//     document.body.append(cover);
// }

// function openModal() {
//     createCover();
//     openButton.style.display = 'none';
//     showModal();
// }

// function showModal() {
//     modal.style.display = 'block';
//     modal.style.opacity = 1;
//     let closeButton = document.getElementById('close-button');
//     closeButton.addEventListener('click', hideModal);
// }

// function hideModal() {
//     document.querySelector('.cover').remove();
//     modal.style.display = 'none';
//     modal.style.opacity = 0;
//     this.removeEventListener('click', hideModal);
//     openButton.style.display = 'block'
// }

// document.querySelector('#open-modal').addEventListener('click', openModal);

const modalContainer = document.querySelector('.modal-container');
const openButton = document.querySelector('#open-modal');
const closeButton = document.querySelector('#close-button');

openButton.addEventListener('click', () => {
    modalContainer.classList.add('active');
    document.querySelector('.my-modal').classList.add('active');
})

closeButton.addEventListener('click', closeModal)

modalContainer.addEventListener('click', function(e) {
    if (e.target === this) {
        closeModal();
    }
})

function closeModal() {
    modalContainer.classList.remove('active');
    document.querySelector('.my-modal').classList.remove('active');
}