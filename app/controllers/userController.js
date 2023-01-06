const User = require('../models/user');

exports.store = async (req, res) => {
    try{
        const user = new User(req.body);
        // hash
        await user.save();
        // mail sent
        res.send(user);
    }catch(err)
    {
        res.send(err.message)
    }
}

exports.list = async(req, res) => {
    try{
        const { q, page, perPage = 2 } =  req.query;
        const user = User.find();

        if(q) user.byName(q);
        if(page) user.getPage(page, perPage);

        const data = await user;
        res.send(data);
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