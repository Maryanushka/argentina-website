<template>
	<section class="intro md:h-80 overflow-hidden relative bottom_skew">
		<!-- <ImageItem :image="poster" w="1920" h="1080" /> -->
		<img :src="poster" class="h-full w-full absolute object-cover" />
		<div class="container flex flex-col justify-between h-full">
			<h1 class="md:text-5xl text-white mt-32 font-bold">
				{{ title }}
			</h1>
			<Crumbs v-if="crumbs.enabled" :linklabel="crumbs.linkLabel" :linkname="crumbs.link" :title="title" class="mb-12" />
		</div>
	</section>
</template>

<script>
export default {
	props: {
		crumbs: {
			type: Object,
			default() {
				return {
					enabled: false,
					linkname: null,
					linklabel: null,
					// title: this.title,
				}
			},
		},
		poster: {
			type: String,
			default: '/cementerio-de-chacarita-buenos-aires-argentina-2021-08-29-04-12-40-utc.jpg',
		},
		title: {
			type: String,
			required: true,
			// default: 'Привіт ми з України :)',
		},
	},
}
</script>

<style lang="scss" scoped>
.intro {
	img {
		z-index: -1;
	}
}
</style>
