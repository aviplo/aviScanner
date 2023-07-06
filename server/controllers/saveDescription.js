const jwt = require('jsonwebtoken');
const DescribeProducts = require('../models/describeHistory')


const saveDescription = async (response, product, token) => {
    if (token) try {
        jwt.verify(token, process.env.SCANNER_jwtPrivateKey, (err, decoded) => {
            if (err) console.log(err)
            else {
                token = decoded
            }
        })
        let newDecribeProduct = new DescribeProducts({
            userID: token,
            name: product,
            images: images,
            savedResponse: response.descriptionData,
        });
        await newDecribeProduct.save();
    }
        catch (ex) {
            console.error(ex)
            res.status(500).send('Error processing request');
        }
}

module.exports = saveDescription