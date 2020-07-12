const express = require('express');
const app = express();
const { mongoose } = require('./db/mongoose');

// Good practice: to validate object IDs
const { ObjectID } = require('mongodb');

// Mongoose Models
const { User } = require('./models/User');

const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//================================================ User Routes =========================================================

app.post('/user', (req, res) => {
    const user = new User(req.body);
    user.save().then((result) => {
        res.send(result)
    }, (error) => {
        res.status(400).send(error) // 400 for bad request
    })
});

/* find a user by email using URL query as parameters*/
app.get('/user', (req, res) => {
    const email = req.query.email;
    User.findOne({ email:email }).then(user => {
        if (!user) {
            res.status(404).send()
        } else {
            res.send(user)
        }
    }).catch((error) => {
        res.status(500).send()  // server error
    })
});

/* remove a user by email */
app.delete('/user', (req, res) => {
    const query = { _id: req.query.email };
    User.deleteOne(query,
        (err, doc) => {
            if (err) return res.json({success: false, err});
            return res.json({success: true, doc});
        }
    )
});

app.patch('/user', (req, res) => {
    const { email, profile } = req.body;
    User.findOneAndUpdate({ email: email }, {$push: {profiles: [profile] }}, {new: true},)
        .then((user) => {
            if (!user) {
                res.status(404).send()
            } else {
                res.send(user)
            }
        }).catch((error) => {
        res.status(400).send() // bad request
    })
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
    log(`Listening on port ${port}...`)
});