const shortidModel = require('../src/controller/controller')
const id = shortidModel.codeUrl

const btn = document.getElementById('btn')
const LONGURL = document.getElementById('LONGURL').value
const SHORTURL = document.getElementById('SHORTURL')


function myfunction() {
    document.getElementById('SHORTURL').innerText = 'http://localhost:' +'/' + id.generate()
}