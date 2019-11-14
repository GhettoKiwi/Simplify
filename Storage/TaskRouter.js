const controller = require("../Controllers/Controller");
const express = require('express');
const router = express.Router();


router
    .get('/', (req, res) => {
        controller.getTasks()
            .then(val => res.json(val))
            .catch(err => {
                console.log(err);
                res.status(500).send(err);
            });
    })
    .get('/:id', (req, res) => {
        const id = req.params.id
        controller.getTask(id)
            .then(result => res.json(result))
            .catch(err => console.log("Error: " + err));
    })
    .post('/', (req, res) => {
        try {
            const { name, description, deadline } = req.body;
            controller.createTask(name, description, deadline);
            res.send(req.body)
            console.log(res._id)
        }
        catch (error) {
            if (typeof error.message === 'number')
                res.sendStatus(error.message);
            else {
                res.send(error.name + ": " + error.message);
            }
        }
    })
    .put('/:id', (req, res) => {
        try {
            let id = req.params.id;
            const { name, description, deadline, status } = req.body;
            controller.updateTask(id, name, description, deadline, status);
            res.send(req.body)
        }
        catch (error) {
            if (typeof error.message === 'number')
                res.sendStatus(error.message);
            else {
                res.send(error.name + ": " + error.message);
            }
        }
    })
    .delete('/:id', (req, res) => {
        let id = req.params.site;
        controller.deleteTask(id)
            .then(() => res.json({ message: "Task deleted!" }))
            .catch(err => {
                console.error("Error: " + err);
                if (err.stack) console.error(err.stack);
                res.status(500).send(err);
            });
    });

module.exports = router;