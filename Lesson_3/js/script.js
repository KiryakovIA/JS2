const API_URL = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses';

function makeGETRequest(url) {
    return new Promise((resolve, reject) => {
        let xhr;

        if (window.XMLHttpRequest) {
            xhr = new XMLHttpRequest();
        } else if (window.ActiveXObject) {
            xhr = new ActiveXObject("Microsoft.XMLHTTP");
        }

        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4) {
                xhr.status === 200 ? resolve(xhr.responseText) : reject(`Error ${xhr.status}: ${xhr.statusText}`);
            }
        }

        xhr.open('GET', url, true);
        xhr.send();
    });
}

class GoodsItem {
    constructor(product_name = 'Без имени', price = '') {
        this.product_name = product_name;
        this.price = price;
    }

    render() {
        return `<div class="goods-item"><h3>${this.product_name}</h3><p>${this.price}</p></div>`;
    }
}

class GoodsList {
    constructor() {
        this.goods = [];
    }

    fetchGoods() {
        return new Promise((resolve, reject) => {
            makeGETRequest(`${API_URL}/catalogData.json`)
                .then(goods => {
                    this.goods = JSON.parse(goods);
                    resolve();
                })
                .catch(err => reject(err));
        })
    }


    render() {
        let listHtml = '';
        this.goods.forEach(good => {
            const goodItem = new GoodsItem(good.product_name, good.price);
            listHtml += goodItem.render();
        });
        document.querySelector('.goods-list').innerHTML = listHtml;
    }

    calcSum() {
        return this.goods.reduce((res, item) => res += item.price, 0);
    }
}

const list = new GoodsList();
list.fetchGoods()
    .then(() => list.render())
    .catch(err => console.log(err));

class Cart extends GoodsList {
    fetchGoods() {
        return new Promise((resolve, reject) => {
            makeGETRequest(`${API_URL}/getBasket.json`)
                .then(goods => {
                    this.goods = JSON.parse(goods).contents.map(good => new CartItem(good.product_name, good.price, good.quantity));
                    resolve();
                })
                .catch(err => reject(err));
        })
    }

    add() {
        makeGETRequest(`${API_URL}/addToBasket.json`);
    }

    update(index, newCount) {
        this.goods[index].setCount = newCount;
    }

    remove(index) {
        makeGETRequest(`${API_URL}/deleteFromBasket.json`);
    }

    claer() {
        this.cartItems = [];
    }

    calcCost() {
        return this.cartItems.reduce((res, cartItem) => res += cartItem.calcCost(), 0)
    }

    render() { }
}

class CartItem extends GoodsItem {
    constructor(product_name, price, count = 1) {
        super(product_name, price);
        this.count = count;
    }

    getCount() {
        return this.count;
    }

    setCount(newCount) {
        this.count = newCount;
    }

    calcCost() {
        return this.price * this.count;
    }

    render() { }
}
