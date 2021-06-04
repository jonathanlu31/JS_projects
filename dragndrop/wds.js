document.querySelectorAll('.draggable').forEach(item => {
    item.addEventListener('dragstart', dragStart);
    item.addEventListener('dragend', dragEnd);
})

function dragStart() {
    this.classList.add('dragging');
}

function dragEnd(e) {
    this.classList.remove('dragging');
}

function getClosestElem(elems, y) {
    for (let elem of elems) {
        let elemBox = elem.getBoundingClientRect();
        if (y - (elemBox.top + elemBox.bottom) / 2 < 0) {
            return elem;
        }
    }
}

document.querySelectorAll('.container').forEach(item => {
    item.addEventListener('dragover', e => {
        e.preventDefault();
        let draggables = item.querySelectorAll('.draggable:not(.dragging)');
        let drag = document.querySelector('.dragging');
        let closestElem = getClosestElem(draggables, e.clientY);
        if (closestElem === undefined) {
            item.append(drag);
        } else {
            closestElem.before(drag);
        }
    })
})