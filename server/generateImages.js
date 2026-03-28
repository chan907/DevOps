const https = require("https");
const fs = require("fs");
const path = require("path");

const images = [
  // ── Categories ──────────────────────────────────────────────────────────────
  { file: "public/uploads/categories/men.jpg",
    url:  "https://images.unsplash.com/photo-1516257984-b1b4d707412e?w=600&q=80" },   // man in suit
  { file: "public/uploads/categories/women.jpg",
    url:  "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=600&q=80" }, // woman fashion
  { file: "public/uploads/categories/kids.jpg",
    url:  "https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?w=600&q=80" }, // kids playing
  { file: "public/uploads/categories/fabric.jpg",
    url:  "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80" },   // fabric rolls

  // ── Men's Cotton Shirt (product1a, product1b) ────────────────────────────────
  { file: "public/uploads/products/product1a.jpg",
    url:  "https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=600&q=80" }, // white shirt on hanger
  { file: "public/uploads/products/product1b.jpg",
    url:  "https://images.unsplash.com/photo-1603252109303-2751441dd157?w=600&q=80" }, // man wearing cotton shirt

  // ── Men's Formal Trousers (product2a, product2b) ─────────────────────────────
  { file: "public/uploads/products/product2a.jpg",
    url:  "https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?w=600&q=80" }, // formal trousers
  { file: "public/uploads/products/product2b.jpg",
    url:  "https://images.unsplash.com/photo-1473966968600-fa801b869a1a?w=600&q=80" }, // man in formal pants

  // ── Men's Kurta (product3a, product3b) ───────────────────────────────────────
  { file: "public/uploads/products/product3a.jpg",
    url:  "https://images.unsplash.com/photo-1585487000160-6ebcfceb0d03?w=600&q=80" }, // Indian kurta
  { file: "public/uploads/products/product3b.jpg",
    url:  "https://images.unsplash.com/photo-1614252235316-8c857d38b5f4?w=600&q=80" }, // kurta detail

  // ── Women's Saree (product4a, product4b) ─────────────────────────────────────
  { file: "public/uploads/products/product4a.jpg",
    url:  "https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?w=600&q=80" }, // woman in saree
  { file: "public/uploads/products/product4b.jpg",
    url:  "https://images.unsplash.com/photo-1609357605129-26f69add5d6e?w=600&q=80" }, // saree close up

  // ── Women's Kurti (product5a, product5b) ─────────────────────────────────────
  { file: "public/uploads/products/product5a.jpg",
    url:  "https://images.unsplash.com/photo-1583744946564-b52ac1c389c8?w=600&q=80" }, // woman in kurti
  { file: "public/uploads/products/product5b.jpg",
    url:  "https://images.unsplash.com/photo-1571513722275-4b41940f54b8?w=600&q=80" }, // kurti on hanger

  // ── Women's Lehenga (product6a, product6b) ───────────────────────────────────
  { file: "public/uploads/products/product6a.jpg",
    url:  "https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=600&q=80" }, // lehenga on model
  { file: "public/uploads/products/product6b.jpg",
    url:  "https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?w=600&q=80" }, // lehenga detail

  // ── Kids T-Shirt (product7a, product7b) ──────────────────────────────────────
  { file: "public/uploads/products/product7a.jpg",
    url:  "https://images.unsplash.com/photo-1519238263530-99bdd11df2ea?w=600&q=80" }, // kids t-shirt
  { file: "public/uploads/products/product7b.jpg",
    url:  "https://images.unsplash.com/photo-1622290291468-a28f7a7dc6a8?w=600&q=80" }, // kid wearing t-shirt

  // ── Kids Frock (product8a, product8b) ────────────────────────────────────────
  { file: "public/uploads/products/product8a.jpg",
    url:  "https://images.unsplash.com/photo-1518831959646-742c3a14ebf7?w=600&q=80" }, // girl in frock
  { file: "public/uploads/products/product8b.jpg",
    url:  "https://images.unsplash.com/photo-1471286174890-9c112ffca5b4?w=600&q=80" }, // kids frock

  // ── Cotton Fabric Roll (product9a, product9b) ─────────────────────────────────
  { file: "public/uploads/products/product9a.jpg",
    url:  "https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?w=600&q=80" }, // cotton fabric roll
  { file: "public/uploads/products/product9b.jpg",
    url:  "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80" },   // fabric texture

  // ── Silk Fabric Roll (product10a, product10b) ─────────────────────────────────
  { file: "public/uploads/products/product10a.jpg",
    url:  "https://images.unsplash.com/photo-1528360983277-13d401cdc186?w=600&q=80" }, // silk fabric
  { file: "public/uploads/products/product10b.jpg",
    url:  "https://images.unsplash.com/photo-1543087903-1ac2ec7aa8c5?w=600&q=80" },   // silk roll
];

function download(url, dest) {
  return new Promise((resolve, reject) => {
    const filePath = path.join(__dirname, dest);
    const file = fs.createWriteStream(filePath);
    const get = (u) => {
      https.get(u, (res) => {
        if (res.statusCode === 301 || res.statusCode === 302) {
          file.close();
          return get(res.headers.location);
        }
        if (res.statusCode !== 200) {
          file.close();
          fs.unlink(filePath, () => {});
          return reject(new Error(`HTTP ${res.statusCode}`));
        }
        res.pipe(file);
        file.on("finish", () => { file.close(); console.log(`✅ ${dest}`); resolve(); });
      }).on("error", (err) => { file.close(); fs.unlink(filePath, () => {}); reject(err); });
    };
    get(url);
  });
}

(async () => {
  console.log(`Downloading ${images.length} images...\n`);
  for (const img of images) {
    try { await download(img.url, img.file); }
    catch (err) { console.error(`❌ ${img.file} — ${err.message}`); }
  }
  console.log("\nDone!");
})();
