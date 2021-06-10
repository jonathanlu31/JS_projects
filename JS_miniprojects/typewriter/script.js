const words = ['carbon dioxide', 'websites', 'bad jokes'];
const typeArea = document.getElementById('type-box');
const intervalTime = 400;

function type(word) {
    const chars = word.split('');
    let currChar = 0;
    return new Promise((resolve, reject) => {
        setTimeout(function typeChar() {
            if (currChar === chars.length) {
                setTimeout(() => {
                    typeArea.textContent = '';
                    resolve();
                }, intervalTime);
                return;
            }
            typeArea.innerHTML += chars[currChar] === ' ' ? '&nbsp;' : chars[currChar];
            currChar++;
            setTimeout(typeChar, intervalTime);
        }, intervalTime)
    })
}
    let i = 0;
    type(words[i]).then(function loop() {
        i++;
        if (i === words.length) {
            i = 0;
        }
        type(words[i]).then(loop);
    });