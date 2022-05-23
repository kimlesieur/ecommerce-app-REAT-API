const express = require('express');
const cartRouter = express.Router();
const {getCart, createCart, getCartItems} = require('../models/cartsModel');
const {addProductInCart, checkProductInCart, updateQuantity, deleteProduct} = require('../models/cartItemsModel');

const ensureCartExist = async (req, res, next) => {
    const user = req.user;
    const cartCheck = await getCart(user.id);
    if(!cartCheck){
        await createCart(user.id);
        return next();
    }
    return next();
};

cartRouter.get('/', ensureCartExist, async (req, res, next) => {
    const user = req.user;
    const cart = await getCart(user.id);
    const cartId = cart.id;
    console.log(cartId)
    const items = await getCartItems(cartId);
    return res.status(200).send(items);
});

//TODO = refactor the non-negative total logic

cartRouter.post('/', ensureCartExist, async (req, res, next) => {
    const {productId, quantity} = req.body;
    const user = req.user;
    const cart = await getCart(user.id);
    const productAlreadyInCart = await checkProductInCart(cart.id, productId);
    if(productAlreadyInCart){
        const newQuantity = parseInt(productAlreadyInCart.quantity) + parseInt(quantity);
        if(newQuantity <= 0){
            return res.status(422).send('total quantity must be greater than 0');
        }
        await updateQuantity(newQuantity, productAlreadyInCart.id);
        return res.status(200).send('product added');
    }
    if(quantity <= 0){
        return res.status(422).send('quantity must be greater than 0');
    }
    await addProductInCart(cart.id, productId, quantity);
    return res.status(201).send('product added');
});


cartRouter.delete('/:productId', ensureCartExist, async (req, res, next) => {
    const {productId} = req.params;
    const user = req.user;
    const cart = await getCart(user.id);
    const productAlreadyInCart = await checkProductInCart(cart.id, productId);
    if(productAlreadyInCart){
        await deleteProduct(cart.id, productId);
        return res.status(200).send('product deleted');
    }
    return res.status(400).send('no product in cart matching this id');
    //return res.redirect('/cart/showCart?error=no-product-to-delete');
});


module.exports = cartRouter;