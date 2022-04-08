<template>
	<main class="md:mt-36 mt-18 min-h-screen">
		<template v-if="$fetchState.error && !data.title && !$fetchState.pending">
			<Error />
		</template>
		<template v-if="!$fetchState.pending && data.content">
			<Intro :title="data.title" :poster="data.poster" :crumbs="{ enabled: true, linklabel: $t('pages.home'), linkname: '/' }" />
			<div class="container px-4">
				<aside>
					<ul>
						<li v-for="link in sidebar" :key="link.uid">
							<n-link :to="localePath(link.uid)" class="text-blue py-4 px-6 flex hover:text-white hover:bg-blue text-xl">{{ link.title }}</n-link>
						</li>
					</ul>
				</aside>
			</div>

			<!-- <SanityContent :blocks="data.content" class="content" :serializers="serializers" /> -->
		</template>
	</main>
</template>
<script>
import { page } from '@/plugins/queries'

export default {
	name: 'Argentina',
	data: () => ({
		data: {},
	}),
	async fetch() {
		await this.$sanity
			.fetch(page, { uid: this.$route.path.slice(1, -1), lang: this.$i18n.localeProperties.code })
			.then(async (fetch) => {
				this.data = fetch
				await this.$store.dispatch('metaTags', {
					type: 'page',
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
	fetchOnServer: false,
	computed: {
		sidebar() {
			const navigation = this.$store.getters.navigation.filter((el) => el.type === 'argentina' && el.lang === this.$i18n.localeProperties.code)
			return navigation
		},
	},
}
</script>
