const controller = require("../Controllers/Controller");
const express = require('express');
const router = express.Router();

router
    .get('/', (req, res) => {
        if (!req.session.username) {
            res.redirect('/');
        } else {
            controller.getTasks()
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
            controller.getTask(id)
                .then(result => res.json(result))
                .catch(err => console.log("Error: " + err));
        }
    })
    .post('/', (req, res) => {
        try {
            const { name, description, deadline } = req.body
            let task = controller.createTask(name, description, deadline);
            res.json(task);
        }  catch (error) {
            if (typeof error.message === 'number')
                res.sendStatus(error.message);
            else {
                res.send(error.name + ": " + error.message);
            }
        }
    })
    .put('/update/:id', (req, res) => {
        try {
            let id = req.params.id;
            const { name, description, deadline, status, responsible, ETA, Comments} = req.body;
            controller.updateTask(id, name, description, deadline, status, responsible, ETA, Comments);
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
    .put('/addComment/:id', (req, res) => {
        try {
                let taskId = req.params.id;
                let Comment = req.session.username + ": ";
                const {Comments} = req.body;
                Comment += Comments;
                controller.addCommentToTask(taskId, Comment)
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
    .put('/responsible/:id', (req, res) => {
        try {
            let id = req.params.id;
            let responsible = req.session.username
            let status = "IN PROGRESS"
            const { name, description, deadline, ETA, Comments } = req.body;
            controller.updateTask(id, name, description, deadline, status, responsible, ETA, Comments);
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
        let id = req.params.id
        controller.deleteTask(id)
            .then(result => res.json(result))
            .catch(err => console.log("Error: " + err));
    });

module.exports = router;