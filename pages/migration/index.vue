<template>
	<main class="md:mt-36 mt-18 min-h-screen page">
		<template v-if="$fetchState.error && !data.title && !$fetchState.pending">
			<Error />
		</template>
		<template v-if="!$fetchState.pending && data.title">
			<Intro :title="data.title" :poster="data.poster" :crumbs="{ enabled: true }" />
			<section class="flex flex-wrap wrapper">
				<div class="container flex flex-wrap">
					<h2 class="title text-3xl font-bold mb-24 mt-16 pl-4 relative text-darkBlue text-center md:text-left w-full">{{ data.title }}</h2>
					<aside class="md:w-1/3 w-full mb-8">
						<ul>
							<li v-for="link in sidebar" :key="link.uid">
								<n-link :to="`${localePath(link.type)}${link.uid}/`" class="border-b border-solid border-gray-100 text-blue py-4 px-6 hover:text-white hover:bg-blue text-xl flex justify-between w-full items-center">
									{{ link.title }}
									<font-awesome-icon class="text-white w-4 h-4" :icon="['fa', 'chevron-right']" />
								</n-link>
							</li>
						</ul>
					</aside>
					<template v-if="data.content && data.content[0]._type === 'imageText'">
						<PageIndexIntro :data="data.content[0]" />
					</template>
				</div>
				<template v-for="(section, i) in data.content">
					<PageImgText v-if="section._type === 'imageText' && i !== 0" :key="section._key" :data="section" />
					<PageTitleRichText v-if="section._type === 'titleText'" :key="section._key" :data="section" />
					<PageCTA v-if="section._type === 'cta'" :key="section._key" :data="section" />
					<PageIconList v-if="section._type === 'benefits'" :key="section._key" :data="section" />
				</template>
			</section>
		</template>
	</main>
</template>
<script>
import { page } from '@/plugins/queries'

export default {
	name: 'Migration',
	data: () => ({
		data: {},
	}),
	async fetch() {
		await this.$sanity
			.fetch(page, { type: 'page', uid: this.normalizedParentUid, lang: this.$i18n.localeProperties.code })
			.then(async (fetch) => {
				this.data = fetch
				await this.$store.dispatch('metaTags', {
					type: 'migration',
					fetch,
				})
			})
			.catch((error) => {
				// set status code on server and
				if (process.server) {
					this.$nuxt.context.res.statusCode = 404
				}
				// use throw new Error()
				throw new Error('migration not found', error)
			})
	},
	fetchOnServer: false,
	head() {
		return this.$store.getters.metaHead
	},
	computed: {
		sidebar() {
			const navigation = this.$store.getters.navigation.filter((el) => el.type === 'migration' && el.lang === this.$i18n.localeProperties.code)
			return navigation
		},
		normalizedLocale() {
			return this.$i18n.localeProperties.code === 'ua' ? '/' : '/ru/'
		},
		normalizedParentUid() {
			return this.$route.path.split('/').slice(1, -1).pop()
		},
	},
	watch: {
		$route(newValue, oldValue) {
			console.log(this.$route.path, 'currentLocale changed')
			this.$fetch()
		},
	},
}
</script>
