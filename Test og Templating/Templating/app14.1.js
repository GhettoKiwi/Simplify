const express = require('express');
const app = express();
const fetch = require('node-fetch');

let usersUrl = 'https://jsonplaceholder.typicode.com/users';

async function GET(url) {
    const OK = 200;
    let response = await fetch(url);
    if (response.status !== OK)
        throw new Error(response.status);
    return await response.json();
}

function genererUserTabel(users) {
    let html = '<table>';

    for (user of users) {
        html += ' <tr><td>' + user.id +
            '</td><td>' + user.name +
            '</td><td>' + user.company.name +
            '</td></tr>\n';
    }
    html += '</table>';
    return html;
}

app.get('/', async (request, response) => {
    try {
        let users = await GET(usersUrl);
        let html = genererUserTabel(users);
        response.send(html);
    } catch (e) {
        if (typeof e.message === 'number')
            response.sendStatus(e.message);
        else {
            response.send(e.name + ": " + e.message);
        }
    }
}).listen(8080);

console.log('Lytter på port 8080 ...');
