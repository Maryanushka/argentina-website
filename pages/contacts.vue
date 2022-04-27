<template>
	<main class="md:mt-36 mt-18 contact_page">
		<template v-if="$fetchState.error && !data.title && !$fetchState.pending">
			<Error />
		</template>
		<template v-if="!$fetchState.pending && data.title">
			<Intro :title="data.title" :poster="data.poster" :crumbs="{ enabled: true }" />
			<section>
				<div class="container py-16 px-4 flex flex-wrap items-stretch">
					<div class="left md:w-2/3 w-full md:pr-32">
						<SanityContent v-if="data.content" class="content" :blocks="data.content" :serializers="serializers" />
						<ContactForm />
					</div>
					<div class="right md:w-1/3 w-full mt-8 md:mt-0 md:h-auto h-72">
						<iframe class="w-full h-full" src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3291.4213845305517!2d-58.66965868492503!3d-34.416050080508526!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x95bca1609a00ea1d%3A0x116955deba492b5!2sBarrio%20Las%20Glorietas!5e0!3m2!1sen!2smk!4v1650391245946!5m2!1sen!2smk" style="border: 0" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
					</div>
				</div>
				<div class="contact_info w-full relative top_skew bottom_skew bg-darkBlue py-24">
					<div class="container grid grid-cols-1 gap-6 md:grid-cols-3 md:px-0 px-12">
						<div class="w-full flex md:flex-row flex-col justify-center md:items-start items-center md:my-0 my-12">
							<div class="icon w-20 h-20 bg-yellow text-darkBlue rounded-full flex justify-center items-center">
								<font-awesome-icon class="w-8 h-8 text-lg" :icon="['fa', 'map-marker-alt']" />
							</div>
							<div class="text text-white md:w-2/3 md:ml-8 md:mt-0 mt-8">
								<h5 class="md:text-xl text-2xl md:mb-4 mb-6 font-bold md:text-left text-center">{{ $t('pages.contact.address') }}</h5>
								<p>Buenos Aires, Tigre, Nordelta Las Glorietas, 150</p>
							</div>
						</div>
						<div class="w-full flex md:flex-row flex-col justify-center md:items-start items-center md:my-0 my-12">
							<div class="icon w-20 h-20 bg-yellow text-darkBlue rounded-full flex justify-center items-center">
								<font-awesome-icon class="w-8 h-8 text-lg" :icon="['fa', 'map-marker-alt']" />
							</div>
							<div class="text text-white md:w-2/3 md:ml-8 md:mt-0 mt-8">
								<h5 class="md:text-xl text-2xl md:mb-4 mb-6 font-bold md:text-left text-center">{{ $t('pages.contact.number_pl') }}</h5>
								<div class="phones w-full flex flex-col">
									<a class="text-yellow hover:text-blue flex items-center my-1" href="tel:+54 11 6750-2877">
										<font-awesome-icon class="w-5 h-5 text-lg" :icon="['fa', 'phone']" />
										<span class="ml-2">+54 11 6750-2877</span>
									</a>
									<a class="text-yellow hover:text-blue flex items-center my-1" href="https://t.me/Viktor_arg" target="_blank">
										<font-awesome-icon class="w-5 h-5 text-lg" :icon="['fab', 'telegram']" />
										<span class="ml-2">+54 11 6750-2877</span>
									</a>
									<a class="text-yellow hover:text-blue flex items-center my-1" href="https://api.whatsapp.com/send/?phone=541167502877" target="_blank">
										<font-awesome-icon class="w-5 h-5 text-lg" :icon="['fab', 'whatsapp']" />
										<span class="ml-2">+54 11 6750-2877</span>
									</a>
								</div>
							</div>
						</div>
						<div class="w-full flex md:flex-row flex-col justify-center md:items-start items-center md:my-0 my-12">
							<div class="icon w-20 h-20 bg-yellow text-darkBlue rounded-full flex justify-center items-center">
								<font-awesome-icon class="w-8 h-8 text-lg" :icon="['fa', 'map-marker-alt']" />
							</div>
							<div class="text text-white md:w-2/3 md:ml-8 md:mt-0 mt-8">
								<h5 class="md:text-xl text-2xl md:mb-4 mb-6 font-bold md:text-left text-center">{{ $t('pages.contact.open_hours') }}</h5>
								<p>Пн–Сб: 7:00–19:00</p>
							</div>
						</div>
					</div>
				</div>
			</section>
		</template>
	</main>
</template>

<script>
import TitleRichText from '@/components/sections/TitleRichText'
import { page } from '@/plugins/queries'

export default {
	name: 'Contacts',
	data: () => ({
		data: {},
		parentTitle: '',
		serializers: {
			types: {
				titleText: TitleRichText,
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
				throw new Error('contacts not found', error)
			})
	},
	fetchOnServer: false,
	head() {
		return this.$store.getters.metaHead
	},
	computed: {
		getNavigationFromStore() {
			return this.$store.getters.navigation
		},
		normalizedParentUid() {
			return this.localePath('contacts').split('/').slice(1, -1).pop()
		},
		getParentTitle() {
			return this.getNavigationFromStore.filter((el) => el.uid === this.normalizedParentUid && el.type === 'page')[0].title
		},
	},
	// watch: {
	// 	$route(newValue, oldValue) {
	// 		this.$fetch()
	// 	},
	// 	getNavigationFromStore(oldValue, newValue) {
	// 		this.getParentTitle(this.getNavigationFromStore)
	// 	},
	// },
	// mounted() {
	// 	if (this.getNavigationFromStore) {
	// 		this.getParentTitle(this.getNavigationFromStore)
	// 	}
	// },
	// methods: {
	// 	getParentTitle(navigation) {
	// 		this.parentTitle = navigation.filter((el) => el.uid === this.normalizedParentUid && el.type === 'page')[0].title
	// 	},
	// },
}
</script>
<style lang="scss" scoped>
.contact_page {
	min-height: 75vh;
}
</style>
