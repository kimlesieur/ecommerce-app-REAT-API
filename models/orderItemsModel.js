const {pool} = require('../database');

const addProductsToOrder = (orderId, productId, quantity, productPrice) => {
    return pool 
    .query(`INSERT INTO order_items (order_id, product_id, quantity, price) VALUES ($1, $2, $3, $4)`, [orderId, productId, quantity, productPrice])
    .then(res => res.rows[0])
    .catch(err => console.error("Error while executing addProductsToOrder query", err.stack))
};


module.exports = {addProductsToOrder};