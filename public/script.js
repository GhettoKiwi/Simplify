const login = document.querySelector("#btnLogin");
const errorMsg = document.querySelector("#loginErrorMsg");
const username = document.querySelector("#usernameLoginInput");
const password = document.querySelector("#passwordLoginInput");

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

 /*
async function POST(url, data) {
    const CREATED = 200;
    console.log("ER INDE I POST");
    console.log(url);
    let res = await fetch(url, {
        method: "POST",
        //mode: 'cors',
        body: JSON.stringify(data),
        headers: {'Content-Type': 'application/json'}
});
    if(res.status !== CREATED){
        throw new Error("POST status code " + res.status);
    }
    console.log("RETURNER POST");
    return await res.json();
}

function setOnClicks() {
    login.onclick = async () => {
        try{
            console.log("FØR POST KØRES");
            const data = { username: username.value, password: password.value};
            const answer = await POST('/login', data);
            console.log("EFTER POST ER KØRT");
            console.log("Svar fra POST: " + answer.ok.toString());
            if(answer.ok){
                window.location.href = "/frontpage.html";
            } else {
                //password.value = ""; reseter password if error
                errorMsg.innerHTML = "Forkert password, eller brugernavn";
            }
        } catch (e) {
            errorMsg.innerHTML = "Server " + e.name + ": " + e.message;
        }
    }
}

setOnClicks();
*/
