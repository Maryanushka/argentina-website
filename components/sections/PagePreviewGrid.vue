<template>
	<section class="page_preview-list py-16">
		<div class="container flex flex-wrap px-4">
			<h2 class="title w-full text-3xl font-bold mb-12 relative text-center md:text-left">{{ title ? title : sectionTitle }}</h2>
			<div class="grid md:grid-cols-3 grid-cols-1 gap-6">
				<n-link v-for="page in pages" :key="page._id" :to="`${normalizedLocale}${parentuid}/${page.uid}/`" class="page_item relative overflow-hidden mt-4">
					<ImageItem :image="page.poster" class="w-full h-64 object-cover" w="500" h="500" />
					<h5 class="py-4 text-xl text-blue font-bold">
						{{ page.title }}
					</h5>
					<p class="description">
						{{ page.description }}
					</p>
				</n-link>
			</div>
		</div>
	</section>
</template>
<script>
export default {
	name: 'PagePreviewGrid',
	props: {
		pages: {
			type: Array,
			required: true,
		},
		parentuid: {
			type: String,
			required: true,
		},
		title: {
			type: String,
			default: '',
		},
	},
	computed: {
		normalizedLocale() {
			return this.$i18n.localeProperties.code === 'ua' ? '/' : '/ru/'
		},
		sectionTitle() {
			return this.$t('pages.service.relatedServices')
		},
	},
}
</script>
