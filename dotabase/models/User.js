const mongoose = require('mongoose');
const userSchema = mongoose.Schema({
    email: {
        type: String,
        required: true
    },
    main_prof: {
        type: Object,
        default: {}
    },
    profiles: {
        type: Array,
        default: []
    }
});
const User = mongoose.model('User', userSchema);
module.exports = { User };