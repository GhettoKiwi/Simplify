const login = document.querySelector("#btnLogin");
const errorMsg = document.querySelector("#loginErrorMsg");
const username = document.querySelector("#usernameLoginInput");
const password = document.querySelector("#passwordLoginInput");

async function GET(url) {
    const OK = 200;
    let res = await fetch(url);
    if(res.status !== OK)
        throw new Error(res.status);
    return await res.json();
}

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
//bruges til at hashe password så den passer den i databasen
//hasher en string og returner et hash
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

function setOnClicks() {
    login.onclick = async () => {
        try{
            let newPassword = password.value.hashCode();
            const data = { username: username.value, password: newPassword};
            const answer = await POST('session/login', data);
            if(answer){
                window.location.href = "/web/frontpage";
            } else {
                errorMsg.innerHTML = "Forkert password, eller brugernavn";
            }
        } catch (e) {
            console.log("Server " + e.name + ": " + e.message);
            errorMsg.innerHTML = "Forkert password, eller brugernavn";
        }
    }
}

setOnClicks();



