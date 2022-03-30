// const defaultTheme = require('tailwindcss/defaultTheme')
const colors = require('tailwindcss/colors')

module.exports = {
	purge: ['./ components/**/ *.{ vue, js }', './ layouts/**/ *.vue', './ pages/**/ *.vue', './ plugins/**/ *.{ js, ts }', './ nuxt.config.{ js, ts }'],
	darkMode: false, // or 'media' or 'class'
	// mode: 'jit',
	theme: {
		fontFamily: {
			sans: ['Montserrat'],
		},
		container: {
			center: true,
		},
		colors: {
			transparent: 'transparent',
			current: 'currentColor',
			blue: '#00B5F5',
			darkBlue: '#172646',
			yellow: '#F2E30C',
			black: colors.black,
			white: colors.white,
			gray: colors.gray,
		},
	},
	variants: {
		extend: {},
	},
	plugins: [],
}
