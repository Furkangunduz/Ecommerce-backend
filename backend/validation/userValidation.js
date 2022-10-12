const Joi = require("joi")

const registerValidation = Joi.object({
    username: Joi.string()
        .alphanum()
        .min(3)
        .max(30)
        .required(),
    password: Joi.string()
        .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$'))
        .required(),

    email: Joi.string()
        .email({ minDomainSegments: 2, tlds: { allow: ['com'] } })
        .required(),
})
const loginValidation = Joi.object({
    email: Joi.string()
        .email({ minDomainSegments: 2, tlds: { allow: ['com'] } })

    ,
    password: Joi.string()
        .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$'))

    ,
    token: Joi.string().min(3).max(200)
}).xor('password', 'token').xor('email', 'token')


module.exports = {
    registerValidation,
    loginValidation
}
