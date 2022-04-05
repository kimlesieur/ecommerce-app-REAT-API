const {pool} = require('../database');

const getProductsFromCart = async (cart_id) => {
    return pool
            .query(`SELECT * FROM cart_items WHERE cart_id=$1`, [cart_id])
            .then(res => res.rows)
            .catch(err => console.error("Error while executing getProductsFromCart query", err.stack));
};

const addProductInCart = async (cart_id, product_id, quantity) => {
    return pool
        .query(`INSERT INTO cart_items (cart_id, product_id, quantity) VALUES ($1, $2, $3)`, [cart_id, product_id, quantity])
        .then(res => res.rows[0])
        .catch(err => console.error('Error while executing a addProductInCart query', err.stack));
};

const checkProductInCart = async (cart_id, product_id) => {
    return pool
        .query(`SELECT *  FROM cart_items WHERE cart_id=$1 AND product_id=$2`, [cart_id, product_id])
        .then(res => res.rows[0])
        .catch(err => console.error('Error while executing a addProductInCart query', err.stack));
};

const updateQuantity = async (quantity, id) => {
    return pool
        .query(`UPDATE cart_items SET quantity=$1 WHERE id=$2`, [quantity, id])
        .then(res => res.rows[0])
        .catch(err => console.error('Error while executing a addProductInCart query', err.stack));
};

const deleteProduct = async (cart_id, product_id) => {
    return pool
        .query(`DELETE FROM cart_items WHERE cart_id=$1 AND product_id=$2`, [cart_id, product_id])
        .then(res => res.rows[0])
        .catch(err => console.error('Error while executing a addProductInCart query', err.stack));
};

module.exports = {addProductInCart, checkProductInCart, updateQuantity, deleteProduct, getProductsFromCart};