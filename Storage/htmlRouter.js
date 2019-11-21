const express = require('express');
const router = express.Router();

router
    .get('/frontpage', (req, res) => {
        if (!req.session.username) {
            res.redirect('/');
        } else {
            res.redirect("/frontpage.html");
        }
    })
    .get('/notAllowed', (req, res) => {
            res.redirect("/notAllowed.html");
    })
    .get('/createAccount', (req, res) => {
        if (!req.session.username) {
           res.redirect('/');
        }
        if (req.session.position !== "Vicevært") {
            res.redirect('/signUp.html');
        } else {
            res.redirect('/web/notAllowed');
        }
    })
    .get('/deleteAccount', (req, res) => {
        if (!req.session.username) {
            res.redirect('/');
        }
        if (req.session.position !== "Vicevært") {
            res.redirect('/account.html');
        } else {
            res.redirect('/web/notAllowed');
        }
    });

module.exports = router;


