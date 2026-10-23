/** @type {import('tailwindcss').Config} */
export default {
	content: ['./index.html','./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
	theme: {
		extend: {
			fontFamily: {
				sans: ["Plus Jakarta Sans", "Inter", "sans-serif"],
				grotesk: ["Space Grotesk", "sans-serif"],
				mono: ["JetBrains Mono", "monospace"],
			},
			colors: {
				canvas: {
					DEFAULT: "rgb(var(--canvas-bg-rgb) / <alpha-value>)",
					base: "rgb(var(--canvas-bg-rgb) / <alpha-value>)",
					bg: "rgb(var(--canvas-bg-rgb) / <alpha-value>)",
				},
				surface: {
					DEFAULT: "rgb(var(--surface-card-rgb) / <alpha-value>)",
					card: "rgb(var(--surface-card-rgb) / <alpha-value>)",
					elevated: "rgb(var(--surface-elevated-rgb) / <alpha-value>)",
				},
				border: {
					DEFAULT: "var(--border-subtle)",
					subtle: "var(--border-subtle)",
					hover: "var(--border-hover)",
				},
				text: {
					DEFAULT: "rgb(var(--text-primary-rgb) / <alpha-value>)",
					primary: "rgb(var(--text-primary-rgb) / <alpha-value>)",
					muted: "var(--text-muted)",
					dim: "var(--text-dim)",
				},
				accent: {
					DEFAULT: "rgb(var(--accent-primary-rgb) / <alpha-value>)",
					primary: "rgb(var(--accent-primary-rgb) / <alpha-value>)",
					hover: "var(--accent-hover)",
					glow: "var(--accent-glow)",
				},
				status: {
					live: "rgb(var(--status-live-rgb) / <alpha-value>)",
				},
				// Direct aliases for flat utility naming (e.g., text-muted, text-primary, border-subtle)
				'canvas-bg': "rgb(var(--canvas-bg-rgb) / <alpha-value>)",
				'surface-card': "rgb(var(--surface-card-rgb) / <alpha-value>)",
				'surface-elevated': "rgb(var(--surface-elevated-rgb) / <alpha-value>)",
				'border-subtle': "var(--border-subtle)",
				'border-hover': "var(--border-hover)",
				'text-primary': "rgb(var(--text-primary-rgb) / <alpha-value>)",
				'text-muted': "var(--text-muted)",
				'text-dim': "var(--text-dim)",
				'primary': "rgb(var(--text-primary-rgb) / <alpha-value>)",
				'muted': "var(--text-muted)",
				'dim': "var(--text-dim)",
				'accent-primary': "rgb(var(--accent-primary-rgb) / <alpha-value>)",
				'accent-hover': "var(--accent-hover)",
				'accent-glow': "var(--accent-glow)",
				'status-live': "rgb(var(--status-live-rgb) / <alpha-value>)",
			},
			borderColor: {
				DEFAULT: "var(--border-subtle)",
			},
			ringColor: {
				DEFAULT: "rgb(var(--accent-primary-rgb) / 0.5)",
			},
			boxShadow: {
				ambient: "0 10px 30px rgba(0, 0, 0, 0.4)",
				card: "0 4px 20px rgba(0, 0, 0, 0.3)",
			},
		},
	},
	plugins: [],
}
