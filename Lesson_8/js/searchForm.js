Vue.component('search-form', {
	props: ['value'],
	template: `
		<form class="search-form" @submit.prevent="$emit('filter')">
			<input class="goods-search" type="text" :value="value" @input="$emit('input', $event.target.value)">
			<button type="submit" class="search-button">Искать</button>
		</form>`
});