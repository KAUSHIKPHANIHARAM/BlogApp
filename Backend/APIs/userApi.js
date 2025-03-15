const exp = require('express')
const userApp = exp.Router()
const bcryptjs = require('bcryptjs')
const expressAsyncHandler = require('express-async-handler')
const jwtToken = require('jsonwebtoken')
require('dotenv').config()
const verifyToken = require('../MiddleWares/verifyToken')


userApp.use((req, res, next) => {
    usercollection = req.app.get('userscollection')
    articlesCollection = req.app.get('articlesCollection')
    next();
})

//user reg
userApp.post('/user', expressAsyncHandler(async (req, res) => {
    const newUser = req.body;
    //deny insertion if user already exists
    const dbUser = await usercollection.findOne({ username: newUser.username })
    if (dbUser !== null) {
        res.send({ message: "User already Exists" });
    } else {
        //hash the password
        const hashedPassword = await bcryptjs.hash(newUser.password, 5)
        newUser.password = hashedPassword
        await usercollection.insertOne(newUser)
        res.send({ message: "User Created" })
    }
}))

//user login
userApp.post('/login', expressAsyncHandler(async (req, res) => {
    const credentials = req.body;
    const dbUser = await usercollection.findOne({ username: credentials.username })
    if (dbUser === null) {
        res.send({ message: "Invalid Username!!" })
    } else {
        const result = await bcryptjs.compare(credentials.password, dbUser.password)
        if (result === false) {
            res.send({ message: "Invalid Password!!" })
        } else {
            const encodedToken = jwtToken.sign({ username: credentials.username },
                process.env.SECRET_KEY,
                { expiresIn: '1d' })
            res.send({ message: "LoginSuccessfull", token: encodedToken, user: dbUser })
        }
    }
}))

//articles collection
userApp.get('/articles', expressAsyncHandler(async (req, res) => {
    articlesCollection = req.app.get('articlesCollection')
    //get all articles
    let articlesList = await articlesCollection.find({ status: true }).toArray();
    res.send({ message: "Articles", payload: articlesList })

}))

//post comments
userApp.post(
    '/comment/:articleId', verifyToken,
    expressAsyncHandler(async (req, res) => {
        //get user comment obj
        const userComment = req.body;
        const articleIdFromUrl = (+req.params.articleId)
        //add user comment obj by id
        const result = await articlesCollection.updateOne(
            { articleId: articleIdFromUrl },
            { $addToSet: { comments: userComment } })
        //console.log(result)
        res.send({ message: "Comments Posted" })
    }))


module.exports = userApp;