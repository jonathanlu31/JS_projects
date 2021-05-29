document.head.insertAdjacentHTML('beforeend', `<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.1/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-+0n0xVW2eSR5OomGNYDnhzAbDsOXxcvSN1TPprVMTNDbiYZCxYbOOl7+AMvyTG2x" crossorigin="anonymous"></link>`)

let header = document.createElement('header');
header.innerHTML = '<h1>Item Lister</h1>';
document.body.append(header);
header.className = 'bg-primary px-5 py-4 text-light'

let container = document.createElement('div');
container.insertAdjacentHTML('beforeend', '<h2>Add Items</h2>');
container.classList.add('card-body')


let inputText = document.createElement('input');
inputText.type = 'text';
inputText.classList.add('form-control', 'w-75', 'd-inline', 'me-2', 'mb-3');
let submit = document.createElement('input');
submit.type = 'submit';
submit.classList.add('btn', 'btn-dark')

container.append(inputText, submit);
container.insertAdjacentHTML('beforeend', '<h2>Items</h2>');

let ul = document.createElement('ul');
ul.classList.add('list-group');
for (let i = 1; i < 5; i++) {
    let item = document.createElement('li');
    item.textContent = `Item ${i}`;
    item.className = 'list-group-item';
    ul.append(item);
}

container.append(ul);

let card = document.createElement('div');
card.classList.add('card', 'w-75', 'mx-auto', 'mt-4');
card.append(container);

document.body.append(card);
