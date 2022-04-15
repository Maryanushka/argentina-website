<template>
	<main class="md:mt-36 mt-18 min-h-screen">
		<template v-if="$fetchState.error || (data == undefined && !$fetchState.pending)">
			<Error />
		</template>
		<template v-if="!$fetchState.pending && data.title">
			<Intro :title="data.title" :poster="data.poster" :crumbs="{ enabled: true, linkname: 'argentina', linklabel: getParentTitle }" />
			<SanityContent v-if="data.content" class="content py-20" :blocks="data.content" :serializers="serializers" />
		</template>
	</main>
</template>
<script>
import { aboutArgentina, innerPagesList } from '@/plugins/queries'
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
				this.$store.dispatch('metaTags', {
					type: 'argentina',
					fetch,
				})
				this.$store.dispatch('setLaguageSwitcher', {
					type: 'argentina_slug',
					langs: fetch.languages,
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

		await this.$sanity
			.fetch(innerPagesList, { type: 'argentina', lang: this.$i18n.localeProperties.code })
			.then((pagesList) => {
				this.data.pageList = pagesList
			})
			.catch((error) => {
				throw new Error('Inner pages query', error)
			})
	},
	fetchOnServer: false,
	head() {
		return this.$store.getters.metaHead
	},
	computed: {
		getParentTitle() {
			return this.$store.getters.navigation.filter((el) => el.uid === this.localePath('argentina').slice(1, -1) && el.type === 'page')[0].title
		},
	},
}
</script>
