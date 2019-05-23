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

const app = new Vue({
	el: '#app',

	data: {
		goods: [],
		filteredGoods: [],
		searchLine: '',

		cart: [],
		isVisibleCart: false
	},

	methods: {
		searchForm_OnSubmit(e) {
			e.preventDefault();
			this.filterGoods();
		},

		filterGoods() {
			const regexp = new RegExp(this.searchLine, "i")
			this.filteredGoods = this.goods.filter(good => regexp.test(good.product_name));
		},

		cartButton_OnClick(e) {
			this.isVisibleCart = !this.isVisibleCart;
		},

		addToCart_OnClick(e) {
			e.preventDefault();
			const id = e.target.getAttribute("data-id");
			const product = this.goods.find(item => item.id_product == id)
			this.addToCart(product);
		},

		addToCart(product) {
			makeGETRequest(`${API_URL}/addToBasket.json`).then(() => {
				console.log(product.product_name)
			}).catch(err => console.error(err))
		}
	},

	mounted() {
		makeGETRequest(`${API_URL}/catalogData.json`).then(responseText => {
			this.goods = JSON.parse(responseText);
			this.filteredGoods = this.goods;
		});
		makeGETRequest(`${API_URL}/getBasket.json`).then(responseText => {
			this.cart = JSON.parse(responseText);
		});
	}
});
