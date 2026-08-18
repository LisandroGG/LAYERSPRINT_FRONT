import path from "node:path";
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

export default defineConfig({
	plugins: [react(), tailwindcss()],
	base: "./",

	resolve: {
		alias: {
			"@components": path.resolve(import.meta.dirname, "src/components"),
			"@pages": path.resolve(import.meta.dirname, "src/pages"),
			"@routes": path.resolve(import.meta.dirname, "src/routes"),
			"@redux": path.resolve(import.meta.dirname, "src/redux"),
			"@hooks": path.resolve(import.meta.dirname, "src/hooks"),
			"@api": path.resolve(import.meta.dirname, "src/api"),
			"@utils": path.resolve(import.meta.dirname, "src/utils"),
		},
	},
});
