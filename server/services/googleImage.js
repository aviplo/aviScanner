const dotenv = require('dotenv');
dotenv.config();
const { google } = require('googleapis');
const apiKey = process.env.GOOGLE_API_KEY;
const googleClient = google.customsearch('v1');



const getProductImage = async (productName,num) => {
    const response = await googleClient.cse.list({
        auth: apiKey,
        cx: "81be7fcc6e5304f9b",
        q: productName,
        num,
        searchType: 'image',
    });
    return response.data.items[0].link;
}


module.exports = getProductImage
