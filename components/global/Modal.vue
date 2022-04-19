<template>
	<div v-if="modal.isEnabled" ref="modal" class="modal fixed top-0 left-0 z-40 w-full h-full">
		<div class="close fixed z-30 text-yellow w-8 h-8 text-4xl top-6 right-6 hover:text-yellow" @click="closeModal">
			<font-awesome-icon class="w-8 h-8" :icon="['fa', 'times']" />
		</div>
		<template v-if="modal.data !== 'form'">
			<div class="md:px-16 md:py-16 px-4 py-4 bg-gray-900 bg-opacity-90">
				<VideoItem :url="modal.data" />
			</div>
		</template>
		<template v-else>
			<div class="wrapper flex flex-wrap items-stretch h-full bg-gray-100">
				<div class="image md:w-1/2 w-full hidden md:flex h-full">
					<img class="h-full object-cover" src="/skyscrapers-in-buenos-aires-2021-08-26-18-12-10-utc.jpg" alt="" />
				</div>
				<div class="contact md:w-1/2 w-full flex justify-center items-center md:px-16 px-6 py-4">
					<ContactForm />
				</div>
			</div>
		</template>
	</div>
</template>

<script>
export default {
	computed: {
		modal() {
			return this.$store.getters.modal
		},
	},
	methods: {
		closeModal() {
			this.$store.dispatch('bindModal', { isEnabled: false, data: null })
		},
	},
}
</script>

<style lang="scss" scoped>
.modal {
	will-change: opacity;
	will-change: transform;

	.close {
		transition: all 0.2s ease;
		cursor: pointer;
	}
	.image {
		img {
			transition: all 0.2s linear;
		}
	}
}
</style>
