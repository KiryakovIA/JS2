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