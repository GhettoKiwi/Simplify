const controller = require("../Controllers/Controller");
const express = require('express');
const router = express.Router();

router
    .get('/', (req, res) => {
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
    })
    .get('/:id',(req, res) => {
        const id = req.params.id
        controller.getUser(id)
            .then(result => res.json(result))
            .catch(err => console.log("Error: " + err));
    })
    .delete('/:id', (req, res) => {
          let id = req.params.id;
          controller.deleteUser(id)
              .then(result => res.json(result))
              .catch(err => console.log("Error: " + err));
    });

/*
controller.deleteUser(req.params.account)
            .then(() => res.json({ message: 'Account Deleted!'}))
            .catch(err => {
                console.error("Error: " + err);
                if (err.stack) console.error(err.stack);
                res.status(500).send(err);
            });
 */

module.exports = router;