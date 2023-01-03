const mongoose = require('mongoose');

// role schema
const roleSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
    },
});

// role model
module.exports = mongoose.model('Role', roleSchema);