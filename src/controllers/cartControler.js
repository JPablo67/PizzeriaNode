const CartSingleton = require('../models/cart');
const pizzaSingleton = require('../models/pizza');

exports.addToCart = (req, res) => {
  const cartId = parseInt(req.params.cartId);
  const pizzaId = parseInt(req.body.pizzaId);

  const carts = CartSingleton.getInstance();
  const pizzas = pizzaSingleton.getInstance();

  const cart = carts.find(cart => cart.id === cartId);
  const pizza = pizzas.find(pizza => pizza._id === pizzaId);

  if (!cart) {
      res.status(404).send({ message: `Carrito con ID ${cartId} no encontrado.` });
      return;
  }

  if (!pizza) {
      res.status(404).send({ message: `Pizza con ID ${pizzaId} no encontrado.` });
      return;
  }

  cart.pizzas.push(pizza);
  res.send(cart);
};

exports.finalizeOrder = (req, res) => {
  const cartId = parseInt(req.params.cartId);
  const carts = CartSingleton.getInstance();
  const cart = carts.find(c => c.id === cartId);

  if (!cart) {
    res.status(404).send({ message: `Cart with id ${cartId} not found.` });
    return;
  }

  let total = 0;
  cart.pizzas.forEach(pizza => {
    total += pizza.price;
  });

  const orderSummary = {
    cartId: cart.id,
    nombreNegocio: cart.nombreNegocio,
    nombreCliente: cart.nombreCliente,
    total: total,
    pizzas: cart.pizzas.map(pizza => ({
      id: pizza._id,
      name: pizza.name,
      price: pizza.price
    })),
    message: "Orden complertada con exito."
  };

  res.send(orderSummary);
};

exports.getCart = (req, res) => {
  const carts = CartSingleton.getInstance();
  const cart = carts.find(c => c.id == req.params.id);
  if (cart) {
      res.json(cart);
  } else {
      res.status(404).send('Carrito no encontrado.');
  }
};