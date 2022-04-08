<template>
	<main class="md:mt-36 mt-18 min-h-screen">
		<template v-if="$fetchState.error && !data.title && !$fetchState.pending">
			<Error />
		</template>
		<template v-if="!$fetchState.pending && data.content">
			<SanityContent :blocks="data.content" class="content" :serializers="serializers" />
		</template>
	</main>
</template>

<script>
import { page } from '@/plugins/queries'
import Slider from '@/components/global/Slider'
import ServiceCardsList from '@/components/sections/ServiceCardsList'
import IconList from '@/components/sections/IconList'
export default {
	name: 'IndexPage',
	data: () => ({
		data: {},
		serializers: {
			types: {
				sliderImage: Slider,
				serviceList: ServiceCardsList,
				benefits: IconList,
			},
		},
	}),
	async fetch() {
		const id = this.$i18n.localeProperties.code === 'ua' ? 'golovna' : 'domashnyaja'

		await this.$sanity
			.fetch(page, { uid: id, lang: this.$i18n.localeProperties.code })
			.then(async (fetch) => {
				this.data.content = fetch.content
				await this.$store.dispatch('metaTags', {
					type: 'index',
					fetch,
				})
			})
			.catch((error) => {
				// set status code on server and
				if (process.server) {
					this.$nuxt.context.res.statusCode = 404
				}
				// use throw new Error()
				throw new Error('index not found', error)
			})
	},
	fetchOnServer: false,
}
</script>
