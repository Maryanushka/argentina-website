<template>
	<section class="rich_text pt-16 pb-16">
		<div class="container flex flex-col md:flex-row flex-wrap px-4">
			<h2 v-if="title !== ''" class="title text-3xl font-bold mb-24 relative text-darkBlue text-center md:text-left w-full">{{ title }}</h2>
			<div v-if="poster" class="image md:w-1/2 md:pr-4 w-full">
				<ImageItem :image="poster" class="w-full h-full object-cover mb-4 flex" />
			</div>
			<div class="content md:w-1/2 pr-4 w-full">
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
		.image,
		.content {
			width: 50%;
		}
	}
}
.page {
	.rich_text {
		padding: 0;
		.container {
			flex-direction: column;
		}
		.image,
		.content {
			width: 100%;
			padding: 0;
		}
	}
}
@media (max-width: 768px) {
	.home {
		.rich_text {
			.image,
			.content {
				width: 100%;
			}
		}
	}
}
</style>
