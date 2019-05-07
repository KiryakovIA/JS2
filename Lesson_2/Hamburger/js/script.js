class Ingredient {
    constructor(id, category, name, price, kkal) {
        this.id = id;
        this.category = category; // 1 - размер гамбургера, 2 - начинка, 3 - добавка
        this.name = name;
        this.price = price;
        this.kkal = kkal;
    }
}

const ingredients = [
    new Ingredient(1, 1, "Маленикий", 50, 20),
    new Ingredient(2, 1, "Большой", 100, 40),
    new Ingredient(3, 2, "Сыр", 10, 20),
    new Ingredient(4, 2, "Салат", 20, 5),
    new Ingredient(5, 2, "Картофель", 15, 10),
    new Ingredient(6, 3, "Приправа", 15, 0),
    new Ingredient(7, 3, "Майонез", 20, 5)
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