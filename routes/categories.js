const express = require('express');
const categoriesRouter = express.Router();
const {getCategories} = require('../models/categoriesModel');

categoriesRouter.get('/', async (req, res, next) => {
    const categories = await getCategories();
    return res.status(200).send(categories);
});


module.exports = categoriesRouter;