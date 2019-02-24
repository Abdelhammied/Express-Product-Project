const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchemam = new Schema({
    username: {
        type: String,
        required: true,
        maxlength: 255
    },
    email: {
        type: String,
        required: true,
        maxlength: 255
    } , 
    password: {
        // type: String , 
        // required: true
    }
});

module.exports = mongoose.model('User', UserSchemam);