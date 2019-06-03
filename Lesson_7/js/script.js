const API_URL = 'http://localhost:3000'

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
			<goods-item v-for="good in goods" :good="good" :key="good.id_product" @add-to-cart="$emit('add-to-cart', good.id_product)"></goods-item>
		</div>`
});

Vue.component('goods-item', {
	props: ['good'],
	template: `
		<div class="goods-item">
		 	<h3>{{ good.product_name }}</h3>
			<p>{{ good.price }}</p>
			<button class="add-to-cart" @click="$emit('add-to-cart')">Добавить в корзину</button>
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
		getXhr() {
			if (window.XMLHttpRequest) {
				return new XMLHttpRequest();
			} else if (window.ActiveXObject) {
				return new ActiveXObject("Microsoft.XMLHTTP");
			}
		},

		makeGETRequest(url) {
			return new Promise((resolve, reject) => {
				const xhr = this.getXhr();
				xhr.onreadystatechange = function () {
					if (xhr.readyState !== 4) return;

					if (xhr.status === 200) {
						resolve(xhr.responseText);
					} else {
						reject("Request error");
					}
				};

				xhr.open('GET', url, true);
				xhr.setRequestHeader('Access-Control-Allow-Origin', '*');
				xhr.send();
			});
		},

		makePOSTRequest(url, data) {
			return new Promise((resolve, reject) => {
				const xhr = this.getXhr();
				xhr.onreadystatechange = function () {
					if (xhr.readyState !== 4) return;

					if (xhr.status === 200) {
						resolve(xhr.responseText);
					} else {
						reject("Request error");
					}
				};
				
				xhr.open('POST', url, true);
				xhr.setRequestHeader('Content-Type', 'application/json; charset=UTF-8');
				xhr.send(data);

			});
		},

		filterGoods() {
			const regexp = new RegExp(this.searchLine, "i")
			this.filteredGoods = this.goods.filter(good => regexp.test(good.product_name));
		},

		cartButton_OnClick(e) {
			this.isVisibleCart = !this.isVisibleCart;
		},

		addToCart(id_product) {
			const product = this.goods.find(item => item.id_product == id_product)
			this.makePOSTRequest(`${API_URL}/addToCart`, JSON.stringify(product)).then(() => {
				console.log(product.product_name)
			}).catch(err => console.error(err))
		},
		
		deleteFromCart(id_product){
			const product = this.goods.find(item => item.id_product == id_product)
			this.makePOSTRequest(`${API_URL}/deleteFromCart`, JSON.stringify(product)).then(() => {
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
		this.makeGETRequest(`${API_URL}/catalogdata`).then(responseText => {
			this.goods = JSON.parse(responseText);
			this.filteredGoods = this.goods;
		}).catch(err => {
			this.message = err;
			this.showError();
		});
		
		/*this.makeGETRequest(`${API_URL}/getBasket`).then(responseText => {
			this.cart = JSON.parse(responseText);
		});*/
	}
});
