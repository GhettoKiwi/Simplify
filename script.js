
function update(){
    // Rests The inputboxes
    document.querySelector('# ID THORLEIF ?').innerHTML = " ";

    // Runs the methods
    getUsers();
    setOnClick();
}

async  function getUsers() {
    const [template, userResponse] = await Promise.all(
        [fetch('user.hbs'), fetch('/api/jokes')]);
    const [templateText, users] = await Promise.all(
        [template.text(), userResponse.json()]);
    const compiledTemplate = Handlebars.compile(templateText);
    let userHTML = '';
    users.forEach(user => {
        userHTML += compiledTemplate({
            username: user.username,
            rights: user.rights,
            position: user.position
        });
    });
    document.querySelector('HVAD END DER SKAL PUTTES I THORLEIF').innerHTML = userHTML;
};

//onclick
function setOnClick() {
    //On Click for Creating User
    document.querySelector('#btnCreateUser').onclick = () => {
        const user = {
            username: document.querySelector('#usernameInput').value;
            rights: document.querySelector('#rightsInput').value;
            position: document.querySelector('#positionInput').value;
        };
        fetch('/api/users', {
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
            .catch(fejl => console.log('Fejl: ' + fejl));
    };


};