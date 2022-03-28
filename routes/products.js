const express = require('express');
const productsRouter = express.Router();

productsRouter.get('/', (req, res, next) => {
    res.send(`The products are... as of ${req.date}`);
});

productsRouter.get('/:id', (req, res,next) => {
    const id = req.params.id ;
    res.send(`The products is the number ${id}`);
});


module.exports = productsRouter;

