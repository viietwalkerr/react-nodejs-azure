const express = require('express');
const router = express.Router();


router.get('/', async (req, res) => {
    // res.send("Posts Result");
    // selects every element from the table
    const listOfPosts = await Posts.findAll();
    res.json(listOfPosts);
});

router.get('/byId/:id', async (req, res) => {
    const id = req.params.id;
    const post = await Posts.findByPk(id);
    res.json(post);
});


module.exports = router;