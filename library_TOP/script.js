let myLibrary = [];

function Book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
    this.info = () => {
        let readString = read ? 'read' : 'not read yet';
        return `${this.title} by ${this.author}, ${this.pages}, ${readString}`;
    }
}

function addBookToLibrary(book) {
    myLibrary.append(book);
}

/*
Extra functionality:
Let user move book cards around
*/