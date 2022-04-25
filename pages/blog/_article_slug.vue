<template>
	<main class="md:mt-36 mt-18 min-h-screen article">
		<template v-if="$fetchState.error || (data == undefined && !$fetchState.pending)">
			<Error />
		</template>
		<template v-if="!$fetchState.pending && data.title">
			<Intro :title="data.title" :poster="data.poster" :crumbs="{ enabled: true, linkname: 'blog', linklabel: parentTitle }" />
			<div class="container flex flex-wrap py-20">
				<SanityContent class="content md:w-3/4 w-full md:order-1 order-2" :blocks="data.content" :serializers="serializers" />
				<aside class="tags md:w-1/4 w-full flex flex-col md:pl-12 md:order-2 order-1">
					<h4 class="titletext-lg font-semibold py-3 border-gray-200 border border-t-0 border-l-0 border-r-0 border-solid flex w-full relative mb-4">Categories</h4>
					<ul>
						<li v-for="tag in getCategories" :key="tag">
							<n-link :to="`${normalizedLocale}${normalizedParentUid}/?filter=${tag}`" class="flex items-center text-blue hover:text-darkBlue py-2 font-light">
								<font-awesome-icon class="h-3 w-3 mr-3" :icon="['fa', 'angle-right']" />
								{{ $t('pages.blog.tags.' + tag) }}
							</n-link>
						</li>
					</ul>
				</aside>
				<div class="md:w-2/4 w-full order-3">
					<ContactForm />
				</div>
			</div>
		</template>
	</main>
</template>
<script>
import { article } from '@/plugins/queries'
import ImageRichText from '@/components/sections/ImageRichText'
import TitleRichText from '@/components/sections/TitleRichText'

export default {
	name: 'ArticleSlug',
	data: () => ({
		data: {},
		serializers: {
			types: {
				imageText: ImageRichText,
				titleText: TitleRichText,
			},
		},
	}),
	async fetch() {
		await this.$sanity
			.fetch(article, { uid: this.$route.params.article_slug })
			.then((fetch) => {
				this.data = fetch
				this.$store.dispatch('metaTags', {
					type: 'article',
					fetch,
				})
				this.$store.dispatch('setLaguageSwitcher', {
					type: 'article_slug',
					langs: fetch.languages,
				})
			})
			.catch((error) => {
				// set status code on server and
				if (process.server) {
					this.$nuxt.context.res.statusCode = 404
				}
				// use throw new Error()
				throw new Error('article not found', error)
			})
	},
	fetchOnServer: false,
	head() {
		return this.$store.getters.metaHead
	},
	computed: {
		normalizedParentUid() {
			return this.$route.path.split('/').slice(1, -2).pop()
		},

		getNavigationFromStore() {
			return this.$store.getters.navigation
		},

		normalizedLocale() {
			return this.$i18n.localeProperties.code === 'ua' ? '/' : '/ru/'
		},
		getCategories() {
			const pagesWithTags = this.$store.getters.navigation.filter((el) => el.tags !== null)

			let flattenTagArray = []
			pagesWithTags.forEach((el) => {
				if (el.tags !== null) {
					flattenTagArray = [...flattenTagArray, ...el.tags]
				}
			})
			const uniqueTags = new Set(flattenTagArray)
			return uniqueTags
		},
	},
	watch: {
		$route(newValue, oldValue) {
			this.$fetch()
			this.getParentTitle(this.getNavigationFromStore)
		},
	},
	mounted() {
		if (this.getNavigationFromStore) {
			this.getParentTitle(this.getNavigationFromStore)
		}
	},
	methods: {
		getParentTitle(navigation) {
			this.parentTitle = navigation.filter((el) => el.uid === this.normalizedParentUid && el.type === 'page')[0].title
		},
	},
}
</script>
<style lang="scss" scoped>
.rich_text {
	padding: 0;
	.image {
		padding-right: 0;
	}
}
aside {
	height: fit-content;
	.title {
		&::after {
			position: absolute;
			bottom: -1px;
			left: 0;
			content: '';
			height: 1px;
			width: 3rem;
			background-color: theme('colors.blue');
		}
	}
	a {
		svg {
			transition: transform 0.2s ease-in;
		}
		&:hover {
			svg {
				transform: translateX(5px);
			}
		}
	}
}
</style>
