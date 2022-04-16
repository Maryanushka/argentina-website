<template>
	<div class="crumbs flex items-center flex-wrap">
		<n-link :to="localePath('/')">{{ $t('pages.home') }}</n-link>
		<font-awesome-icon class="text-white text-sm mx-4 w-4 h-4" :icon="['fa', 'long-arrow-alt-right']" />

		<n-link v-if="linklabel !== undefined" :to="localePath(linkname)">{{ linklabel }}</n-link>
		<font-awesome-icon v-if="linklabel !== undefined" class="text-white text-sm mx-4 w-4 h-4" :icon="['fa', 'long-arrow-alt-right']" />
		<span class="text-white">
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
