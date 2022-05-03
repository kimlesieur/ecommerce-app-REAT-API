const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const {checkUserMail, getUserById} = require('../models/usersModel');
const bcrypt = require('bcrypt');

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



