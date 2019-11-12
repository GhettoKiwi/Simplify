async  function getUsers() {
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



