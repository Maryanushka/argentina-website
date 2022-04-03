<template>
	<section class="slider w-full" :class="{ image: type === 'image' }">
		<VueSlickCarousel v-bind="options">
			<div v-for="(slide, i) in list" :key="slide.key + i" class="slide relative flex items-center">
				<div class="content">
					<picture class="w-full h-full">
						<source media="(max-width: 799px)" srcset="/photo_2022-03-15_16-56-43.jpg" />
						<source media="(min-width: 800px)" srcset="/photo_2022-03-15_16-56-24.jpg" />
						<img class="object-cover object-center w-full h-full" src="/photo_2022-03-15_16-56-24.jpg" alt="Chris standing up holding his daughter Elva" />
					</picture>
				</div>
			</div>
		</VueSlickCarousel>
	</section>
</template>

<script>
import VueSlickCarousel from 'vue-slick-carousel'
import 'vue-slick-carousel/dist/vue-slick-carousel.css'

export default {
	name: 'Slider',
	components: {
		VueSlickCarousel,
	},
	props: {
		list: {
			type: Array,
			required: true,
		},
		type: {
			type: String,
			required: true,
			default: 'image',
		},
	},
	data: () => ({
		data: null,
		options: {
			dots: true,
			dotsClass: 'slick-dots',
			draggable: true,
			infinite: true,
			speed: 1000,
			autoplay: true,
			arrows: false,
			fade: true,
		},
	}),
}
</script>
<style lang="scss" scoped>
.slider {
	overflow: hidden;
}
</style>
