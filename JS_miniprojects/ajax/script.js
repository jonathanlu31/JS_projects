const btn = document.getElementById('btn');
btn.addEventListener('click', getData);
let counter = 1;

function getData() {
    let request = new XMLHttpRequest();
    request.open('GET', `https://learnwebcode.github.io/json-example/animals-${counter}.json`);
    request.responseType = 'json';
    request.onload = () => displayData(request.response);
    request.send();
    counter++;
    if (counter > 3) {
        btn.hidden = true;
    }
}

function displayData(data) {
    let output = '';
    for (let obj of data) {
        output += `<p>${obj.name} is a ${obj.species} that likes`;
        
        let startingTxt;
        for (let i = 0; i < obj.foods.likes.length; i++) {
            if (i === 0) {
                startingTxt = ' '
            } else {
                startingTxt = ' and ';
            }
            output += startingTxt + obj.foods.likes[i];
        }

        output += ' and dislikes';
        for (let i = 0; i < obj.foods.dislikes.length; i++) {
            if (i === 0) {
                startingTxt = ' '
            } else {
                startingTxt = ' and ';
            }
            output += startingTxt + obj.foods.dislikes[i];
        }
        output += '.</p>'
    }
    document.body.insertAdjacentHTML('beforeend', output);
}