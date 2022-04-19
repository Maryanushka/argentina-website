<template>
	<section class="image_rich_text pt-16 pb-16">
		<div class="container flex flex-col md:flex-row flex-wrap px-4">
			<h2 v-if="title !== ''" class="title text-3xl font-bold mb-24 relative text-darkBlue text-center md:text-left w-full">{{ title }}</h2>
			<div v-if="poster" class="image md:w-1/3 w-full">
				<ImageItem :image="poster" class="w-full h-full object-cover mb-4 flex" />
			</div>
			<div class="content md:w-2/3 pl-8 w-full">
				<SanityContent :blocks="text" />
				<a v-if="buttonLink !== null" :href="buttonLink.href" class="button mt-12 px-8 py-4 hover:bg-blue hover:text-white inline-flex text-lg font-semibold bg-yellow text-darkBlue">{{ buttonLink.name }}</a>
			</div>
		</div>
	</section>
</template>

<script>
export default {
	name: 'PageImageRichText',
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
	.image_rich_text {
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
.page,
.article {
	.image_rich_text {
		padding: 0;
		.container {
			flex-direction: column;
			padding: 0;
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
		.image_rich_text {
			.image,
			.content {
				width: 100%;
			}
		}
	}
}
</style>
