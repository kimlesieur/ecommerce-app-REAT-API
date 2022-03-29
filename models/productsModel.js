const {pool} = require('../database');

const getProducts = async () => {
    return pool
    .query(`SELECT * FROM products ORDER BY id`, [])
    .then(res => res.rows)
    .catch(err => console.error('Error while executing a getProducts query', err.stack))
};

const getProductById = async (id) => {
    console.log(`voilà ton id : ${id}`);
    return pool
    .query(`SELECT * FROM products WHERE id = $1`, [id])
    .then(res => res.rows[0])
    .catch(err => console.error('Error while executing a getProductById query', err.stack))
};

module.exports = {getProducts, getProductById};