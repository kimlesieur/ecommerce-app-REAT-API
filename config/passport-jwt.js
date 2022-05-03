const passport = require("passport");
const JwtStrategy = require("passport-jwt").Strategy,
      ExtractJwt = require("passport-jwt").ExtractJwt;
const {JWT_SECRET} = require('../config'); 
const {getUserById} = require('../models/usersModel');

const getUser = async (id, cb) => {
    const user = await getUserById(id);
    if(user) return cb(null, user);
    return cb(new Error("User with id " + id + "does not exist"));
};

const opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = JWT_SECRET;

passport.use(new JwtStrategy(opts, function (jwt_payload, cb){
    getUser(jwt_payload.id, function (err, user) {
        if (err) {
          return cb(err, false)
        }
        if (user) {
          return cb(null, user)
        } else {
          return cb(null, false)
        }
      })
}));