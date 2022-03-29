const express = require('express');
const app = express();
const {PORT} = require('./config');
const productsRouter = require('./routes/products');
const accountRouter = require('./routes/account');

app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
});
/* 
//Test to pass a date variable through the sub-Routers
const timeMiddleware = (req, res, next) => {  
    req.date = Date.now();
    next();
  };
app.use(timeMiddleware);
*/

app.use('/products', productsRouter);
app.use('/account', accountRouter);








