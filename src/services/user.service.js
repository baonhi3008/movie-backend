const db = require('../config/db')
const ApiError = require('../utils/apiError')
const getUserByPhone = async (phoneNumber) => {
    const user = db.user.findUniqueOrThrow({ where: { phoneNumber } });
return user}

const createUser = async (phone,name)  =>{
    const user = await db.user.create({
        data: {
          phone: phone,
          name: name,
        },
      })
    return user
}


module.exports = {
    createUser
}