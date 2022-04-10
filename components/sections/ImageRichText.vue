<template>
	<section class="rich_text">
		<template v-if="poster !== null">
			<ImageItem :image="poster" class="w-full h-full object-cover mb-4 flex" />
		</template>
		<SanityContent :blocks="text" />
	</section>
</template>

<script>
export default {
	name: 'ImageRichText',
	props: {
		text: {
			type: Array,
			required: true,
		},
		poster: {
			type: String,
			required: true,
			default: 'image-bab23c6fe03fb3543f286f59bb9a5b5853a802f8-6000x4000-jpg',
		},
	},
}
</script>
