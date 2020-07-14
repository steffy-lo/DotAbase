const mongoose = require('mongoose');
const userSchema = mongoose.Schema({
    email: {
        type: String,
        required: true
    },
    provider: {
        type: String,
        required: true
    },
    my_profile: {
        type: Object,
        default: null
    },
    profiles: {
        type: Array,
        default: []
    }
});
const User = mongoose.model('User', userSchema);
module.exports = { User };