class GoodsItem {
	constructor(title, price = '') {
		this.title = title;
		this.price = price;
	}

	render() {
		return `<div class="goods-item"><h3>${this.title}</h3><p>${this.price}</p></div>`;
	}
}

class GoodsList {
	constructor() {
		this.goods = [];
	}

	fetchGoods() {
		this.goods = [
			{
				title: 'Shirt',
				price: 150
			},
			{
				title: 'Socks',
				price: 50
			},
			{
				title: 'Jacket',
				price: 350
			},
			{
				title: 'Shoes',
				price: 250
			},
    ];
	}


	render() {
		let listHtml = '';
		this.goods.forEach(good => {
			const goodItem = new GoodsItem(good.title, good.price);
			listHtml += goodItem.render();
		});
		document.querySelector('.goods-list').innerHTML = listHtml;
	}

	calcSum() {
		return this.goods.reduce((res, item) => res += item.price, 0);
	}
}

const list = new GoodsList();
list.fetchGoods();
list.render();

class Cart {
	constructor() {
		this.cartItems = [];
	}

	findCartItem(goodsItem) {}

	addGoodsItem(goodsItem) {}

	removeGoodsItem(goodsItem) {}

	claer() {
		this.cartItems = [];
	}

	calcCost() {
		return this.cartItems.reduce((res, cartItem) => res += cartItem.calcCost(), 0)
	}

	render() {}
}

class CartItem {
	constructor(goodsItem, count = 1) {
		this.goodsItem = goodsItem;
		this.count = count;
	}

	calcCost() {
		return this.goodsItem.price * this.count;
	}

	render() {}
}
