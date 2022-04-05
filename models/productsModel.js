const {pool} = require('../database');

const getProducts = async (id = '') => {
    if(id){
        const categoryId = parseInt(id);
        return pool
        .query(`SELECT * FROM products WHERE category_id = $1`, [categoryId])
        .then(res => res.rows)
        .catch(err => console.error('Error while executing a getProducts query', err.stack))
    }
    return pool
        .query(`SELECT * FROM products ORDER BY id`, [])
        .then(res => res.rows)
        .catch(err => console.error('Error while executing a getProducts query', err.stack))
};

const getProductById = async (id) => {
    return pool
        .query(`SELECT * FROM products WHERE id = $1`, [id])
        .then(res => res.rows[0])
        .catch(err => console.error('Error while executing a getProductById query', err.stack))
};

const getProductPrice = async (id) => {
    return pool
    .query(`SELECT price FROM products WHERE id = $1`, [id])
    .then(res => res.rows[0])
    .catch(err => console.error('Error while executing a getProductPrice query', err.stack))
};


module.exports = {getProducts, getProductById, getProductPrice};