const express = require('express');
const app = express();
const { mongoose } = require('./mongoose');
const { ObjectID } = require('mongodb');

// Mongoose Models
const { User } = require('./models/User');

const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//================================================ User Routes =========================================================

app.post('/user', (req, res) => {
    const user = new User(req.body);
    console.log(user);
    user.save().then((result) => {
        res.send(result)
    }, (error) => {
        res.status(400).send(error) // 400 for bad request
    })
});

/* find a user by mongoID using URL query as parameters*/
app.get('/user', (req, res) => {
    const email = req.query.email;
    const provider = req.query.provider;
    User.findOne({ email: email, provider: provider }).then(user => {
        if (!user) {
            res.status(404).send()
        } else {
            res.send(user)
        }
    }).catch((error) => {
        res.status(500).send()  // server error
    })
});

/* remove a user by mongoID */
app.delete('/user', (req, res) => {
    const query = {_id: req.query.id};
    if (!ObjectID.isValid(req.query.id)) {
        res.status(404).send();
        return;
    }
    User.deleteOne(query,
        (err, doc) => {
            if (err) return res.json({success: false, err});
            return res.json({success: true, doc});
        }
    )
});

app.patch('/user', (req, res) => {
    const { user_id, profile } = req.body;
    User.findByIdAndUpdate(user_id, {$push: {profiles: [profile] }}, {new: true})
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
    console.log(`Listening on port ${port}...`)
});