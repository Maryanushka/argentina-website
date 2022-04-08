<template>
	<section class="rich_text">
		<ImageItem :image="poster" class="w-full h-full object-cover mb-4 flex" />
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
		},
	},
}
</script>
