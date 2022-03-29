const express = require('express');
const { getProducts, getProductById } = require('../models/productsModel');
const productsRouter = express.Router();

productsRouter.get('/', async (req, res, next) => {
    const products = await getProducts();
    console.log(products);
    res.status(200).send(products);
});

productsRouter.get('/:id', async (req, res,next) => {
    const id = req.params.id ;
    const product = await getProductById(id);
    res.status(200).send(product);
});


module.exports = productsRouter;

