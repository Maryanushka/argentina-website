<template>
	<section class="contact section-padding">
		<div class="container">
			<SanityContent class="content" :blocks="info" />
			<div class="contact_form">
				<h5 class="title">{{ title }}</h5>
				<form ref="contact_form" autocomplete="off" @submit.prevent="Submit()">
					<ValidationObserver ref="contact" tag="div">
						<InputItem id="fullName" :label="$t('pages.contact.fullName')" rules="required" @getValue="storeValue" />
						<InputItem id="number" :label="$t('pages.contact.number')" type="number" rules="min:9|required" @getValue="storeValue" />
						<InputItem id="email" :label="$t('pages.contact.email')" rules="email|required" @getValue="storeValue" />
						<InputItem id="message" :label="$t('pages.contact.message')" rules="required" @getValue="storeValue" />
						<ButtonItem> {{ $t('pages.contact.button') }} </ButtonItem>
					</ValidationObserver>
					<!-- <div v-else class="message">
						<h2>success ?!</h2>
					</div> -->
				</form>
			</div>
		</div>
	</section>
</template>

<script>
import { ValidationObserver } from 'vee-validate'
import * as emailjs from '@emailjs/browser'
export default {
	components: {
		ValidationObserver,
	},
	props: {
		info: {
			type: Array,
			required: true,
		},
		title: {
			type: String,
			required: true,
		},
	},
	data: () => ({
		// message: false,
		loading: false,
		form: {
			fullName: '',
			number: '',
			email: '',
			message: '',
		},
	}),
	methods: {
		storeValue(input) {
			switch (input.name) {
				case 'name': {
					this.form.name = input.value
					break
				}
				case 'number': {
					this.form.number = input.value
					break
				}
				case 'email': {
					this.form.email = input.value
					break
				}
				case 'message': {
					this.form.message = input.value
					break
				}
			}
			// if (input.name === 'name') this.form.name = input.value
			// else if (input.name === 'number') this.form.number = input.value
			// else if (input.name === 'email') this.form.email = input.value
			// else if (input.name === 'message') this.form.message = input.value
		},

		async Submit() {
			const isValid = await this.$refs.contact.validate()
			// validation
			if (!isValid) return

			this.loading = true
			console.log('loading')

			// compose email template
			this.form.emailTemplate = `
				<h4>Name</h4>
				<p>${this.form.name}</p>
				<h4>Number</h4>
				<p>${this.form.number}</p>
				<h4>Email</h4>
				<p>${this.form.email}</p>
				<h4>Message</h4>
				<p>${this.form.message}</p>
			`

			emailjs.sendForm('default_service', 'feel_house_contact', this.$refs.contact_form, 'user_vgxo7Nole0QeHb4nsY5SS').then(
				(result) => {
					console.log('SUCCESS!', result.text)
					this.loading = false
					// this.message = !this.message
				},
				(error) => {
					console.log('FAILED...', error.text)
					// this.message = !this.message
				},
			)

			this.loading = false
			console.log('submited')
			// this.message = !this.message
		},
	},
}
</script>

<style lang="scss"></style>
