import "dotenv/config.js";
import mongoose, { mongo } from "mongoose";
import { Category, Product } from "./src/models/index.js";
import { categories, products } from "./seedData.js";

async function seedDatBase() {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    await Product.deleteMany({});
    await Category.deleteMany({});

    const CategoryDocs = await Category.insertMany(categories);

    const categoryMap = CategoryDocs.reduce((map, category) => {
      map[category.name] = category._id;
      return map;
    }, {});

    const productsWithCategoryIds = products.map((product) => ({
      ...product,
      category: categoryMap[product.category],
    }));

    await Product.insertMany(productsWithCategoryIds);

    console.log("DB seeded successfully ✅")
  } catch (error) {
    console.error("Error seeding db", error);
  } finally {
    mongoose.connection.close();
  }
}


seedDatBase()