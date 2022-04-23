<template>
	<div class="layout">
		<Navbar />
		<Nuxt />
		<Footer />
		<Modal />
	</div>
</template>
<script>
import { menu } from '@/plugins/queries'

export default {
	async fetch() {
		await this.$sanity
			.fetch(menu)
			.then((data) => {
				// console.log(menu)
				this.$store.commit('setNavigation', data)
			})
			.catch((err) => {
				console.log(err)
			})
	},
}
</script>
