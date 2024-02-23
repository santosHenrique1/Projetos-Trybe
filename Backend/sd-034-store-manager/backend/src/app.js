const express = require('express');
const { productsController, salesController } = require('./controllers');
const { validProductId, validQuantity } = require('./middlewares/saleMiddlewares');
const { existName } = require('./middlewares/productMiddlewares');

const app = express();
app.use(express.json());

// não remova esse endpoint, é para o avaliador funcionar
app.get('/', (_request, response) => {
  response.json({ status: 'Store Manager UP!' });
});
app.get('/products', productsController.findAll);
app.get('/products/:id', productsController.findById);
app.get('/sales', salesController.findAll);
app.get('/sales/:id', salesController.findById);
app.post('/products', productsController.createProducts);
app.post('/sales', validProductId, validQuantity, salesController.createSale);
app.put('/products/:id', existName, productsController.updateProducts);
app.delete('/products/:id', productsController.deleteProducts);
module.exports = app;
