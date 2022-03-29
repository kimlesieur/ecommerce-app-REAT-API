const express = require('express');
const accountRouter = express.Router();

accountRouter.get('/', (req, res, next) => {
    res.send('Your account infos... !')
});

accountRouter.get('/orders', (req, res, next) => {
    res.send("this is where you'll see all your orders...")
});



module.exports = accountRouter;

