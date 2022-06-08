import { createClient } from '@nuxtjs/sanity'
import fetch from 'node-fetch'
import { sitemapData } from './plugins/queries'

if (!globalThis.fetch) {
	globalThis.fetch = fetch
}
const configSanity = {
	projectId: '17qu8ckk',
	minimal: true,
	contentHepler: true,
	apiVersion: '2021-10-21',
	dataset: 'production',
}

const client = createClient(configSanity)

const sitemapGenerator = async function () {
	let data
	await client
		.fetch(sitemapData)
		.then((results) => {
			data = results
		})
		.catch((error) => {
			console.log('log error', error)
		})
	const sitemaproute = []
	data.forEach((doc) => {
		switch (doc.type) {
			case 'page':
				sitemaproute.push({
					url: `/${doc.uid}/`,
					changefreq: 'monthly',
					priority: 1,
					lastmod: doc.updated,
				})
				break

			default:
				break
		}

		switch (doc.type) {
			case 'page':
				sitemaproute.push({
					url: `${doc.lang === 'ua' ? '/' : '/ru/'}${doc.uid}/`,
					changefreq: 'monthly',
					priority: 1,
					lastmod: doc.updated,
				})
				break
			case 'argentina':
				sitemaproute.push({
					url: `${doc.lang === 'ua' ? '/' : '/ru/'}${doc.lang === 'ua' ? 'pro-argentuny/' : 'pro-argentiny/'}${doc.uid}`,
					changefreq: 'monthly',
					priority: 1,
					lastmod: doc.updated,
				})
				break
			case 'artcile':
				sitemaproute.push({
					url: `${doc.lang === 'ua' ? '/' : '/ru/'}${doc.lang === 'ua' ? 'novunu/' : 'novosti/'}${doc.uid}`,
					changefreq: 'monthly',
					priority: 1,
					lastmod: doc.updated,
				})
				break
			case 'tourism':
				sitemaproute.push({
					url: `${doc.lang === 'ua' ? '/' : '/ru/'}${doc.lang === 'ua' ? 'tyruzm/' : 'tyrizm/'}${doc.uid}`,
					changefreq: 'monthly',
					priority: 1,
					lastmod: doc.updated,
				})
				break
			case 'migration':
				sitemaproute.push({
					url: `${doc.lang === 'ua' ? '/' : '/ru/'}${doc.lang === 'ua' ? 'migraciija/' : 'imigracija/'}${doc.uid}`,
					changefreq: 'monthly',
					priority: 1,
					lastmod: doc.updated,
				})
				break
			case 'service':
				sitemaproute.push({
					url: `${doc.lang === 'ua' ? '/' : '/ru/'}${doc.lang === 'ua' ? 'poslygu/' : 'uslugi/'}${doc.uid}`,
					changefreq: 'monthly',
					priority: 1,
					lastmod: doc.updated,
				})
				break
			case 'home':
				sitemaproute.push({
					url: `${doc.lang}`,
					changefreq: 'monthly',
					priority: 1,
					lastmod: doc.updated,
				})
				break
		}
	})

	return sitemaproute
}
const routeGenerator = async function () {
	const route = []
	let data
	await client
		.fetch(sitemapData)
		.then((results) => {
			data = results
		})
		.catch((error) => {
			console.log('log error', error)
		})

	console.log(data)
	data.forEach((doc) => {
		switch (doc.type) {
			case 'page':
				route.push(`${doc.lang === 'ua' ? '/' : '/ru/'}${doc.uid}/`)
				break
			case 'argentina':
				route.push(`${doc.lang === 'ua' ? '/' : '/ru/'}${doc.lang === 'ua' ? 'pro-argentuny/' : 'pro-argentiny/'}${doc.uid}`)
				break
			case 'article':
				route.push(`${doc.lang === 'ua' ? '/' : '/ru/'}${doc.lang === 'ua' ? 'novunu/' : 'novosti/'}${doc.uid}`)
				break
			case 'tourism':
				route.push(`${doc.lang === 'ua' ? '/' : '/ru/'}${doc.lang === 'ua' ? 'tyruzm/' : 'tyrizm/'}${doc.uid}`)
				break
			case 'migration':
				route.push(`${doc.lang === 'ua' ? '/' : '/ru/'}${doc.lang === 'ua' ? 'migraciija/' : 'imigracija/'}${doc.uid}`)
				break
			case 'service':
				route.push(`${doc.lang === 'ua' ? '/' : '/ru/'}${doc.lang === 'ua' ? 'poslygu/' : 'uslugi/'}${doc.uid}`)
				break
			case 'home':
				route.push(`${doc.lang}`)
				break
		}
	})
	// console.log('route', route)
	return route
}
export default {
	// Target: https://go.nuxtjs.dev/config-target
	target: 'static',
	components: ['~/components/forms', '~/components/global', '~/components/items', '~/components/sections'],
	// Global page headers: https://go.nuxtjs.dev/config-head
	head: {
		title: 'argentina',
		htmlAttrs: {
			lang: 'en',
		},
		meta: [{ charset: 'utf-8' }, { name: 'viewport', content: 'width=device-width, initial-scale=1' }, { hid: 'description', name: 'description', content: '' }, { name: 'format-detection', content: 'telephone=no' }],
		link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
	},

	// Global CSS: https://go.nuxtjs.dev/config-css
	css: ['~/assets/main.scss', '@fortawesome/fontawesome-svg-core/styles.css'],
	// Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
	plugins: [{ src: '@/plugins/vee-validate.js' }, { src: `~/plugins/lazysizes.client.js` }],

	// Auto import components: https://go.nuxtjs.dev/config-components
	// Modules: https://go.nuxtjs.dev/config-modules
	// modules: ['@nuxtjs/i18n', '@nuxtjs/sanity/module'],
	modules: ['@nuxtjs/i18n', '@nuxtjs/sanity/module', '@nuxtjs/sitemap'],
	// Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
	buildModules: [
		// https://go.nuxtjs.dev/eslint
		'@nuxtjs/eslint-module',
		'@nuxt/image',
		// https://go.nuxtjs.dev/tailwindcss
		'@nuxtjs/tailwindcss',
		'@nuxtjs/fontawesome',
	],

	router: {
		trailingSlash: true,
	},

	vue: {
		config: {
			devtools: true,
		},
	},

	image: {
		// The screen sizes predefined by `@nuxt/image`:
		screens: {
			xs: 320,
			sm: 640,
			md: 768,
			lg: 1024,
			xl: 1280,
			xxl: 1536,
			'2xl': 1536,
		},
	},

	i18n: {
		defaultLocale: 'ua',
		baseUrl: 'https://argentinadiary.com',
		lazy: true,
		langDir: 'i18n/',
		detectBrowserLanguage: false,
		seo: false,
		parsePages: false, // Disable babel parsing
		locales: [
			{
				code: 'ru',
				name: 'рус',
				file: 'ru.js',
				iso: 'ru-RU',
			},
			{
				isCatchallLocale: true,
				code: 'ua',
				name: 'укр',
				file: 'ua.js',
				iso: 'uk-UA',
			},
		],
		pages: {
			'blog/index': {
				ru: '/novosti',
				ua: '/novunu',
			},
			'blog/_article_slug': {
				ru: '/novosti/:article_slug?',
				ua: '/novunu/:article_slug?',
			},
			'argentina/index': {
				ru: '/pro-argentiny',
				ua: '/pro-argentuny',
			},
			'argentina/_argentina_slug': {
				ru: '/pro-argentiny/:argentina_slug?',
				ua: '/pro-argentuny/:argentina_slug?',
			},
			'tourism/index': {
				ru: '/tyrizm',
				ua: '/tyruzm',
			},
			'tourism/_tourism_slug': {
				ru: '/tyrizm/:tourism_slug?',
				ua: '/tyruzm/:tourism_slug?',
			},
			'migration/index': {
				ru: '/imigracija',
				ua: '/migraciija',
			},
			'migration/_migration_slug': {
				ru: '/imigracija/:migration_slug?',
				ua: '/migraciija/:migration_slug?',
			},
			'service/index': {
				ru: '/uslugi',
				ua: '/poslygu',
			},
			'service/_service_slug': {
				ru: '/uslugi/:service_slug?',
				ua: '/poslygu/:service_slug?',
			},
			contacts: {
				ru: '/kontakty',
				ua: '/kontaktu',
			},
		},
	},

	fontawesome: {
		icons: {
			solid: ['faAngleRight', 'faPhone', 'faEnvelope', 'faLongArrowAltRight', 'faArrowRight', 'faArrowLeft', 'faThumbsUp', 'faLock', 'faUsers', 'faBars', 'faTimes', 'faChevronRight', 'faEllipsisV', 'faPlayCircle', 'faPlay', 'faHandHoldingMedical', 'faPassport', 'faSmile', 'faCoins', 'faHeart', 'faGlobeAmericas', 'faSun', 'faMapMarkerAlt', 'faBaby', 'faUserShield', 'faMountain', 'faHouse', 'faAddressCard', 'faCalculator', 'faFileSignature', 'faLanguage'],
			regular: ['faClock', 'faEnvelope', 'faPlayCircle'],
			brands: ['faFacebook', 'faInstagram', 'faYoutube', 'faGratipay', 'faTelegram', 'faWhatsapp', 'faBtc'],
		},
	},

	sanity: {
		projectId: '17qu8ckk',
		minimal: true,
		contentHepler: true,
		apiVersion: '2021-10-21',
		dataset: 'production',
	},

	generate: {
		// only pass the urls to the generate function
		// routes: routes.map(route => route.url)
		fallback: '404.html',
		crawler: false,
		// routes: routes.map((route) => route.url),
		routes() {
			return routeGenerator()
		},
	},
	sitemap: {
		// pass the sitemap objects as is to the sitemap module
		hostname: 'https://argentinadiary.com/',
		// exclude: ['sitemap'],
		trailingSlash: true,
		routes() {
			return sitemapGenerator()
		},
	},

	// Build Configuration: https://go.nuxtjs.dev/config-build
	build: {
		// vee validate
		transpile: ['vee-validate/dist/rules'],
		// lazysizes
		extend(config, { isClient, loaders: { vue } }) {
			vue.transformAssetUrls.img = ['data-src', 'src']
			vue.transformAssetUrls.source = ['data-srcset', 'srcset']
		},
	},
}
