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
							<n-link :to="`/${$route.path.slice(1, -1)}/${link.uid}/`" class="border-b border-solid border-gray-200 text-blue py-4 px-6 hover:text-white hover:bg-blue text-xl flex justify-between w-full items-center">
								{{ link.title }}
								<font-awesome-icon class="text-white w-4 h-4" :icon="['fa', 'chevron-right']" />
							</n-link>
						</li>
					</ul>
				</aside>
				<SanityContent v-if="data.content" class="content md:w-2/3 w-full" :blocks="data.content" :serializers="serializers" />
			</section>
		</template>
	</main>
</template>
<script>
import { page } from '@/plugins/queries'
import ImageRichText from '@/components/sections/ImageRichText'

export default {
	name: 'Services',
	data: () => ({
		data: {
			filter: '',
			page: 1,
		},
		serializers: {
			types: {
				imageText: ImageRichText,
			},
		},
	}),
	async fetch() {
		await this.$sanity
			.fetch(page, { uid: this.normalizedParentUid, lang: this.$i18n.localeProperties.code })
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
				throw new Error('blog not found', error)
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
		sidebar() {
			const navigation = this.$store.getters.navigation.filter((el) => el.type === 'article' && el.lang === this.$i18n.localeProperties.code)
			return navigation
		},
		startIndex() {
			return (this.page - 1) * 2
		},

		endIndex() {
			return this.page * 2
		},

		paginatedArticles() {
			return this.sidebar.slice(this.startIndex, this.endIndex)
		},

		hasNextPage() {
			return this.sidebar.length > this.endIndex
		},
	},
	watch: {
		paginatedArticles() {
			if (this.paginatedTickers.length === 0 && this.page > 1) {
				this.page -= 1
			}
		},

		filter() {
			this.page = 1
		},

		pageStateOptions(value) {
			window.history.pushState(null, document.title, `${window.location.pathname}?filter=${value.filter}&page=${value.page}`)
		},
	},
	beforeMount() {
		const windowData = Object.fromEntries(new URL(window.location).searchParams.entries())
		const VALID_KEYS = ['filter', 'page']

		VALID_KEYS.forEach((key) => {
			if (windowData[key]) {
				this[key] = windowData[key]
			}
		})
	},
}
</script>
