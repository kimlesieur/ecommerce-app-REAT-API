const {pool} = require('../database');

const getUser = async (email, password) => {
    return pool
        .query(`SELECT * FROM users WHERE email = $1 AND password = $2`, [email, password])
        .then(res => res.rows[0])
        .catch(err => console.error('Error while executing a getUser query', err.stack))
};

const checkUserMail = async (email) => {
    return pool
        .query(`SELECT * FROM users WHERE email = $1`, [email])
        .then(res => res.rows[0])
        .catch(err => console.error('Error while executing a checkUserMail query', err.stack))
};

const createUser = async (firstname, lastname, email, password) => {
    return pool
            .query(`INSERT INTO users (firstname, lastname, email, password, created) VALUES ($1, $2, $3, $4, NOW())`, [firstname, lastname, email, password])
            .then(res => res.rows[0])
            .catch(err => console.error('Error while executing a createUser query', err.stack))
};

module.exports = {getUser, createUser, checkUserMail};

INSERT INTO users (firstname, lastname, email, password, created) VALUES ('mike','john', 'mike@gmail.com', 'password', NOW())