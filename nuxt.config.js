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
	plugins: [{ src: '@/plugins/vee-validate.js' }, { src: `~/plugins/lazysizes.client.js` }],

	// Auto import components: https://go.nuxtjs.dev/config-components
	// Modules: https://go.nuxtjs.dev/config-modules
	modules: ['@nuxtjs/i18n', '@nuxtjs/sanity/module'],
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
			'services/index': {
				ru: '/uslugi',
				ua: '/poslygu',
			},
			'services/_service_slug': {
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
			solid: ['faPhone', 'faEnvelope', 'faLongArrowAltRight', 'faArrowRight', 'faArrowLeft', 'faThumbsUp', 'faLock', 'faUsers', 'faBars', 'faTimes', 'faChevronRight', 'faEllipsisV'],
			regular: ['faClock', 'faEnvelope'],
			light: [],
			duotone: [],
			brands: ['faFacebook', 'faInstagram', 'faYoutube'],
		},
	},

	sanity: {
		projectId: '17qu8ckk',
		minimal: true,
		contentHepler: true,
		apiVersion: '2021-10-21',
		dataset: 'production',
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
