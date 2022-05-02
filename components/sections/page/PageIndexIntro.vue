<template>
	<section class="image_rich_text md:w-2/3 w-full px-4">
		<div class="flex flex-col md:flex-row flex-wrap">
			<h2 v-if="data.title !== undefined" class="title text-3xl font-bold mb-24 relative text-darkBlue text-center md:text-left w-full">{{ data.title }}</h2>
			<div v-if="data.poster" class="image w-full">
				<ImageItem :image="data.poster" h="400" class="w-full object-cover mb-4 flex h-full max-h-80" />
			</div>
			<div class="content w-full mt-4 p-6 bg-blue bg-opacity-5 border-blue border-solid border-r-4 mb-12">
				<SanityContent :blocks="data.text" />
				<a v-if="data.buttonLink !== undefined" :href="data.buttonLink.href" class="button mt-12 px-8 py-4 hover:bg-blue hover:text-white inline-flex text-lg font-semibold bg-yellow text-darkBlue">{{ data.buttonLink.name }}</a>
			</div>
		</div>
	</section>
</template>

<script>
export default {
	name: 'PageIndexIntro',
	props: {
		data: {
			type: Object,
			default: null,
			text: {
				type: Array,
				required: true,
			},
			buttonLink: {
				type: Object,
				default: null,
			},
			title: {
				type: String,
				default: '',
			},
			poster: {
				type: String,
				// required: true,
				default: 'image-bab23c6fe03fb3543f286f59bb9a5b5853a802f8-6000x4000-jpg',
			},
		},
	},
}
</script>
<style lang="scss" scoped></style>
