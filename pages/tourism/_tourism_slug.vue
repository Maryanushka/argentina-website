<template>
	<main class="md:mt-36 mt-18 min-h-screen">
		<template v-if="$fetchState.error || (data == undefined && !$fetchState.pending)">
			<Error />
		</template>
		<template v-if="!$fetchState.pending && data.title">
			<Intro :title="data.title" :poster="data.poster" :crumbs="{ enabled: true, linkname: 'tourism', linklabel: getParentTitle }" />
			<SanityContent class="content py-20" :blocks="data.content" :serializers="serializers" />
		</template>
	</main>
</template>
<script>
import { tourism } from '@/plugins/queries'
import ImageRichText from '@/components/sections/ImageRichText'

export default {
	name: 'TourismSlug',
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
			.fetch(tourism, { uid: this.$route.params.tourism_slug })
			.then((fetch) => {
				this.data = fetch
				this.$store.dispatch('metaTags', {
					type: 'tourism',
					fetch,
				})
				this.$store.dispatch('setLaguageSwitcher', {
					type: 'tourism_slug',
					langs: fetch.languages,
				})
			})
			.catch((error) => {
				// set status code on server and
				if (process.server) {
					this.$nuxt.context.res.statusCode = 404
				}
				// use throw new Error()
				throw new Error('tourism not found', error)
			})
	},
	fetchOnServer: false,
	head() {
		return this.$store.getters.metaHead
	},
	computed: {
		getParentTitle() {
			return this.$store.getters.navigation.filter((el) => el.uid === this.localePath('tourism').slice(1, -1) && el.type === 'page')[0].title
		},
	},
}
</script>
