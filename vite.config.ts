import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';
import tailwindcss from "tailwindcss";

export default defineConfig({
	plugins: [sveltekit()],
	css: {
		postcss: {
		  plugins: [
			tailwindcss,
		  ],
		},
	},
	resolve: {
		alias: {},
	},
	server: {
		hmr: {
			overlay: true,
		},
	},
	define: {},
	build: {
		minify: "terser",
    }
});
