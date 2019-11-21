const usernameInput = document.querySelector('#usernameInput');
const passwordInput = document.querySelector('#passwordInput');
const positionInput = document.querySelector('#positionInput');
const errMsg        = document.querySelector("#errorMsg");

async function POST(url, data) {
    const CREATED = 200;
    let res = await fetch(url, {
        method: "POST",
        body: JSON.stringify(data),
        headers: {'Content-Type': 'application/json'}
    });
    if (res.status !== CREATED) {
        console.log(res.status);
        throw new Error("POST status code " + res.status);
    }
    return await res.json();
};

function update() {
    usernameInput.value  = "";
    passwordInput.value  = "";
    positionInput.value  = "";
}

function checkIfFilled() {
    if(!usernameInput.value || !passwordInput.value || !positionInput.value) {
        return false;
    } else {
        return true;
    }
};

async function nameIsValid(name){
    const response = await fetch('/accounts');
    const accounts = await response.json();
    console.log(name);
    console.log(accounts);
    for(let i of accounts){
        if(name === i.username){
            console.log(i.username);
            return false;
        }
    }
    return true;
};

String.prototype.hashCode = function() {
    var hash = 0, i, chr;
    if (this.length === 0) return hash;
    for (i = 0; i < this.length; i++) {
        chr   = this.charCodeAt(i);
        hash  = ((hash << 5) - hash) + chr;
        hash |= 0; // Convert to 32bit integer
    }
    return hash;
};

async function setOnClick() {
    document.querySelector('#btnCreateUser').onclick = async () => {
        if (checkIfFilled()) {
            const valid = await nameIsValid(usernameInput.value);
            console.log(valid);
            if (valid == true) {
                const newPassword = passwordInput.value.hashCode();
                const msg = {
                    username: usernameInput.value,
                    password: newPassword,
                    position: positionInput.value
                };
                fetch('/accounts', {
                    method: "POST",
                    body: JSON.stringify(msg),
                    headers: {'Content-Type': 'application/json'}
                })
                    .then(response => {
                        if (response.status >= 400)
                            throw new Error(response.status);
                        else
                            update();
                        return response.json();
                    })
                    .catch(err => console.log('Error: ' + err));
            } else {
                errMsg.innerHTML = "Navn er allerede i brug";
            }
        } else {
            errMsg.innerHTML = "Alle felter skal være fyldte";
        }
    };
};

async function main(){
    const loggedIn = await POST('/session/checkIfLoggedIn');
    const position = await POST('/session/accountPosition');
    console.log(loggedIn.ok);
    if(!loggedIn.ok){
        window.location.replace('/');
    }
    if (position.pos == "Vicevært") {
        window.location.replace('/web/notAllowed');
    } else {
        await setOnClick();
    }
};

main();