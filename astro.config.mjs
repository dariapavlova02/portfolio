import { defineConfig } from "astro/config";
import tailwindcss from "@tailwindcss/vite";

import sitemap from "@astrojs/sitemap";

export default defineConfig({
	site: "https://dariapavlova.me",

	devToolbar: {
		enabled: false,
	},

	vite: {
		plugins: [tailwindcss()],
	},

	integrations: [sitemap()],
});
