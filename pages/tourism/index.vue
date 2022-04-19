<template>
	<main class="md:mt-36 mt-18 min-h-screen">
		<template v-if="$fetchState.error && !data.title && !$fetchState.pending">
			<Error />
		</template>
		<template v-if="!$fetchState.pending && data.title">
			<Intro :title="data.title" :poster="data.poster" :crumbs="{ enabled: true }" />
			<section class="container md:px-0 px-4 py-16 flex flex-wrap">
				<h2 class="title text-3xl font-bold mb-24 relative text-darkBlue text-center md:text-left w-full">{{ $t('pages.service.crumbsName') }}</h2>
				<aside class="md:w-1/3 w-full md:pr-8">
					<ul>
						<li v-for="link in sidebar" :key="link.uid">
							<n-link :to="`${normalizedLocale}${normalizedParentUid}/${link.uid}/`" class="border-b border-solid border-gray-200 text-blue py-4 px-6 hover:text-white hover:bg-blue text-xl flex justify-between w-full items-center">
								{{ link.title }}
								<font-awesome-icon class="text-white w-4 h-4" :icon="['fa', 'chevron-right']" />
							</n-link>
						</li>
					</ul>
				</aside>
				<SanityContent v-if="data.content" class="content md:w-2/3 w-full" :blocks="data.content" :serializers="serializers" />
			</section>

			<!-- <SanityContent :blocks="data.content" class="content" :serializers="serializers" /> -->
		</template>
	</main>
</template>
<script>
import { page } from '@/plugins/queries'
import ImageRichText from '@/components/sections/ImageRichText'

export default {
	name: 'Tourism',
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
			.fetch(page, { type: 'page', uid: this.normalizedParentUid, lang: this.$i18n.localeProperties.code })
			.then(async (fetch) => {
				this.data = fetch
				await this.$store.dispatch('metaTags', {
					type: 'tourism',
					fetch,
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
		normalizedParentUid() {
			return this.$route.path.split('/').slice(1, -1).pop()
		},
		normalizedLocale() {
			return this.$i18n.localeProperties.code === 'ua' ? '/' : '/ru/'
		},
		sidebar() {
			const navigation = this.$store.getters.navigation.filter((el) => el.type === 'tourism' && el.lang === this.$i18n.localeProperties.code)
			return navigation
		},
	},
}
</script>
