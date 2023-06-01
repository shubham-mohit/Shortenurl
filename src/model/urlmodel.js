// { urlCode: { mandatory, unique, lowercase, trim }, longUrl: {mandatory, valid url}, shortUrl: {mandatory, unique} }


const mongoose = require('mongoose')

const urlSchema = new mongoose.Schema({
    urlCode : {
        type : String,
        required : true ,
        lowercase : true,
        unique : true,
        trim : true
    },
    longUrl :{
        type: String,
        required: true,
        trim : true
    },
    shortUrl : {
        type: String,
        required : true,
        unique : true,
        trim : true
    }
},{timestamp : true})

module.exports = mongoose.model("URL" , urlSchema)