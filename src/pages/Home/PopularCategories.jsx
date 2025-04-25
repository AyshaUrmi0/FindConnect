import React, { useContext } from 'react';
import { ThemeContext } from '../../context/Authcontext/ThemeContext';
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
  const { theme } = useContext(ThemeContext);

  return (
    <div className={`container px-4 mx-auto my-16 ${theme === 'dark' ? 'bg-black text-white' : 'bg-white text-black'}`}>
      <h2 className="mb-4 text-4xl font-bold text-center bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
        Popular Categories
      </h2>
      <p className={`text-center ${theme === 'dark' ? 'text-white' : 'text-gray-700'}`}>
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
              className={`p-6 text-center min-h-[300px] rounded-xl shadow-lg 
                ${theme === 'dark' 
                  ? 'bg-gray-900 border-gray-700 hover:border-purple-400' 
                  : 'bg-gradient-to-br from-indigo-50 to-purple-50 border-indigo-100 hover:border-indigo-500'}
                border hover:shadow-xl transition-all duration-300`}
              whileHover={{ scale: 1.05 }}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
            >
              <motion.div
                className="mb-4 text-5xl bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent"
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.6 }}
              >
                {category.icon}
              </motion.div>
              <h3 className={`mt-4 text-xl font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-800'}`}>
                {category.name}
              </h3>
              <p className={`text-sm ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
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
            background: rgba(79, 70, 229, 0.7);
          }
          .custom-swiper .swiper-pagination-bullet-active {
            background: linear-gradient(to right, #4f46e5, #7c3aed, #9333ea);
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
