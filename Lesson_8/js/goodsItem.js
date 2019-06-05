Vue.component('goods-item', {
	props: ['good'],
	template: `
		<div class="goods-item">
		 	<h3>{{ good.product_name }}</h3>
			<p>{{ good.price }}</p>
			<button class="add-to-cart" @click="$emit('add-to-cart')">Добавить в корзину</button>
		</div>`
});