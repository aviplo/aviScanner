const jwt = require('jsonwebtoken');
const ComparedProducts =require('../models/compareHistory')

const saveComparison = async (response,product1,product2,token) => {
    if (token) 
        jwt.verify(token, process.env.SCANNER_jwtPrivateKey, (err, decoded) => {
            if (err) console.log(err)
            else {
                token = decoded
            }
        })
        let newComparedProduct = new ComparedProducts({
            images:response.images,
            userID: token,
            product1: product1,
            product2: product2,
            savedResponse: response.comparisonData,
        });
        await newComparedProduct.save();
}

module.exports = saveComparison