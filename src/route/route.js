const express = require('express')
const router = express.Router()
const urlControl = require('../controller/controller')

router.post("/shorten" , urlControl.createrId)


module.exports = router