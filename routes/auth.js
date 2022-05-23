const authRouter = require('express').Router();
const passport = require('passport');
const {tokenMiddleware} = require('../utils/utils');

//TODO Refactor all login routes inside this file auth.js


authRouter.get("/logout", (req, res) => {
    req.logout();
    res.redirect('/');
})

authRouter.get(
    "/google", 
    passport.authenticate("google", {scope: ["profile email"]})
);

authRouter.get(
    "/google/callback", 
    passport.authenticate("google"),
    tokenMiddleware()
);


module.exports = authRouter;
