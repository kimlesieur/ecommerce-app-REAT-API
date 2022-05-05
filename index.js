const bodyParser = require('body-parser');
const express = require('express');
const app = express();
const session = require("express-session");
const passport = require("passport");
//const morgan = require('morgan');
const {PORT, SESS_NAME, SESS_SECRET, SALT_ROUNDS, JWT_SECRET, SESSION_EXPIRY} = require('./config');
const {passwordHash, getToken} = require('./utils/utils');
//Routers 
const productsRouter = require('./routes/products');
const categoriesRouter = require('./routes/categories');
const userRouter = require('./routes/user');
const cartRouter = require('./routes/cart');
const orderRouter = require('./routes/order');
const authRouter = require('./routes/auth');
//Authentication
const {createUser, checkUserMail} = require('./models/usersModel');
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");
const cors = require('cors');
//Swagger Documentation
const swaggerUi = require('swagger-ui-express');
const yaml = require('js-yaml');
const fs = require('fs');
const path = require('path');


/* 
//Test to pass a date variable through the sub-Routers
const timeMiddleware = (req, res, next) => {  
    req.date = Date.now();
    next();
  };
app.use(timeMiddleware);
*/

//app.use(morgan(':method :url :status :res[content-length]kB - :response-time ms'));

app.use(bodyParser.urlencoded({
  extended: true
}));

app.use(
  session({
    name: SESS_NAME,
    secret: SESS_SECRET,
    cookie: { maxAge: 300000000, secure: false },
    saveUninitialized: false,
    resave: false,
  })
);

//Instruction so Express can accept incoming requests with JSON payloads
app.use(express.json()) 
//Headers to allow requests from React frontend
app.use(function (req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4002');
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
});
app.use(cors());

require('./config/passport');
require('./config/passport-jwt');
app.use(passport.initialize());
app.use(passport.session());

/*
app.post('/login', async (req, res, next) => {
  const {email, password} = req.body;
  if(email && password){
    const user = await getUser(email, password);
    if(user){
      req.session.userId = user.id;
      req.session.user = user;
      return res.redirect('/account')
    }
  }
  res.redirect('/login?error=wrong-password');
});
*/

app.get('/', (req, res, next) => {
  return res.send(
    `<h1>Welcome to this REST API hosted on Heroku !<h1>
    <p>Use cURL or Postman to make requests </p>
    <a href='/docs'>Need some docs ? Check this !</a>
    `
  )
});

//Login and Register routes



app.post('/login', 
  passport.authenticate('local'),
  (req, res) => {
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
);

app.post('/register', async (req, res, next) => {
  const {firstname, lastname, email, password} = req.body;
  if(firstname && lastname && email && password){
    const isEmailTaken = await checkUserMail(email);
    if(isEmailTaken){
      return res.send('Error : email already taken')
    }
    const passwordHashed = await passwordHash(password, parseInt(SALT_ROUNDS));
    await createUser(firstname, lastname, email, passwordHashed);
    return res.send(201);
  }
  return res.status(401).send('Error : wrong info');
});

app.post('/logout', (req, res) => {
  req.logout();
  res.send(200);
});

const verifyToken = passport.authenticate("jwt", { session: false });

/*
const ensureAuthentication = (req, res, next) => {
  console.log("tentative d'authentification");
  const test = req.user ? "user défini" : "user non défini";
  console.log(test);
  if (req.user) {
    return next();
  } else {
    return res.redirect('/login?unauthorized');
  }
}
*/

/*
app.post('/logout', (req, res, next) => {
  req.session.destroy(err => {
    if(err){
      return res.redirect('/home')
    }
    res.clearCookie(SESS_NAME);
    res.redirect('/login');
  })
});
*/

//Swagger Doc
const swaggerDoc = yaml.load(fs.readFileSync(path.resolve(__dirname, './swagger.yaml'), 'utf-8'));
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDoc));

//Routes
app.use('/products', productsRouter);
app.use('/categories', categoriesRouter);
app.use('/auth', authRouter )
app.use('/user', verifyToken, userRouter);
app.use('/cart', verifyToken, cartRouter);
app.use('/orders', verifyToken, orderRouter);



app.listen(process.env.PORT || 3002, () => {
  console.log(`Server is listening on port ${PORT}`);
});