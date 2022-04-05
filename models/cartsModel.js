const {pool} = require('../database');

const getCart = (userId) => {
    return pool
        .query(`SELECT * FROM carts WHERE user_id = $1`, [userId])
        .then(res => res.rows[0])
        .catch(err => console.error('Error while executing a getCart query', err.stack))
};

const deleteCart = (userId) => {
    return pool
            .query(`DELETE FROM carts WHERE user_id = $1 `, [userId])
            .catch(err => console.error('Error while executing a deleteCart query', err.stack))
}

const createCart = (userId) => {
    return pool
            .query(`INSERT INTO carts (user_id, created, modified) VALUES ($1, NOW(), NOW())`, [userId])
            .then(res => res.rows)
            .catch(err => console.error('Error while executing a createCart query', err.stack))
}




module.exports = {getCart, createCart, deleteCart};