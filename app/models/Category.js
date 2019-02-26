const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const CategorySchema = new Schema({
    name: {
        trim: true ,
        type: String , 
        required: true , 
        // unique: true , 
        uppercase: true,
    }
});

module.exports = mongoose.model('Category', CategorySchema);