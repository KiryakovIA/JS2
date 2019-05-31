const API_URL = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses';

function getXhr() {
	if (window.XMLHttpRequest) {
		return new XMLHttpRequest();
	} else if (window.ActiveXObject) {
		return new ActiveXObject("Microsoft.XMLHTTP");
	}
}

function makeGETRequest(url) {
	return new Promise((resolve, reject) => {
		const xhr = getXhr();
		xhr.onreadystatechange = function () {
			if (xhr.readyState !== 4) return;

			if (xhr.status === 200) {
				resolve(xhr.responseText);
			} else {
				reject("Request error");
			}
		};

		xhr.open('GET', url, true);
		xhr.send();
	});
}

Vue.component('goods-list', {
	props: ['goods'],
	computed: {
		empty() {
			return this.goods.length === 0;
		}
	},

	template: `
		<div class="goods-list">
			<p v-if="empty">Нет данных</p>
			<goods-item v-for="good in goods" :good="good" :key="good.id_product"></goods-item>
		</div>`
});

Vue.component('goods-item', {
	props: ['good'],
	template: `
		<div class="goods-item">
		  <h3>{{ good.product_name }}</h3>
		  <p>{{ good.price }}</p>
		</div>`
});

Vue.component('cart', {
	props: ['cart'],
	template: `
			<div class="cart">
				<h2>Корзина</h2>
				<div class="cart-items">
					<cart-item v-for="cartItem in cart.contents" :cartItem="cartItem" :key="cartItem.id_product"></cart-item>
				</div>
				<h3 class="amount">Итого: {{cart.amount}}</h3>
			</div>`
});

Vue.component('cart-item', {
	props: ['cartItem'],
	template: `
		<div class="cart-item">
			<h3>{{cartItem.product_name}}</h3>
			<p>{{cartItem.price}}</p>
			<p>Количество: {{cartItem.quantity}}</p>
		</div>`
});

Vue.component('search-form', {
	props: ['value'],
	template: `
		<form class="search-form" @submit.prevent="$emit('filter')">
			<input class="goods-search" type="text" :value="value" @input="$emit('input', $event.target.value)">
			<button type="submit" class="search-button">Искать</button>
		</form>`
});

Vue.component('error-message', {
	props: ['message'],
	methods: {
		setCloseTimeOut() {
			setTimeout(() => {
				this.$emit('close');
			}, 3000);
		}
	},
	mounted() {
		this.setCloseTimeOut();
	},
	template: `<div class="error-message">{{message}}</div>`,
});

const app = new Vue({
	el: '#app',

	data: {
		goods: [],
		filteredGoods: [],
		message: '',
		searchLine: '',

		cart: [],
		isVisibleCart: false,
		isVisibleError: false
	},

	methods: {
		filterGoods() {
			const regexp = new RegExp(this.searchLine, "i")
			this.filteredGoods = this.goods.filter(good => regexp.test(good.product_name));
		},

		cartButton_OnClick(e) {
			this.isVisibleCart = !this.isVisibleCart;
		},

		addToCart_OnClick(e, id_product) {
			e.preventDefault();
			const product = this.goods.find(item => item.id_product == id_product)
			this.addToCart(product);
		},

		addToCart(product) {
			makeGETRequest(`${API_URL}/addToBasket.json`).then(() => {
				console.log(product.product_name)
			}).catch(err => console.error(err))
		},

		showError() {
			this.isVisibleError = true;
		},

		closeError() {
			this.isVisibleError = false;
		}
	},

	mounted() {
		makeGETRequest(`${API_URL}/catalogData.json`).then(responseText => {
			this.goods = JSON.parse(responseText);
			this.filteredGoods = this.goods;
		}).catch(err => {
			this.message = err;
			this.showError();
		});
		makeGETRequest(`${API_URL}/getBasket.json`).then(responseText => {
			this.cart = JSON.parse(responseText);
		});
	}
});
