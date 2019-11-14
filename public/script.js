
function update(){
    document.querySelector("#usernameLoginInput").innerHTML = " ";
    document.querySelector("#passwordLoginInput").innerHTML = " ";

}

async function getUsers() {
    const [template, userResponse] = await Promise.all(
        [fetch('user.hbs'), fetch('/users')]);
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
    //document.querySelector('HVAD END DER SKAL PUTTES I THORLEIF').innerHTML = userHTML;
};

async function isAccountsValid(username, password) {
    let valid = false;
    console.log(username + ", " + password);
    const response = await fetch('/accounts');
    const accounts = await response.json();
    console.log("Accounts: " + accounts);
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
    document.querySelector("#btnLogin").onclick = async () => {
       let username = document.querySelector("#usernameLoginInput").value;
       let password = document.querySelector("#passwordLoginInput").value;
       if (await isAccountsValid(username, password)) {
            window.open('/frontpage.html');
       } else {
           document.querySelector("#loginErrorMsg").innerHTML = "** Forkert kodeord eller brugernavn! **";
           update();
       }
    }
}


setOnClick();


