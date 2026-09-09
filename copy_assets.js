import fs from "fs";
import path from "path";

const uploadsDir = path.resolve("public/uploads");
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

const assetsDir = path.resolve("src/assets");
if (!fs.existsSync(assetsDir)) {
  fs.mkdirSync(assetsDir, { recursive: true });
}

const brainUserUploads = "C:/Users/hp/.gemini/antigravity-ide/brain/71d61331-22d8-463e-b147-42961e175ca7/.user_uploaded";

const mappings = [
  { src: "media_1788982945909.jpg", dests: ["public/uploads/official-logo.jpg", "src/assets/official-logo.jpg", "public/logo.jpg"] },
  { src: "media_1788981784318.jpg", dests: ["public/uploads/gurdaspur-cafe-ceiling.jpg", "src/assets/gurdaspur-cafe-ceiling.jpg"] },
  { src: "media_1788981784465.jpg", dests: ["public/uploads/gurdaspur-dining-customer.jpg", "src/assets/gurdaspur-dining-customer.jpg"] },
  { src: "media_1788981784518.jpg", dests: ["public/uploads/gurdaspur-mandala-wall.jpg", "src/assets/gurdaspur-mandala-wall.jpg"] },
  { src: "media_1788981784533.jpg", dests: ["public/uploads/gurdaspur-bamboo-garden.jpg", "src/assets/gurdaspur-bamboo-garden.jpg"] },
];

for (const m of mappings) {
  const srcPath = path.join(brainUserUploads, m.src);
  if (fs.existsSync(srcPath)) {
    for (const dest of m.dests) {
      fs.copyFileSync(srcPath, path.resolve(dest));
      console.log(`Copied ${m.src} -> ${dest}`);
    }
  } else {
    console.warn(`Source not found: ${srcPath}`);
  }
}
