const mongoose = require('mongoose');
const profileSchema = mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    account_id: {
        type: String,
        required: true
    },
    avatar: {
        type: String,
        required: true
    },
    last_match: {
        type: String,
        required: true
    }
});
const Profile = mongoose.model('Profile', profileSchema);
module.exports = { Profile };