const mongoose = require('mongoose');
const mailer = require('../config/mailer');

// user schema
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
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
    },
    password: {
        type: String,
        required: true,
    }
}, {
    timestamps: true
});

userSchema.methods.sendMail = async function() {
    await mailer.sendMail({
        from: 'self@gmail.com',
        to: this.email,
        subject: 'Welcome to our site',
        text: 'Welcome to our site',
    });
}

// userSchema.statics.findByName = function(name){
// 	return this.find({name: new RegExp(name, 'i')})
// }

userSchema.query.byName = function(name){
	return this.where({name: new RegExp(name, 'i')})
}


// userSchema.pre('save', async function(next){
// 	this.password = await hash(this.password);
// 	next();
// });

// user model
module.exports = mongoose.model('User', userSchema);