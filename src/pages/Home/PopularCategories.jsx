import React, { useContext, useState, useEffect } from 'react';
import { ThemeContext } from '../../context/Authcontext/ThemeContext';
import { motion } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode, Pagination, Autoplay } from "swiper/modules";
import { Link } from 'react-router-dom';
import { ArrowRight, Search, Sparkles, TrendingUp, ShieldCheck } from 'lucide-react';
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";

const categories = [
  { 
    name: "Electronics", 
    description: "Lost phones, laptops, and smart gadgets", 
    icon: "💻",
    gradient: "from-blue-500 to-cyan-500",
    bgSoftLight: "bg-blue-50/60",
    count: 156
  },
  { 
    name: "Accessories", 
    description: "Keys, jewelry, watches, and smartwatches", 
    icon: "🔑",
    gradient: "from-purple-500 to-pink-500",
    bgSoftLight: "bg-purple-50/60",
    count: 89
  },
  { 
    name: "Personal Items", 
    description: "Wallets, IDs, cards, and documents", 
    icon: "👜",
    gradient: "from-emerald-500 to-teal-500",
    bgSoftLight: "bg-emerald-50/60",
    count: 234
  },
  { 
    name: "Pets", 
    description: "Missing or rescued family pets", 
    icon: "🐾",
    gradient: "from-amber-500 to-orange-500",
    bgSoftLight: "bg-amber-50/60",
    count: 45
  },
  { 
    name: "Bags", 
    description: "Backpacks, suitcases, and handbags", 
    icon: "🎒",
    gradient: "from-indigo-500 to-purple-500",
    bgSoftLight: "bg-indigo-50/60",
    count: 123
  },
  { 
    name: "Documents", 
    description: "Passports, licenses, and certificates", 
    icon: "📄",
    gradient: "from-rose-500 to-red-500",
    bgSoftLight: "bg-rose-50/60",
    count: 78
  },
];

const PopularCategories = () => {
  const { theme } = useContext(ThemeContext);
  const isDark = theme === 'dark';
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const handleCategoryClick = (categoryName) => {
    window.location.href = `/allItems?category=${encodeURIComponent(categoryName)}`;
  };

  return (
    <section className={`py-16 transition-colors duration-300 ${
      isDark ? 'bg-gray-900/60 text-white' : 'bg-slate-50/60 text-gray-900'
    }`}>
      <div className="container px-4 mx-auto max-w-7xl">
        
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 25 }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-14"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider mb-4 shadow-sm border bg-purple-50 dark:bg-purple-950/40 text-purple-700 dark:text-purple-300 border-purple-200 dark:border-purple-800">
            <Sparkles className="w-3.5 h-3.5 text-purple-600 animate-pulse" />
            <span>Discover By Category</span>
          </div>

          <h2 className={`text-3xl sm:text-4xl font-black tracking-tight leading-tight mb-4 ${
            isDark ? 'text-white' : 'text-gray-900'
          }`}>
            Popular <span className="bg-gradient-to-r from-purple-600 via-indigo-600 to-purple-800 dark:from-purple-400 dark:to-indigo-300 bg-clip-text text-transparent">Categories</span>
          </h2>
          
          <p className={`text-sm sm:text-base leading-relaxed ${
            isDark ? 'text-gray-300' : 'text-gray-600'
          }`}>
            Browse through the most common lost and found items reported by our community
          </p>
          
          {/* Quick Metrics */}
          <div className="flex flex-wrap justify-center items-center gap-6 mt-6 pt-6 border-t border-gray-200/50 dark:border-gray-800">
            <div className="flex items-center gap-2 text-xs sm:text-sm font-semibold">
              <TrendingUp className="w-4 h-4 text-purple-600" />
              <span className={isDark ? 'text-gray-300' : 'text-gray-700'}>Real-Time Updates</span>
            </div>
            <div className="flex items-center gap-2 text-xs sm:text-sm font-semibold">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span className={isDark ? 'text-gray-300' : 'text-gray-700'}>Verified Reports</span>
            </div>
          </div>
        </motion.div>

        {/* Swiper Carousel */}
        <Swiper
          slidesPerView={1}
          spaceBetween={24}
          breakpoints={{
            640: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
          }}
          autoplay={{ delay: 3500, disableOnInteraction: false }}
          freeMode={true}
          pagination={{ clickable: true }}
          modules={[FreeMode, Pagination, Autoplay]}
          className="pb-14 custom-swiper"
        >
          {categories.map((category, index) => (
            <SwiperSlide key={index} className="h-auto">
              <motion.div
                onClick={() => handleCategoryClick(category.name)}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 30 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -8 }}
                className={`group relative h-full p-7 rounded-3xl border shadow-lg cursor-pointer transition-all duration-300 flex flex-col justify-between overflow-hidden ${
                  isDark
                    ? 'bg-gray-800/90 border-gray-700/80 shadow-black/40 hover:border-purple-500/50'
                    : 'bg-white border-gray-200/80 shadow-slate-200/50 hover:border-purple-300 hover:shadow-purple-500/10'
                }`}
              >
                {/* Background Gradient Glow */}
                <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${category.gradient} opacity-5 group-hover:opacity-15 rounded-full blur-2xl transition-opacity duration-300`} />
                
                <div>
                  {/* Top Row: Icon + Count */}
                  <div className="flex items-center justify-between mb-6">
                    <div className={`w-14 h-14 rounded-2xl flex items-center justify-center text-3xl shadow-md transition-transform group-hover:scale-110 group-hover:rotate-6 duration-300 ${
                      isDark ? 'bg-gray-700/80 border border-gray-600' : `${category.bgSoftLight} border border-gray-100`
                    }`}>
                      <span>{category.icon}</span>
                    </div>

                    <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-extrabold border ${
                      isDark
                        ? 'bg-purple-900/40 text-purple-300 border-purple-800'
                        : 'bg-purple-100/80 text-purple-700 border-purple-200'
                    }`}>
                      <Search className="w-3 h-3" />
                      {category.count} items
                    </span>
                  </div>

                  {/* Title & Description */}
                  <h3 className={`text-xl font-bold mb-2 transition-colors group-hover:text-purple-600 dark:group-hover:text-purple-400 ${
                    isDark ? 'text-white' : 'text-gray-900'
                  }`}>
                    {category.name}
                  </h3>

                  <p className={`text-sm leading-relaxed ${
                    isDark ? 'text-gray-300' : 'text-gray-600'
                  }`}>
                    {category.description}
                  </p>
                </div>

                {/* Footer Action Arrow */}
                <div className="mt-6 pt-4 border-t border-gray-100 dark:border-gray-700/60 flex items-center justify-between text-xs font-bold text-purple-600 dark:text-purple-400">
                  <span>Browse Category</span>
                  <div className="w-8 h-8 rounded-full bg-purple-50 dark:bg-purple-900/40 flex items-center justify-center group-hover:bg-purple-600 group-hover:text-white transition-all">
                    <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
                  </div>
                </div>
              </motion.div>
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Footer Navigation CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 20 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-6 text-center"
        >
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              to="/allItems"
              className={`inline-flex items-center gap-2 px-6 py-3 rounded-2xl font-bold text-sm border shadow-sm transition-all active:scale-95 ${
                isDark
                  ? 'bg-gray-800 text-purple-300 border-purple-700 hover:bg-gray-700'
                  : 'bg-white text-purple-700 border-purple-200 hover:bg-purple-50'
              }`}
            >
              <Search className="w-4 h-4" />
              <span>Browse All Items</span>
              <ArrowRight className="w-4 h-4" />
            </Link>

            <Link
              to="/addItem"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl font-bold text-sm text-white bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 shadow-lg shadow-purple-500/25 transition-all active:scale-95"
            >
              <span>+ Report an Item</span>
            </Link>
          </div>
        </motion.div>

      </div>

      {/* Swiper Pagination Styles */}
      <style>
        {`
          .custom-swiper .swiper-pagination-bullet {
            width: 10px;
            height: 10px;
            background: #8b5cf6;
            opacity: 0.4;
            transition: all 0.3s ease;
          }
          .custom-swiper .swiper-pagination-bullet-active {
            width: 24px;
            border-radius: 6px;
            opacity: 1;
            background: linear-gradient(to right, #8b5cf6, #6366f1);
          }
        `}
      </style>
    </section>
  );
};

export default PopularCategories;
