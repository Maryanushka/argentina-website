<template>
	<div class="crumbs">
		<n-link :to="localePath({ name: linkname })">{{ linklabel }}</n-link>
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
		},
		linklabel: {
			type: String,
			default: undefined,
		},
		linkname: {
			type: String,
			default: undefined,
		},
	},
	computed: {
		link() {
			const link = this.$route.path.split('/')
			// if(this.$i18n.locale)
			return link
		},
	},
}
</script>

<style lang="scss" scoped>
.crumbs {
	a {
		color: theme('colors.blue');
		&::first-letter {
			text-transform: uppercase;
		}
		&:hover {
			opacity: 0.85;
		}
	}
}
</style>
