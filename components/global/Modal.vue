<template>
	<div v-if="modal.isEnabled" ref="modal" class="video_modal fixed top-0 left-0 bg-gray-900 bg-opacity-90 z-40 w-full h-full px-16 py-16">
		<VideoItem :url="modal.data" />
		<div class="close fixed z-30 text-white text-4xl top-6 right-6 hover:text-yellow" @click="closeModal">
			<font-awesome-icon :icon="['fa', 'times']" />
		</div>
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
.video_modal {
	will-change: opacity;
	will-change: transform;

	// width: 100%;
	// height: 100vh;
	// opacity: 1;
	// z-index: 31;
	// position: fixed;
	// top: 0;
	// left: 0;

	// display: flex;
	// align-items: center;
	// justify-content: center;
	// background: theme('colors.gray.900');

	.close {
		// position: fixed;
		// top: 25px;
		// right: 25px;
		// fill: theme('colors.white');
		transition: all 0.2s ease;
		cursor: pointer;
		// &:hover {
			// opacity: 0.5;
		// }
	}
}
</style>
