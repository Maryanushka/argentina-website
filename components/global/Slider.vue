<template>
	<section class="slider w-full" :class="{ ' py-20 md:pt-28 md:pb-32 bg-darkBlue relative top_skew bottom_skew': type !== 'sliderImage' }">
		<template v-if="type === 'sliderImage'">
			<VueSlickCarousel v-bind="options">
				<div v-for="slide in list" :key="slide._key">
					<picture class="object-cover object-center">
						<source v-if="slide.imageItem[1].type === 'mobile'" media="(max-width: 768px)" :srcset="`https://cdn.sanity.io/images/17qu8ckk/production/${slide.imageItem[1].image.slice(6, -4)}.jpg`" width="560" height="780" />
						<img v-if="slide.imageItem[0].type === 'desktop'" class="lazyload" :src="`https://cdn.sanity.io/images/17qu8ckk/production/${slide.imageItem[0].image.slice(6, -4)}.jpg`" width="1920" height="1024" />
					</picture>
				</div>
			</VueSlickCarousel>
		</template>
		<template v-else>
			<div class="container">
				<h2 class="title w-full text-3xl font-bold mb-24 relative text-white text-center md:text-left">{{ title }}</h2>
				<VueSlickCarousel v-bind="options">
					<div v-for="slide in list" :key="slide._key" class="slide md:mb-0 mb-24">
						<div class="video_container w-full md:h-96 h-56 relative">
							<img class="w-full h-full object-cover z-0 relative" :src="`https://i.ytimg.com/vi/${imagePreview(slide.youtube)}/maxresdefault.jpg`" width="1200" height="500" />
							<div class="overlay z-10 absolute bg-black w-full h-full inset-0 bg-opacity-50 block"></div>
							<a class="text-yellow play w-16 h-16 absolute top-2/4 left-2/4 z-20 hover:text-blue" @click="openModal({ isEnabled: true, data: slide.youtube })">
								<font-awesome-icon class="text-6xl w-16 h-16" :icon="['fas', 'play-circle']" />
							</a>
						</div>
					</div>
				</VueSlickCarousel>
			</div>
		</template>
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
			// required: true,
			default: 'sliderImage',
		},
		title: {
			type: String,
			// required: true,
			default: '',
		},
	},
	data: () => ({
		data: null,
		options: {
			dots: true,
			dotsClass: 'slick-dots',
			autoplay: true,
			arrows: false,
			// fade: true,
			// edgeFriction: 0.35,
			infinite: false,
			// speed: 500,
			slidesToShow: 1,
			slidesToScroll: 1,
		},
	}),
	methods: {
		imagePreview(url) {
			return url.slice(url.length - 11, url.length)
		},
		openModal(value) {
			this.$store.dispatch('bindModal', value)
		},
	},
}
</script>
<style lang="scss" scoped>
.slider {
	overflow: hidden;
	.play {
		transform: translate(-50%, -50%);
		z-index: 10;
	}
	picture {
		z-index: -1;
		position: relative;
		display: block;
	}
}
</style>
