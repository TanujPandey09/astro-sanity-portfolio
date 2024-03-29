/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
	theme: {
		extend: {
			fontFamily: {
				Roboto: ["Roboto Slab", 'serif'],},

			backgroundColor:{
				buttonBg:"#424242"
			},
			colors:{
				primaryColor:"#ffffff",
				secondaryColor: "#ced6de",
			}
		},
	},
	plugins: [],
}
