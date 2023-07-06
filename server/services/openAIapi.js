const { Configuration, OpenAIApi } = require('openai');
const dotenv = require('dotenv');
dotenv.config();

const getAICompletion = async (prompt) => {
    const configuration = new Configuration({
        apiKey: process.env.OPENAI_API_KEY,
        prompt,
    });
    const openai = new OpenAIApi(configuration);
    const response = await openai.createChatCompletion({
         model: "gpt-3.5-turbo",
    messages: [{ role: "user", content: prompt }],
  });
  return response.data.choices[0].message;
}

module.exports = getAICompletion

// const dotenv = require('dotenv');
// dotenv.config();

// const data = JSON.stringify({
//     "model": "gpt-3.5-turbo",
//     "messages": [
//         {
//             "role": "user",
//             "content": aiRequest
//         }
//     ],
//     "temperature": 0.7,
// });

// const config = {
//     method: 'post',
//     maxBodyLength: Infinity,
//     url: 'https://api.openai.com/v1/chat/completions',
//     headers: {
//         'Content-Type': 'application/json',
//         'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
//     },
//     data
// };

// module.exports = config