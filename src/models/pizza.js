class Pizza {

    constructor(id, name, description, price, ingredients, ) {
        this._id = id;
        this.name = name;
        this.description = description;
        this.price = price;
        this.ingredients = ingredients;
        
    }

    agregarIngrediente1(newIngredient4) {
            this.ingredients[3] = newIngredient4;
        
    }

    agregarIngrediente2(newIngredient5){
            this.ingredients[3] = newIngredient4;
        
    }


}

margarita  = new Array("Mozarella", "Albahaca", "No", "No") 
peperoni = new Array("Peperoni", "Queso", "Oregano", "No" , "No") 
napolitana = new Array("Mozarella", "Tomate", "Aceitunas", "No", "No") 


const pizzaSingleton = (() => {
    let instance = null;

    function createInstance() {
        const pizzas = [];

        // Agrega pizzas al array
        pizzas.push(new Pizza(1, "Margarita","Pizza de Queso con Albahaca y Tomate.", 10.99, this.margarita));
        pizzas.push(new Pizza(2, "Peperoni", "Pizza de Queso con Peperoni y Oregano.", 12.99, this.peperoni));
        pizzas.push(new Pizza(3, "Napolitana",  "Pizza de Queso con Tomate y Aceitunas.", 11.99, this.peperoni));

        return pizzas;
    }

    function addPizza(id, name, description, price, ingredients) {
        if (!instance) {
            instance = createInstance();
        }
        instance.push(new Pizza(id, name, description, price, ingredients));
    }

    function deletePizza(id) {
        if (!instance) {
            instance = createInstance();
        }
        const index = instance.findIndex(pizza => pizza._id === id);
        if (index !== -1) {
            instance.splice(index, 1);
        }
    }

    return {
        getInstance: () => {
            if (!instance) {
                instance = createInstance();
            }
            
            return instance;
        },
        deletePizza,
        addPizza,
    };
})();

// Usage:
const pizzas = pizzaSingleton.getInstance();
console.log(pizzas); // Output: [Pizza, Pizza, Pizza]
module.exports = pizzaSingleton;
