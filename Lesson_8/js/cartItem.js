Vue.component('cart-item', {
	props: ['cartItem'],
	template: `
		<div class="cart-item">
			<h3>{{cartItem.product_name}}</h3>
			<p>{{cartItem.price}}</p>
			<p>Количество: {{cartItem.quantity}}</p>
		</div>`
});