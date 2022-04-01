<template>
	<section class="icon_list py-20 md:pt-28 md:pb-32 bg-darkBlue">
		<div class="container flex flex-wrap px-4">
			<h2 class="title w-full text-3xl font-bold mb-8 relative text-white text-center md:text-left">{{ data.title }}</h2>
			<div class="grid md:grid-cols-3 grid-cols-1 gap-6 mt-10">
				<figure v-for="item in data.list" :key="item.title" class="item relative flex mt-8 flex-col md:flex-row justify-center items-center">
					<div class="icon rounded-full bg-blue px-4 py-4 md:mr-6 w-20 h-20 flex justify-center items-center mb-8">
						<font-awesome-icon class="text-white text-3xl" :icon="item.icon" />
					</div>
					<div class="content md:w-3/4 w-full">
						<h5 class="pb-4 text-xl text-white font-bold text-center md:text-left">{{ item.listTitle }}</h5>
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
			required: true,
		},
	},
}
</script>
<style lang="scss" scoped>
.icon_list {
	position: relative;
	&::after {
		bottom: -1px;
		right: 0;
		clip-path: polygon(3% 0, 100% 0, 100% 100%, 0% 100%);
	}
	&::before {
		top: -1px;
		left: 0;
		clip-path: polygon(0 0, 100% 0, 97% 100%, 0% 100%);
	}
	&::after,
	&::before {
		position: absolute;
		width: 38%;
		height: 30px;
		display: block;
		content: '';
		transition: width 0.3s ease-out;
		background-color: #fff;
	}
}
@media (max-width: theme('screens.md')) {
	.icon_list {
		&::after,
		&::before {
			display: none;
		}
	}
}
</style>
