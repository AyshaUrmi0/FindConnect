import React from "react";
import { motion } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";

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
    <div className="container px-4 mx-auto my-16">
      <h2 className="mb-8 text-4xl font-bold text-center dark:text-white">
        Popular Categories
      </h2>
      <p className="text-center dark:text-white">
        Here are some of the most popular categories for lost and found items.
      </p>
  
      {/* Swiper Slider */}
      <Swiper
        slidesPerView={1}
        spaceBetween={20}
        breakpoints={{
          640: { slidesPerView: 2 },
          1024: { slidesPerView: 3 },
        }}
        freeMode={true}
        pagination={{ clickable: true }}
        modules={[FreeMode, Pagination]}
        className="mt-10 custom-swiper"
      >
        {categories.map((category, index) => (
          <SwiperSlide key={index}>
            <motion.div
              className="p-6 text-center min-h-[300px] rounded-xl shadow-lg border-[3px] border-transparent 
              bg-clip-border hover:border-purple-500 transition-all duration-300"
              whileHover={{ scale: 1.05 }}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
            >
              <motion.div
                className="mb-4 text-5xl dark:text-white"
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.6 }}
              >
                {category.icon}
              </motion.div>
              <h3 className="mt-4 text-xl font-bold dark:text-white">
                {category.name}
              </h3>
              <p className="text-sm dark:text-gray-300">
                {category.description}
              </p>
            </motion.div>
          </SwiperSlide>
        ))}
      </Swiper>
  
      {/* Custom Swiper Styles */}
      <style>
        {`
          .custom-swiper .swiper-pagination-bullet {
            width: 12px;
            height: 12px;
            background: rgba(128, 90, 213, 0.7);
          }
          .custom-swiper .swiper-pagination-bullet-active {
            background: linear-gradient(to right, #8b5cf6, #a78bfa, #c4b5fd);
          }
          @media (prefers-color-scheme: dark) {
            .custom-swiper .swiper-pagination-bullet {
              background: rgba(233, 213, 255, 0.7);
            }
            .custom-swiper .swiper-pagination-bullet-active {
              background: linear-gradient(to right, #d8b4fe, #a78bfa, #8b5cf6);
            }
          }
        `}
      </style>
    </div>
  );
  
};

export default PopularCategories;
