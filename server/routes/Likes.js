const express = require('express');
const router = express.Router();
const { Likes } = require('../models');
const { validateToken } = require('../middlewares/AuthMiddleware');

router.post("/", validateToken, async (req, res) => {
    // Grab PostId from the body
    const { PostId } = req.body;
    // getting stuff from the accessToken in users.js routes
    // Grabbing userid from middleware, so the token
    const UserId = req.user.id

    console.log("LIKES POST REQ");
    console.log(req.body);
    console.log(PostId);
    console.log(UserId);

    // Check if user already liked post
    const found = await Likes.findOne({ 
        where: { PostId : PostId, UserId: UserId },
    });
    if (!found) {
        // Likes the post
        await Likes.create({ PostId: PostId, UserId: UserId });
        // res.json("Liked the post");
        res.json({ liked: true });
    } else {
        // Unlikes the post
        await Likes.destroy({
            where: { PostId: PostId, UserId: UserId }
        });
        // res.json("Unliked the post");
        res.json({ liked: false });
    }
    
});

router.get("/", async (req, res) => {
    const PostId  = req.query.PostId;
    // const UserId = req.user.id;
    // console.log("LIKES ROUTE GET REQ");
    // console.log(UserId);
    // console.log(PostId);
    // console.log(req.query);

    const postLikes =  await Likes.findAll({ where: { PostId: PostId }});

    res.json(postLikes);
   

});

module.exports = router;