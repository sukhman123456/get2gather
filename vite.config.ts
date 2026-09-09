// @lovable.dev/vite-tanstack-config already includes the following — do NOT add them manually
// or the app will break with duplicate plugins:
//   - TanStack devtools (dev-only, first), tanstackStart, viteReact, tailwindcss, tsConfigPaths,
//     nitro (build-only using cloudflare as a default target), VITE_* env injection, @ path alias,
//     React/TanStack dedupe, error logger plugins, and sandbox detection (port/host/strictPort).
// You can pass additional config via defineConfig({ vite: { ... }, etc... }) if needed.
import { defineConfig } from "@lovable.dev/vite-tanstack-config";
import fs from "node:fs";
import path from "node:path";

function copyUploadsPlugin() {
  return {
    name: "copy-uploads-plugin",
    configResolved() {
      const brainDir = "C:\\Users\\hp\\.gemini\\antigravity-ide\\brain\\71d61331-22d8-463e-b147-42961e175ca7";
      const userUploadDir = path.join(brainDir, ".user_uploaded");
      const targetDir = path.resolve("./public/uploads");
      const mappings = [
        { src: path.join(userUploadDir, "media_1788983838347.jpg"), dest: "gtg-mocktail-drink.jpg" },
        { src: path.join(userUploadDir, "media_1788983838669.jpg"), dest: "gtg-breakfast-poster.jpg" },
        { src: path.join(userUploadDir, "media_1788983838978.jpg"), dest: "gtg-menu-page-2.jpg" },
        { src: path.join(userUploadDir, "media_1788983839077.jpg"), dest: "gtg-party-celebration.jpg" },
        { src: path.join(userUploadDir, "media_1788983839409.jpg"), dest: "gtg-coffee-cappuccino.jpg" },
        { src: path.join(brainDir, "hero_luxury_ambience_1788987004078.jpg"), dest: "hero-luxury-ambience.jpg" },
      ];
      for (const m of mappings) {
        const s = m.src;
        const d = path.join(targetDir, m.dest);
        try {
          if (fs.existsSync(s)) {
            fs.copyFileSync(s, d);
          }
        } catch (e) {
          console.error("Failed to copy image", e);
        }
      }

      // Remove all wrong restaurant files (media_178895* and media_178897*)
      try {
        const files = fs.readdirSync(targetDir);
        for (const f of files) {
          if (f.startsWith("media_178895") || f.startsWith("media_178897")) {
            fs.unlinkSync(path.join(targetDir, f));
          }
        }
      } catch (e) {
        console.error("Failed to clean wrong files", e);
      }
    },
  };
}

export default defineConfig({
  vite: {
    plugins: [copyUploadsPlugin()],
  },
  tanstackStart: {
    // Redirect TanStack Start's bundled server entry to src/server.ts (our SSR error wrapper).
    // nitro/vite builds from this
    server: { entry: "server" },
  },
});

