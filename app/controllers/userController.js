const User = require('../models/user');

exports.store = async (req, res) => {
    try{
        const user = new User(req.body);
        await user.save();
    
        res.send(user);
    }catch(err)
    {
        res.send(err.message)
    }
}

exports.list = async(req, res) => {
    try{
        const user = await User.find().populate('role', 'name');
        res.send(user);
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