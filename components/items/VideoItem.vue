<template>
	<div class="video_wrapper w-full h-full">
		<client-only>
			<LazyYoutube :src="url" :autoplay="true" />
		</client-only>
	</div>
</template>

<script>
import { LazyYoutube } from 'vue-lazytube'
export default {
	name: 'VideoItem',
	components: {
		LazyYoutube,
		// LazyVimeo,
	},
	props: {
		url: {
			type: String,
			required: true,
		},
	},
}
</script>

<style lang="scss">
.video_wrapper {
	width: 100%;
	.ipOhDr {
		max-width: 100%;
		height: 100%;
	}
}

@media (max-width: 900px) {
	.video_wrapper {
		width: 100%;
	}
}
</style>
