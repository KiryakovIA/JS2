class Ingredient {
    constructor(id, price, kkal) {
        this.id = id;
        this.price = price;
        this.kkal = kkal;
    }
}

const ingredients = [
    new Ingredient("small", 50, 20),
    new Ingredient("big", 100, 40),
    new Ingredient("cheese", 10, 20),
    new Ingredient("salad", 20, 5),
    new Ingredient("potato", 15, 10),
    new Ingredient("spice", 15, 0),
    new Ingredient("mayonnaise", 20, 5)
];

class Hamburger {
    constructor(size, stuffing) {
        this.size = size;
        this.stuffing = stuffing;
        this.toppings = [];
    }

    addTopping(topping) {
        const index = this.toppings.indexOf(topping);
        if (index == -1)
            this.toppings.push(topping);
    }

    removeTopping(topping) {
        const index = this.toppings.indexOf(topping);
        if (index > 0)
            this.toppings.slice(index, 1);
    }

    getToppings(topping) {
        return this.toppings;
    }

    getSize() {
        return this.size;
    }

    getStuffing() {
        return this.stuffing;
    }

    calculatePrice() {
        return this.size.price + this.stuffing.price + this.toppings.reduce((res, topping) => res += topping.price, 0);
    }

    calculateCalories() {
        return this.size.kkal + this.stuffing.kkal + this.toppings.reduce((res, topping) => res += topping.kkal, 0);
    }
}

document.getElementById('submit').onclick = event => {    
    let size = ingredients.find(it => it.id == document.querySelector('input[name="size"]:checked').id);
    let stuffing = ingredients.find(it => it.id == document.querySelector('input[name="stuffing"]:checked').id);
    document.querySelectorAll('input[name="topping"]:checked')
    
    let hamburger = new Hamburger(size, stuffing);
    document.querySelector('#price').innerHTML = hamburger.calculatePrice();
    document.querySelector('#calories').innerHTML = hamburger.calculateCalories();
}
