const express = require('express');
const router = express.Router();
const { Users } = require('../models');
const bcrypt = require('bcryptjs');
const cookieParser = require("cookie-parser");



// JWT (Json Web Token) Authentication
// sign generates token
// LATER: change token to be stored in cookies, not sessionstorage or localstorage
const {sign, verify} = require('jsonwebtoken');
const { validateToken, createToken, validateSession } = require('../middlewares/AuthMiddleware');

// router.cookieParser();

router.get('/', (req, res) => {
    res.send("Users Result");
    // to return JSON instead
    //res.json("Hello World");
});

router.post("/register", async (req, res) => {
    const { firstname, lastname, email, username, password } = req.body;

    const user = await Users.findOne({ where: { username: username } });

    if (user !== null){
        if (user.username === username) res.json({error: "Username already exists!"});  
    } else {
        // Update the password with the hash(ed) password
        bcrypt.hash(password, 10).then((hash) => {
            Users.create({
                firstname: firstname,
                lastname: lastname,
                email: email,
                username: username,
                password: hash,
            });
            res.json("Registered Successfully!");
        });
    }
    
});

router.get("/login", (req, res) => {
    if (req.session.user) {
        res.send({ loggedIn: true, user: req.session.user });
    } else {
        res.send({ loggedIn: false});
    }
})

router.post('/login', async (req, res) => {
    const { username, password } = req.body;

    // Checking if username exists
    const user = await Users.findOne({ where: { username: username } });

    if (!user) {
        res.json({error: "User Does Not Exist!"});
    } else {
        console.log(user.dataValues);
        // compare hashed password
        bcrypt.compare(password, user.password).then((match) => {
            if (!match) {
                res.json({error: "Wrong Username and Password Combination"});
            } else {

                const accessToken = createToken(user);

                res
                    .cookie(
                        "access-token", 
                        accessToken, 
                        {
                            // 30 days 
                            maxAge: 60*60*24*30*10000,
                            path: "/",
                            httpOnly: true,
                            domain: "https://illumin8.netlify.app",
                            // domain: process.env.NODE_ENV === "production" ? "https://illumin8.netlify.app" : "http://localhost:3001",
                            sameSite: "none",
                            // secure: process.env.NODE_ENV === "production" ? true : false,
                            secure: true
                        }
                    )
                    .json({
                        status:'success',
                        accessToken,
                        user
                    });
                /*
                const sess = req.session;
                sess.user = user.dataValues;
                */
                // console.log("Req.session.user");
                // console.log(req.session.user);
                // console.log("Req.session")
                // console.log(req.session);
                // console.log("COOKIES #######");
                // console.log(req.session.cookie);
                // console.log("USER FROM COOKIES ####");
                // const useruser = req.session.user.dataValues.id;
                // console.log(useruser);
              
                /*
                console.log(sess);
                sess.save();
                // LATER: create object that doesn't have password
                res.send(sess.user);
                */
                // res.json("Logged In!");
                
            } 
        });
    }
});

router.get("/logout", (req, res) => {
    // req.session.destroy();
    res.clearCookie("access-token");
    res.send("Cookie Cleared!");
})

//check valid token
router.get('/token', validateToken, (req, res) => {
    res.json(req.user)
    // res.json(req.session);
});

// // Get basic user info
// router.get("/userinfo/:id", async (req, res) => {
//     const id = req.params.id;
    
//     const userInfo = await Users.findByPk(id, {
//         attributes: { exclude: ["password"] }
//     });

//     res.json(userInfo);
// })

//Get user info
router.get("/userinfo/:usernameInput", async (req, res) => {
    const username = req.params.usernameInput;
    
    const userInfo = await Users.findOne(
        {where : 
            {username: username}, 
            attributes:{ 
                exclude: ["password"] 
            }
        },
    );

    res.json(userInfo);
})

router.put('/changepassword', validateSession, async (req, res) => {

    const {oldPassword, newPassword } = req.body;

    const user = await Users.findOne({ where: { username: req.user.username } });

    bcrypt.compare(oldPassword, user.password).then( (match) => {
        if (!match) res.json({error: "Old Password is Incorrect!"});

        bcrypt.hash(newPassword, 10).then(async (hash) => {
            Users.update(
                { password: hash}, 
                { where: { username: req.user.username } }
            );
            res.json("Password Updated Successfully!");
        });
    });
});


module.exports = router