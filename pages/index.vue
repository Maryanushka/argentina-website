<template>
	<main class="md:mt-36 mt-18 min-h-screen home">
		<template v-if="$fetchState.error && !data.title && !$fetchState.pending">
			<Error />
		</template>
		<template v-if="!$fetchState.pending && data.content">
			<SanityContent :blocks="data.content" class="content" :serializers="serializers" />
		</template>
	</main>
</template>

<script>
import { home } from '@/plugins/queries'
import Slider from '@/components/global/Slider'
import ServiceCardsList from '@/components/sections/ServiceCardsList'
import IconList from '@/components/sections/IconList'
import ImageRichText from '@/components/sections/ImageRichText'

export default {
	name: 'IndexPage',
	data: () => ({
		data: {},
		serializers: {
			types: {
				imageText: ImageRichText,
				sliderImage: Slider,
				benefits: IconList,
				sliderYoutube: Slider,
				serviceList: ServiceCardsList,
			},
		},
	}),
	async fetch() {
		const id = this.$i18n.localeProperties.code === 'ua' ? 'golovna' : 'domashnyaja'

		await this.$sanity
			.fetch(home, { uid: id, lang: this.$i18n.localeProperties.code })
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
	head() {
		return this.$store.getters.metaHead
	},
}
</script>
<style lang="scss" scoped>
.rich_text {
	.container {
		display: flex;
		flex-wrap: wrap;
	}
	.image {
		margin-right: 2rem;
	}
	.image,
	.content {
		width: 50%;
	}
}
@media (max-width: 768px) {
	.rich_text {
		.image {
			margin-right: 0;
		}
		.image,
		.content {
			width: 100%;
		}
	}
}
</style>
