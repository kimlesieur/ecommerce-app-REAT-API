const bodyParser = require('body-parser');
const express = require('express');
const app = express();
const session = require("express-session");

const {PORT} = require('./config');
const productsRouter = require('./routes/products');
const accountRouter = require('./routes/account');

const users = [
  {
    id: 1,
    email: "sam",
    password: "p",
  },
  {
    id: 2,
    email: "jill",
    password: "p",
  },
];


/* 
//Test to pass a date variable through the sub-Routers
const timeMiddleware = (req, res, next) => {  
    req.date = Date.now();
    next();
  };
app.use(timeMiddleware);
*/

app.use(bodyParser.urlencoded({
  extended: true
}));

app.use(
  session({
    name: 'kim-cookie',
    secret: "f4z4gs$Gcg",
    cookie: { maxAge: 300000000, secure: false },
    saveUninitialized: false,
    resave: false,
  })
);

const ensureAuthentication = (req, res, next) => {
  if (req.session.userId) {
    return next();
  } else {
    console.log("You're not authorized to view this page" );
    res.redirect('/');
  }
}

app.get('/', (req, res, next) => {
  console.log(req.session);
  res.send(
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
  res.send(`
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
  <input name='name' placeholder='Name' require/>
   <input name='email' placeholder='Email' require/>
   <input type='password' name='password' placeholder='Password' require/> 
   <input type='submit' />
 </form>
 <a href='/register'>Login</a>
 `)
});

app.post('/login', (req, res, next) => {
  const {email, password} = req.body;
  if(email && password){
    const user = users.find(user => user.email === email && user.password === password )
    if(user){
      req.session.userId = user.id;
      return res.redirect('/account')
    }
  }
  res.redirect('/login')
});


app.post('/logout', (req, res, next) => {
  req.session.destroy(err => {
    if(err){
      return res.redirect('/home')
    }
    res.clearCookie('kim-cookie');
    res.redirect('/login');
  })
});

app.use('/products', productsRouter);
app.use('/account', ensureAuthentication, accountRouter);









app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});