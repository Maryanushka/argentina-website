<template>
	<section class="icon_list py-20 md:pt-28 md:pb-32 bg-gray-100 relative top_skew bottom_skew">
		<div class="container flex flex-wrap px-4 justify-between items-end">
			<h2 class="title w-2/3 text-3xl font-bold mb-8 relative text-darkBlue text-center md:text-left">{{ text }}</h2>
			<button class="button mt-12 px-8 py-4 hover:bg-blue hover:text-white inline-flex text-lg font-semibold bg-yellow text-darkBlue" @click="openModal({ isEnabled: true, data: 'form' })">{{ buttonText }}</button>
		</div>
	</section>
</template>
<script>
export default {
	props: {
		// data: {
		// type: Object,
		// default: null,
		buttonText: {
			type: String,
			required: true,
		},
		text: {
			type: String,
			required: true,
		},
		// },
	},
	methods: {
		openModal(value) {
			this.$store.dispatch('bindModal', value)
		},
	},
}
</script>
