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
    .post('/', (req, res) => {
        const { name, description, deadline } = req.body;
        controller.createTask(name, description, deadline);
        res.send(req.body)
            .then(() => res.json({ message: 'Task created!' }))
            .catch(err => {
                console.error("Error: " + err);
                if (err.stack) console.error(err.stack);
                res.status(500).send(err);
            });
    })
    // .put('/:id', (req, res) =>{
    //     let id = req.params.site;
    //     const {id, name, description, deadline, status } = req.body;
    //     controller.updateTask(id, name, description, deadline, status);
    //     res.send(req.body)
    //     .then(() => res.json({message: "Task updated!"}))
    //     .catch(err => {
    //         console.error("Error: " + err);
    //         if (err.stack) console.error(err.stack);
    //         res.status(500).send(err);
    //     });
    // })
    // .delete('/:id', (req, res) =>{
    //     let id = req.params.site;
    //     controller.deleteTask(id)
    //     .then(() => res.json({message: "Task deleted!"}))
    //     .catch(err => {
    //         console.error("Error: " + err);
    //         if (err.stack) console.error(err.stack);
    //         res.status(500).send(err);
    //     });
    // });

module.exports = router;