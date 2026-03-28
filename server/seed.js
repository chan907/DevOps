require("dotenv").config();
const mongoose = require("mongoose");
const categoryModel = require("./models/categories");
const productModel = require("./models/products");

const seed = async () => {
  await mongoose.connect(process.env.DATABASE, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  });
  console.log("Connected to MongoDB");

  await categoryModel.deleteMany({});
  await productModel.deleteMany({});
  console.log("Cleared categories and products");

  const categories = await categoryModel.insertMany([
    { cName: "Men",   cDescription: "Men's clothing and accessories", cImage: "men.jpg",   cStatus: "Active" },
    { cName: "Women", cDescription: "Women's clothing and accessories", cImage: "women.jpg", cStatus: "Active" },
    { cName: "Kids",  cDescription: "Kids clothing and accessories",  cImage: "kids.jpg",  cStatus: "Active" },
    { cName: "Shoes", cDescription: "Footwear for all",               cImage: "shoes.jpg", cStatus: "Active" },
  ]);

  const [men, women, kids, shoes] = categories;

  const products = [
    // ── Men Shirts ──────────────────────────────────────────────────────────
    { pName: "White Cotton Shirt",  pDescription: "Classic white cotton shirt, perfect for formal and casual wear.", pPrice: 799,  pQuantity: 50, pCategory: men._id,   pImages: ["p_men_shirt_white_1.jpg",  "p_men_shirt_white_2.jpg"],  pOffer: "10", pStatus: "Active" },
    { pName: "Blue Cotton Shirt",   pDescription: "Stylish blue cotton shirt for everyday wear.",                   pPrice: 849,  pQuantity: 45, pCategory: men._id,   pImages: ["p_men_shirt_blue_1.jpg",   "p_men_shirt_blue_2.jpg"],   pOffer: "5",  pStatus: "Active" },
    { pName: "Black Cotton Shirt",  pDescription: "Elegant black shirt suitable for all occasions.",               pPrice: 899,  pQuantity: 40, pCategory: men._id,   pImages: ["p_men_shirt_black_1.jpg",  "p_men_shirt_black_2.jpg"],  pOffer: "0",  pStatus: "Active" },
    { pName: "Green Cotton Shirt",  pDescription: "Fresh green shirt made from breathable cotton fabric.",         pPrice: 799,  pQuantity: 35, pCategory: men._id,   pImages: ["p_men_shirt_green_1.jpg",  "p_men_shirt_green_2.jpg"],  pOffer: "15", pStatus: "Active" },
    // ── Men Pants ───────────────────────────────────────────────────────────
    { pName: "Black Formal Pants",  pDescription: "Classic black formal trousers for office and events.",          pPrice: 1299, pQuantity: 30, pCategory: men._id,   pImages: ["p_men_pants_black_1.jpg",  "p_men_pants_black_2.jpg"],  pOffer: "5",  pStatus: "Active" },
    { pName: "Blue Denim Pants",    pDescription: "Comfortable blue denim pants for casual outings.",              pPrice: 1199, pQuantity: 40, pCategory: men._id,   pImages: ["p_men_pants_blue_1.jpg",   "p_men_pants_blue_2.jpg"],   pOffer: "10", pStatus: "Active" },
    { pName: "Brown Chino Pants",   pDescription: "Stylish brown chino pants for a smart casual look.",            pPrice: 1099, pQuantity: 25, pCategory: men._id,   pImages: ["p_men_pants_brown_1.jpg",  "p_men_pants_brown_2.jpg"],  pOffer: "0",  pStatus: "Active" },
    { pName: "Green Cargo Pants",   pDescription: "Durable green cargo pants with multiple pockets.",              pPrice: 1399, pQuantity: 20, pCategory: men._id,   pImages: ["p_men_pants_green_1.jpg",  "p_men_pants_green_2.jpg"],  pOffer: "10", pStatus: "Active" },
    { pName: "Red Slim Pants",      pDescription: "Bold red slim fit pants for a trendy look.",                    pPrice: 999,  pQuantity: 15, pCategory: men._id,   pImages: ["p_men_pants_red_1.jpg",    "p_men_pants_red_2.jpg"],    pOffer: "20", pStatus: "Active" },
    { pName: "White Linen Pants",   pDescription: "Light white linen pants perfect for summer.",                   pPrice: 1099, pQuantity: 30, pCategory: men._id,   pImages: ["p_men_pants_white_1.jpg",  "p_men_pants_white_2.jpg"],  pOffer: "5",  pStatus: "Active" },
    // ── Men Shorts ──────────────────────────────────────────────────────────
    { pName: "Black Sports Shorts", pDescription: "Comfortable black sports shorts for gym and outdoor activities.", pPrice: 499, pQuantity: 60, pCategory: men._id,  pImages: ["p_men_shorts_black_1.jpg", "p_men_shorts_black_2.jpg"], pOffer: "10", pStatus: "Active" },
    { pName: "Blue Casual Shorts",  pDescription: "Cool blue casual shorts for beach and leisure.",                pPrice: 449,  pQuantity: 55, pCategory: men._id,   pImages: ["p_men_shorts_blue_1.jpg",  "p_men_shorts_blue_2.jpg"],  pOffer: "5",  pStatus: "Active" },
    { pName: "Brown Shorts",        pDescription: "Earthy brown shorts for a relaxed casual style.",               pPrice: 399,  pQuantity: 40, pCategory: men._id,   pImages: ["p_men_shorts_brown_1.jpg", "p_men_shorts_brown_2.jpg"], pOffer: "0",  pStatus: "Active" },
    { pName: "Green Shorts",        pDescription: "Fresh green shorts ideal for outdoor activities.",              pPrice: 449,  pQuantity: 35, pCategory: men._id,   pImages: ["p_men_shorts_green_1.jpg", "p_men_shorts_green_2.jpg"], pOffer: "15", pStatus: "Active" },
    { pName: "White Shorts",        pDescription: "Clean white shorts for a crisp summer look.",                   pPrice: 399,  pQuantity: 50, pCategory: men._id,   pImages: ["p_men_shorts_white_1.jpg", "p_men_shorts_white_2.jpg"], pOffer: "10", pStatus: "Active" },
    // ── Women Dresses ───────────────────────────────────────────────────────
    { pName: "Black Evening Dress", pDescription: "Elegant black evening dress for parties and special occasions.", pPrice: 2499, pQuantity: 20, pCategory: women._id, pImages: ["p_women_dress_black_1.jpg", "p_women_dress_black_2.jpg"], pOffer: "10", pStatus: "Active" },
    { pName: "Blue Summer Dress",   pDescription: "Light and breezy blue summer dress for casual outings.",        pPrice: 1499, pQuantity: 30, pCategory: women._id, pImages: ["p_women_dress_blue_1.jpg",  "p_women_dress_blue_2.jpg"],  pOffer: "20", pStatus: "Active" },
    { pName: "Red Party Dress",     pDescription: "Stunning red party dress that makes you stand out.",            pPrice: 2999, pQuantity: 15, pCategory: women._id, pImages: ["p_women_dress_red_1.jpg",   "p_women_dress_red_2.jpg"],   pOffer: "5",  pStatus: "Active" },
    { pName: "White Casual Dress",  pDescription: "Simple and elegant white dress for everyday wear.",             pPrice: 1299, pQuantity: 25, pCategory: women._id, pImages: ["p_women_dress_white_1.jpg", "p_women_dress_white_2.jpg"], pOffer: "15", pStatus: "Active" },
    // ── Shoes ───────────────────────────────────────────────────────────────
    { pName: "Black Formal Shoes",  pDescription: "Premium black leather formal shoes for office and events.",     pPrice: 1999, pQuantity: 30, pCategory: shoes._id, pImages: ["p_shoes_black_1.jpg",  "p_shoes_black_2.jpg"],  pOffer: "10", pStatus: "Active" },
    { pName: "Blue Sneakers",       pDescription: "Trendy blue sneakers for casual and sports wear.",              pPrice: 1499, pQuantity: 40, pCategory: shoes._id, pImages: ["p_shoes_blue_1.jpg",   "p_shoes_blue_2.jpg"],   pOffer: "5",  pStatus: "Active" },
    { pName: "Brown Leather Shoes", pDescription: "Classic brown leather shoes with durable sole.",               pPrice: 2199, pQuantity: 20, pCategory: shoes._id, pImages: ["p_shoes_brown_1.jpg",  "p_shoes_brown_2.jpg"],  pOffer: "0",  pStatus: "Active" },
    { pName: "Green Casual Shoes",  pDescription: "Comfortable green casual shoes for daily use.",                 pPrice: 1299, pQuantity: 25, pCategory: shoes._id, pImages: ["p_shoes_green_1.jpg",  "p_shoes_green_2.jpg"],  pOffer: "15", pStatus: "Active" },
    { pName: "Red Sports Shoes",    pDescription: "High performance red sports shoes for running and gym.",        pPrice: 1799, pQuantity: 35, pCategory: shoes._id, pImages: ["p_shoes_red_1.jpg",    "p_shoes_red_2.jpg"],    pOffer: "10", pStatus: "Active" },
    { pName: "White Sneakers",      pDescription: "Clean white sneakers that go with any outfit.",                 pPrice: 1599, pQuantity: 45, pCategory: shoes._id, pImages: ["p_shoes_white_1.jpg",  "p_shoes_white_2.jpg"],  pOffer: "20", pStatus: "Active" },
  ];

  await productModel.insertMany(products);

  console.log(`\n✅ Done! ${categories.length} categories, ${products.length} products seeded.`);

  await mongoose.disconnect();
  process.exit(0);
};

seed().catch((err) => {
  console.error("Seed failed:", err.message);
  process.exit(1);
});
