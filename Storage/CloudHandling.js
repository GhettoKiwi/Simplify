const controller = require("../controllers/controller");
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
        let newUser = undefined;
        const {username, rights, position, password, userId} = req.body;
        controller.createUser(username, rights, position, password)
            .then(user =>{
                newUser = user;
                return controller.getUser(userId);
            })
            .then(() => res.json({message: 'User Saved!'}))
            .catch(err => {
                console.error("Error: " + err);
                if (err.stack) console.error(err.stack);
                res.status(500).send(err);
            });
    });