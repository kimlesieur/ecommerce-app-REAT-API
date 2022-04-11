const bodyParser = require('body-parser');
const express = require('express');
const app = express();
const session = require("express-session");
const passport = require("passport");
//const morgan = require('morgan');
const {PORT, SESS_NAME, SESS_SECRET, SALT_ROUNDS} = require('./config');
const productsRouter = require('./routes/products');
const accountRouter = require('./routes/account');
const cartRouter = require('./routes/cart');
const orderRouter = require('./routes/order');
const {getUser, createUser, checkUserMail} = require('./models/usersModel');
const bcrypt = require('bcrypt');

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

require('./config/passport');
app.use(passport.initialize());
app.use(passport.session());


app.get('/', (req, res, next) => {
  return res.send(
    `<h1>Welcome!<h1>
    <a href='/login'>Login</a>
    <a href='/register'>Register</a>
    <a href='/'>Home</a>
    <form method='post' action='/logout'>
      <button>Logout</button>
    </form>`
  )
});

app.get('/login', (req, res, next) => {
  if(req.query.unauthorized){
    return res.send(`
    <h1>Login</h1>
    <h2>You can't access this page, please login or register !</h2>
    <form method='post' action='/login'>
      <input name='email' placeholder='Email' require/>
      <input type='password' name='password' placeholder='Password' require/> 
      <input type='submit' />
    </form>
    <a href='/register'>Register</a>
  `
  )
  }
  return res.send(`
    <h1>Login</h1>
    <form method='post' action='/login'>
      <input name='email' placeholder='Email' require/>
      <input type='password' name='password' placeholder='Password' require/> 
      <input type='submit' />
    </form>
    <a href='/register'>Register</a>
  `
  )
});

app.get('/register', (req, res, next) => {
 res.send(`
 <h1>Register</h1>
 <form method='post' action='/register'>
    <input name='firstname' placeholder='First Name' require/>
    <input name='lastname' placeholder='First Name' require/>
    <input name='email' placeholder='Email' require/>
    <input type='password' name='password' placeholder='Password' require/> 
    <input type='submit' />
 </form>
 <a href='/register'>Login</a>
 `)
});

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

app.post('/login', 
  passport.authenticate('local', {failureRedirect: "/login?error=wrong-password"}),
  (req, res) => {
    res.redirect("/");
  }
);

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

//TODO = When user register, retrieve the user id and add to session for automatic login
app.post('/register', async (req, res, next) => {
  const {firstname, lastname, email, password} = req.body;
  if(firstname && lastname && email && password){
    const isEmailTaken = await checkUserMail(email);
    if(isEmailTaken){
      return res.redirect('/register?error=mail-already-taken')
    }
    const passwordHashed = await passwordHash(password, parseInt(SALT_ROUNDS));
    await createUser(firstname, lastname, email, passwordHashed)
    return res.redirect('/')
  }
  return res.redirect('/register?error=missing-infos')
});

app.post('/logout', (req, res) => {
  req.logout();
  res.redirect('/');
});

const ensureAuthentication = (req, res, next) => {
  if (req.user) {
    return next();
  } else {
    return res.redirect('/login?unauthorized');
  }
}

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

app.use('/products', productsRouter);
app.use('/account', ensureAuthentication, accountRouter);
app.use('/cart', ensureAuthentication, cartRouter);
app.use('/orders', ensureAuthentication, orderRouter);



app.listen(process.env.PORT || 3002, () => {
  console.log(`Server is listening on port ${PORT}`);
});