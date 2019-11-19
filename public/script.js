const login = document.querySelector("#btnLogin");
const errorMsg = document.querySelector("#loginErrorMsg");
const username = document.querySelector("#usernameLoginInput");
const password = document.querySelector("#passwordLoginInput");

/*
async function isAccountsValid(username, password) {
    let valid = false;
    console.log(username + ", " + password);
    const response = await fetch('/accounts');
    const accounts = await response.json();
    for (let i = 0; i < accounts.length; i++) {
        let tempAccount = accounts[i];
        if(tempAccount.username == username && tempAccount.password == password){
            valid = true;
            console.log("Valid: " + valid);
        }
    }
    return valid;
}

async function setOnClick() {
    login.onclick = async () => {
       let username = document.querySelector("#usernameLoginInput").value;
       let password = document.querySelector("#passwordLoginInput").value;
       if (await isAccountsValid(username, password)) {
            window.open('/frontpage.html', "_self");
       } else {
           document.querySelector("#loginErrorMsg").innerHTML = "Forkert kodeord eller brugernavn!";
       }
    }
}

setOnClick();
*/

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
}

function setOnClicks() {
    login.onclick = async () => {
        try{
            const data = { username: username.value, password: password.value};
            const answer = await POST('session/login', data);
            if(answer){
                window.location.href = "/frontpage.html";
            } else {
                //password.value = ""; reseter password if error
                errorMsg.innerHTML = "Forkert password, eller brugernavn";
            }
        } catch (e) {
            console.log("Server " + e.name + ": " + e.message);
            errorMsg.innerHTML = "Forkert password, eller brugernavn";
        }
    }
}

setOnClicks();

