<template>
	<div class="crumbs">
		<n-link :to="localePath(linkname)">{{ linklabel }}</n-link>
		<span class="text-white">
			<font-awesome-icon class="text-white text-sm mx-4" :icon="['fa', 'long-arrow-alt-right']" />
			{{ title }}
		</span>
	</div>
</template>

<script>
export default {
	props: {
		title: {
			type: String,
			default: undefined,
		},
		enabled: {
			type: Boolean,
			required: false,
			default: false,
		},
		linklabel: {
			type: String,
			default: undefined,
		},
		linkname: {
			type: String,
			default: '/',
		},
	},
}
</script>

<style lang="scss" scoped>
.crumbs {
	a {
		color: theme('colors.yellow');
		&::first-letter {
			text-transform: uppercase;
		}
		&:hover {
			opacity: 0.85;
		}
	}
}
</style>
