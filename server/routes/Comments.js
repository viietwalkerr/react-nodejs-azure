const express = require('express');
const router = express.Router();
const { Comments } = require('../models');
const { validateToken } = require('../middlewares/AuthMiddleware')

// grab comments related to a specific ID
router.get('/:postId', async (req, res) => {
    const postId =  req.params.postId;
    const comments = await Comments.findAll({ where: { PostId: postId } });
    res.json(comments);
});

// add comment to db
router.post("/", validateToken, async (req, res) => {
    const comment = req.body;
    const username = req.user.username;
    //adding objects (username to comment)
    comment.username = username;
    await Comments.create(comment);
    res.json(comment);
});

//delete comment
router.delete("/:commentId", validateToken, async (req, res) => {
    const commentId = req.params.commentId;

        await Comments.destroy({
            where: {
                id: commentId,
            },
        });
    
    

    res.json("Deleted successfully!");
});

module.exports = router;