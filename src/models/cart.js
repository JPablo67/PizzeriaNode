class Cart {
    constructor(id, nombreNegocio, nombreCliente, pizzas, cantidadPizzas, total) {
        this.id = id;
        this.nombreNegocio = nombreNegocio;
        this.nombreCliente = nombreCliente;
        this.pizzas = pizzas || []; // array of pizzas
        this.cantidadPizzas = cantidadPizzas || 0;
        this.total = total || 0;
    }
}

module.exports = Cart;

const pizzaSingleton = require('./pizza'); 


const cartSingleton = (() => {
    let instance = null;

    function createInstance() {
        const carts = [];
        const pizzas = pizzaSingleton.getInstance();
        // Add two carts
        carts.push(new Cart(1, 'Negocio 1', 'Cliente 1', [pizzas[0], pizzas[1]], 2, pizzas[0].price + pizzas[1].price));
        carts.push(new Cart(2, 'Negocio 2', 'Cliente 2', [pizzas[1], pizzas[2]], 2, pizzas[1].price + pizzas[2].price));
        return carts;
    }

    return {
        getInstance: () => {
            if (!instance) {
                instance = createInstance();
            }
            return instance;
        },
    };
})();

const carts = cartSingleton.getInstance();
module.exports = cartSingleton;
console.log(carts); 
