//checks token

const { sign, verify } = require('jsonwebtoken');

const createToken = (user) => {
    const accessToken = sign(
        { 
            username: user.username,
            id: user.id
        },
        "importantsecret"
    );
    return accessToken;
};

const validateSession = (req, res, next) => {
    // if (req.session.user) {
    //     req.authenticated = true;
    //     next();
    // } else {
    //     return res.status(400).json({ error: "User not logged in!"})
    // }

    const userIdSession = req.session;
    if (!userIdSession) return res.status(400).json({ error: "No Overall session detected!"});

    const sessionUser = userIdSession.user;

    console.log("userIdSession");
    console.log(userIdSession);
    
    if (!sessionUser) return res.status(400).json({ error: "User has no session!"});
    
    console.log("USER:");
    console.log(sessionUser);

    console.log(sessionUser.id);
    console.log(sessionUser.username);
    
    

    const userId = sessionUser.id;
    const username = sessionUser.username;

    if (!userId) return res.status(400).json({ error: "User not logged in!"});
    try {
        req.user = {id: userId, username: username};
        return next();
    } catch (err) {
        return res.json({error: err});
    }
}

const validateToken = (req, res, next) => {
    // const accessToken = req.header("accessToken");
    
    // // Validate the Token
    // if (!accessToken) return res.json({error: "User not logged in!"});

    // try {
    //     const validToken = verify(accessToken, "importantsecret");
    //     // Create variable inside of request
    //     // Which is equal to validToken which contains user logged in and information
    //     // Username and ID
    //     req.user = validToken;
    //     if (validToken) {
    //         return next();
    //     }
    // } catch (err) {
    //     return res.json({error: err});
    // }

    const accessToken = req.header("accessToken");
    
    // const accessToken = req.cookies["access-token"];

    if (!accessToken) {
        return res.status(400).json({ error: "User not Authenticated!"});
    }

    try {
        const validToken = verify(accessToken, "importantsecret");
        req.user = validToken;
        if (validToken) {
            req.authenticated = true;
            return next();
        }
    } catch (err) {
        return res.status(400).json({ error: err});
    }

};

module.exports = { validateToken, createToken, validateSession };