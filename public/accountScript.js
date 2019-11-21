let clickedAccountId = "";

function saveClicked(clickedInput){
    clickedAccountId = clickedInput;
};

async function findAccount(input) {
    const username = input.substring(0, input.indexOf(','));
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
    const compiledTemplate = Handlebars.compile(templateText);
    let userHTML = '';
    users.forEach(user => {
        userHTML += compiledTemplate({
            username: user.username,
            position: user.position
        });
    });
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
                throw new Error('Failed to fetch');
            };
            await getUsers();
            //const json = await res.json();
    };
};

// -------------------- Valid Check Functions
async function POST(url, data) {
    const CREATED = 200;
    let res = await fetch(url, {
        method: "POST",
        body: JSON.stringify(data),
        headers: {'Content-Type': 'application/json'}
    });
    if(res.status !== CREATED){
        console.log(res.status);
        throw new Error("POST status code " + res.status);
    }
    return await res.json();
};

async function checkIFLoggedIn(){
    const loggedIn = await POST('/session/checkIfLoggedIn');
    const position = await POST('/session/accountPosition');
    console.log(loggedIn.ok);
    if(!loggedIn.ok){
        window.location.replace('/');
    }
    if(position.pos == "Vicevært"){
        window.location.replace('/web/notAllowed');
    } else {
        await getUsers();
        await setOnClick();
    }
};

checkIFLoggedIn();