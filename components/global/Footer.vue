<template>
	<footer class="bg-gray-200 relative bottom_skew">
		<div class="container flex flex-wrap pt-16 pb-16 px-4">
			<div class="w-full md:w-2/3">
				<ul class="list mb-16 flex flex-wrap">
					<li v-for="link in getNavigation" :key="link.uid">
						<n-link class="text-darkBlue hover:text-blue font-bold pr-8 text-base" :to="`${normalizedLocale}${link.uid}/`">{{ link.title }}</n-link>
					</li>
				</ul>
				<SubscribeForm />
			</div>
			<div class="w-full md:w-1/3 mt-12 md:mt-0">
				<h4 class="text-darkBlue font-bold text-base mb-8">{{ $t('pages.contact.socialMediaTitle') }}</h4>
				<ul class="social-media flex mb-8">
					<li>
						<a href="#" class="text-darkBlue hover:text-blue mr-8 text-xl w-5 h-5 flex">
							<font-awesome-icon :icon="['fab', 'facebook']" />
						</a>
					</li>
					<li>
						<a href="#" class="text-darkBlue hover:text-blue mr-8 text-xl w-5 h-5 flex">
							<font-awesome-icon :icon="['fab', 'instagram']" />
						</a>
					</li>
					<li>
						<a href="#" class="text-darkBlue hover:text-blue mr-8 text-xl w-5 h-5 flex">
							<font-awesome-icon :icon="['fab', 'youtube']" />
						</a>
					</li>
				</ul>
				<span class="text-darkBlue">{{ getDomain }} © {{ getYear }} All rights reserved </span>
			</div>
		</div>
	</footer>
</template>
<script>
export default {
	name: 'Footer',
	data: () => ({
		pageType: 'page',
	}),
	computed: {
		getYear() {
			const today = new Date()
			return today.getFullYear()
		},
		getDomain() {
			return this.$store.getters.domain.slice(8)
		},
		getNavigation() {
			return this.$store.getters.navigation.filter((el) => el.lang === this.$i18n.localeProperties.code && el.type === this.pageType).sort((a, b) => a.place - b.place)
		},
		normalizedLocale() {
			return this.$i18n.localeProperties.code === 'ua' ? '/' : '/ru/'
		},
	},
}
</script>
<style lang="scss">
footer {
	&.bottom_skew::after {
		top: -29px;
		z-index: 30;
		background-color: theme('colors.gray.200');
	}
}
</style>
