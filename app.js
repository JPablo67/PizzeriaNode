const express = require('express');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');
const pizzaController = require('./src/controllers/pizzaController.js');
const cartController = require('./src/controllers/cartControler.js');
const pizzaSingleton = require('./src/models/pizza');
const CartSingleton = require('./src/models/cart');
const Cart = require('./src/models/cart');
const Pizza = require('./src/models/pizza')



const app = express();
const port = 3000;

// Swagger config
const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Pizzaas API',
      version: '1.0.0',
      description: 'API documentation for Pizzaas application',
    },
    servers: [
      {
        url: `http://localhost:${port}`,
      },
    ],
  },
  apis: ['/Users/jpabloacosta/Desktop/Projects 7/Pizzaas/app.js'], // Path rutas
};

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Rutas

// Rutas Pizza
app.get('/pizzas', pizzaController.getPizzas);
app.get('/pizzas/:id', pizzaController.getPizzaById);
app.put('/pizza/:id/ingredients', pizzaController.updatePizzaIngredients);
app.post('/createPizza', pizzaController.createPizza);
app.delete('/eliminarPizza/:id', pizzaController.deletePizza);

// Rutas Carrito
app.post('/cart/add/:cartId', cartController.addToCart);
app.post('/order/finalize/:cartId', cartController.finalizeOrder);
app.get('/cart/:id', cartController.getCart);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
