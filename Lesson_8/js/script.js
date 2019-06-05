import goodsItem from './goodsItem.js';
import goodsList from './goodsList.js';
import cartItem from './cartItem.js';
import cart from './cart.js';
import searchForm from './searchForm.js';
import errorMessage from './errorMessage.js'

const API_URL = 'http://localhost:3000'

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
