// function getSum(num1: any, num2: any): number {
//     return num1 + +num2;
// }
// console.log(getSum(3, '4'))
// function getName(firstName: string, lastName?: string): string {
//     if (typeof lastName === 'undefined') {
//         return firstName;
//     }
//     return firstName + ' ' + lastName;
// }
// console.log(getName('John'));
// interface Todo {
//     title: string;
//     text: string;
// }
// function showTodo(todo: Todo) {
//     console.log(todo.title + ': ' + todo.text);
// }
// let myTodo: Todo = {title: 'Chimken', text: 'defrost the meat'};
// showTodo(myTodo);
// interface PersonInterface {
//     name: string;
//     email: string;
//     age: number;
// }
// class Person implements PersonInterface {
//     name: string;
//     email: string;
//     age;
//     constructor(name: string, email: string, age: number) {
//         this.name = name;
//         this.email = email;
//         this.age = age;
//         console.log(`User created: ${this.name}`);
//     }
// }
// class Member extends Person {
//     id: number;
//     constructor(name: string, email: string, age: number) {
//         super(name, email, age);
//         this.id = Math.floor(Math.random() * 10_000);
//     }
// }
// let john: Member;
// john = new Member('John Doe', 'j@gamil.com', 24);
// console.log(john.age);
var getTodos = function (callback) {
    var request = new XMLHttpRequest();
    request.addEventListener('readystatechange', function () {
        if (request.readyState === 4 && request.status === 200) {
            callback(null, JSON.parse(request.responseText));
        }
        else if (request.readyState === 4) {
            callback('could not get data', null);
        }
    });
    request.open('GET', 'https://jsonplaceholder.typicode.com/todos/1');
    request.send();
};
getTodos(function (err, data) {
    if (err) {
        console.log(err);
    }
    else {
        console.log(data);
    }
});
