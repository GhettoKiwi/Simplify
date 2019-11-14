const controller = require("../Controllers/Controller");
const express = require('express');
const router = express.Router();


router
    .get('/getTasks', (req, res) => {
        controller.getTasks()
            .then(val => res.json(val))
            .catch(err => {
                console.log(err);
                res.status(500).send(err);
            });
    })
    .post('/', (req, res) => {
        const {name, description, deadline} = req.body;
        controller.createTask(name, description, deadline)
            .then(() => res.send(req.body))
            .catch(err => {
                console.error("Error: " + err);
                if (err.stack) console.error(err.stack);
                res.status(500).send(err);
            });
    });

module.exports = router;