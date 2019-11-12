update();

function update(){
    // Rests The inputboxes
    document.querySelector('#usernameInput').innerHTML  = " ";
    document.querySelector('#passwordInput').innerHTML  = " ";
    document.querySelector('#rightsInput').innerHTML    = " ";
    document.querySelector('#positionInput').innerHTML  = " ";

    // Runs the methods
    console.log("USER HERE")
    getUsers();
    console.log("ON CLICK")
    setOnClick();
}

async  function getUsers() {
    const [template, userResponse] = await Promise.all(
        [fetch('user.hbs'), fetch('/api/users')]);
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

//onclick
function setOnClick() {
    //On Click for Creating User
    document.querySelector('#btnCreateUser').onclick = () => {
        console.log("TRYKKET");
        const user = {
            username: document.querySelector('#usernameInput').value,
            password: document.querySelector('#passwordInput').value,
            rights: document.querySelector('#rightsInput').value,
            position: document.querySelector('#positionInput').value
        };
        fetch('/post', {
            method: "POST",
            body: JSON.stringify(user),
            headers: {'Content-Type': 'application/json'}
        })
            .then(response => {
                if (response.status >= 400)
                    throw new Error(response.status);
                else
                    update();
                return response.json();
            })
            .then(resultat => console.log(`Resultat: %o`, resultat))
            .catch(err => console.log('Error: ' + err));
    };
};



