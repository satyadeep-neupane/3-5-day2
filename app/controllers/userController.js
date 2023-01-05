const User = require('../models/user');
const bcrypt = require('bcrypt');
const saltRound = 10;

exports.store = async (req, res) => {
    try{
        // hash user password
        const hash = await bcrypt.hash(req.body.password, saltRound);
        req.body.password = hash;   

        const user = new User(req.body);
        await user.save();

        user.sendMail();
        res.send(user);

    }catch(err)
    {
        res.send(err.message)
    }
}

exports.list = async(req, res) => {
    try{
        const user = User.find();

        if(req.params.name){
            user.findByname(req.params.name);
        }

        const data = await user;
        res.send(data);

        // const user = await User;
        // // const user = await User.find().populate('role', 'name');
        // res.send(user);
    }catch(err)
    {
        res.send(err.msg)
    }
}

exports.destroy = async (req, res) => {
    try{
        await User.findByIdAndDelete(req.params.id);
        res.send('User deleted');
    }catch(err)
    {
        res.send(err.msg)
    }
}

exports.update = async (req, res) => {
    try{
        const user = await User.findByIdAndUpdate(req.params.id, req.body);
        res.send(user);
    }catch(err)
    {
        res.send(err.msg)
    }
}