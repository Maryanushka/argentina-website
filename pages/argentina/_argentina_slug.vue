<template>
	<main class="md:mt-36 mt-18">
		<template v-if="$fetchState.error || (data == undefined && !$fetchState.pending)">
			<Error />
		</template>
		<template v-if="!$fetchState.pending && data.parentTitle">
			<Intro :title="data.title" :poster="data.poster" :crumbs="{ enabled: true, linkname: 'argentina', linklabel: data.parentTitle }" />
			<SanityContent class="content" :blocks="data.content" :serializers="serializers" />
		</template>
	</main>
</template>
<script>
import { aboutArgentina } from '@/plugins/queries'
import ImageRichText from '@/components/sections/ImageRichText'

export default {
	name: 'ArgeninaSlug',
	data: () => ({
		data: {},
		serializers: {
			types: {
				imageText: ImageRichText,
			},
		},
	}),
	async fetch() {
		await this.$sanity
			.fetch(aboutArgentina, { uid: this.$route.params.argentina_slug })
			.then((fetch) => {
				this.data = fetch
				const parentSlug = this.$store.getters.navigation.filter((el) => el.uid === this.localePath('argentina').slice(1, -1) && el.type === 'page')
				this.data.parentTitle = parentSlug[0].title
				this.$store.dispatch('metaTags', {
					type: 'argentina',
					fetch,
				})
			})
			.catch((error) => {
				// set status code on server and
				if (process.server) {
					this.$nuxt.context.res.statusCode = 404
				}
				// use throw new Error()
				throw new Error('aboutArgentina not found', error)
			})
	},
	fetchOnServer: false,
	head() {
		return this.$store.getters.metaHead
	},
}
</script>
