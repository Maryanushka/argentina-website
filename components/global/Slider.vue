<template>
	<section class="slider w-full" :class="{ image: sliderType === 'image' }">
		<VueSlickCarousel v-bind="options">
			<div v-for="slide in list" :key="slide.key" class="slide relative flex items-center">
				<div class="content">
					<picture>
						<source v-if="slide.imageItem[1].type === 'mobile'" media="(max-width: 768px)" :srcset="`https://cdn.sanity.io/images/17qu8ckk/production/${slide.imageItem[1].image.slice(6, -4)}.jpg`" />
						<img v-if="slide.imageItem[0].type === 'desktop'" class="object-cover object-center w-full h-full lazyload" :src="`https://cdn.sanity.io/images/17qu8ckk/production/${slide.imageItem[0].image.slice(6, -4)}.jpg`" />
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
		sliderType: {
			type: String,
			// required: true,
			default: 'image',
		},
	},
	data: () => ({
		data: null,
		options: {
			dots: true,
			dotsClass: 'slick-dots',
			draggable: true,
			infinite: false,
			speed: 1000,
			autoplay: true,
			arrows: false,
			fade: true,
			slidesToShow: 1,
			slidesToScroll: 1,
		},
	}),
}
</script>
<style lang="scss" scoped>
.slider {
	overflow: hidden;
}
</style>
