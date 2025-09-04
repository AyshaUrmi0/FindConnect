import React, { useContext, useState, useEffect } from 'react';
import { ThemeContext } from '../../context/Authcontext/ThemeContext';
import { motion } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode, Pagination } from "swiper/modules";
import { Link } from 'react-router-dom';
import { ArrowRight, Search, TrendingUp, Users } from 'lucide-react';
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";

const categories = [
  { 
    name: "Electronics", 
    description: "Lost phones, laptops, and gadgets", 
    icon: "💻",
    color: "from-blue-500 to-cyan-500",
    count: 156
  },
  { 
    name: "Accessories", 
    description: "Keys, jewelry, watches, and more", 
    icon: "🔑",
    color: "from-purple-500 to-pink-500",
    count: 89
  },
  { 
    name: "Personal Items", 
    description: "Wallets, IDs, and documents", 
    icon: "👜",
    color: "from-green-500 to-emerald-500",
    count: 234
  },
  { 
    name: "Pets", 
    description: "Missing or found pets", 
    icon: "🐾",
    color: "from-orange-500 to-red-500",
    count: 45
  },
  { 
    name: "Bags", 
    description: "Backpacks, suitcases, and handbags", 
    icon: "🎒",
    color: "from-indigo-500 to-purple-500",
    count: 123
  },
  { 
    name: "Documents", 
    description: "Passports, licenses, and certificates", 
    icon: "📄",
    color: "from-yellow-500 to-orange-500",
    count: 78
  },
];

const PopularCategories = () => {
  const { theme } = useContext(ThemeContext);
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const handleCategoryClick = (categoryName) => {
    // Navigate to filtered items view
    window.location.href = `/allItems?category=${encodeURIComponent(categoryName)}`;
  };

  return (
    <div className={`container px-4 mx-auto my-16 ${theme === 'dark' ? ' text-white' : ' text-black'}`}>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 30 }}
        transition={{ duration: 0.6 }}
        className="text-center mb-12"
      >
        <h2 className={`mb-4 text-4xl font-bold ${
          theme === 'dark' ? 'text-white' : 'text-black'
        }`}>
          Popular Categories
        </h2>
        <p className={`text-lg ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
          Browse through the most common lost and found items by category
        </p>
        
        {/* Stats Section */}
        <div className="flex justify-center gap-8 mt-8">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: isVisible ? 1 : 0, scale: isVisible ? 1 : 0.8 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex items-center gap-2"
          >
            <TrendingUp className="w-5 h-5 text-purple-500" />
            <span className="text-sm font-medium">Most Active</span>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: isVisible ? 1 : 0, scale: isVisible ? 1 : 0.8 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex items-center gap-2"
          >
            <Users className="w-5 h-5 text-purple-500" />
            <span className="text-sm font-medium">Community Driven</span>
          </motion.div>
        </div>
      </motion.div>

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
              className={`relative p-6 text-center min-h-[320px] rounded-xl shadow-lg cursor-pointer
                ${theme === 'dark' 
                  ? 'bg-gray-900 border-gray-700 hover:border-purple-400' 
                  : 'bg-gradient-to-br from-indigo-50 to-purple-50 border-indigo-100 hover:border-indigo-500'}
                border hover:shadow-2xl transition-all duration-300 overflow-hidden group`}
              whileHover={{ 
                scale: 1.05,
                y: -10
              }}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 50 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              onHoverStart={() => setHoveredIndex(index)}
              onHoverEnd={() => setHoveredIndex(null)}
              onClick={() => handleCategoryClick(category.name)}
            >
              {/* Background Gradient Effect */}
              <div className={`absolute inset-0 bg-gradient-to-br ${category.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300`} />
              
              {/* Icon with enhanced animation */}
              <motion.div
                className="relative mb-4 text-6xl"
                whileHover={{ 
                  rotate: 360,
                  scale: 1.2
                }}
                transition={{ duration: 0.6 }}
              >
                <span className="drop-shadow-lg">{category.icon}</span>
              </motion.div>

              {/* Category Info */}
              <div className="relative">
                <h3 className={`mt-4 text-xl font-bold mb-2 ${theme === 'dark' ? 'text-white' : 'text-gray-800'}`}>
                  {category.name}
                </h3>
                <p className={`text-sm mb-4 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
                  {category.description}
                </p>
                
                {/* Item Count Badge */}
                <div className="inline-flex items-center gap-1 px-3 py-1 mb-4 text-xs font-medium text-purple-600 bg-purple-100 rounded-full dark:bg-purple-900 dark:text-purple-300">
                  <Search className="w-3 h-3" />
                  {category.count} items
                </div>

                {/* Action Button */}
                <motion.div
                  className="flex items-center justify-center gap-2 text-sm font-medium text-purple-600 dark:text-purple-400"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: hoveredIndex === index ? 1 : 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <span>Browse Category</span>
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </motion.div>
              </div>

              {/* Hover Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-purple-600/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </motion.div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Quick Actions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 20 }}
        transition={{ duration: 0.6, delay: 0.8 }}
        className="mt-12 text-center"
      >
        <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
          <Link
            to="/allItems"
            className="inline-flex items-center gap-2 px-6 py-3 font-semibold text-purple-600 transition-all border-2 border-purple-600 rounded-lg hover:bg-purple-600 hover:text-white hover:shadow-lg group"
          >
            <Search className="w-4 h-4" />
            Browse All Items
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </Link>
          <Link
            to="/addItem"
            className="inline-flex items-center gap-2 px-6 py-3 font-semibold text-white transition-all bg-purple-600 border-2 border-purple-600 rounded-lg hover:bg-purple-700 hover:shadow-lg group"
          >
            <span>Report Item</span>
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </motion.div>

      {/* Custom Swiper Styles */}
      <style>
        {`
          .custom-swiper .swiper-pagination-bullet {
            width: 12px;
            height: 12px;
            background: rgba(79, 70, 229, 0.7);
            transition: all 0.3s ease;
          }
          .custom-swiper .swiper-pagination-bullet-active {
            background: linear-gradient(to right, #4f46e5, #7c3aed, #9333ea);
            transform: scale(1.2);
          }
          .custom-swiper .swiper-pagination-bullet:hover {
            background: rgba(79, 70, 229, 0.9);
            transform: scale(1.1);
          }
          @media (prefers-color-scheme: dark) {
            .custom-swiper .swiper-pagination-bullet {
              background: rgba(233, 213, 255, 0.7);
            }
            .custom-swiper .swiper-pagination-bullet-active {
              background: linear-gradient(to right, #d8b4fe, #a78bfa, #8b5cf6);
            }
            .custom-swiper .swiper-pagination-bullet:hover {
              background: rgba(233, 213, 255, 0.9);
            }
          }
        `}
      </style>
    </div>
  );
};

export default PopularCategories;
