const {pool} = require('../database');
const fetch = require('node-fetch');

const getUser = async (email, password) => {
    return pool
        .query(`SELECT * FROM users WHERE email = $1 AND password = $2`, [email, password])
        .then(res => res.rows[0])
        .catch(err => console.error('Error while executing a getUser query', err.stack))
};

const getUserById = async (id) => {
    return pool
        .query(`SELECT * FROM users WHERE id = $1`, [id])
        .then(res => res.rows[0])
        .catch(err => console.error('Error while executing a getUser query', err.stack))
};


const checkUserMail = async (email) => {
    return pool
        .query(`SELECT * FROM users WHERE email = $1`, [email])
        .then(res => res.rows[0])
        .catch(err => console.error('Error while executing a checkUserMail query', err.stack))
};

const createUser = async (firstname, lastname, email, password, oauth_id) => {
    return pool
            .query(`INSERT INTO users (firstname, lastname, email, password, oauth_id, created) VALUES ($1, $2, $3, $4, $5, NOW()) RETURNING *`, [firstname, lastname, email, password, oauth_id])
            .then(res => res.rows[0])
            .catch(err => console.error('Error while executing a createUser query', err.stack))
};

const checkOauthId = async (oauthId) => {
    return pool
        .query(`SELECT * FROM users WHERE oauth_id = $1`, [oauthId])
        .then(res => res.rows[0])
        .catch(err => console.error('Error while executing a checkUserMail query', err.stack))
};

const getInfoFromGoogle = async (accessToken) => {
    const data = await fetch(`https://www.googleapis.com/oauth2/v3/userinfo?access_token=${accessToken}`)
      .then(res => res.json());
    console.log(data);
    return data;
  };


module.exports = {getUser, createUser, checkUserMail, getUserById, checkOauthId, getInfoFromGoogle};