const express = require('express')
const router = express.Router()
const auth = require('../middleware/auth')
const ComparedProducts = require('../models/compareHistory')
const jwt = require('jsonwebtoken')
const _ = require('lodash')


//get list of all users requests
router.get('/', auth, async (req, res) => {
    const token = req.headers['x-auth-token']
    const decoded = jwt.verify(token, process.env.SCANNER_jwtPrivateKey)
    const comparedProducts = await ComparedProducts.find({ userID: decoded })
    const pickedProducts = comparedProducts.map((product) => ({
        product1: product.product1,
        product2: product.product2,
        savedResponse: product.savedResponse,
        productImages:product.images
    }));
    res.status(200).json(pickedProducts);
})

module.exports = router