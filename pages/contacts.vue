<template>
	<main class="md:mt-36 mt-18 min-h-screen">
		<template v-if="$fetchState.error && !data.title && !$fetchState.pending">
			<Error />
		</template>
		<template v-if="!$fetchState.pending && data.title">
			<Intro :title="data.title" :poster="data.poster" :crumbs="{ enabled: true, linkname: 'tourism', linklabel: getParentTitle }" />
			<section class="py-16">
				<div class="container px-4 flex flex-wrap items-stretch">
					<div class="left md:w-2/3 w-full md:pr-32">
						<SanityContent v-if="data.content" class="content" :blocks="data.content" :serializers="serializers" />
						<ContactForm />
					</div>
					<div class="right md:w-1/3 w-full">
						<iframe class="w-full h-full" src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d12162928.01572986!2d-68.22691664111744!3d-36.25299904207079!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x95bccaf5f5fdc667%3A0x3d2f77992af00fa8!2sArgentina!5e0!3m2!1sen!2smk!4v1650062192677!5m2!1sen!2smk" style="border: 0" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
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
		serializers: {
			types: {
				titleText: TitleRichText,
			},
		},
	}),
	async fetch() {
		await this.$sanity
			.fetch(page, { uid: this.localePath('contacts').slice(1, -1), lang: this.$i18n.localeProperties.code })
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
}
</script>
