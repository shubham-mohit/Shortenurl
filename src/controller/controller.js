const shortid = require('shortid')
const urlModel = require('../urlmodel')

const createrId = async function(req,res){
    let {longUrl} = req.body
    let urlCode = shortid.generate()
    const Url = await urlModel.create({
        urlCode : urlCode,
        longUrl : longUrl
    })
    res.send({data:Url})
}

module.exports.createrId = createrId