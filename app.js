// INITIALIZATION
const express = require('express');
const morgan = require('morgan');
const config = require('./config');

const app = express();
app.use(express.static('public'));
app.use(express.json());
app.use(morgan('tiny'));

// MONGODB & MONGOOSE SETUP
const mongoose = require('mongoose');
mongoose.Promise = Promise;
mongoose.connect('mongodb+srv://AsgerDinesen:ludersoen@cluster0-cokpw.gcp.mongodb.net/test?retryWrites=true&w=majority', {useNewUrlParser: true, useUnifiedTopology: true});

// ROUTES FOR THE APP
const userRouter = require("./Storage/accountRouter");
app.use('/accounts', userRouter);

const taskRouter = require("./Storage/TaskRouter");
app.use('/tasks', taskRouter);

// START THE SERVER
const port = process.env.PORT || config.localPort;
app.listen(port);
console.log('Listening on port ' + port + ' ...');

module.exports = app; // pga. test