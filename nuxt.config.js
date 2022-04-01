export default {
	// Target: https://go.nuxtjs.dev/config-target
	target: 'static',
	components: ['~/components/forms', '~/components/global', '~/components/items', '~/components/local', '~/components/sections'],
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
	plugins: [],

	// Auto import components: https://go.nuxtjs.dev/config-components

	// Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
	buildModules: [
		// https://go.nuxtjs.dev/eslint
		'@nuxtjs/eslint-module',
		'@nuxt/image',
		// https://go.nuxtjs.dev/tailwindcss
		'@nuxtjs/tailwindcss',
		'@nuxtjs/fontawesome',
	],

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
		baseUrl: 'localhost:3000/',
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
			'blog/_article': {
				ru: '/novosti/:article?',
				ua: '/novunu/:article?',
			},
			'aboutArgentina/index': {
				ru: '/pro-argentiny',
				ua: '/pro-argentuny',
			},
			'aboutArgentina/_argentina': {
				ru: '/pro-argentiny/:argentina?',
				ua: '/pro-argentuny/:argentina?',
			},
			'tourism/index': {
				ru: '/tyrizm',
				ua: '/tyruzm',
			},
			'tourism/_index': {
				ru: '/tyrizm/:tourism?',
				ua: '/tyruzm/:tourism?',
			},
			'immigration/_immigration': {
				ru: '/imigracija/:immigration?',
				ua: '/migraciija/:immigration?',
			},
			'immigration/_index': {
				ru: '/imigracija',
				ua: '/migraciija',
			},
			'services/index': {
				ru: '/uslugi',
				ua: '/poslygu',
			},
			'services/_service': {
				ru: '/uslugi/:service?',
				ua: '/poslygu/:service?',
			},
			_page: {
				ru: '/:page?',
				ua: '/:page?',
			},
		},
	},

	fontawesome: {
		icons: {
			solid: ['faPhone', 'faEnvelope', 'faLongArrowAltRight', 'faArrowRight', 'faThumbsUp', 'faLock', 'faUsers'],
			regular: ['faClock', 'faEnvelope'],
			light: [],
			duotone: [],
			brands: ['faFacebook', 'faInstagram', 'faYoutube'],
		},
	},

	// Modules: https://go.nuxtjs.dev/config-modules
	modules: ['@nuxtjs/i18n'],

	// Build Configuration: https://go.nuxtjs.dev/config-build
	build: {},
}
