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
					DEFAULT: "var(--canvas-bg)",
					base: "var(--canvas-bg)",
					bg: "var(--canvas-bg)",
				},
				surface: {
					DEFAULT: "var(--surface-card)",
					card: "var(--surface-card)",
					elevated: "var(--surface-elevated)",
				},
				border: {
					DEFAULT: "var(--border-subtle)",
					subtle: "var(--border-subtle)",
					hover: "var(--border-hover)",
				},
				text: {
					DEFAULT: "var(--text-primary)",
					primary: "var(--text-primary)",
					muted: "var(--text-muted)",
					dim: "var(--text-dim)",
				},
				accent: {
					DEFAULT: "var(--accent-primary)",
					primary: "var(--accent-primary)",
					glow: "var(--accent-glow)",
				},
				status: {
					live: "var(--status-live)",
				},
				// Direct aliases for flat utility naming (e.g., text-muted, text-primary, border-subtle)
				'canvas-bg': "var(--canvas-bg)",
				'surface-card': "var(--surface-card)",
				'surface-elevated': "var(--surface-elevated)",
				'border-subtle': "var(--border-subtle)",
				'border-hover': "var(--border-hover)",
				'text-primary': "var(--text-primary)",
				'text-muted': "var(--text-muted)",
				'text-dim': "var(--text-dim)",
				'primary': "var(--text-primary)",
				'muted': "var(--text-muted)",
				'dim': "var(--text-dim)",
				'accent-primary': "var(--accent-primary)",
				'accent-glow': "var(--accent-glow)",
				'status-live': "var(--status-live)",
			},
			boxShadow: {
				ambient: "0 10px 30px rgba(0, 0, 0, 0.4)",
				card: "0 4px 20px rgba(0, 0, 0, 0.3)",
			},
		},
	},
	plugins: [],
}
