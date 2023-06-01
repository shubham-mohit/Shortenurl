const shortId = require('shortid')
const urlModel = require('../model/urlmodel')
const validUrl = require("valid-url")

const creatershorturl = async function(req,res){
    try {
        let data = req.body
        let {longUrl} = data

        if(!req.body) {return res.status(400).send("Please enter the body")}

        if (!validUrl.isWebUri(longUrl.trim())) {
            return res.status(400).send({ status: false, message: "please enter a valid long url" })
        }

        let checkurl = await urlModel.findOne({longUrl : longUrl}).select({_id:0 , shortUrl:1 , urlCode:1})
        if(checkurl){ return res.status(400).send({message: "Already exist" , Data : checkurl})}

        const baseurl = 'http://localhost:3000'
        const codeUrl = shortId.generate()
        const shorturl = baseurl + "/" + codeUrl.toLowerCase()
        
        data.urlCode = codeUrl
        data.shortUrl = shorturl

        const createshorturl = await urlModel.create(data)
        const filterId = await urlModel.findOne(createshorturl._id).select({_id:0,urlCode:1,shortUrl:1,longUrl:1})
        res.send({status: true , Data: filterId})

    } catch (error) {
        res.send(error.message)
    } 
}

const geturl = async function(req,res){
    let ShortenId = req.params.urlCode
    try{
        if(! shortId.isValid(ShortenId)) {return res.status(400).send("Please enter a valid Id")}
        const searchUrl =  await urlModel.findOne({urlCode : ShortenId})
        if(!searchUrl) {return res.status(404).send("Resource not found")}
        else{
            res.status(302).redirect(searchUrl.longUrl)
    }
    }catch(error){
        res.send(error.message)
    }
}

module.exports = {creatershorturl , geturl}