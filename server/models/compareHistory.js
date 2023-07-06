const mongoose = require('mongoose')


const ComparedProducts = mongoose.model('Compare', new mongoose.Schema({
    userID: { type: String },
    product1:{type:String},
    product2:{type:String},
    images:{type:Array},
    savedResponse: { type:Object}
}))

module.exports = ComparedProducts;
