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
            .then(() => res.json({ message: "Task found!" }))
            .catch(err => console.log("Error: " + err))
    })
    .post('/', (req, res) => {
        const { name, description, deadline } = req.body;
        let id = controller.createTask(name, description, deadline);
        console.log(id);
        res.send(req.body)
        res.send(id)
            .then(() => res.json({ message: 'Task created!' }))
            .catch(err => console.log("Error: " + err))
    })

    .put('/:id', (req, res) => {
        let id = req.params.id;
        const { name, description, deadline, status } = req.body;
        controller.updateTask(id, name, description, deadline, status);
        res.send(req.body)
            .then(() => res.json({ message: "Task updated!" }))
            .catch(err => {
                console.error("Error: " + err);
                if (err.stack) console.error(err.stack);
                res.status(500).send(err);
            });
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