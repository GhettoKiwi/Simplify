const usersUrl = 'https://jsonplaceholder.typicode.com/users';

async function GET(url) {
    const OK = 200;
    let response = await fetch(url);
    if (response.status !== OK)
        throw new Error("GET status code " + response.status);
    return await response.json();
}

async function GETtext(url) {
    const OK = 200;
    let response = await fetch(url);
    if (response.status !== OK)
        throw new Error("GET status code " + response.status);
    return await response.text();
}

async function generateUserTable(users) {
    let template = await GETtext('/users.handlebars');
    let compiledTemplate = Handlebars.compile(template);
    return compiledTemplate({users}); // {users: users}
}

async function main() {
    try {
        let users = await GET(usersUrl);
        document.body.innerHTML = await generateUserTable(users);
    } catch (e) {
        console.log(e.name + ": " + e.message);
    }
}

main();