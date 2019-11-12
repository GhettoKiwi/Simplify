

//onclick
async function setOnClick() {
    //On Click for Creating User
    document.querySelector('#btnCreateUser').onclick = () => {
        console.log("TRYKKET 1");
        const msg = {
            username: document.querySelector('#usernameInput').value,
            password: document.querySelector('#passwordInput').value,
            rights: document.querySelector('#rightsInput').value,
            position: document.querySelector('#positionInput').value
        };
        console.log("TRYKKET 2");
        fetch('/users', {
            method: "POST",
            body: JSON.stringify(msg),
            headers: {'Content-Type': 'application/json'}
        })
            .then(response => {
                if (response.status >= 400)
                    throw new Error(response.status);
                else
                    console.log("** JSON WAS HERE **");
                return response.json();
            })
            .then(resultat => console.log(`Resultat: %o`, resultat))
            .catch(err => console.log('Error: ' + err));
    };
};

setOnClick();