export const state = (context) => ({
	domain: 'https://argentinadiary.com',
	projectId: '17qu8ckk',
	navigation: {},
	modal: {
		isEnabled: false,
		data: null,
	},

	metaHead: null,
})

export const getters = {
	metaHead: (state) => state.metaHead,
	navigation: (state) => state.navigation,
	modal: (state) => state.modal,
	domain: (state) => state.domain,
}

export const mutations = {
	setMeta(state, value) {
		state.metaHead = value
	},
	setNavigation(state, payload) {
		state.navigation = payload
	},
	setModal(state, value) {
		state.modal = {
			isEnabled: value.isEnabled,
			data: value.data,
		}
	},
}

export const actions = {
	bindModal(context, value) {
		context.commit('setModal', value)
	},
	async metaTags({ state, commit, app }, { type, fetch }) {
		const metaData = await fetch.metaTags
		const lang = this.$i18n.localeProperties.code
		const image = `https://cdn.sanity.io/images/${state.projectId}/production/${metaData.image === undefined ? '' : metaData.image.slice(6, metaData.image.length - 4)}.jpg?auto=metaData`
		const head = {
			htmlAttrs: { lang },
			title: metaData.title,
			link: [],
			meta: [],
		}
		// canonical link
		let canonical
		if (type === 'index') {
			canonical = `${state.domain}/`
			head.link.push(
				...[
					{ hid: 'alternate', rel: 'alternate', href: `${state.domain}/ru/`, hreflang: 'ru' },
					{ hid: 'alternate', rel: 'alternate', href: `${state.domain}/`, hreflang: 'x-default' },
				],
			)
		} else if (type === 'page') {
			canonical = `${state.domain}/${fetch.languages.filter((el) => el.lang === 'ua')[0].uid}/`
			head.link.push(
				...[
					{ hid: 'alternate', rel: 'alternate', href: `${state.domain}/ru/${fetch.languages.filter((el) => el.lang === 'ru')[0].uid}/`, hreflang: 'ru' },
					{ hid: 'alternate', rel: 'alternate', href: `${state.domain}/${fetch.languages.filter((el) => el.lang === 'ua')[0].uid}/`, hreflang: 'x-default' },
				],
			)
		} else {
			canonical = `${state.domain}${this.localePath(type, 'ua')}${fetch.languages.filter((el) => el.lang === 'ua')[0].uid}/`
			head.link.push(
				...[
					{ hid: 'alternate', rel: 'alternate', href: `${state.domain}${this.localePath(type, 'ru')}${fetch.languages.filter((el) => el.lang === 'ru')[0].uid}/`, hreflang: 'ru' },
					{ hid: 'alternate', rel: 'alternate', href: `${state.domain}${this.localePath(type, 'ua')}${fetch.languages.filter((el) => el.lang === 'ua')[0].uid}/`, hreflang: 'x-default' },
				],
			)
		}
		head.link.push({ hid: 'canonical', rel: 'canonical', href: canonical })
		head.meta.push({ hid: 'og:url', name: 'og:url', content: canonical })
		head.meta.push(
			...[
				{ hid: 'robots', name: 'robots', content: 'follow' },
				{ hid: 'description', name: 'description', content: metaData.description },
				// facebook
				{ hid: 'og:type', property: 'og:type', content: '' },
				{ hid: 'og:url', property: 'og:url', content: canonical },
				{ hid: 'og:title', property: 'og:title', content: metaData.title },
				{ hid: 'og:description', property: 'og:description', content: metaData.description },
				{ hid: 'og:image', property: 'og:image', content: image },
				// twitter
				{ hid: 'twitter:card', name: 'twitter:card', content: image },
			],
		)
		await commit('setMeta', head)
	},
	setLaguageSwitcher({ dispatch }, { type, langs }) {
		dispatch('i18n/setRouteParams', {
			ru: { [type]: langs.filter((el) => el.lang === 'ru')[0].uid },
			ua: { [type]: langs.filter((el) => el.lang === 'ua')[0].uid },
		})
	},
}
