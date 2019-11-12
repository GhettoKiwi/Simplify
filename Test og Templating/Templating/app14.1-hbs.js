const express = require('express');
const app = express();
const fetch = require('node-fetch');
const hbs = require('hbs');

app.set('view engine', 'hbs');
app.set('views', 'templates');

let usersUrl = 'https://jsonplaceholder.typicode.com/users';

async function GET(url) {
    const OK = 200;
    let response = await fetch(url);
    if (response.status !== OK)
        throw new Error(response.status);
    return await response.json();
}

app.get('/', async (request, response) => {
    try {
        let users = await GET(usersUrl);
        response.render('index.hbs', {
            title: 'Users - opgave 14.1 - hbs',
            users: users
        });
    } catch (e) {
        if (typeof e.message === 'number')
            response.sendStatus(e.message);
        else {
            response.send(e.name + ": " + e.message);
        }
    }
}).listen(8080);

console.log('Lytter på port 8080 ...');
