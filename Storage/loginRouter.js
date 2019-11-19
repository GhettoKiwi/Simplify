const controller = require("../Controllers/Controller");
const express = require('express');
const router = express.Router();

let sessionChecker = (req, res, next) => {
    if (req.session.username) { // Tilføj Cookies ?
        res.redirect('/dashboard');
    } else {
        next();
    }
}

router
    .post('/login', async (req, res) => {
        let username = req.body.username;
        let password = req.body.password;

        const account = await controller.getUser_ByUsernameAndPassword(username, password);
            if(!account){
                console.log("Account is not in the database");
                res.send(account);
            } else {
                req.session.username = account.username;
                res.send(account);
            }

    })
    .get('/logout', (req, res) => {
        req.session.destroy((err) => {
            if (err) {
                console.log(err);
            } else {
                res.redirect('/index.html');
            }
        });
    });

module.exports = router;