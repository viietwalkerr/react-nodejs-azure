const express = require('express');
const router = express.Router();
const { Posts, Likes, Users } = require('../models');
const { validateToken, validateSession } = require('../middlewares/AuthMiddleware');

// use validateToken to check user logged in
// router.get('/', validateToken, async (req, res) => {

// new stuff
router.get('/', validateToken, async (req, res) => {
    // res.send("Posts Result");
    // selects every element from the table
    // include: [Likes] adds joins likes table
    const listOfPosts = await Posts.findAll({ include: [Likes] });
    // list of users liked posts
    const likedPosts = await Likes.findAll({where: 
        {
            UserId: req.user.id 
        }
    });
    res.json({ listOfPosts: listOfPosts, likedPosts: likedPosts });
});

router.get('/byId/:id', async (req, res) => {
    const id = req.params.id;
    const post = await Posts.findByPk(id, {include: [Likes]});
    res.json(post);
});

router.get('/byuserId/:id', async (req, res) => {
    const id = req.params.id;
  
    const user = await Users.findOne({ where: { username: id } });
   
    const userID = user.id;
  
    const listOfPosts = await Posts.findAll({ where: { Userid: userID }, include: [Likes] });
   
    res.json(listOfPosts);
});

router.post("/", validateToken, async (req, res) => {
    // grab post data from body that is sent in the request
    const post = req.body;
    // Retrieves Username from request (creates username element in object)
    post.username = req.user.username;
    post.UserId = req.user.id;
    // call sequelize function to create, which inserts into table Posts
    await Posts.create(post);
    //return same data sent to see what happened
    res.json(post);
});

// Edit Post
router.put("/title", validateToken, async (req, res) => {
    const { newTitle, id } =  req.body;
    await Posts.update({ title: newTitle }, {where: { id: id } })
    res.json(newTitle);
});

router.put("/postText", validateToken, async (req, res) => {
    const post =  req.body;
    await Posts.update({ postText: newText }, { where: {id: id } });
    res.json(newText);
});

// Delete Post
router.delete("/:postId", validateToken, async (req, res) => {
    const postId = req.params.postId

    await Posts.destroy({
        where: {
            id: postId,
        },
    });
})

module.exports = router;