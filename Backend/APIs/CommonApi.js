const exp = require('express')
const commonApp = exp.Router()

commonApp.get('/common', (req, res) => {    
    res.send({ message: "This is from Common API" })
})

module.exports = commonApp;