const express = require('express')
const router = express.Router()
const urlControl = require('../controller/controller')

router.post("/shorten" , urlControl.creatershorturl)

router.get("/:urlCode" , urlControl.geturl)


module.exports = router