<template>
	<section class="service_cards_list py-16">
		<div class="container flex flex-wrap">
			<h2 class="title w-full text-3xl font-bold mb-12 relative">{{ data.title }}</h2>
			<div class="richtext mt-6 w-full md:w-2/3 mb-12 font-light">
				<p>{{ data.richtext }}</p>
			</div>
			<div class="grid grid-cols-2 auto-cols-auto gap-6">
				<n-link v-for="service in data.links" :key="service.title" :to="`/poslygu/${service.uid}`" class="service_item relative">
					<img :src="service.image" alt="" class="w-full h-full object-cover" />
					<h5 class="bg-blue py-2 text-xl pl-8 pr-10 bottom-20 left-0 text-white absolute font-bold">{{ service.title }}</h5>
				</n-link>
			</div>
		</div>
	</section>
</template>
<script>
export default {
	props: {
		data: {
			type: Object,
			required: true,
		},
	},
}
</script>
<style lang="scss" scoped>
.service_cards_list {
	h2 {
		text-transform: uppercase;
		&::after {
			content: '';
			display: block;
			min-width: 5rem;
			background-color: theme('colors.blue');
			height: 3px;
			bottom: -2rem;
			position: absolute;
		}
	}
	h5 {
		z-index: 3;
		clip-path: polygon(0 0, 100% 0, 90% 100%, 0% 100%);
		width: fit-content;
	}
}
</style>
