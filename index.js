const express = require('express');
const productsRouter = require('./routes/products');
const app = express();
const PORT = 4001;

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








