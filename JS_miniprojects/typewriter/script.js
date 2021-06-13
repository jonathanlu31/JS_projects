const TypeWriter = function(txtElement, words, wait = 2000) {
    this.txtElement = txtElement;
    this.words = words;
    this.wait = +wait;
    this.txt = '';
    this.wordIndex = 0;
    this.isDeleting = false;
    this.type();
}

TypeWriter.prototype.type = function() {
    this.wordIndex %= this.words.length;
    const currWord = this.words[this.wordIndex];

    if (this.isDeleting) {
        this.txt = currWord.substring(0, this.txt.length - 1);
    } else {
        this.txt = currWord.substring(0, this.txt.length + 1);
    }

    let displayTxt = this.txt.replace(/\s/g, '&nbsp;');

    this.txtElement.html(displayTxt);

    let typeSpeed = this.isDeleting ? 100 : 300;

    if (!this.txt.length) {
        this.isDeleting = false;
        this.wordIndex++;
        typeSpeed = 500;
    } else if (this.txt.length === currWord.length) {
        this.isDeleting = true;
        typeSpeed = this.wait;
    }

    setTimeout(() => this.type(), typeSpeed);
}

function init() {
    const typeArea = $('#type-box');
    const words = JSON.parse(typeArea.attr('data-words'));

    new TypeWriter(typeArea, words);
}

$(() => init());

// function type(word, callback) {
//     const chars = word.split('');
//     let currChar = 0;
//     setTimeout(function typeChar() {
//         if (currChar === chars.length) {
//             setTimeout(() => {
//                 typeArea.textContent = '';
//                 callback(null, 0);
//             }, intervalTime);
//             return;
//         }
//         typeArea.innerHTML += chars[currChar] === ' ' ? '&nbsp;' : chars[currChar];
//         currChar++;
//         setTimeout(typeChar, intervalTime);
//     }, intervalTime)
// }
//     let i = 0;
//     type(words[i], function loop() {
//         i++;
//         if (i === words.length) {
//             i = 0;
//         }
//         type(words[i], loop);
//     });