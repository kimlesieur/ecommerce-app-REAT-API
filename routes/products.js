const express = require('express');
const productsRouter = express.Router();
const { getProducts, getProductById } = require('../models/productsModel');

productsRouter.get('/', async (req, res, next) => {
    if (req.query.category) {
        const products = await getProducts(req.query.category);
        return res.status(200).send(products);
    }    
    const products = await getProducts();
    return res.status(200).send(products);
});

productsRouter.get('/:id', async (req, res, next) => {
    const id = req.params.id ;
    const product = await getProductById(id);
    return res.status(200).send(product);
});




module.exports = productsRouter;

