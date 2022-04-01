<template>
	<section class="service_cards_list py-28 px-4">
		<div class="container flex flex-wrap">
			<h2 class="title w-full text-3xl font-bold mb-12 relative text-center md:text-left">{{ data.title }}</h2>
			<div class="richtext mt-6 w-full md:w-2/3 mb-12 font-light text-center md:text-left">
				<p>{{ data.richtext }}</p>
			</div>
			<div class="grid md:grid-cols-3 grid-cols-1 gap-6">
				<n-link v-for="service in data.links" :key="service.title" :to="`/${service.uid}/`" class="service_item relative overflow-hidden">
					<img :src="service.image" alt="" class="w-full h-full object-cover" />
					<h5 class="bg-blue py-2 text-xl pl-8 pr-10 bottom-5 left-0 text-white absolute">
						<font-awesome-icon class="text-white" :icon="['fa', 'arrow-right']" />
						{{ service.title }}
					</h5>
				</n-link>
			</div>
			<n-link :to="localePath('services')" class="px-12 py-4 mt-12 text-white bg-blue hover:bg-darkBlue">Дивитись</n-link>
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
	.service_item {
		h5 {
			z-index: 3;
			clip-path: polygon(0 0, 100% 0, 90% 100%, 0% 100%);
			width: fit-content;
			transition: all 0.3s linear;
		}
		img {
			transition: all 0.3s linear;
		}
		svg {
			width: 0;
			opacity: 0;
			transition: all 0.3s linear;
		}
		&:hover {
			img {
				transform: scale(1.01);
			}
			svg {
				width: 2rem;
				opacity: 1;
			}
		}
	}
}
</style>
