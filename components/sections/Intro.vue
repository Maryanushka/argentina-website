<template>
	<section class="intro md:h-80 overflow-hidden relative bottom_skew w-full">
		<ImageItem v-if="poster" :image="poster" w="1920" h="400" class="h-full w-full absolute object-cover" />
		<div class="container px-4 flex flex-col justify-between h-full relative z-10">
			<h1 class="md:text-5xl text-xl text-white mt-32 font-bold mb-8">
				{{ title }}
			</h1>
			<Crumbs v-if="crumbs.enabled" :linklabel="crumbs.linklabel" :linkname="crumbs.linkname" :title="title" class="mb-12" />
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
				}
			},
		},
		poster: {
			type: String,
			// required: true,
			default: 'image-06565e23845b7112248ae26738d733b7afd5bc23-9976x5351-jpg',
		},
		title: {
			type: String,
			required: true,
			default: 'Привіт ми з України :)',
		},
	},
}
</script>

<style lang="scss" scoped>
.intro {
	picture {
		z-index: -1;
	}
	&::before {
		content: '';
		position: absolute;
		display: block;
		width: 100%;
		height: 100%;
		background-color: theme('colors.black');
		opacity: 0.5;
		z-index: 0;
	}
}
</style>
