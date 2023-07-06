// const mongoose = require('mongoose')
const Joi = require('joi')
// const jwt = require('jsonwebtoken')
const config = require('config')
// const jwtPrivateKey = config.get('jwtPrivateKey')

// const userSchema = new mongoose.Schema({
//     email: { type: String, required: true, unique: true, minlength: 5, maxlength: 255 },
//     password: { type: String, required: true, minlength: 8 }
// })

// userSchema.methods.generateAuthToken = function () {
//     return jwt.sign({ _id: this.id }, jwtPrivateKey)
// }
// const User = mongoose.model('Users', userSchema)


function validation(data) {
    const schema = Joi.object({
        email: Joi.string().email().required(),
        password: Joi.string().min(8).max(1024).required()
    })
    return { value, error } = schema.validate(data)
}

// exports.User = User
exports.validate = validation


