console.log("Test af Heroku forbindelse");
// INITIALIZATION
const express = require('express');
const morgan = require('morgan');

const app = express();
app.use(express.static('public'));
app.use(express.json());
app.use(morgan('tiny'));

// ROUTES FOR THE APP
const userRouter = require("./Storage/CloudHandling");
app.use('/api/users', userRouter);

// MONGODB & MONGOOSE SETUP
const mongoose = require('mongoose');
mongoose.Promise = Promise;
mongoose.connect('mongodb+srv://AsgerDinesen:Dopamin69@cluster0-cokpw.gcp.mongodb.net/test?retryWrites=true&w=majority', {useNewUrlParser: true, useUnifiedTopology: true});

/*
// START THE SERVER
const port = process.env.PORT || config.localPort;
app.listen(port);
console.log('Listening on port ' + port + ' ...');

module.exports = app; // pga. test
 */