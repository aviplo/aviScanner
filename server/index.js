
const express = require('express')
const app = express()
const compare = require('./routes/compare')
const description = require('./routes/describe')
const register = require('./routes/register')
const login = require('./routes/auth')
const userComparison = require('./routes/compareHistory')
const config = require('config');
const cors = require('cors')
const mongoose = require("mongoose");
const OPENAI_API_KEY = config.get('OPENAI_API_KEY');
const jwtPrivateKey = config.get('jwtPrivateKey');
const auth = require('./middleware/auth')
const error =require('./middleware/error')

if (!OPENAI_API_KEY || !jwtPrivateKey) {
    console.error('FATAL ERROR: your secure kyes or not defined')
    process.exit(1)
}

app.use(cors({ exposedHeaders: ['X-Auth-Token'] }))
app.use(express.json())
mongoose.connect("mongodb://127.0.0.1:27017/avis").then(() => console.log("connected")).catch(err => console.log(err));
app.use('/api/compare', compare)
app.use('/api/describe',description)
app.use('/api/register', register)
app.use('/api/login', login)
app.use(auth)
app.use('/api/userComparison',userComparison)
app.use(error)

const port = process.env.PORT || 3000
app.listen(port)
