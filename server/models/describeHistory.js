const mongoose = require('mongoose')

const DescribeProducts = mongoose.model('Describes',new mongoose.Schema({
    userID:{type:String},
    product:{type:String},
    images:{type:Array},
    savedResponse:{type:Object}
}))

module.exports = DescribeProducts