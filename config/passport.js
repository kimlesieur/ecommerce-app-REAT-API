const passport = require("passport");
const createError = require('http-errors');
const LocalStrategy = require("passport-local").Strategy;
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
const {GOOGLE, SALT_ROUNDS} = require('../config');
const {checkUserMail, getUserById, createUser, checkOauthId, getInfoFromGoogle} = require('../models/usersModel');
const bcrypt = require('bcrypt');
const {passwordHash} = require('../utils/utils');


const getUserByMail = async (email, cb) => {
    const user = await checkUserMail(email);
    if(user) return cb(null, user);
    return cb(null, null);
};

const getUser = async (id, cb) => {
    const user = await getUserById(id);
    if(user) return cb(null, user);
    return cb(new Error("User with id " + id + "does not exist"));
};

passport.serializeUser((user, done) => {
    done(null, user.id);
  });

passport.deserializeUser((id, done) => {
    getUser(id, (err, user) => {
        if(err) return done(err);
        return done(null, user);
    });
});


passport.use(new LocalStrategy(
    {
        usernameField: 'email'
    },
    function (username, password, cb) {
        getUserByMail(username, async (err, user) => {
            if(err) return cb(err);
            if(!user) return cb(null, false);
            const matchPassword = await bcrypt.compare(password, user.password);
            if(!matchPassword) return cb(null, false);
            return cb(null, user)
        });
    }
));

/*
Google OAuth2 Strategy
*/

//TODO Password creation : add a random creation string utils before calling passwordHash()

passport.use(new GoogleStrategy({
    clientID: GOOGLE.CLIENT_ID,
    clientSecret: GOOGLE.CLIENT_SECRET,
    callbackURL: GOOGLE.CALLBACK_URL
  },
  async (accessToken, refreshToken, profile, done) => {
    try {
      const checkUser = await checkOauthId(profile.id);
      if(checkUser){
        console.log(`User ${checkUser.firstname} has already an account !`);
        return done(null, checkUser);
      }
      const user = await getInfoFromGoogle(accessToken);
      const passwordHashed = await passwordHash("test", parseInt(SALT_ROUNDS));
      const newUser = await createUser(user.given_name, user.family_name, user.email, passwordHashed, user.sub);
      return done(null, newUser);
    } catch(err) {
      return done(err);
    }
  }
));






