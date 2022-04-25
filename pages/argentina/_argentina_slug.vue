<template>
	<main class="md:mt-36 mt-18 min-h-screen">
		<template v-if="$fetchState.error || (data == undefined && !$fetchState.pending)">
			<Error />
		</template>
		<template v-if="!$fetchState.pending && data.title">
			<Intro :title="data.title" :poster="data.poster" :crumbs="{ enabled: true, linkname: 'argentina', linklabel: parentTitle }" />
			<SanityContent v-if="data.content" class="content" :blocks="data.content" :serializers="serializers" />
			<PagePreviewGrid v-if="data.relatedServices" :pages="data.relatedServices" :parentuid="normalizedParentUid" />
		</template>
	</main>
</template>
<script>
import { aboutArgentina, innerPagesList } from '@/plugins/queries'
import ImageRichText from '@/components/sections/ImageRichText'
import TitleRichText from '@/components/sections/TitleRichText'
import IconList from '@/components/sections/IconList'

export default {
	name: 'ArgeninaSlug',
	data: () => ({
		data: {},
		parentTitle: '',
		serializers: {
			types: {
				imageText: ImageRichText,
				titleText: TitleRichText,
				benefits: IconList,
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
				this.data.relatedServices = pagesList
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
		getNavigation() {
			return this.$store.getters.navigation
		},
		normalizedParentUid() {
			return this.localePath('argentina').split('/').slice(1, -1).pop()
		},
	},
	watch: {
		$route(newValue, oldValue) {
			console.log(this.$route.path, 'currentLocale changed')
			this.$fetch()
		},
		getNavigation(oldValue, newValue) {
			console.log(oldValue, newValue)
			this.getParentTitle(this.getNavigation)
		},
	},
	mounted() {
		if (this.getNavigation) {
			this.getParentTitle(this.getNavigation)
		}
	},
	methods: {
		getParentTitle(navigation) {
			this.parentTitle = navigation.filter((el) => el.uid === this.normalizedParentUid && el.type === 'page')[0].title
		},
	},
}
</script>
