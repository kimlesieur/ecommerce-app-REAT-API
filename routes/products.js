const express = require('express');
const { getProducts, getProductById } = require('../models/productsModel');
const productsRouter = express.Router();

productsRouter.get('/', async (req, res, next) => {
    if (req.query.category) {
        const products = await getProducts(req.query.category);
        console.log(products);
        return res.status(200).send(products);
    }
    const products = await getProducts();
    return res.status(200).send(products);
});

productsRouter.get('/:id', async (req, res,next) => {
    const id = req.params.id ;
    const product = await getProductById(id);
    res.status(200).send(product);
});




module.exports = productsRouter;

