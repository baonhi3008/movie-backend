const joi = require('joi');

module.exports = {
  bodySchemaForCreateUser: joi.object({
    name: joi.string().required(),
    phone: joi.string().regex(/^[0-9]{9}$/).messages({'string.pattern.base': `Phone number must have 9 digits.`}).required()})
};