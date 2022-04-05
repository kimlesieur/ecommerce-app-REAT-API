const express = require('express');
const cartRouter = express.Router();
const {getCart, createCart} = require('../models/cartsModel');
const {addProductInCart, checkProductInCart, updateQuantity, deleteProduct} = require('../models/cartItemsModel');

const ensureCartExist = async (req, res, next) => {
    const {user} = req.session;
    const cartCheck = await getCart(user.id);
    if(!cartCheck){
        await createCart(user.id);
        return next();
    }
    return next();
};

cartRouter.get('/showCart', ensureCartExist, async (req, res, next) => {
    const {user} = req.session;
    const cart = await getCart(user.id);
    return res.status(200).send(cart);
});

cartRouter.get('/', ensureCartExist, async (req, res, next) => {
    return res.send(`
    <h1>Choose your product and quantity</h1>
    <form method='post' action='/cart'>
      <input name='productId' placeholder='Product number' require/>
      <input name='quantity' placeholder='Quantity to add' require/> 
      <input type='submit' />
    </form>
    <a href='/cart/showCart'>Show your cart</a>
  `
  )
});

cartRouter.post('/', ensureCartExist, async (req, res, next) => {
    const {productId, quantity} = req.body;
    const {user} = req.session;
    const cart = await getCart(user.id);
    const productAlreadyInCart = await checkProductInCart(cart.id, productId);
    if(productAlreadyInCart){
        const newQuantity = parseInt(productAlreadyInCart.quantity) + parseInt(quantity);
        await updateQuantity(newQuantity, productAlreadyInCart.id);
        return res.status(200).redirect('/cart/showCart');
    }
    const response = await addProductInCart(cart.id, productId, quantity);
    return res.status(200).redirect('/cart/showCart');
});


cartRouter.delete('/delete/:productId', ensureCartExist, async (req, res, next) => {
    const {productId} = req.params;
    const {user} = req.session;
    const cart = await getCart(user.id);
    const productAlreadyInCart = await checkProductInCart(cart.id, productId);
    if(productAlreadyInCart){
        await deleteProduct(cart.id, productId);
        return res.redirect('/cart/showCart');
    }
    return res.redirect('/cart/showCart?error=no-product-to-delete');
});





module.exports = cartRouter;