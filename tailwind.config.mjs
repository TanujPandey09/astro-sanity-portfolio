/** @type {import('tailwindcss').Config} */
export default {
	content: ['./index.html','./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
	theme: {
		extend: {
			fontFamily: {
				Roboto: ["Roboto Slab", 'serif'],},

			backgroundColor:{
				buttonBg:"#424242",
				secondaryBg:"#040615",
				primaryColor:"#000000"
			},
			colors:{
				primaryColor:"#ffffff",
				secondaryColor: "#ced6de",
			},
			backgroundImage: {
				'job-pattern': "url('/img/SCUBE.webp')",
				
			  }
		},
	},
	plugins: [],
}
