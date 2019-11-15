const controller = require("../Controllers/Controller");
const express = require('express');
const router = express.Router();
//const fetch = require("node-fetch");
//const config = require('./config');

async function isAccountsValid(username, password) {
    let valid = false;
    console.log("Username: " + username + ", Password: " + password);
    const url = process.env.PORT+'/accounts' || 'http://localhost:8080/accounts';
    //const url_ = port + '/accounts';
    console.log(process.env.PORT);

    const response = await fetch(url);
    //const response = await fetch('http://localhost:8080/accounts');
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

let sessionChecker = (req, res, next) => {
    if (req.session.account ) { // Tilføj Cookies ?
        res.redirect('/dashboard');
    } else {
        next();
    }
}

router
    .post('/login', async (req, res) => {
        let username = req.body.username;
        let password = req.body.password;

        controller.getUser_ByUsernameAndPassword(username, password), function (err, account) {
            if(err){
                console.log("HER");
                console.log(err);
                console.log("HER");
                res.send({ok: false});
            }
            if(!account){
                res.send({ok: false});
            } else {
                req.session.account = account;
                res.send({ok: true});
            }
        }
    })
    // /frontpage.html
    .get('/dashboard', async (req, res) => {
        if(!req.session.account){
            document.querySelector("#loginErrorMsg").innerHTML = "Ingen adgang uden login";
            res.redirect('/index.html');
        } else {
            window.open('/frontpage.html', "_self");
            return res.status(200).send("Account Is Valid for Api")
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