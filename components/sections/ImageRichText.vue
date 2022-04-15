<template>
	<section class="rich_text">
		<div class="container">
			<div v-if="poster" class="image">
				<ImageItem :image="poster" class="w-full h-full object-cover mb-4 flex" />
			</div>
			<div class="content">
				<h2 v-if="title !== ''" class="title w-full text-3xl font-bold mb-24 relative text-darkBlue text-center md:text-left w-full">{{ $t('pages.service.crumbsName') }}</h2>

				<SanityContent :blocks="text" />
				<a v-if="buttonLink !== null" :href="buttonLink.href" class="mt-12 px-8 py-4 bg-blue text-white inline-flex text-lg font-semibold hover:text-yellow">{{ buttonLink.name }}</a>
			</div>
		</div>
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
}
</script>
<style lang="scss" scoped>
.home {
	.rich_text {
		.container {
			padding: 4rem 1rem;
			display: flex;
			flex-wrap: wrap;
		}
		.content {
			padding-left: 2rem;
		}
		.image,
		.content {
			width: 50%;
		}
	}
}
</style>
