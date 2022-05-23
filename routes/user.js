const express = require('express');
const userRouter = express.Router();

userRouter.get('/', (req, res, next) => {
    const userArray = Object.entries(req.user);
    const filteredArray = userArray.filter(([key, value]) => key !== 'password');
    const data = Object.fromEntries(filteredArray);
    res.status(200).send(data);
});

module.exports = userRouter;

