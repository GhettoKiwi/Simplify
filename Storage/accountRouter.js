const controller = require("../Controllers/Controller");
const express = require('express');
const router = express.Router();

router
    .get('/', (req, res) => {
        if (!req.session.username) {
            console.log("IKKE LOGGET IND, REDIRECTOR....");
            res.redirect('/');
        } else {
            controller.getUsers()
                .then(val => res.json(val))
                .catch(err => {
                    console.log(err);
                    res.status(500).send(err);
            });
        }
    })
    // HAR LAVET ELSE EFTER IF
    .post('/', (req, res) => {
            const {username, password, position} = req.body;
            controller.createUser(username, password, position)
                .then(() => res.json())
                .catch(err => {
                    console.error("Error: " + err);
                    if (err.stack) console.error(err.stack);
                    res.status(500).send(err);
                });
            res.send(req.body)
        })
    .get('/:id',(req, res) => {
        if (!req.session.username) {
            console.log("IKKE LOGGET IND, REDIRECTOR....");
            res.redirect('/');
        } else {
            const id = req.params.id
            controller.getUser(id)
                .then(result => res.json(result))
                .catch(err => console.log("Error: " + err));
        }
    })
    .get('/check', (req, res) => {
        if(!req.session.username){
            res.redirect('/');
        }
    })
    .delete('/:id', (req, res) => {
            let id = req.params.id;
            controller.deleteUser(id)
                .then(result => res.json(result))
                .catch(err => console.log("Error: " + err));
    });

module.exports = router;