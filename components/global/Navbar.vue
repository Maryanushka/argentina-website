<template>
	<header class="header overflow-x-hidden fixed w-full top-0 z-20 bg-white" :class="{ fill: scrollPosition > 500 && mobile > 768 }">
		<div class="container flex relative">
			<font-awesome-icon class="text-darkBlue md:hidden text-xl z-30" :icon="isNavigationOpened ? ['fa', 'arrow-left'] : ['fa', 'bars']" @click="openMenu" />

			<div class="logo xl:relative xl:w-1/4 absolute h-28 w-60">
				<n-link to="/" class="absolute z-10 h-full flex">
					<nuxt-img src="logo_cut.png" />
				</n-link>
			</div>
			<div class="flex flex-col xl:w-3/4 w-full items-end relative z-10 wrapper">
				<div class="info flex justify-end md:items-center items-start w-full px-4 py-4" :class="{ isContactBlockOpened: isisContactBlockOpened && mobile < 768 }">
					<a class="md:my-4 md:ml-12 my-2 w-full md:w-auto" href="mailto:info@demolink.org">
						<font-awesome-icon class="xl:text-blue md:text-yellow text-blue" :icon="['far', 'envelope']" />
						<span class="xl:text-darkBlue xl:hover:text-blue hover:text-yellow md:text-white text-darkBlue ml-2 font-light text-sm">info@demolink.org</span>
					</a>
					<span class="schedule md:my-4 md:ml-12 my-2 w-full md:w-auto">
						<font-awesome-icon class="xl:text-blue md:text-yellow text-blue" :icon="['far', 'clock']" />
						<span class="xl:text-darkBlue md:text-white text-darkBlue ml-2 font-light text-sm">Mon–Sat: 7:00–19:00</span>
					</span>
					<a class="md:my-4 md:ml-12 my-2 w-full md:w-auto" href="tel:1-800-1234-567">
						<font-awesome-icon class="xl:text-blue md:text-yellow text-blue" :icon="['fa', 'phone']" />
						<span class="xl:text-darkBlue xl:hover:text-blue hover:text-yellow md:text-white text-darkBlue ml-2 font-light text-sm">1-800-1234-567</span>
					</a>
				</div>
				<nav class="flex justify-end md:items-center items-start w-full relative" :class="{ navigation_opened: isNavigationOpened && mobile < 768 }">
					<ul class="flex md:justify-items-end md:items-center md:flex-row flex-col py-4 divide-x divide-solid divide-gray-100 divide-opacity-50">
						<li>
							<a class="md:text-white text-darkBlue hover:text-yellow font-bold px-6 mx-1" href="">Почему Аргентина</a>
							<font-awesome-icon class="text-darkBlue hover:text-yellow md:hidden" :icon="['fa', 'chevron-right']" />
						</li>
						<li>
							<a class="md:text-white text-darkBlue hover:text-yellow font-bold px-6 mx-1" href="">Иммиграция</a>
							<font-awesome-icon class="text-darkBlue hover:text-yellow md:hidden" :icon="['fa', 'chevron-right']" />
						</li>
						<li>
							<a class="md:text-white text-darkBlue hover:text-yellow font-bold px-6 mx-1" href="">Услуги</a>
							<font-awesome-icon class="text-darkBlue hover:text-yellow md:hidden" :icon="['fa', 'chevron-right']" />
						</li>
						<li>
							<a class="md:text-white text-darkBlue hover:text-yellow font-bold px-6 mx-1" href="">Туризм </a>
							<font-awesome-icon class="text-darkBlue hover:text-yellow md:hidden" :icon="['fa', 'chevron-right']" />
						</li>
						<li>
							<a class="md:text-white text-darkBlue hover:text-yellow font-bold px-6 mx-1" href="">Блог</a>
							<font-awesome-icon class="text-darkBlue hover:text-yellow md:hidden" :icon="['fa', 'chevron-right']" />
						</li>
						<li>
							<a class="md:text-white text-darkBlue hover:text-yellow font-bold px-6 mx-1" href="">Контакты</a>
							<font-awesome-icon class="text-darkBlue hover:text-yellow md:hidden" :icon="['fa', 'chevron-right']" />
						</li>
					</ul>
				</nav>
			</div>

			<font-awesome-icon class="text-darkBlue md:hidden text-2xl z-30" :icon="isisContactBlockOpened ? ['fa', 'times'] : ['fa', 'ellipsis-v']" @click="infoOpened" />
		</div>
	</header>
</template>
<script>
export default {
	data: () => ({
		scrollPosition: null,
		mobile: null,
		isNavigationOpened: false,
		isisContactBlockOpened: false,
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
		infoOpened() {
			this.isisContactBlockOpened = !this.isisContactBlockOpened
		},
		updateScroll() {
			this.scrollPosition = window.scrollY
		},
		resize() {
			this.mobile = window.innerWidth
		},
		openMenu() {
			if (window.innerWidth < 768) this.isNavigationOpened = !this.isNavigationOpened
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
		a {
			display: flex;
			justify-content: center;
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
		.mobile {
			display: none;
		}
		.logo::after {
			width: 200vw;
			left: -20vw;
		}
		nav {
			&::after {
				background-color: theme('colors.darkBlue');
				width: 200%;
			}
		}
	}
}
@media (max-width: 768px) {
	.header {
		height: 10vh;
		align-items: center;
		display: flex;
		padding: 1rem;
		.info {
			position: fixed;
			width: 55vw;
			right: 0;
			background-color: theme('colors.white');
			flex-direction: column;
			top: 10vh;
			transform: scale(0);
			z-index: 20;
			&.isContactBlockOpened {
				transform: scale(1);
			}
			// a {
			// 	margin: 0;
			// 	width: 100%;
			// }
			// span {
			// 	margin: 0;
			// 	width: 100%;
			// }
		}
		.logo {
			position: fixed;
			top: -2rem;
			height: 20vh;
			width: 55vw;
			left: 50%;
			transform: translateX(-50%);
			transition: 0.3s linear;
			z-index: 0;
			img {
				filter: initial;
			}
			&::after {
				background-color: transparent;
				clip-path: initial;
			}
		}
		nav {
			position: fixed;
			width: 100vw;
			height: 90vh;
			bottom: 0;
			left: -100vw;
			transition: 0.1s ease-in;
			&::after {
				clip-path: initial;
				right: initial;
				width: 100%;
				background-color: hsl(0deg 0% 98%);
			}
			ul {
				width: 100%;
				li {
					width: 100%;
					display: flex;
					justify-content: space-between;
					a {
						// width: 100%;
						display: flex;
						align-items: center;
					}
					svg {
						padding: 0.5rem 1rem;
					}
				}
			}
			&.navigation_opened {
				left: 0;
			}
		}
	}
}
</style>
