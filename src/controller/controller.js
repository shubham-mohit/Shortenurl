const shortId = require('shortid')
const urlModel = require('../model/urlmodel')
const validUrl = require("valid-url")
const radis = require('redis')
const { promisify } = require('util')

const RedisClient= radis.createClient(14661,'redis-14661.c114.us-east-1-4.ec2.cloud.redislabs.com',{no_ready_check:true})
RedisClient.auth("yha4l5kr4WvMclZfq92pUhRqyCm3aoT5", function(err){
    if(err) throw err;
})
RedisClient.on("connect" ,async function(){
    console.log("connected to redis")
})

const SET_ASYNC = promisify(RedisClient.SET).bind(RedisClient)
const GET_ASYNC = promisify(RedisClient.GET).bind(RedisClient)

const creatershorturl = async function(req,res){
    try {
        let data = req.body
        let {longUrl} = data

        if(!req.body) {return res.status(400).send("Please enter the body")}

        if (!validUrl.isWebUri(longUrl.trim())) {
            return res.status(400).send({ status: false, message: "please enter a valid long url" })
        }
        const checkCache = await GET_ASYNC(`${longUrl}`)
        const getUrl = JSON.parse(checkCache)
        if(checkCache) {return res.status(201).send({DATA : getUrl})}

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

        const findInCache = await GET_ASYNC(`${ShortenId}`)
        const gotIt = JSON.parse(findInCache)
        if(!findInCache) {return res.status(302).redirect(gotIt)}

        const searchUrl =  await urlModel.findOne({urlCode : ShortenId})
        if(!searchUrl) {return res.status(404).send("Resource not found")}
        else{
            const convertToString = JSON.stringify(searchUrl.longUrl)
            await SET_ASYNC(ShortenId, convertToString)
            res.status(302).redirect(searchUrl.longUrl)
    }
    }catch(error){
        res.send(error.message)
    }
}

module.exports = {creatershorturl , geturl}