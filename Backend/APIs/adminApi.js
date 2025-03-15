const exp = require('express')
const adminApp = exp.Router()
const expressAsyncHandler = require('express-async-handler')
const bcryptjs = require('bcryptjs')

adminApp.use((req, res, next) => {
    const adminCollection = req.app.get('adminCollection')
    next();
})


adminApp.get('/articles', expressAsyncHandler(async (req, res) => {
    articlesCollection = req.app.get('articlesCollection')
    //get all articles
    let articlesList = await articlesCollection.find.toArray();
    res.send({ message: "Articles", payload: articlesList })

}))

module.exports = adminApp;