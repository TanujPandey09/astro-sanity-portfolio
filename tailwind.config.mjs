/** @type {import('tailwindcss').Config} */
export default {
	content: ['./index.html','./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
	theme: {
		extend: {
			fontFamily: {
				sans: ["Geist", "Plus Jakarta Sans", "Inter", "system-ui", "sans-serif"],
				grotesk: ["Space Grotesk", "Geist", "sans-serif"],
				mono: ["Geist Mono", "JetBrains Mono", "monospace"],
				geist: ["Geist", "sans-serif"],
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
					cyan: "var(--accent-cyan)",
				},
				status: {
					live: "rgb(var(--status-live-rgb) / <alpha-value>)",
				},
				ns: {
					blue: {
						600: "var(--blue-600, #2563EB)",
						700: "var(--blue-700, #1D4ED8)",
						50: "var(--blue-50, #EAF1FE)",
					},
					sky: {
						400: "var(--sky-400, #38BDF8)",
					},
					ink: "var(--ink, #0B111A)",
					"ink-2": "var(--ink-2, #121A26)",
					bg: "var(--bg, #F5F7FA)",
					surface: "var(--surface, #FFFFFF)",
					border: "var(--border, #E2E8F0)",
					muted: "var(--muted, #4B5565)",
					"dark-border": "var(--dark-border, #1F2A3A)",
					"dark-muted": "var(--dark-muted, #9AA6B8)",
				},
				dev: {
					canvas: "#FAFAFB",
					card: "#FFFFFF",
					elevated: "#F1F5F9",
					white: "#0F172A",
					slate: "#475569",
					dim: "#64748B",
					indigo: "#5E6AD2",
					cyan: "#334155",
					emerald: "#10B981",
					border: "rgba(15, 23, 42, 0.08)",
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
				'accent-cyan': "var(--accent-cyan)",
				'status-live': "rgb(var(--status-live-rgb) / <alpha-value>)",
			},
			borderColor: {
				DEFAULT: "var(--border-subtle)",
			},
			ringColor: {
				DEFAULT: "rgb(var(--accent-primary-rgb) / 0.5)",
			},
			boxShadow: {
				ambient: "0 12px 35px -8px rgba(15, 23, 42, 0.08)",
				card: "0 4px 20px -2px rgba(15, 23, 42, 0.05), 0 2px 6px -1px rgba(15, 23, 42, 0.02)",
			},
		},
	},
	plugins: [],
}
