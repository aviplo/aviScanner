const express = require('express');
const router = express.Router();
const getProductImages = require('../services/googleImage')
const AIGenerator = require('../services/openAIapi')
const saveComparison = require('../controllers/saveComparison')




router.get('/', async (req, res) => {
    const { product1, product2 } = req.query;
    const token = req.headers['x-auth-token'];
    const AIPrompt = "Generate a JSON response, comparison of product1: " + product1 + " compared to " + product2 + ". If you have some information available, provide a response based on the available information. otherwise, if the products are unrelated at all, return an error message to explain the lack of relationship.\nThe JSON response should have the following structure:{\"product1\":{\"name\":\"" + product1 + "'s full name\",\"description\":\"" + product1 + "'s description\",\"pros\":\"[at least seven advantages of " + product1 + "]\,\"cons\":\"[at least seven disadvantages of" + product1 + "compared to" + product2 + "]\"},\"product2\":{\"name\":\"" + product2 + "'s full name\",\"description\":\"" + product2 + "'s description\",\"[at least seven advantages of " + product2 + "]\",\"cons\":\"[seven disadvantages of " + product2 + " compared to " + product1 + "]\"},\"overall\":\"overall comparison of " + product1 + " and " + product2 + "\"}"
    try {
        const compareCompletion = await AIGenerator(AIPrompt)
        const imageUrlOne = await getProductImages(product1, 1);
        const imageUrlTwo = await getProductImages(product2, 1);
        const mergedRequests = {
            images: [imageUrlOne, imageUrlTwo],
            comparisonData: compareCompletion.content
        }
        await saveComparison(mergedRequests, product1, product2, token)
        res.json(mergedRequests)
    }
    catch (error) {
        console.log('Error:', error);
        res.status(500).send('Error processing request');
    };
});

module.exports = router;
