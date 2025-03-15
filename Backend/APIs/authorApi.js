const exp = require('express');
const expressAsyncHandler = require('express-async-handler');
const authorApp = exp.Router()
const bcryptjs = require('bcryptjs')
const { ObjectId } = require('mongodb');
const jwtToken = require('jsonwebtoken')
const verifyToken = require('../MiddleWares/verifyToken')

authorApp.use((req, res, next) => {
    authorCollection = req.app.get('authorCollection')
    articlesCollection = req.app.get('articlesCollection')
    next();
})

//author reg
authorApp.post('/author', expressAsyncHandler(async (req, res) => {
    const newAuthor = req.body;
    //deny insertion if user already exists
    const dbAuthor = await authorCollection.findOne({ username: newAuthor.username })
    if (dbAuthor !== null) {
        res.send({ message: "Author already Exists" })
    } else {
        //hash the password
        const hashedPassword = await bcryptjs.hash(newAuthor.password, 5)
        newAuthor.password = hashedPassword
        await authorCollection.insertOne(newAuthor)
        res.send({ message: "Author Created" })
    }
}))

//author login
authorApp.post('/login', expressAsyncHandler(async (req, res) => {
    const credentials = req.body;
    const dbAuthor = await authorCollection.findOne({ username: credentials.username })
    if (dbAuthor === null) {
        res.send({ message: "Invalid Username" })
    } else {
        const result = await bcryptjs.compare(credentials.password, dbAuthor.password)
        if (result === false) {
            res.send({ message: "Invalid Password" })
        } else {
            const encodedToken = jwtToken.sign({ username: credentials.username },
                process.env.SECRET_KEY,
                { expiresIn: '1d' })
            res.send({
                message: "LoginSuccessfull",
                token: encodedToken, user: dbAuthor
            })
        }
    }
}))

authorApp.get('/articles', verifyToken, expressAsyncHandler(async (req, res) => {
    //get all articles
    let articlesList = await articlesCollection.find().toArray();
    res.send({ message: "Articles", payload: articlesList })

}))

//post articles
authorApp.post('/article', verifyToken, expressAsyncHandler(async (req, res) => {
    const newArticle = req.body;
    //console.log(newArticle)
    //post to article collection    
    await articlesCollection.insertOne(newArticle)
    res.send({ message: "New Article Created" })

}))

//modify articles
authorApp.put('/article', verifyToken, expressAsyncHandler(async (req, res) => {
    const modifiedArticle = req.body;
    //update by articleID
    const result = await articlesCollection.updateOne({
        articleId: modifiedArticle.articleId
    }, {
        $set: { ...modifiedArticle }
    })
    let latestArticle = await articlesCollection.findOne({ articleId: modifiedArticle.articleId })
    //console.log(result)
    res.send({ message: "Articles Modified", article: latestArticle })
}))

//soft delete
authorApp.put('/article/:articleId', verifyToken, expressAsyncHandler(async (req, res) => {
    const articleIdFromUrl = Number(req.params.articleId);
    const presentStatus = req.body.status;
    //console.log(presentStatus, "1")
    //console.log(!presentStatus)
    //get article
    const articleToDelete = req.body;
    //console.log(result)
    let temp = await articlesCollection.updateOne({ articleId: articleIdFromUrl },
        {
            $set: { status: !presentStatus }
        });

    let result = await articlesCollection.findOne({ articleId: articleIdFromUrl })
    res.send({ message: "Article Removed!!!", payload: result })
}))


//read articles by name
authorApp.get('/articles/:username', verifyToken, expressAsyncHandler(async (req, res) => {
    const authorName = req.params.username
    const articlesList = await articlesCollection.find({ username: authorName }).toArray();
    res.send({ message: "Articles!!!", payload: articlesList });
}))

authorApp.put('/likes/:id', verifyToken, expressAsyncHandler(async (req, res) => {
    const { username } = req.body; // Make sure username is being sent from frontend
    const blogId = req.params.id;

    const blog = await articlesCollection.findOne({ _id: new ObjectId(blogId) });

    if (!blog) {
        return res.status(404).json({ error: "Blog not found" });
    }

    // Ensure `likes` is always an array
    let updatedLikes = blog.likes && Array.isArray(blog.likes) ? [...blog.likes] : [];

    if (updatedLikes.includes(username)) {
        // Unlike the blog (remove username)
        updatedLikes = updatedLikes.filter(name => name !== username);
    } else {
        // Like the blog (add username)
        updatedLikes.push(username);
    }

    // Update likes in the database
    await articlesCollection.updateOne(
        { _id: new ObjectId(blogId) },
        { $set: { likes: updatedLikes } }
    );

    res.json({ message: "Like updated", likes: updatedLikes.length, likedUsers: updatedLikes });
}));

authorApp.put('/views/:id', verifyToken, expressAsyncHandler(async (req, res) => {
    const blogId = req.params.id;
    const { username } = req.body;

    const blog = await articlesCollection.findOne({ _id: new ObjectId(blogId) });

    if (!blog) {
        res.status(404);
        throw new Error('Blog not found');
    }

    let updatedViews = blog.views || [];

    if (!updatedViews.includes(username)) {
        updatedViews.push(username); // Add user if not already in views list

        await articlesCollection.updateOne(
            { _id: new ObjectId(blogId) },
            { $set: { views: updatedViews } }
        );
    }

    res.json({ message: 'View count updated', views: updatedViews.length });
}));

module.exports = authorApp;