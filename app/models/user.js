const mongoose = require('mongoose');

// user schema
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    age: {
        type: Number,
        required: true,
        min: 10,
        max: 100,
    },
    role: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Role',
        required: true,
    }
});

// user model
module.exports = mongoose.model('User', userSchema);