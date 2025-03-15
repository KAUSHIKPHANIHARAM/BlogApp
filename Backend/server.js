const exp = require('express');
const app = exp()
require('dotenv').config()//used to interact with .env file
const mongoClient = require('mongodb').MongoClient;
//import path module
const path = require('path')
//display react build in this server
app.use(exp.static(path.join(__dirname, '../Client/BlogApp/dist')))
//body parser middleware
app.use(exp.json())

//db connection
mongoClient.connect(process.env.DB_URL)
    .then(client => {
        //get db obj
        const blogdb = client.db('blogdb')
        //get collection obj
        const userscollection = blogdb.collection('userscollection')
        const articlesCollection = blogdb.collection('articlesCollection')
        const authorCollection = blogdb.collection('authorCollection')
        const adminCollection = blogdb.collection('adminCollection')
        //share collection obj with express app
        app.set('userscollection', userscollection)
        app.set('articlesCollection', articlesCollection)
        app.set('authorCollection', authorCollection)
        app.set('adminCollection', adminCollection)
        console.log("DB connection successfull!!")
        //assign port
        const port = process.env.PORT || 5050;
        app.listen(port, () => console.log(`Server on port ${port}`))
    })
    .catch(err => console.log("Error in DB Connection", err))
//importing api's
const userApp = require('../Backend/APIs/userApi')
const adminApp = require('../Backend/APIs/adminApi')
const authorApp = require('../Backend/APIs/authorApi')
//send request according to the path
app.use('/user-api', userApp)
app.use('/author-api', authorApp)
app.use('/admin-api', adminApp)

//deals with page refreshing
app.use((req, res, next) => {
    res.sendFile(path.join(__dirname, '../Client/BlogApp/dist/index.html'))
})

//error handling
app.use((err, req, res, next) => {
    res.send({ message: "Error", payload: err.message })
})
