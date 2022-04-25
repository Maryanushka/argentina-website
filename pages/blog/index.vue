<template>
	<main class="md:mt-36 mt-18 min-h-screen">
		<template v-if="$fetchState.error && !data.title && !$fetchState.pending">
			<Error />
		</template>
		<template v-if="!$fetchState.pending && data.title">
			<Intro :title="data.title" :poster="data.poster" :crumbs="{ enabled: true }" />
			<section class="container md:px-0 px-4 py-16 flex flex-wrap">
				<h2 class="title text-3xl font-bold mb-24 relative text-darkBlue text-center md:text-left w-full">{{ data.title }}</h2>
				<aside class="tags md:w-1/4 w-full flex flex-col md:pr-12">
					<h4 class="title text-xl font-semibold py-3 border-gray-200 border border-t-0 border-l-0 border-r-0 border-solid flex w-full relative mb-4">
						{{ $t('pages.blog.categories') }}
					</h4>
					<ul>
						<!-- <li key="all" @click="filterArticles('all')">
							<n-link :to="`${normalizedLocale}${normalizedParentUid}/?filter=all`" :class="{ 'text-darkBlue': active_filter == 'all' }" class="flex items-center text-blue hover:text-darkBlue py-2 font-medium text-lg">
								<font-awesome-icon class="h-3 w-3 mr-3" :icon="['fa', 'angle-right']" />
								{{ $t('pages.blog.tags.' + 'all') }}
							</n-link>
						</li> -->
						<li v-for="tag in getCategories" :key="tag" @click="filterArticles(tag)">
							<n-link :to="`${normalizedLocale}${normalizedParentUid}/?filter=${tag}`" :class="{ 'text-darkBlue': active_filter == tag }" class="flex items-center text-blue hover:text-darkBlue py-2 font-medium text-lg">
								<font-awesome-icon class="h-3 w-3 mr-3" :icon="['fa', 'angle-right']" />
								<!-- {{ tag }} -->
								{{ $t('pages.blog.tags.' + tag) }}
							</n-link>
						</li>
					</ul>
				</aside>
				<section class="grid md:w-3/4 w-full">
					<article v-for="blogCard in filteredArticles" :key="blogCard._id" class="blog_card flex flex-col mb-8">
						<ImageItem :image="blogCard.poster" w="1000" />
						<h3 class="title text-blue text-xl font-bold my-4">
							{{ blogCard.title }}
						</h3>
						<div class="date_tags text-gray-400 flex justify-between">
							<span class="date">
								{{ formatDate(blogCard.updated.slice(0, -1)) }}
							</span>
							<div class="tags">
								<n-link v-for="tag in blogCard.tags" :key="tag" :to="`${normalizedLocale}${normalizedParentUid}/?filter=${tag}`" class="text-gray-400 ml-3 hover:text-blue"> #{{ tag }} </n-link>
							</div>
						</div>
						<p class="description my-4">
							{{ blogCard.description }}
						</p>
						<n-link :to="`${normalizedLocale}${normalizedParentUid}/${blogCard.uid}/`" class="text-white font-bold bg-blue px-8 py-3 text-lg inline-block w-min hover:bg-darkBlue">
							{{ $t('pages.blog.read_more') }}
						</n-link>
					</article>
				</section>
				<div class="pagination md:w-3/4 w-full justify-self-end ml-auto mt-8 flex">
					<span v-for="(pageNumber, i) in data.pageNumber" :key="pageNumber + i" class="number text-white py-3 px-5 bg-blue hover:bg-darkBlue mr-2 font-bold" @click="page = i">{{ ++i }}</span>
				</div>
			</section>
		</template>
	</main>
</template>
<script>
import { page, articleList } from '@/plugins/queries'
import ImageRichText from '@/components/sections/ImageRichText'

export default {
	name: 'Blog',
	data: () => ({
		data: {},
		page: 1,
		articlesPerPage: 2,
		active_filter: '',
		filteredArticles: [],
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

		await this.$sanity
			.fetch(articleList, { type: 'article', lang: this.$i18n.localeProperties.code })
			.then((pagesList) => {
				this.data.blogList = pagesList
			})
			.catch((error) => {
				throw new Error('Inner pages query', error)
			})
		this.filterArticles(this.active_filter)
	},
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

		startIndex() {
			return (this.page - 1) * this.articlesPerPage
		},

		endIndex() {
			return this.page * this.articlesPerPage
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
		},
		pageStateOptions(value) {
			window.history.pushState(null, document.title, `${window.location.pathname}?filter=${value.filter}`)
		},
		page() {
			this.paginatedArticles(this.data.blogList)
		},
	},
	mounted() {
		if (window.location.search) {
			this.active_filter = window.location.search.split('=')[1]
		}
	},
	fetchOnServer: false,
	methods: {
		formatDate(time) {
			const date = new Date(time)
			const options = { year: 'numeric', month: 'long', day: 'numeric' }
			// Then specify how you want your dates to be formatted
			const updatedFormat = new Intl.DateTimeFormat(this.$i18n.localeProperties.iso, options).format(date)
			return updatedFormat
		},
		paginatedArticles(arr) {
			this.filteredArticles = arr.slice(this.startIndex, this.endIndex)
			if (arr.length > 1) {
				this.data.pageNumber = Math.floor(arr.length / this.articlesPerPage)
				return
			}
			this.data.pageNumber = 1
		},
		filterArticles(tag) {
			if (tag === 'all' || tag.length === 0) {
				this.active_filter = ''
				this.paginatedArticles(this.data.blogList)
				return
			}
			this.active_filter = tag
			// restart results
			const articles = this.data.blogList.filter((el) => {
				if (el.tags !== null && el.tags.includes(tag)) {
					return el
				}
				return false
			})
			this.paginatedArticles(articles)
		},
	},
}
</script>
