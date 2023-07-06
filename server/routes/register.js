const express = require('express')
const router = express.Router()
const { User, validate } = require('../models/register')
const _ = require('lodash')
const bycrept = require('bcrypt')


router.post('/', async (req, res) => {
    const { error } = validate(req.body)
    if (error) return res.status(400).send(error.details[0].message)

    let user = await User.findOne({ email: req.body.email })
    if (user) return res.status(400).send('user is already registered')

    user = new User(_.pick(req.body, ['firstName', 'lastName', 'email', 'password']))

    const salt = await bycrept.genSalt(10)
    user.password = await bycrept.hash(user.password, salt)

    await user.save()

    const token = user.generateAuthToken()
    res.header('x-auth-token', token).send(_.pick(user, ['_id','firstName', 'lastName', 'email'])).status(200)
})

module.exports = router