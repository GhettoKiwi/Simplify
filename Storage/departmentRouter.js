const controller = require("../Controllers/Controller");
const express = require('express');
const router = express.Router();

router
    .get('/', (req, res) => {
        if (!req.session.username) {
            res.redirect('/');
        } else {
            controller.getDepartments()
                .then(val => res.json(val))
                .catch(err => {
                    console.log(err);
                    res.status(500).send(err);
                });
        }
    })
    .get('/:id', (req, res) => {
        if (!req.session.username) {
            res.redirect('/');
        } else {
            const id = req.params.id
            controller.getDepartment(id)
                .then(result => res.json(result))
                .catch(err => console.log("Error: " + err));
        }
    })
    .put('/put/:id', (req, res) => {
    try {
            let depId = req.params.id;
            const {tasks} = req.body;
            controller.addTaskToDepartment(depId, tasks)
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
    .put('/remove/:id', (req, res) => {
        try {
                let depId = req.params.id;
                const {tasks} = req.body;
                controller.removeTaskFromDepartment(depId, tasks)
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

    module.exports = router;