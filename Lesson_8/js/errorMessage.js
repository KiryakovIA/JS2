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