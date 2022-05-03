const {pool} = require('../database');

const createOrder = (userId) => {
    return pool 
            .query(`INSERT INTO orders (user_id, status, created) VALUES ($1, 'en attente de paiement', NOW()) RETURNING id`, [userId])
            .then(res => res.rows[0])
            .catch(err => console.error("Error while executing createOrder query", err.stack))
};

const getOrders = (userId) => {
    return pool 
            .query(`SELECT * FROM orders WHERE user_id=$1 ORDER BY id`, [userId])
            .then(res => res.rows)
            .catch(err => console.error("Error while executing getOrders query", err.stack))
}; 

const checkoutOrder = (orderId) => {
    return pool
            .query(`UPDATE orders SET status = 'payé' WHERE id = $1`, [orderId])
            .then(res => res.rows[0])
            .catch(err => console.error("Error while executing checkoutOrder query", err.stack))
};

const updateTotal = (total, orderId) => {
    return pool
            .query(`UPDATE orders SET total = $1 WHERE id = $2`, [total, orderId])
            .then(res => res.rows[0])
            .catch(err => console.error("Error while executing checkoutOrder query", err.stack))
};

module.exports = {createOrder, getOrders, checkoutOrder, updateTotal};
