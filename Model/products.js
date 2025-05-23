const mongoose = require("mongoose")

const Schema = mongoose.Schema;

const productSchema = new Schema({
    name :{
        type: String,
        required: true
    },
    productsID :{
        type: Number,
        required: true
    },
    description :{
        type: String,
        required: true
    },
    image :{
        type: String,
        required: true
    },
    price :{
        type: String,
        required: true
    },
    feedback :[
    {type: String}   
 ]
}, {timestamps: true})

module.exports = mongoose.model("product", productSchema)