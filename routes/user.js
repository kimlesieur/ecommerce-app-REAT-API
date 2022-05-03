const express = require('express');
const userRouter = express.Router();

userRouter.get('/', (req, res, next) => {
    const user = req.user;
    console.log(user);
    res.status(200).send(user);
});

module.exports = userRouter;

