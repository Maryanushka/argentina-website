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
		screens: {
			'sm': '640px',
			// => @media (min-width: 640px) { ... }

			'md': '768px',
			// => @media (min-width: 768px) { ... }

			'lg': '1024px',
			// => @media (min-width: 1024px) { ... }

			'xl': '1280px',
			// => @media (min-width: 1280px) { ... }

			// '2xl': '1536px',
			// => @media (min-width: 1536px) { ... }
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
