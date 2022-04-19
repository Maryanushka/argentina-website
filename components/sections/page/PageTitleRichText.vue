<template>
	<section class="rich_text pb-16 pt-16 w-full">
		<div class="flex flex-col md:flex-row flex-wrap">
			<div class="container px-4">
				<h2 v-if="data.title !== undefined" class="title text-3xl font-bold mb-24 relative text-darkBlue text-center md:text-left w-full">{{ data.title }}</h2>
				<div class="content w-full">
					<SanityContent :blocks="data.text" />
					<a v-if="data.buttonLink !== undefined" :href="data.buttonLink.href" class="button mt-12 px-8 py-4 bg-blue text-white inline-flex text-lg font-semibold hover:bg-yellow hover:text-darkBlue">{{ data.buttonLink.name }}</a>
				</div>
			</div>
		</div>
	</section>
</template>

<script>
export default {
	name: 'CTA',
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
		},
	},
}
</script>
<style lang="scss" scoped>
.rich_text {
	margin: 0 auto;
}
</style>
