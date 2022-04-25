<template>
	<section class="image_rich_text w-full py-16">
		<div class="container flex flex-col md:flex-row flex-wrap px-4">
			<h2 v-if="data.title !== undefined" class="title text-3xl font-bold mb-24 relative text-darkBlue text-center md:text-left w-full">{{ data.title }}</h2>
			<div v-if="data.poster" class="image w-full">
				<ImageItem :image="data.poster" w="1000" class="w-full object-cover mb-4 flex h-full" />
			</div>
			<div class="content w-full mt-4">
				<SanityContent :blocks="data.text" class="rich_text" />
				<a v-if="data.buttonLink !== undefined" :href="data.buttonLink.href" class="button mt-12 px-8 py-4 hover:bg-blue hover:text-white inline-flex text-lg font-semibold bg-yellow text-darkBlue">{{ data.buttonLink.name }}</a>
			</div>
		</div>
	</section>
</template>

<script>
export default {
	name: 'PageImgText',
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
