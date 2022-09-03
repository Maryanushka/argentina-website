<template>
	<header class="header fixed w-full top-0 z-20 bg-white" :class="{ fill: scrollPosition > 500 && mobile > 768 }">
		<div class="container flex relative h-full items-center md:items-start">
			<font-awesome-icon class="text-darkBlue md:hidden text-xl z-30 h-4 w-4" :icon="isNavigationOpened ? ['fa', 'arrow-left'] : ['fa', 'bars']" @click="openMenu" />

			<div class="logo md:relative xl:w-1/4 absolute h-28">
				<n-link :to="localePath('index')" class="absolute z-30 h-full flex">
					<nuxt-img src="logo_cut.png" />
				</n-link>
			</div>
			<div class="flex flex-col xl:w-3/4 w-full items-end relative z-10 wrapper h-full justify-between">
				<div class="info flex flex-wrap justify-end md:items-center items-start w-full px-4 pl-4 md:pr-16 lg:pr-32" :class="{ isContactBlockOpened: isContactBlockOpened && mobile < 768 }">
					<a class="xl:my-9 xl:ml-12 my-2 w-full md:w-auto flex items-center" href="mailto:dnevnikargentina@gmail.com">
						<font-awesome-icon class="xl:text-blue md:text-yellow text-blue h-4 w-4" :icon="['far', 'envelope']" />
						<span class="xl:text-darkBlue xl:hover:text-blue hover:text-yellow md:text-white text-darkBlue ml-2 font-light text-sm">dnevnikargentina@gmail.com</span>
					</a>
					<span class="xl:my-9 md:my-4 md:ml-12 my-2 w-full md:w-auto flex items-center">
						<font-awesome-icon class="xl:text-blue md:text-yellow text-blue h-4 w-4" :icon="['far', 'clock']" />
						<span class="xl:text-darkBlue md:text-white text-darkBlue ml-2 font-light text-sm">Пн–Сб: 7:00–19:00</span>
					</span>
					<div class="phones xl:my-9 md:my-4 md:ml-12 my-2 w-full md:w-auto flex">
						<a class="mx-2 xl:text-blue md:text-yellow text-blue hover:text-darkBlue" href="https://t.me/Viktor_arg" target="_blank">
							<font-awesome-icon class="w-5 h-5 text-lg" :icon="['fab', 'telegram']" />
						</a>
					</div>
					<LangSwitcher v-if="mobile > 768" />
				</div>
				<LangSwitcher v-if="mobile < 768" />
				<nav class="flex justify-end md:items-center items-start w-full relative" :class="{ navigation_opened: isNavigationOpened && mobile < 768 }">
					<ul v-if="getNavigation" class="flex md:justify-items-end md:items-center md:flex-row flex-col">
						<li v-for="(link, i) in getNavigation" :key="link.uid" class="relative py-4 flex flex-wrap" :class="{ active_second_l: activeSecondLvl && activeSecondPlace === link.place }" @click="openMenu">
							<n-link class="md:text-white text-darkBlue hover:text-yellow font-bold px-6 mx-1" :to="`${normalizedLocale}${link.uid}/`">{{ link.title }}</n-link>
							<font-awesome-icon v-if="i !== getNavigation - 1 && i !== getNavigation - 2" class="text-darkBlue hover:text-yellow md:hidden h-4 w-4 transition-all transform" :icon="['fa', 'chevron-right']" :class="{ 'rotate-90': activeSecondLvl && activeSecondPlace === link.place }" @click="openSecondLvl(link.place)" />
							<!-- second lvl argentina -->
							<template v-if="getArgentinaLinks && link.place === 1">
								<ul class="md:absolute md:top-14 md:mt-0 second_lvl">
									<li v-for="argentinaLink in getArgentinaLinks" :key="argentinaLink.uid" class="flex">
										<n-link class="md:text-blue md:bg-white w-full text-darkBlue hover:text-darkBlue px-6 md:py-4 whitespace-nowrap md:text-base" :to="`${localePath('argentina')}${argentinaLink.uid}/`">{{ argentinaLink.title }}</n-link>
									</li>
								</ul>
							</template>
							<!-- second lvl migration -->
							<template v-if="getMigrationLinks && link.place === 2">
								<ul class="md:absolute md:top-14 md:mt-0 second_lvl">
									<li v-for="migrationLink in getMigrationLinks" :key="migrationLink.uid" class="flex">
										<n-link class="md:text-blue md:bg-white w-full text-darkBlue hover:text-darkBlue px-6 md:py-4 whitespace-nowrap md:text-base" :to="`${localePath('migration')}${migrationLink.uid}/`">{{ migrationLink.title }}</n-link>
									</li>
								</ul>
							</template>
							<!-- second lvl service -->
							<template v-if="getServicesLinks && link.place === 3">
								<ul class="md:absolute md:top-14 md:mt-0 second_lvl">
									<li v-for="serviceLink in getServicesLinks" :key="serviceLink.uid" class="flex">
										<n-link class="md:text-blue md:bg-white w-full text-darkBlue hover:text-darkBlue px-6 md:py-4 whitespace-nowrap md:text-base" :to="`${localePath('service')}${serviceLink.uid}/`">{{ serviceLink.title }}</n-link>
									</li>
								</ul>
							</template>
							<!-- second lvl service -->
							<template v-if="getTourismLinks && link.place === 4">
								<ul class="md:absolute md:top-14 md:mt-0 second_lvl">
									<li v-for="tourismLink in getTourismLinks" :key="tourismLink.uid" class="flex">
										<n-link class="md:text-blue md:bg-white w-full text-darkBlue hover:text-darkBlue px-6 md:py-4 whitespace-nowrap md:text-base" :to="`${localePath('tourism')}${tourismLink.uid}/`">{{ tourismLink.title }}</n-link>
									</li>
								</ul>
							</template>
						</li>
					</ul>
				</nav>
			</div>

			<font-awesome-icon class="text-darkBlue md:hidden text-2xl z-30 h-4 w-4" :icon="isContactBlockOpened ? ['fa', 'times'] : ['fa', 'ellipsis-v']" @click="infoOpened" />
		</div>
	</header>
</template>
<script>
import { menu } from '@/plugins/queries'

export default {
	data: () => ({
		scrollPosition: null,
		mobile: null,
		isNavigationOpened: false,
		isContactBlockOpened: false,
		pageType: 'page',
		activeSecondLvl: false,
		activeSecondPlace: 0,
	}),
	async fetch() {
		await this.$sanity
			.fetch(menu)
			.then((data) => {
				this.$store.commit('setNavigation', data)
			})
			.catch((err) => {
				console.log(err)
			})
	},
	computed: {
		normalizedLocale() {
			return this.$i18n.localeProperties.code === 'ua' ? '/' : '/ru/'
		},
		getNavigationFormStore() {
			return this.$store.getters.navigation
		},
		getNavigation() {
			return this.getNavigationFormStore.filter((el) => el.lang === this.$i18n.localeProperties.code && el.type === this.pageType).sort((a, b) => a.place - b.place)
		},
		getArgentinaLinks() {
			return this.getNavigationFormStore.filter((el) => el.lang === this.$i18n.localeProperties.code && el.type === 'argentina')
		},
		getMigrationLinks() {
			return this.getNavigationFormStore.filter((el) => el.lang === this.$i18n.localeProperties.code && el.type === 'migration')
		},
		getTourismLinks() {
			return this.getNavigationFormStore.filter((el) => el.lang === this.$i18n.localeProperties.code && el.type === 'tourism')
		},
		getServicesLinks() {
			return this.getNavigationFormStore.filter((el) => el.lang === this.$i18n.localeProperties.code && el.type === 'service')
		},
	},
	mounted() {
		this.mobile = window.innerWidth
		window.addEventListener('scroll', this.updateScroll)
		window.addEventListener('resize', this.resize)
	},
	methods: {
		infoOpened() {
			this.isContactBlockOpened = !this.isContactBlockOpened
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
		openSecondLvl(place) {
			this.activeSecondLvl = !this.activeSecondLvl
			this.activeSecondPlace = place
		},
		setLocalStorage() {
			window.localStorage.setItem('navigation', JSON.stringify(this.$store.getters.navigation))
		},
	},
}
</script>
<style lang="scss" scoped>
.header {
	.logo {
		&::after {
			position: absolute;
			width: 250%;
			height: 100%;
			display: block;
			content: '';
			transition: width 0.3s ease-out;
			left: -150%;
			clip-path: polygon(0 0, 100% 0, 91% 100%, 0% 100%);
			background-color: theme('colors.blue');
		}
		a {
			min-width: 15rem;
			display: flex;
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
		.second_lvl {
			left: 50%;
			transform: translateX(-50%);
			opacity: 0;
			height: 0;
		}
		ul {
			li {
				overflow: hidden;
				&::after {
					content: '';
					width: 1px;
					background-color: theme('colors.gray.200');
					height: 15px;
					top: 50%;
					position: absolute;
					right: 0;
					transform: translateY(-50%);
				}
				&:last-child {
					&::after {
						display: none;
					}
				}
				&:hover {
					overflow: visible;
					.second_lvl {
						animation: open_second_lvl 0.2s ease-in 1 forwards;
					}
				}
			}
		}
	}
	.info {
		width: 90%;
	}
	&.fill {
		.logo {
			display: none;
		}
		.wrapper {
			width: 100%;
			nav {
				justify-content: center;
				&::after {
					width: 200%;
					right: -50%;
				}
			}
			.info {
				display: none;
			}
		}
	}
}
@media (min-width: 1228px) {
	.header {
		nav {
			&::after {
				background-color: theme('colors.blue');
				width: 156%;
			}
		}
	}
}
@media (min-width: 1024px) and (max-width: 1280px) {
	.header {
		.logo {
			height: 4rem;
			a {
				height: auto;
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
		.info {
			width: calc(100% - 15rem);
		}
	}
}
@media (max-width: 768px) {
	.header {
		height: 10vh;
		align-items: center;
		display: flex;
		padding: 1rem;
		.lang {
			position: fixed;
			top: 1rem;
			right: 4rem;
		}
		.info {
			position: fixed;
			width: 80vw;
			right: 0;
			background-color: theme('colors.white');
			flex-direction: column;
			top: 10vh;
			transform: scale(0);
			z-index: 20;
			&.isContactBlockOpened {
				transform: scale(1);
			}
		}
		.logo {
			position: fixed;
			top: 0;
			height: 4rem;
			width: 10rem;
			left: 50%;
			transform: translateX(-50%);
			transition: 0.3s linear;
			z-index: 25;
			img {
				filter: initial;
				width: 100%;
			}
			&::after {
				background-color: transparent;
				clip-path: initial;
			}
			a {
				min-width: initial;
				width: 100%;
			}
		}
		nav {
			position: fixed;
			width: 100vw;
			height: 90.3vh;
			bottom: 0;
			top: 9.9vh;
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
					padding: 0.5rem 1rem;
					&::after {
						display: none;
					}
					a {
						// width: 100%;
						display: flex;
						font-size: 1.2rem;
						align-items: center;
					}
					svg {
						padding: 0.5rem 1rem;
					}
					.second_lvl {
						left: initial;
						transform: initial;
						height: 0;
						opacity: 0;
						padding-left: 2rem;
						li {
							padding: 0;
							position: relative;
							display: flex;
							justify-content: flex-start;
							align-items: center;
							&::before {
								content: '';
								width: 7px;
								height: 5px;
								border-radius: 40%;
								background-color: theme('colors.blue');
							}
							&:first-child {
								margin-top: 1rem;
							}
							&:last-child {
								margin-bottom: 1rem;
							}
							a {
								font-size: inherit;
								padding: 0.5rem 1rem;
							}
						}
					}
					&.active_second_l {
						.second_lvl {
							animation: open_second_lvl 0.2s ease-in 1 forwards;
							// height: auto;
							// opacity: 1;
						}
					}
				}
			}
			&.navigation_opened {
				left: 0;
			}
		}
	}
}
@media (max-width: 400px) {
	.header {
		.lang {
			right: 3rem;
		}
		.logo {
			top: 10px;
			height: 2.5rem;
		}
	}
}
@keyframes open_second_lvl {
	0% {
		height: 0;
		opacity: 0;
	}
	1% {
		height: 100%;
		opacity: 0;
	}
	100% {
		height: 100%;
		opacity: 1;
	}
}
</style>
