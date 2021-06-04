const fill = document.querySelector('.fill');
const empties = document.querySelectorAll('.empty');

fill.addEventListener('dragstart', dragStart);
fill.addEventListener('dragend', dragEnd);
empties.forEach(item => {
    item.addEventListener('dragenter', dragEnter);
    item.addEventListener('dragover', dragOver);
    item.addEventListener('dragleave', dragLeave);
    item.addEventListener('drop', dragDrop);
});

function dragStart() {
    this.classList.add('hold');
    setTimeout(() => this.classList.add('invisible'), 0);
}

function dragEnd() {
    this.classList.remove('invisible', 'hold');
}

function dragEnter() {
    this.classList.add('hover');
}

function dragLeave() {
    this.classList.remove('hover');
}

function dragOver(e) {
    e.preventDefault();
}

function dragDrop() {
    this.append(fill);
    this.className = 'empty';
}