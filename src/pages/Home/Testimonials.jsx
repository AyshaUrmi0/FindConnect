import React, { useContext, useState } from 'react';
import Slider from "react-slick";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight, Quote, Star, Share2, Heart, MessageCircle, MapPin, Calendar, Sparkles } from "lucide-react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { ThemeContext } from '../../context/Authcontext/ThemeContext';

const testimonials = [
  {
    name: "Emma Johnson",
    location: "London, UK",
    story: "FindConnect has been a game-changer! I lost my laptop bag at a coffee shop and was reunited with it in less than 24 hours thanks to an amazing community member.",
    image: "https://i.postimg.cc/2SVKchW9/androgynous-avatar-non-binary-queer-person.jpg",
    rating: 5,
    date: "2024-01-15",
    category: "Electronics",
    likes: 24,
    comments: 8
  },
  {
    name: "Michael Roberts",
    location: "Chicago, USA",
    story: "Our campus security used to struggle with managing lost belongings. Switching to this system has made everything smooth, organized, and instant.",
    image: "https://i.postimg.cc/g0hBdpNv/3d-illustration-cartoon-business-character-with-round-frame-gray-background.jpg",
    rating: 5,
    date: "2024-01-12",
    category: "Documents",
    likes: 31,
    comments: 12
  },
  {
    name: "Sophia Williams",
    location: "New York, USA",
    story: "Finding my lost phone was so stress-free. The AI match suggested the exact report posted by the finder. Truly remarkable platform!",
    image: "https://i.postimg.cc/Xqj2wC38/3d-rendered-illustration-cartoon-character-with-face-picture-frame.jpg",
    rating: 5,
    date: "2024-01-10",
    category: "Electronics",
    likes: 45,
    comments: 15
  },
  {
    name: "David Thompson",
    location: "San Francisco, USA",
    story: "I found a designer wallet in the park and posted it here. The owner claimed it securely within 3 hours. Great community trust!",
    image: "https://i.postimg.cc/2SVKchW9/androgynous-avatar-non-binary-queer-person.jpg",
    rating: 5,
    date: "2024-01-08",
    category: "Personal Items",
    likes: 18,
    comments: 6
  }
];

const PrevArrow = ({ onClick, isDark }) => (
  <motion.button
    onClick={onClick}
    aria-label="Previous slide"
    whileHover={{ scale: 1.1 }}
    whileTap={{ scale: 0.95 }}
    className={`absolute left-0 z-20 p-3 sm:p-4 -translate-y-1/2 rounded-2xl shadow-xl border cursor-pointer top-1/2 transition-all ${
      isDark
        ? 'bg-gray-800/90 text-white border-gray-700 hover:bg-gray-700'
        : 'bg-white/90 text-gray-800 border-gray-200 hover:bg-purple-50'
    }`}
  >
    <ChevronLeft className="w-5 h-5" />
  </motion.button>
);

const NextArrow = ({ onClick, isDark }) => (
  <motion.button
    onClick={onClick}
    aria-label="Next slide"
    whileHover={{ scale: 1.1 }}
    whileTap={{ scale: 0.95 }}
    className={`absolute right-0 z-20 p-3 sm:p-4 -translate-y-1/2 rounded-2xl shadow-xl border cursor-pointer top-1/2 transition-all ${
      isDark
        ? 'bg-gray-800/90 text-white border-gray-700 hover:bg-gray-700'
        : 'bg-white/90 text-gray-800 border-gray-200 hover:bg-purple-50'
    }`}
  >
    <ChevronRight className="w-5 h-5" />
  </motion.button>
);

const settings = (isDark) => ({
  dots: true,
  infinite: true,
  speed: 600,
  slidesToShow: 1,
  slidesToScroll: 1,
  autoplay: true,
  autoplaySpeed: 5000,
  nextArrow: <NextArrow isDark={isDark} />,
  prevArrow: <PrevArrow isDark={isDark} />,
  dotsClass: "slick-dots !bottom-[-2.5rem]",
});

const Testimonials = () => {
  const { theme } = useContext(ThemeContext);
  const isDark = theme === 'dark';
  const [likedTestimonials, setLikedTestimonials] = useState(new Set());

  const handleLike = (index) => {
    const newLiked = new Set(likedTestimonials);
    if (newLiked.has(index)) {
      newLiked.delete(index);
    } else {
      newLiked.add(index);
    }
    setLikedTestimonials(newLiked);
  };

  const handleShare = (testimonial) => {
    const text = `"${testimonial.story}" - ${testimonial.name} on FindConnect`;
    if (navigator.share) {
      navigator.share({ title: 'FindConnect Testimonial', text, url: window.location.href });
    } else {
      navigator.clipboard.writeText(text);
    }
  };

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-4 h-4 ${i < rating ? 'text-amber-400 fill-amber-400' : 'text-gray-300 dark:text-gray-600'}`}
      />
    ));
  };

  return (
    <section className={`py-20 relative overflow-hidden transition-colors duration-300 ${
      isDark ? 'bg-gray-900 text-white' : 'bg-white text-gray-900'
    }`}>
      {/* Background Decorative Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="container max-w-6xl px-4 mx-auto relative z-10">
        
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider mb-4 shadow-sm border bg-purple-50 dark:bg-purple-950/40 text-purple-700 dark:text-purple-300 border-purple-200 dark:border-purple-800">
            <Sparkles className="w-3.5 h-3.5 text-purple-600 animate-pulse" />
            <span>Community Feedback</span>
          </div>

          <h2 className={`text-3xl sm:text-4xl md:text-5xl font-black tracking-tight mb-4 ${
            isDark ? 'text-white' : 'text-gray-900'
          }`}>
            What Our <span className="bg-gradient-to-r from-purple-600 via-indigo-600 to-purple-800 dark:from-purple-400 dark:to-indigo-300 bg-clip-text text-transparent">Users Say</span>
          </h2>
          
          <p className={`text-sm sm:text-base leading-relaxed ${
            isDark ? 'text-gray-300' : 'text-gray-600'
          }`}>
            Real stories from people who successfully found and returned lost items
          </p>
        </motion.div>

        {/* Carousel Container */}
        <div className="relative px-6 sm:px-12 md:px-20">
          <Slider {...settings(isDark)}>
            {testimonials.map((testimonial, index) => (
              <div key={index} className="outline-none px-2 py-4">
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5 }}
                  className={`relative p-8 sm:p-12 rounded-3xl border shadow-xl backdrop-blur-md overflow-hidden text-center transition-all ${
                    isDark
                      ? 'bg-gray-800/90 border-gray-700/80 shadow-black/50'
                      : 'bg-slate-50/90 border-gray-200/80 shadow-slate-200/60'
                  }`}
                >
                  {/* Decorative Quote Icon */}
                  <Quote className="absolute top-6 right-6 w-24 h-24 text-purple-500/10 pointer-events-none rotate-12" />

                  {/* Avatar */}
                  <div className="relative inline-block mb-6">
                    <div className="p-1.5 rounded-full bg-gradient-to-tr from-purple-600 to-indigo-600 shadow-lg shadow-purple-500/20">
                      <img
                        src={testimonial.image}
                        alt={testimonial.name}
                        className="w-24 h-24 sm:w-28 sm:h-28 object-cover rounded-full border-2 border-white dark:border-gray-800"
                      />
                    </div>
                  </div>

                  {/* Star Rating */}
                  <div className="flex items-center justify-center gap-1 mb-5">
                    {renderStars(testimonial.rating)}
                  </div>

                  {/* Story Quote */}
                  <blockquote className="max-w-2xl mx-auto mb-6">
                    <p className={`text-lg sm:text-xl font-medium leading-relaxed italic ${
                      isDark ? 'text-gray-100' : 'text-gray-800'
                    }`}>
                      "{testimonial.story}"
                    </p>
                  </blockquote>

                  {/* Category Chip */}
                  <div className="mb-4">
                    <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-extrabold border ${
                      isDark
                        ? 'bg-purple-900/50 text-purple-300 border-purple-800'
                        : 'bg-purple-100 text-purple-700 border-purple-200'
                    }`}>
                      {testimonial.category}
                    </span>
                  </div>

                  {/* User Name & Info */}
                  <div className="mb-6">
                    <h3 className={`text-xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                      {testimonial.name}
                    </h3>
                    
                    <div className={`flex items-center justify-center gap-3 mt-1.5 text-xs sm:text-sm ${
                      isDark ? 'text-gray-400' : 'text-gray-500'
                    }`}>
                      <span className="flex items-center gap-1">
                        <MapPin className="w-3.5 h-3.5 text-purple-500" />
                        {testimonial.location}
                      </span>
                      <span>•</span>
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3.5 h-3.5 text-purple-500" />
                        {new Date(testimonial.date).toLocaleDateString()}
                      </span>
                    </div>
                  </div>

                  {/* Interactive Action Row */}
                  <div className="flex items-center justify-center gap-4 pt-4 border-t border-gray-200/60 dark:border-gray-700/60">
                    <motion.button
                      onClick={() => handleLike(index)}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold border transition-all ${
                        likedTestimonials.has(index)
                          ? 'bg-rose-50 text-rose-600 border-rose-200 dark:bg-rose-950/40 dark:text-rose-400 dark:border-rose-800'
                          : isDark
                            ? 'bg-gray-700/60 text-gray-300 border-gray-600 hover:bg-gray-700'
                            : 'bg-white text-gray-700 border-gray-200 hover:bg-gray-100'
                      }`}
                    >
                      <Heart className={`w-4 h-4 ${likedTestimonials.has(index) ? 'fill-rose-500 text-rose-500' : ''}`} />
                      <span>{testimonial.likes + (likedTestimonials.has(index) ? 1 : 0)} Likes</span>
                    </motion.button>

                    <motion.button
                      onClick={() => handleShare(testimonial)}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold border transition-all ${
                        isDark
                          ? 'bg-gray-700/60 text-gray-300 border-gray-600 hover:bg-gray-700'
                          : 'bg-white text-gray-700 border-gray-200 hover:bg-gray-100'
                      }`}
                    >
                      <Share2 className="w-4 h-4 text-purple-500" />
                      <span>Share Story</span>
                    </motion.button>
                  </div>

                </motion.div>
              </div>
            ))}
          </Slider>
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-16 text-center"
        >
          <p className={`text-sm sm:text-base font-medium mb-4 ${
            isDark ? 'text-gray-300' : 'text-gray-600'
          }`}>
            Have you found or recovered an item on FindConnect?
          </p>
          
          <button className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl font-bold text-sm text-white bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 shadow-lg shadow-purple-500/25 transition-all active:scale-95">
            <span>Share Your Success Story</span>
            <Quote className="w-4 h-4" />
          </button>
        </motion.div>

      </div>
    </section>
  );
};

export default Testimonials;