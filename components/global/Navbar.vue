<template>
	<header class="header overflow-x-hidden fixed w-full top-0 z-20 bg-white" :class="{ fill: scrollPosition > 500 && mobile > 800 }">
		<div class="container flex relative">
			<div class="logo xl:relative xl:w-1/4 absolute h-28 w-60">
				<n-link to="/" class="absolute z-10 h-full flex">
					<nuxt-img src="logo_cut.png" />
				</n-link>
			</div>
			<div class="flex flex-col xl:w-3/4 w-full items-end relative z-10 wrapper">
				<div class="info flex justify-end items-center w-full px-4 py-4">
					<a class="my-4 ml-12" href="mailto:info@demolink.org">
						<font-awesome-icon class="xl:text-blue text-yellow" :icon="['far', 'envelope']" />
						<span class="xl:text-darkBlue xl:hover:text-blue hover:text-yellow text-white ml-2 font-light text-sm">info@demolink.org</span>
					</a>
					<span class="schedule my-4 ml-12">
						<font-awesome-icon class="xl:text-blue text-yellow" :icon="['far', 'clock']" />
						<span class="xl:text-darkBlue text-white ml-2 font-light text-sm">Mon–Sat: 7:00–19:00</span>
					</span>
					<a class="my-4 ml-12" href="tel:1-800-1234-567">
						<font-awesome-icon class="xl:text-blue text-yellow" :icon="['fa', 'phone']" />
						<span class="xl:text-darkBlue xl:hover:text-blue hover:text-yellow text-white ml-2 font-light text-sm">1-800-1234-567</span>
					</a>
				</div>
				<nav class="flex justify-end items-center w-full relative">
					<ul class="flex justify-items-end items-center py-4 divide-x divide-solid divide-gray-100 divide-opacity-50">
						<li>
							<a class="text-white hover:text-yellow font-bold px-6 mx-1" href="">Почему Аргентина</a>
						</li>
						<li>
							<a class="text-white hover:text-yellow font-bold px-6 mx-1" href="">Иммиграция</a>
						</li>
						<li>
							<a class="text-white hover:text-yellow font-bold px-6 mx-1" href="">Услуги</a>
						</li>
						<li>
							<a class="text-white hover:text-yellow font-bold px-6 mx-1" href="">Туризм </a>
						</li>
						<li>
							<a class="text-white hover:text-yellow font-bold px-6 mx-1" href="">Блог</a>
						</li>
						<li>
							<a class="text-white hover:text-yellow font-bold px-6 mx-1" href="">Контакты</a>
						</li>
					</ul>
				</nav>
			</div>
		</div>
	</header>
</template>
<script>
export default {
	data: () => ({
		scrollPosition: null,
		mobile: null,
		isOpened: false,
	}),
	computed: {
		// currentLocale() {
		// 	return this.$i18n.localeProperties.code
		// },
	},
	watch: {
		currentLocale(newValue, oldValue) {
			console.log('currentLocale changed')
		},
	},
	mounted() {
		this.mobile = window.innerWidth
		window.addEventListener('scroll', this.updateScroll)
		window.addEventListener('resize', this.resize)
	},
	methods: {
		// getNavbarLinks() {
		// 	this.currentLinks = this.links.filter((el) => {
		// 		return el.language === this.$i18n.localeProperties.code ? el.data : false
		// 	})
		// },
		updateScroll() {
			this.scrollPosition = window.scrollY
		},
		resize() {
			this.mobile = window.innerWidth
		},
		openMenu() {
			if (window.innerWidth < 801) this.isOpened = !this.isOpened
		},
	},
}
</script>
<style lang="scss" scoped>
.header {
	.logo {
		&::after {
			position: absolute;
			width: 150%;
			height: 100%;
			display: block;
			content: '';
			transition: width 0.3s ease-out;
			left: -50%;
			clip-path: polygon(0 0, 100% 0, 84% 100%, 0% 100%);
			background-color: theme('colors.blue');
		}
		img {
			height: auto;
			position: relative;
			width: 70%;
			object-fit: contain;
			object-position: center;
			filter: drop-shadow(0 0 20px hsl(221deg 51% 18% / 61%));
		}
	}
	nav {
		&::after {
			position: absolute;
			width: 155%;
			height: 100%;
			z-index: -1;
			display: block;
			content: '';
			right: -50%;
			transition: width 0.3s ease-in;
			clip-path: polygon(2.4% 0%, 100% 0, 100% 100%, 0% 100%);
			background-color: theme('colors.blue');
		}
	}
	&.fill {
		.logo {
			display: none;
		}
		.wrapper {
			width: 100%;
			nav::after {
				width: 200%;
				right: -50%;
			}
			.info {
				display: none;
			}
		}
	}
}
@media (min-width: 1228px) {
	.header {
		.logo::after {
			width: 150%;
			left: -50%;
		}
		nav {
			justify-content: center;
			&::after {
				background-color: theme('colors.blue');
				width: 156%;
			}
		}
	}
}
@media (min-width: 768px) and (max-width: 1280px) {
	.header {
		.logo::after {
			width: 200vw;
			left: -20vw;
		}
		nav::after {
			background-color: theme('colors.darkBlue');
			width: 200%;
		}
	}
}
</style>
