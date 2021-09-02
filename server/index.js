const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const session = require("express-session");



require("dotenv").config();

app.use(express.json());


app.set("trust proxy", true);
app.enable("trust proxy");

app.use(cors({
    origin: ["https://illumin8.netlify.app"],
    methods: ["GET", "POST", "PUT", "OPTIONS"],
    credentials: true,
        
}));



app.use(cookieParser());

// new code
app.use(express.urlencoded({ extended: true}));

// var sessionMiddleware = session({
//             name: "sessionId",
//             key: "userId",
//             secret: "thebigsecret",
//             resave: false,
//             saveUninitialized: false,
//             cookie: {
//                 expires: 60 * 60 * 24 * 1000,
//                 path: "/",
//             },
//         })

// app.use(sessionMiddleware);

app.use(
    session({
        key: "userId",
        secret: "thebigsecret",
        resave: false,
        saveUninitialized: false,
        cookie: {
            expires: 60 * 60 * 24 * 1000,
            path: "/",
        },
    })
);

app.use(function(req, res, next) {
        // res.header("Access-Control-Allow-Origin", "*",'http://localhost:3001', 'https://react-nodejs-illumin8.herokuapp.com', 'react-nodejs-illumin8.herokuapp.com', "https://illumin8.netlify.app", "illumin8.netlify.app");
        // res.header(
        //     "Access-Control-Allow-Headers",
        //     "Origin, X-Requested-With, Content-Type, Accept"
        // );
        // res.header("Access-Control-Allow-Methods", "GET", "POST", "PUT");
        // res.header("Content-Security-Policy", "script-src 'self' http://localhost:3001 https://react-nodejs-illumin8.herokuapp.com react-nodejs-illumin8.herokuapp.com");
        // res.header("Access-Control-Allow-Origin: *, http://localhost:3001, https://react-nodejs-illumin8.herokuapp.com, react-nodejs-illumin8.herokuapp.com, https://illumin8.netlify.app, illumin8.netlify.app");
        // res.header("Access-Control-Allow-Origin: *, http://localhost:3001, https://react-nodejs-illumin8.herokuapp.com, react-nodejs-illumin8.herokuapp.com");
        // res.header("Access-Control-Allow-Origin: http://localhost:3001")
        // res.header("Access-Control-Allow-Origin: https://react-nodejs-illumin8.herokuapp.com")
        // res.header("Access-Control-Allow-Origin: react-nodejs-illumin8.herokuapp.com")
        // res.header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");
        // res.header("Access-Control-Allow-Methods: GET, POST, PUT");
        // res.header("Access-Control-Allow-Credentials: true");
        // res.header("Content-Security-Policy: script-src 'self' http://localhost:3001 https://react-nodejs-illumin8.herokuapp.com react-nodejs-illumin8.herokuapp.com");
    res.header("Access-Control-Allow-Origin", "https://illumin8.netlify.app");
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.header(
            "Access-Control-Allow-Headers",
            "Origin, X-Requested-With, Content-Type, Accept, Authorization, "
        );
    res.header("Access-Control-Allow-Credentials", true);
    next();
});



// app.use(session(
//     {
//         key: "userId",
//         secret: "subscribe",
//         resave: false,
//         saveUninitialized: false,
//         cookie: {
//             expires: 60*60*24*30*1000,
//         }
//     })
// );

const db = require('./models');

// Routers
const postRouter = require('./routes/Posts');
app.use("/posts",  postRouter);

const userRouter = require('./routes/Users');
// app.use("/users", userRouter);
app.use("/auth",  userRouter);

const commentsRouter = require('./routes/Comments');
app.use("/comments",  commentsRouter);

const likesRouter = require('./routes/Likes');
const { urlencoded } = require('body-parser');

app.use("/likes",  likesRouter);


db.sequelize.sync().then(() => {
// can be any port, but needs to be different port from port when we initialized react app
    app.listen(process.env.PORT || 3001, () => {
        console.log("Server running on port 3001");
    });
})
.catch((err) => {
    console.log(err);
});

// connect db to project
