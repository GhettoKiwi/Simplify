const controller = require("../Controllers/Controller");
const express = require('express');
const router = express.Router();

router
    .get('/', (req, res) => {
        if (!req.session.username) {
            res.redirect('/');
        }
        controller.getUsers()
            .then(val => res.json(val))
            .catch(err => {
                console.log(err);
                res.status(500).send(err);
            });
    })
    .post('/', (req, res) => {
        const {username, password, rights, position} = req.body;
        controller.createUser(username, password, position, rights)
            .then(() => res.json({}))
            .catch(err => {
                console.error("Error: " + err);
                if (err.stack) console.error(err.stack);
                res.status(500).send(err);
            });
        res.send(req.body)
    })
    .get('/:id',(req, res) => {
        if (!req.session.username) {
            res.redirect('/');
        }
        const id = req.params.id
        controller.getUser(id)
            .then(result => res.json(result))
            .catch(err => console.log("Error: " + err));
    })
    .delete('/:id', (req, res) => {
        // start af ændring
        if(req.session.position == "Ejedomsmester" || req.session.position == "Ejedomsdirektør"){
            //til her
            let id = req.params.id;
            controller.deleteUser(id)
                .then(result => res.json(result))
                .catch(err => console.log("Error: " + err));
            //start her
        }else {
            let id = "0";   
            function returnUndefined() {
             return undefined
            }
            returnUndefined()
                .then(result => res.json(result))
                .catch(err => console.log("Error: " + err));
        }//slut her

    });

module.exports = router;