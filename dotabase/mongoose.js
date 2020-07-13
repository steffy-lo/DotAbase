/* Import mongoose */
const mongoose = require('mongoose');
/* Connect to database */
const { mongoConfig } = require('./config');

mongoose.connect(mongoConfig.uri,
    { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true})
    .then(() => console.log('MongoDB Connected...'))
    .catch(err => console.log(err));
/* Export the active connection */
module.exports = { mongoose };