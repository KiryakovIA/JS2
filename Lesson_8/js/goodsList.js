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
