const userService = require('../services/user.service')
const generateBaseResponse = require('../utils/baseResponse');

const createUser = async (req,res)=>{
    const {phone,name} = req.body
    const result = await userService.createUser(phone,name)
    const data = res.json(result)
    return res.json(generateBaseResponse('Create use with information: ' +'\n'+ data));
};
module.exports = {createUser}

