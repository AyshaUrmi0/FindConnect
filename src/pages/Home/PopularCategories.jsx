import React from "react";
import { motion } from "framer-motion";

const categories = [
  { name: "Electronics", description: "Lost phones, laptops, and gadgets", icon: "💻" },
  { name: "Accessories", description: "Keys, jewelry, watches, and more", icon: "🔑" },
  { name: "Personal Items", description: "Wallets, IDs, and documents", icon: "👜" },
  { name: "Pets", description: "Missing or found pets", icon: "🐾" },
  { name: "Bags", description: "Backpacks, suitcases, and handbags", icon: "🎒" },
  { name: "Documents", description: "Passports, licenses, and certificates", icon: "📄" },
];

const PopularCategories = () => {
  return (
    <div className="container mx-auto my-16">
      <h2 className="mb-8 text-3xl font-bold text-center text-gray-600">
        Popular Categories
      </h2>
      <p className="text-center text-gray-600"> Here are some of the most popular categories for lost and found items.</p>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {categories.map((category, index) => (
          <motion.div
            key={index}
            className="p-6 text-center bg-white rounded-lg shadow"
            whileHover={{ scale: 1.1 }}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.2 }}
          >
            <motion.div
              className="text-4xl"
              whileHover={{ rotate: 360 }}
              transition={{ duration: 0.6 }}
            >
              {category.icon}
            </motion.div>
            <h3 className="mt-4 text-xl font-bold">{category.name}</h3>
            <p className="text-sm text-gray-600">{category.description}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default PopularCategories;
