let clickedAccountId = "";

function saveClicked(clickedInput){
    clickedAccountId = clickedInput;
};

async function findAccount(input) {
    const username = input.substring(0, input.indexOf(','));
    console.log(username);
    const response = await fetch('/accounts');
    const accounts = await response.json();
    const foundAccount = accounts.find(account => account.username == username);
    return foundAccount;
};

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

function setOnClick() {
    document.querySelector('#btnRemoveAccount').onclick = async () => {
            const foundAccount = await findAccount(clickedAccountId);
            const url = '/accounts/' + foundAccount._id;
            const res = await fetch(url, {
                method: "DELETE",
            });
            if (res.status >= 400 || !res) {
                console.log("T1");
                throw new Error('Failed to fetch');
            };
            await getUsers();
            const json = await res.json();
            console.log('Result: %o', json);
    };
};

setOnClick();
getUsers();