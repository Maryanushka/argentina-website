<template>
	<main class="lg:mt-36 md:mt-20 mt-16 min-h-screen home">
		<template v-if="$fetchState.error && !data.title && !$fetchState.pending">
			<Error />
		</template>
		<template v-if="!$fetchState.pending && data.content">
			<SanityContent :blocks="data.content" class="content" :serializers="serializers" />
			<!-- eslint-disable-next-line vue/attribute-hyphenation -->
			<!-- <PagePreviewGrid v-if="data.latestArticles" :pages="data.latestArticles" :parentuid="parentUId" :title="parentTitle" /> -->
			<section v-if="data.latestArticles" class="latestArticles py-16">
				<div class="container flex flex-wrap px-4">
					<h2 class="title w-full text-3xl font-bold mb-20 relative text-center md:text-left">{{ parentTitle }}</h2>
					<div class="grid md:grid-cols-3 grid-cols-1 gap-6">
						<article v-for="blogCard in data.latestArticles" :key="blogCard._id" class="blog_card flex flex-col mb-8">
							<ImageItem :image="blogCard.poster" w="500" h="400" class="h-72 object-cover" />
							<h3 class="title text-blue text-xl font-bold my-4">
								{{ blogCard.title }}
							</h3>
							<div class="date_tags text-gray-400 flex justify-between">
								<span class="date">
									{{ formatDate(blogCard.updated.slice(0, -1)) }}
								</span>
								<div class="tags">
									<n-link v-for="tag in blogCard.tags" :key="tag" :to="`/${parentUId}/?filter=${tag}`" class="text-gray-400 ml-3 hover:text-blue"> #{{ tag }} </n-link>
								</div>
							</div>
							<p class="description my-4 overflow-hidden h-36">
								{{ blogCard.description }}
							</p>
							<n-link :to="`/${parentUId}/${blogCard.uid}/`" class="text-white font-bold bg-blue px-8 py-3 text-lg inline-block w-min hover:bg-darkBlue">
								{{ $t('pages.blog.read_more') }}
							</n-link>
						</article>
					</div>
				</div>
			</section>
		</template>
	</main>
</template>

<script>
import { home, articleLatest } from '@/plugins/queries'
import Slider from '@/components/global/Slider'
import ServiceCardsList from '@/components/sections/ServiceCardsList'
import IconList from '@/components/sections/IconList'
import ImageRichText from '@/components/sections/ImageRichText'

export default {
	name: 'IndexPage',
	data: () => ({
		data: {},
		serializers: {
			types: {
				imageText: ImageRichText,
				sliderImage: Slider,
				benefits: IconList,
				sliderYoutube: Slider,
				serviceList: ServiceCardsList,
			},
		},
	}),
	async fetch() {
		const id = this.$i18n.localeProperties.code === 'ua' ? 'golovna' : 'domashnyaja'

		await this.$sanity
			.fetch(home, { uid: id, lang: this.$i18n.localeProperties.code })
			.then(async (fetch) => {
				this.data.content = fetch.content
				await this.$store.dispatch('metaTags', {
					type: 'index',
					fetch,
				})
			})
			.catch((error) => {
				// set status code on server and
				if (process.server) {
					this.$nuxt.context.res.statusCode = 404
				}
				// use throw new Error()
				throw new Error('index not found', error)
			})

		await this.$sanity
			.fetch(articleLatest, { lang: this.$i18n.localeProperties.code, from: 0, to: 3 })
			.then((pagesList) => {
				this.data.latestArticles = pagesList
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
		parentUId() {
			return this.localePath('blog').slice(1, -1)
		},
		parentTitle() {
			return this.$t('pages.blog.crumbsName')
		},
		normalizedLocale() {
			return this.$i18n.localeProperties.code === 'ua' ? '/' : '/ru/'
		},
	},
	watch: {
		$route(newValue, oldValue) {
			this.$fetch()
		},
	},
	methods: {
		formatDate(time) {
			const date = new Date(time)
			const options = { year: 'numeric', month: 'long', day: 'numeric' }
			// Then specify how you want your dates to be formatted
			const updatedFormat = new Intl.DateTimeFormat(this.$i18n.localeProperties.iso, options).format(date)
			return updatedFormat
		},
	},
}
</script>
<style lang="scss" scoped>
.rich_text {
	.container {
		display: flex;
		flex-wrap: wrap;
	}
	.image {
		margin-right: 2rem;
	}
	.image,
	.content {
		width: 50%;
	}
}
@media (max-width: 768px) {
	.rich_text {
		.image {
			margin-right: 0;
		}
		.image,
		.content {
			width: 100%;
		}
	}
}
</style>
