<template>
	<section class="icon_list py-20 md:pt-28 md:pb-32 bg-darkBlue relative top_skew bottom_skew w-full">
		<div class="container flex flex-wrap px-4">
			<h2 class="title w-full text-3xl font-bold mb-8 relative text-white text-center md:text-left">{{ data.title }}</h2>
			<div class="grid grid-cols-1 gap-6 mt-10" :class="{ 'md:grid-cols-2': data.benefitItems.length % 2 == 0, 'md:grid-cols-3': data.benefitItems.length % 3 == 0 }">
				<figure v-for="(item, i) in data.benefitItems" :key="item._key" class="item relative flex mt-8 flex-col md:flex-row justify-center md:items-start items-center">
					<div class="icon rounded-full bg-yellow px-4 py-4 md:mr-6 w-20 h-20 flex justify-center items-center mb-8">
						<font-awesome-icon class="text-darkBlue text-3xl w-8 h-8" :icon="preparedIcons[i]" />
					</div>
					<div class="content md:w-3/4 w-full">
						<h5 class="pb-4 text-xl text-white font-bold text-center md:text-left">{{ item.title }}</h5>
						<p class="text-white text-center md:text-left">{{ item.description }}</p>
					</div>
				</figure>
			</div>
		</div>
	</section>
</template>
<script>
export default {
	props: {
		data: {
			type: Object,
			default: null,
			benefitItems: {
				type: Array,
				required: true,
			},
			title: {
				type: String,
				required: true,
			},
		},
	},
	computed: {
		preparedIcons() {
			const icons = this.data.benefitItems.map((el) => {
				const iconsArray = el.icon.split('-')

				return [iconsArray[0], iconsArray.slice(1).join('-')]
			})
			return icons
		},
	},
}
</script>
