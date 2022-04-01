<template>
	<div class="subscribe">
		<form ref="subscribe_form" autocomplete="off" @submit.prevent="subscribe()">
			<ValidationObserver v-if="!message" ref="subscribe" tag="div">
				<InputItem id="email" label="email" rules="email|required" class="w-80 mr-4" @getValue="storeValue" />

				<button class="flex items-end hover:text-blue" @click="Submit()">
					Subscribe
					<font-awesome-icon class="text-blue text-base ml-4 mb-1" :icon="['fa', 'long-arrow-alt-right']" />
				</button>
			</ValidationObserver>
			<div v-else class="message">
				<h5>Мы уже звоним !</h5>
				<!-- <n-link :to="'/'">На главную</n-link> -->
			</div>
		</form>
	</div>
</template>

<script>
import { ValidationObserver } from 'vee-validate'

export default {
	components: {
		ValidationObserver,
	},
	data: () => ({
		message: false,
		loading: false,
		form: {
			email: '',
			action: 'cta',
		},
	}),
	methods: {
		storeValue(input) {
			this.form.email = input.value
			// if (input.name === 'name') this.form.name = input.value
			// else if (input.name === 'number') this.form.number = input.value
			// else if (input.name === 'email') this.form.email = input.value
			// else if (input.name === 'message') this.form.message = input.value
		},

		async Submit() {
			const isValid = await this.$refs.subscribe.validate()
			// validation
			if (!isValid) return

			this.loading = true
			console.log('loading')

			// this.loading = false
			// console.log('submited')
			// this.message = !this.message
		},
	},
}
</script>

<style lang="scss" scoped>
.subscribe {
	form {
		div {
			display: flex;
		}
	}
}
</style>
