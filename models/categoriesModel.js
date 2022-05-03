const {pool} = require('../database');

const getCategories = () => {
    return pool
    .query(`SELECT * FROM categories ORDER BY id`, [])
    .then(res => res.rows)
    .catch(err => console.error('Error while executing a getCategories query', err.stack))
};

module.exports = {getCategories};