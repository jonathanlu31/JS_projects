const myLibrary = [];
const cardTemplate = `
<div class="card">
    <div class="card-body">
        <h2 class="card-title"></h2>
        <p class='card-text'></p>
        <p class='card-text'></p>
        <p class='card-text'></p> <!-- overflow for description -->
        <div class="form-check form-switch">
            <input class="form-check-input" type="checkbox" id="markRead">
            <label class="form-check-label" for="markRead">Mark as Read</label>
        </div>
    </div>
    <div class="card-footer">
        <button class="btn btn-outline-danger" id='remove-button'>Remove from library</button>
    </div>
</div>`

const bookForm = document.forms[0];
const submitButton = document.querySelector('#modal-submit');
submitButton.addEventListener('click', bookInput);
initialLibrary();

function Book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.description = '';
    this.read = read;
    this.info = () => {
        let readString = read ? 'read' : 'not read yet';
        return `${this.title} by ${this.author}, ${this.pages}, ${readString}`;
    }
}

function addBookToLibrary(book) {
    myLibrary.push(book);
}

function bookInput() {
    let userInputs = bookForm.querySelectorAll('input');
    userInputs = Array.from(userInputs);
    let newBook = new Book(...userInputs.map(input => {
        if (input.type === 'checkbox') {
            return input.checked;
        }
        return input.value
    }));
    addBookToLibrary(newBook);
    createBookCard(newBook);
}

function createBookCard(book) {
    const cardList = document.getElementById('cards').firstElementChild;
    cardList.insertAdjacentHTML('beforeend', cardTemplate);
    let card = cardList.lastElementChild;

    card.setAttribute('data-book-num', myLibrary.length - 1);
    card.querySelector('.card-title').textContent = book.title;
    let textItems = card.querySelectorAll('.card-text');
    textItems[0].textContent = `Author: ${book.author}`;
    textItems[1].textContent = `Number of pages: ${book.pages}`;
    textItems[2].textContent = `Description: ${book.description}`;

    initializeReadToggle(card, book);
    card.querySelector('#remove-button').addEventListener('click', removeBook);
}

function removeBook(event) {
    let closeCard = event.target.closest('.card');
    myLibrary.splice(+closeCard.dataset.bookNum, 1);
    closeCard.remove();
}

function initializeReadToggle(bookCard, book) {
    let toggle = bookCard.querySelector('#markRead');
    if (book.read) {
        toggle.checked = true;
    }
    toggle.addEventListener('click', () => {
        book.read = !book.read;
    })
}
//TODO fix bug

function initialLibrary() {
    let firstBook = new Book('The Hobbit', 'J.R.R. Tolkien', 310, true);
    addBookToLibrary(firstBook);
    createBookCard(firstBook);
}
/*
Extra functionality:
Let user move book cards around (drag card like hearthstone)
fetch the description from the internet
let user flip card over
storage (local or cloud)
*/