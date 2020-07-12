const express = require('express');
const app = express();
const { mongoose } = require('./db/mongoose');

// Good practice: to validate object IDs
const { ObjectID } = require('mongodb');

// Mongoose Models
const { Profile } = require('./models/Profile');
const { User } = require('./models/User');

const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.post('/user', (req, res) => {
    const user = new User(req.body);
    user.save().then((result) => {
        res.send(result)
    }, (error) => {
        res.status(400).send(error) // 400 for bad request
    })
});

app.post('/profile', (req, res) => {
    const profile = new Profile(req.body);
    profile.save().then((result) => {
        res.send(result)
    }, (error) => {
        res.status(400).send(error) // 400 for bad request
    })
});