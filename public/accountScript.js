let clickedAccountId = "5dcbe0851d3c7d081c781a08"; // Test

async function findAccount() {
    const response = await fetch('/accounts');
    const accounts = await response.json();
    const foundAccount = accounts.find(account => account._id == clickedAccountId);
    return foundAccount;
};

function setOnClick() {
    document.getElementById('#btnRemoveAccount').onclick = async () => {
        try {
            const foundAccount = await findAccount();
            const url = '/accounts/' + foundAccount._id;
            console.log(url);
            const res = await fetch(url, {
                method: "DELETE",
            })
            if (res.status >= 400 || !res) {
                throw new Error('Failed to fetch');
            }
            const json = await res.json();
            console.log('Result: %o', json);
        } catch (e) {
            console.log("Error: " + e);
        }
    };
};

function update(){
    getUsers();
}

async function getUsers() {
    const [template, userResponse] = await Promise.all(
        [fetch('user.hbs'), fetch('/accounts')]);
    const [templateText, users] = await Promise.all(
        [template.text(), userResponse.json()]);
    console.log(users);
    const compiledTemplate = Handlebars.compile(templateText);
    let userHTML = '';
    users.forEach(user => {
        userHTML += compiledTemplate({
            username: user.username,
            position: user.position
        });
    });
    console.log(userHTML);
    document.querySelector('#scrollBoxAccounts').innerHTML = userHTML;
};

update();
//setOnClick();