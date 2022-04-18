<template>
	<div class="subscribe">
		<form ref="subscribe_form" autocomplete="off" @submit.prevent="Submit()">
			<div v-if="message.isActive">
				<p class="result_message text-lg mt-4" :class="[message.class]">{{ message.text }} 🤓</p>
			</div>
			<ValidationObserver ref="subscribe" tag="div">
				<InputItem id="email" label="email" rules="email|required" class="w-80 mr-8" />

				<button type="submit" class="flex md:items-end md:text-blue md:bg-transparent bg-blue text-white font-semibold hover:text-darkBlue py-4 px-4">
					<span class="hidden md:block">{{ $t('pages.contact.button') }}</span>
					<font-awesome-icon class="text-base md:ml-4 md:mb-1 w-4 h-4" :icon="['fa', 'long-arrow-alt-right']" />
				</button>
			</ValidationObserver>
		</form>
	</div>
</template>

<script>
import { ValidationObserver } from 'vee-validate'
import * as emailjs from '@emailjs/browser'

export default {
	components: {
		ValidationObserver,
	},
	data: () => ({
		message: {
			isActive: false,
			text: '',
			class: '',
		},
	}),
	methods: {
		async Submit() {
			const isValid = await this.$refs.subscribe.validate()
			// validation
			if (!isValid) return

			emailjs.sendForm('service_8uy13y2', 'template_mc3lsnp', this.$refs.subscribe_form, 'g2tfembFIFfl4YT5E').then(
				(result) => {
					console.log('SUCCESS!', result.text)
					this.message.isActive = true
					this.message.class = 'success'
					this.message.text = this.$t('pages.contact.successMessage')
					setTimeout(() => {
						this.$refs.subscribe_form.reset()
						this.message.isActive = false
						this.message.text = ''
						this.message.class = ''
					}, 3500)
				},
				(error) => {
					console.log('FAILED...', error.text)
					this.message.isActive = true
					this.message.class = 'error'
					this.message.text = this.$t('pages.contact.errorMessage')
					setTimeout(() => {
						this.$refs.subscribe_form.reset()
						this.message.isActive = false
						this.message.text = ''
						this.message.class = ''
					}, 3500)
				},
			)

			this.loading = false
			console.log('submited')
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
		.result_message {
			&.success {
				color: rgb(0, 156, 104);
			}
			&.error {
				color: #d32f2f;
			}
		}
	}
}
</style>
