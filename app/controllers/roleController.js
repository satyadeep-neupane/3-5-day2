const Role = require('../models/role');

exports.store = async (req, res) => {
    try{
        const role = new Role(req.body);
        await role.save();
    
        res.send(role);
    }catch(err)
    {
        res.send(err.message)
    }
}

exports.list = async(req, res) => {
    try{
        const role = await Role.find();
        res.send(role);
    }catch(err)
    {
        res.send(err.msg)
    }
}

exports.destroy = async (req, res) => {
    try{
        await Role.findByIdAndDelete(req.params.id);
        res.send('Role deleted');
    }catch(err)
    {
        res.send(err.msg)
    }
}