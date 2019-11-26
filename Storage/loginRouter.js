const controller = require("../Controllers/Controller");
const express = require('express');
const router = express.Router();

router
    .post('/login', async (req, res) => {
        let username = req.body.username;
        let password = req.body.password;

        const account = await controller.getUser_ByUsernameAndPassword(username, password);
            if(!account){
                console.log("Account is not in the database");
                res.send(account);
            } else {
                req.session.position = account.position;
                req.session.username = account.username;
                res.send(account);
            }

    })
    .get('/logout', (req, res) => {
        req.session.destroy((err) => {
            if (err) {
                console.log(err);
            } else {
                res.redirect('/');
            }
        });
    })
    .post('/username', (req, res) => {
        const name = req.session.username;
        res.send({currentUser: name});
    })
    .post('/accountPosition', (req, res) => {
        const position = req.session.position;
        res.send({pos: position});
    })
    .post('/checkIfLoggedIn', (req, res) => {
        if(!req.session.username) {
            res.send({ok: false});
        } else {
            res.send({ok: true});
        }
    });

module.exports = router;