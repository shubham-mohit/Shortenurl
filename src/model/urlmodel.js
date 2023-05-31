// { urlCode: { mandatory, unique, lowercase, trim }, longUrl: {mandatory, valid url}, shortUrl: {mandatory, unique} }


const mongoose = require('mongoose')

const urlSchema = new mongoose.Schema({
    urlCode : {
        require : true ,
        lowercase : true,

    },
    longUrl :{
        require : true,
    },
    shortUrl : {
        require : true,
        unique : true
    }
})