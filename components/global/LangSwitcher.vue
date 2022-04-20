<template>
	<div class="lang w-11 h-8 flex ml-6 text-base font-bold md:bg-yellow text-darkBlue overflow-hidden absolute right-0" :class="{ opened: showLocales }">
		<span class="current_locale px-3 flex items-center" @click="showLocales = !showLocales">
			{{ currentLocale }}
		</span>
		<n-link v-for="locale in availableLocales" :key="locale.code" class="locale px-3 flex items-center hover:text-blue" :to="switchLocalePath(locale.code)" @click.native="showLocales = false">
			{{ locale.code }}
		</n-link>
	</div>
</template>

<script>
export default {
	data: () => ({
		showLocales: false,
	}),
	computed: {
		availableLocales() {
			return this.$i18n.locales.filter((i) => i.code !== this.$i18n.locale)
		},
		currentLocale() {
			return this.$i18n.locale
		},
	},
}
</script>

<style lang="scss" scoped>
.lang {
	transition: width 0.3s linear;
	&.opened {
		width: 5.5rem;
	}
	.current_locale {
		z-index: 2;
		cursor: pointer;
		span {
			line-height: 12px;
		}
		&:hover {
			opacity: 0.85;
		}
	}
}

@media (max-width: 800px) {
	.lang {
		color: theme('colors.black');
		.locale {
			&:hover {
				color: theme('colors.white');
			}
		}
	}
}
</style>
