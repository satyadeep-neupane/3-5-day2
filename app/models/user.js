const mongoose = require('mongoose');
const mailer = require('../config/mailer');
const hash = require('../helpers/hasher');

// user schema
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: [true, "Email is must field"],
        unique: true,
        // validate: {
        //     validator: v => v.test(/[a-zA-Z.]+@[a-z]+.[a-zA-Z]{2,3}/),
        //     message: props => `${props.value} should be email `
        // }
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
    timestamps: true,
    toJSON: {virtuals: true}
});

userSchema.methods.sendMail = async function() {
    try{
        await mailer.sendMail({
            from: 'self@gmail.com',
            to: this.email,
            subject: 'Welcome to our site',
            text: 'Welcome to our site',
        });
        console.log("Mail Sent");
    }catch(err){
        console.log("Mail Send Failed");
    }
}

// userSchema.statics.findByName = function(name){
// 	return this.find({name: new RegExp(name, 'i')})
// }

userSchema.query.byName = function(name){
	return this.where({name: new RegExp(name, 'i')})
}

userSchema.query.getPage = function(page, perPage){
    return this.limit(perPage).skip((page - 1) * perPage);
}

// virtual nameEmail
userSchema.virtual('nameEmail').get(function(){
	return `${this.name}-${this.email}`;
});

userSchema.virtual('category').get(function(){
    if(this.age > 18)
        return 'Adult'
    else
        return 'Teen'
});


userSchema.pre('save', async function(next){
	this.password = await hash(this.password, 10);
	next();
});

userSchema.post('save', async function(user, next) {
    user.sendMail();
    next();
})

// user model
module.exports = mongoose.model('User', userSchema);