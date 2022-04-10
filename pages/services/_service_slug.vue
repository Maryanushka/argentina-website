<template>
	<main class="md:mt-36 mt-18">
		<template v-if="$fetchState.error || (data == undefined && !$fetchState.pending)">
			<Error />
		</template>
		<template v-if="!$fetchState.pending && data.parentTitle">
			<Intro :title="data.title" :poster="data.poster" :crumbs="{ enabled: true, linkname: 'service', linklabel: data.parentTitle }" />
			<section v-for="item in data.content" :key="item._key" class="container px-4 py-16">
				<template v-if="item.poster !== null">
					<ImageItem :image="item.poster" class="w-full h-full object-cover mb-8 flex" />
				</template>
				<SanityContent :blocks="item.text" class="content text-lg" />
			</section>
		</template>
	</main>
</template>
<script>
import { service } from '@/plugins/queries'
// import ImageRichText from '@/components/sections/ImageRichText'

export default {
	name: 'ServiceSlug',
	data: () => ({
		data: {},
		serializers: {
			types: {
				// imageText: ImageRichText,
			},
		},
	}),
	async fetch() {
		await this.$sanity
			.fetch(service, { uid: this.$route.params.service_slug })
			.then((fetch) => {
				this.data = fetch
				const parentSlug = this.$store.getters.navigation.filter((el) => el.uid === this.localePath('services').slice(1, -1) && el.type === 'page')
				this.data.parentTitle = parentSlug[0].title
				this.$store.dispatch('metaTags', {
					type: 'service',
					fetch,
				})
			})
			.catch((error) => {
				// set status code on server and
				if (process.server) {
					this.$nuxt.context.res.statusCode = 404
				}
				// use throw new Error()
				throw new Error('service not found', error)
			})
	},
	head() {
		return this.$store.getters.metaHead
	},
}
</script>
