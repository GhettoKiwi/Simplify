const usersUrl = 'https://jsonplaceholder.typicode.com/users';

async function GET(url) {
    const OK = 200;
    let response = await fetch(url);
    if (response.status !== OK)
        throw new Error("GET status code " + response.status);
    return await response.json();
}

function generateUserTable(users) {
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

async function main() {
    try {
        let users = await GET(usersUrl);
        document.body.innerHTML = generateUserTable(users);
    } catch (e) {
        console.log(e.name + ": " + e.message);
    }
}

main();
