const fs = require("fs");
const path = require("path");
const os = require("os");

const DATASET = path.join(os.homedir(), "Downloads", "archive (5)");
const DEST_PRODUCTS  = path.join(__dirname, "public/uploads/products");
const DEST_CATEGORIES = path.join(__dirname, "public/uploads/categories");

function getImages(folder, count = 2) {
  const dir = path.join(DATASET, folder);
  if (!fs.existsSync(dir)) { console.error(`❌ Not found: ${folder}`); return []; }
  return fs.readdirSync(dir)
    .filter(f => /\.(jpg|jpeg|png)$/i.test(f))
    .slice(0, count)
    .map(f => path.join(dir, f));
}

function copy(src, destName, destDir) {
  if (!src) return;
  fs.copyFileSync(src, path.join(destDir, destName));
  console.log(`✅ ${path.basename(src)}  →  ${destName}`);
}

// ── Products (2 images each, flat into products folder) ──────────────────────
const map = [
  // Men Shirts
  ["white_shirt",  "p_men_shirt_white_1.jpg",   "p_men_shirt_white_2.jpg"],
  ["blue_shirt",   "p_men_shirt_blue_1.jpg",    "p_men_shirt_blue_2.jpg"],
  ["black_shirt",  "p_men_shirt_black_1.jpg",   "p_men_shirt_black_2.jpg"],
  ["green_shirt",  "p_men_shirt_green_1.jpg",   "p_men_shirt_green_2.jpg"],
  // Men Pants
  ["black_pants",  "p_men_pants_black_1.jpg",   "p_men_pants_black_2.jpg"],
  ["blue_pants",   "p_men_pants_blue_1.jpg",    "p_men_pants_blue_2.jpg"],
  ["brown_pants",  "p_men_pants_brown_1.jpg",   "p_men_pants_brown_2.jpg"],
  ["green_pants",  "p_men_pants_green_1.jpg",   "p_men_pants_green_2.jpg"],
  ["red_pants",    "p_men_pants_red_1.jpg",     "p_men_pants_red_2.jpg"],
  ["white_pants",  "p_men_pants_white_1.jpg",   "p_men_pants_white_2.jpg"],
  // Men Shorts
  ["black_shorts", "p_men_shorts_black_1.jpg",  "p_men_shorts_black_2.jpg"],
  ["blue_shorts",  "p_men_shorts_blue_1.jpg",   "p_men_shorts_blue_2.jpg"],
  ["brown_shorts", "p_men_shorts_brown_1.jpg",  "p_men_shorts_brown_2.jpg"],
  ["green_shorts", "p_men_shorts_green_1.jpg",  "p_men_shorts_green_2.jpg"],
  ["white_shorts", "p_men_shorts_white_1.jpg",  "p_men_shorts_white_2.jpg"],
  // Women Dresses
  ["black_dress",  "p_women_dress_black_1.jpg", "p_women_dress_black_2.jpg"],
  ["blue_dress",   "p_women_dress_blue_1.jpg",  "p_women_dress_blue_2.jpg"],
  ["red_dress",    "p_women_dress_red_1.jpg",   "p_women_dress_red_2.jpg"],
  ["white_dress",  "p_women_dress_white_1.jpg", "p_women_dress_white_2.jpg"],
];

for (const [folder, name1, name2] of map) {
  const imgs = getImages(folder, 2);
  copy(imgs[0], name1, DEST_PRODUCTS);
  copy(imgs[1], name2, DEST_PRODUCTS);
}

// ── Categories ────────────────────────────────────────────────────────────────
copy(getImages("blue_shirt",  1)[0], "men.jpg",   DEST_CATEGORIES);
copy(getImages("red_dress",   1)[0], "women.jpg", DEST_CATEGORIES);
copy(getImages("blue_shorts", 1)[0], "kids.jpg",  DEST_CATEGORIES);

console.log("\n✅ All images copied!");
