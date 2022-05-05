const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");
const {JWT_SECRET, SESSION_EXPIRY} = require('../config');

const passwordHash = async (password, saltRounds) => {
    try {
      const salt = await bcrypt.genSalt(saltRounds);
      const hash = await bcrypt.hash(password, salt);
      return hash;
    } catch (err) {
      console.log(err);
    }
    return null;
  };

  const getToken = userId => {
    return jwt.sign(userId, JWT_SECRET, {
      expiresIn: eval(SESSION_EXPIRY),
    })
  };

  const tokenMiddleware = () => {
    return (req, res) => {
    const token = getToken({ id: req.user.id });
    if(token){
      res.send({
          success: true, 
          token 
      })
    } else {
      console.log("Erreur serveur lors de l'authentification")
      res.send("Erreur serveur lors de l'authentification")
    }
    }
};

module.exports = {passwordHash, getToken, tokenMiddleware};