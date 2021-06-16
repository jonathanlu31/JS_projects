const getTextButton = document.getElementById('get-text');
const getUserButton = document.getElementById('get-users');
const getAPIButton = document.getElementById('get-api');
const textArea = document.querySelector('.text-area');
const form = document.forms[0];
const title = form.querySelector('input');
const body = form.querySelector('textarea');

getTextButton.addEventListener('click', getText);
getUserButton.addEventListener('click', getUsers);
getAPIButton.addEventListener('click', getAPI);
form.addEventListener('submit', createPost);

function getText() {
    fetch('sample.txt')
    .then(res => res.text())
    .then(res => {
        textArea.textContent = res;
    })
}

function getUsers() {
    fetch('users.json')
    .then(res => res.json())
    .then(data => {
        let userFrag = '<h2 class="mb-4">Users</h2>';
        data.forEach(user => {
            userFrag += `
            <ul class='list-group mb-4'>
                <li class='list-group-item'>ID: ${user.id}</li>
                <li class='list-group-item'>Name: ${user.name}</li>
                <li class='list-group-item'>Email: ${user.email}</li>
            </ul>
            `
        });
        textArea.innerHTML = userFrag;
    })
}

function getAPI() {
    fetch('https://jsonplaceholder.typicode.com/posts')
    .then(res => res.json())
    .then(data => {
        data = data.slice(0, 10);
        let userFrag = '<h2 class="mb-4">Posts</h2>';
        data.forEach(post => {
            userFrag += `
            <div class='card card-body mb-3'>
                <h3 class='card-title'>${post.title}</h3>
                <p class='card-text'>${post.body}</p>
            </div>
            `
        });
        textArea.innerHTML = userFrag;
    })
}

function createPost(e) {
    e.preventDefault();
    fetch('https://jsonplaceholder.typicode.com/posts', {
        method: 'POST',
        headers: {
            'Accept': 'application/json, text/plain, */*',
            'Content-type': 'application/json'
        },
        body: JSON.stringify({
            'title': title.value,
            'body': body.value
        })
    }).then(res => res.json())
    .then(data => console.log(data));
    form.reset();
}