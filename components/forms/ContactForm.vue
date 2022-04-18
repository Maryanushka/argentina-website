<template>
	<div class="contact_form w-full">
		<h4 class="font-semibold mt-6 mb-8 text-xl text-blue">{{ $t('pages.contact.form_title') }}</h4>
		<form ref="contact_form" class="flex flex-col" autocomplete="off" @submit.prevent="Submit()">
			<div v-if="message.isActive">
				<p class="result_message text-lg mt-4" :class="[message.class]">{{ message.text }} 🤓</p>
			</div>
			<ValidationObserver ref="contact" tag="div">
				<InputItem id="fullName" :label="$t('pages.contact.fullName')" rules="required" />
				<InputItem id="number" :label="$t('pages.contact.number')" type="number" rules="min:9|required" />
				<InputItem id="email" :label="$t('pages.contact.email')" rules="email|required" />
				<InputItem id="message" :label="$t('pages.contact.message')" rules="required" type="textarea" />
				<button type="submit" class="text-white bg-blue px-8 py-4 mt-4 text-xl hover:bg-yellow hover:text-darkBlue font-bold">{{ $t('pages.contact.button') }}</button>
			</ValidationObserver>
		</form>
	</div>
</template>

<script>
import { ValidationObserver } from 'vee-validate'
import * as emailjs from '@emailjs/browser'
export default {
	name: 'ContactForm',
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
			const isValid = await this.$refs.contact.validate()
			// validation
			if (!isValid) return

			emailjs.sendForm('service_8uy13y2', 'template_f65bfq4', this.$refs.contact_form, 'g2tfembFIFfl4YT5E').then(
				(result) => {
					this.message.isActive = true
					this.message.class = 'success'
					this.message.text = this.$t('pages.contact.successMessage')
					console.log('SUCCESS!', result.text)
					setTimeout(() => {
						this.$refs.contact_form.reset()
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
						this.$refs.contact_form.reset()
						this.message.isActive = false
						this.message.text = ''
						this.message.class = ''
					}, 3500)
				},
			)
		},
	},
}
</script>

<style lang="scss">
.contact_form {
	.result_message {
		&.success {
			color: rgb(0, 156, 104);
		}
		&.error {
			color: #d32f2f;
		}
	}
	form {
		width: 100%;
		.input_item {
			margin: 1.5rem 0;
			position: relative;
		}
	}
}
@media (max-width: 800px) {
	.contact_form {
	}
}
</style>
