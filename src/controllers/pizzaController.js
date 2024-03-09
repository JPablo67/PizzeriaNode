const pizzaSingleton = require('../models/pizza');

exports.getPizzas = (req, res) => {
  const pizzas = pizzaSingleton.getInstance();
  res.send(pizzas);
};

exports.getPizzaById = (req, res) => {
  const pizzaId = parseInt(req.params.id);
  const pizzas = pizzaSingleton.getInstance();
  const pizza = pizzas.find(pizza => pizza._id === pizzaId);
  if (pizza) {
      res.send(pizza);
  } else {
      res.status(404).send({ message: `Pizza con ID ${pizzaId} no encontrada.` });
  }
};

exports.updatePizzaIngredients = (req, res) => {
  const pizzas = pizzaSingleton.getInstance();
  const id = parseInt(req.params.id);
  const { newIngredient4, newIngredient5 } = req.body;

  const pizza = pizzas.find(pizza => pizza._id === id);
  if (!pizza) {
      return res.status(404).send('Pizza no encontrada.');
  }

  pizza.agregarIngrediente1(newIngredient4);
  pizza.agregarIngrediente2(newIngredient5);

  res.send(pizza);
};

exports.createPizza = (req, res) => {
    const { id, name, description, price, ingredients } = req.body;
    pizzaSingleton.addPizza(id, name, description, price, ingredients);
    res.status(201).send({ message: 'Pizza creada exitosamente' });
};

exports.deletePizza = (req, res) => {
    const { id } = req.params;
    pizzaSingleton.deletePizza(id);
    res.status(200).send({ message: 'Pizza eliminada exitosamente' });
};