const express = require('express');
const orderRouter = express.Router();
const {getCart, createCart, deleteCart} = require('../models/cartsModel');
const {getProductsFromCart} = require('../models/cartItemsModel');
const { createOrder, getOrders, checkoutOrder, updateTotal } = require('../models/ordersModel');
const { addProductsToOrder } = require('../models/orderItemsModel');
const {getProductPrice} = require('../models/productsModel');


const ensureCartExist = async (req, res, next) => {
    const user = req.user;
    const cartCheck = await getCart(user.id);
    if(!cartCheck){
        await createCart(user.id);
        return next();
    }
    return next();
};

const ensureCartNotEmpty = async (req, res, next) => {
    const user = req.user;
    const cart = await getCart(user.id);
    const products = await getProductsFromCart(cart.id);
    if(products.length === 0){
        console.log("Cart is empty !");
        return res.status(401).send("Add products in your cart before trying to checkout !");
    }
    return next();
};

orderRouter.get('/:orderId?', async (req, res, next) => {
    const user = req.user;
    const orderId = parseInt(req.params.orderId);
    const orders = await getOrders(user.id);
    if(orderId){
        let order = orders.find(data => data.id === orderId);
        return res.status(200).send(order);
    }
    return res.status(200).send(orders);
});


orderRouter.post('/', ensureCartExist, ensureCartNotEmpty, async (req, res, next) => {

    //Create an order + get the order id
    const user = req.user;
    const order = await createOrder(user.id);
    //Get the current cart and all the products fom it
    const cart = await getCart(user.id);
    const products = await getProductsFromCart(cart.id);
    /*
    //old version without promise.all()
    products.map(async (product, index) => {
        const productPrice = await getProductPrice(product.product_id);
        const price = parseFloat(productPrice.price);
        const subtotal = price * parseInt(product.quantity);
        subtotals.push(subtotal);
        if(index === products.length - 1){
            reduceSubtotals(subtotals);
        }
        await addProductsToOrder(order.id, product.product_id, product.quantity, price);
    });
    */
    const reduceSubtotals = async (array) => {
        const total = array.reduce((curr, prev) => curr + prev, 0);
        await updateTotal(total, order.id);
    };

    const subtotals = [];
    Promise.all( products.map(async (product, index) => {
        const productPrice = await getProductPrice(product.product_id);
        const price = parseFloat(productPrice.price);
        const subtotal = price * parseInt(product.quantity);
        subtotals.push(subtotal);
        await addProductsToOrder(order.id, product.product_id, product.quantity, price);
    })
    ).then(() => reduceSubtotals(subtotals));

    //Delete the actual cart (and by sql cascade delete all cart_items linked)
    await deleteCart(user.id);
    return res.status(201).send((order.id).toString());
});

orderRouter.post('/:orderId/checkout', async (req, res, next) => {
    const orderId = parseInt(req.params.orderId);
    await checkoutOrder(orderId);
    console.log(`Order ${orderId} has been paid`);
    return res.status(201).redirect('/orders/:orderId');
});



module.exports = orderRouter;