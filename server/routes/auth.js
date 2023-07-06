const express = require('express')
const router = express.Router()
const _ = require('lodash')
const bycrept = require('bcrypt')
const { User } = require('../models/register')
const { validate } = require('../models/login')
const dotenv = require('dotenv');
dotenv.config();



router.post('/', async (req, res) => {
    const { error } = validate(req.body)
    if (error) return res.status(404).send(error.details[0].message)

    let user = await User.findOne({ email: req.body.email })
    if (!user) return res.status(400).send('Invalid email or password')

    const validPassword = await bycrept.compare(req.body.password, user.password)
    if (!validPassword) return res.status(400).send('Invalid email or password')

    const token = user.generateAuthToken()
    res.header('x-auth-token', token).send(_.pick(user, ['_id', 'firstName', 'lastName', 'email'])).status(200)
})

module.exports = router