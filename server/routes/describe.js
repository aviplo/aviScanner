const express = require('express')
const router = express.Router()
const jwt = require('jsonwebtoken')
const getProductImages = require('../services/googleImage')
const AIGenerator = require('../services/openAIapi')
const saveDescription = require('../controllers/saveDescription')



router.get('/', async (req,res) => {
    const { product } = req.query
    const token = req.headers['x-auth-token']
    const AIPrompt = "Generate a JSON response, provide any available information you have on " + product + " . In the absence of specific details, feel free to create a description based on the information at hand. However, if the product name lacks coherence, kindly respond with an error explanation. \nThe JSON response should have the following structure:{\"product\":{\"name\":\"" + product + "'s full name\",\"description\":\"" + product + "'s full description\",\"specifications\":[list of technical specifications, dimensions, materials used, weight, and any other relevant details]\"advantages:\"[at least seven advantages of " + product + " compared to competing products]\,\"disadvantages:\"[at least seven disadvantages of" + product + " compared to competing products]\"},\overall\":\"overall description of " + product + "\"}"
    const getImageFromAPI = async (product) => {
        const images = await getProductImages(product, 3)
        return images
    }
    try {
        const describeCompletion = await AIGenerator(AIPrompt)
        const images = await getImageFromAPI(product)
        const mergeRequests = {
            images: images,
            descriptionData: describeCompletion.content
        }
        await saveDescription(mergeRequests, product, token)
        res.json(mergeRequests)
    } catch (ex) { 
        console.log("Error:", ex); 
        res.status(500).send('Error processing request');
    }
}
)

module.exports = router