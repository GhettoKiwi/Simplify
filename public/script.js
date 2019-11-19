const login = document.querySelector("#btnLogin");
const errorMsg = document.querySelector("#loginErrorMsg");
const username = document.querySelector("#usernameLoginInput");
const password = document.querySelector("#passwordLoginInput");

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



