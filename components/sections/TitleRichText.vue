<template>
	<section class="rich_text">
		<div class="flex flex-col md:flex-row flex-wrap container px-4">
			<h2 v-if="title !== ''" class="title text-3xl font-bold mb-24 relative text-darkBlue text-center md:text-left w-full">{{ title }}</h2>
			<div class="content w-full">
				<SanityContent :blocks="text" />
				<a v-if="buttonLink !== null" :href="buttonLink.href" class="mt-12 px-8 py-4 bg-blue text-white inline-flex text-lg font-semibold hover:text-yellow">{{ buttonLink.name }}</a>
			</div>
		</div>
	</section>
</template>

<script>
export default {
	name: 'TitleRichText',
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
.page,
.article {
	.rich_text {
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
</style>
