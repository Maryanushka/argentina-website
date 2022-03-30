<template>
	<div class="subscribe">
		<form ref="subscribe_form" autocomplete="off" @submit.prevent="Submit()">
			<ValidationObserver ref="subscribe" tag="div">
				<InputItem id="email" :label="$t('pages.contact.email')" rules="email|required" @getValue="storeValue" />

				<button @click="Submit()">Subscribe</button>
			</ValidationObserver>
		</form>
	</div>
</template>

<script>
import { ValidationObserver } from 'vee-validate'

import { mask } from 'vue-the-mask'
export default {
	components: {
		ValidationObserver,
	},
	directives: { mask },
	props: {
		title: {
			type: String,
			required: true,
		},
		rules: {
			type: [Object, String],
			default: 'min:9|required',
		},
		mode: {
			type: String,
			default: 'eager',
		},
	},
	data: () => ({
		loading: false,
		inputValue: '',
	}),
	methods: {
		Submit() {
			const isValid = this.$refs.subscribe.validate()
			if (isValid) {
				console.log('data ready to send')
			}
		},
	},
}
</script>

<style lang="scss" scoped>
// .subscribe {}
</style>
