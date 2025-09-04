import React, { useContext, useState } from 'react';
import Slider from "react-slick";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight, Quote, Star, Share2, Heart, MessageCircle, MapPin, Calendar } from "lucide-react";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { ThemeContext } from '../../context/Authcontext/ThemeContext';

const testimonials = [
  {
    name: "Emma Johnson",
    location: "London",
    story: "This Lost & Found platform has been a game-changer! It's so easy to report and find lost items. Highly recommend it!",
    image: "https://i.postimg.cc/2SVKchW9/androgynous-avatar-non-binary-queer-person.jpg",
    rating: 5,
    date: "2024-01-15",
    category: "Electronics",
    likes: 24,
    comments: 8
  },
  {
    name: "Michael Roberts",
    location: "Chicago",
    story: "Our organization used to struggle with lost belongings, but this system has made everything smooth and efficient.",
    image: "https://i.postimg.cc/g0hBdpNv/3d-illustration-cartoon-business-character-with-round-frame-gray-background.jpg",
    rating: 5,
    date: "2024-01-12",
    category: "Documents",
    likes: 31,
    comments: 12
  },
  {
    name: "Sophia Williams",
    location: "New York",
    story: "Finding my lost phone was never this easy. The community support and notifications helped me get it back in no time!",
    image: "https://i.postimg.cc/Xqj2wC38/3d-rendered-illustration-cartoon-character-with-face-picture-frame.jpg",
    rating: 5,
    date: "2024-01-10",
    category: "Electronics",
    likes: 45,
    comments: 15
  },
  {
    name: "David Thompson",
    location: "San Francisco",
    story: "As a customer support rep, this tool has significantly reduced the workload for handling lost item inquiries.",
    image: "https://i.postimg.cc/2SVKchW9/androgynous-avatar-non-binary-queer-person.jpg",
    rating: 4,
    date: "2024-01-08",
    category: "Personal Items",
    likes: 18,
    comments: 6
  },
  {
    name: "John Doe",
    location: "New York",
    story: "I found my lost wallet within hours of posting. This platform is amazing!",
    image: "https://i.postimg.cc/2SVKchW9/androgynous-avatar-non-binary-queer-person.jpg",
    rating: 5,
    date: "2024-01-05",
    category: "Personal Items",
    likes: 52,
    comments: 20
  },
  {
    name: "Jane Smith",
    location: "California",
    story: "Someone returned my lost phone through this site. Highly recommend it!",
    image: "https://i.postimg.cc/g0hBdpNv/3d-illustration-cartoon-business-character-with-round-frame-gray-background.jpg",
    rating: 5,
    date: "2024-01-03",
    category: "Electronics",
    likes: 38,
    comments: 14
  },
  {
    name: "Mike Johnson",
    location: "Texas",
    story: "I found a set of car keys and was able to return them to the owner. Great experience!",
    image: "https://i.postimg.cc/Xqj2wC38/3d-rendered-illustration-cartoon-character-with-face-picture-frame.jpg",
    rating: 4,
    date: "2024-01-01",
    category: "Accessories",
    likes: 27,
    comments: 9
  },
];

const PrevArrow = ({ onClick, theme }) => (
  <motion.button
    onClick={onClick}
    className={`absolute left-0 z-10 p-3 transition-all -translate-y-1/2 rounded-full shadow-lg cursor-pointer md:p-4 top-1/2 hover:bg-gray-50 group ${
      theme === 'dark' ? 'bg-gray-800' : 'bg-white'
    }`}
    aria-label="Previous slide"
    whileHover={{ scale: 1.1 }}
    whileTap={{ scale: 0.95 }}
  >
    <ChevronLeft className="w-6 h-6 text-gray-600 transition-transform group-hover:-translate-x-0.5" />
  </motion.button>
);

const NextArrow = ({ onClick, theme }) => (
  <motion.button
    onClick={onClick}
    className={`absolute right-0 z-10 p-3 transition-all -translate-y-1/2 rounded-full shadow-lg cursor-pointer md:p-4 top-1/2 hover:bg-gray-50 group ${
      theme === 'dark' ? 'bg-gray-800' : 'bg-white'
    }`}
    aria-label="Next slide"
    whileHover={{ scale: 1.1 }}
    whileTap={{ scale: 0.95 }}
  >
    <ChevronRight className="w-6 h-6 text-gray-600 transition-transform group-hover:translate-x-0.5" />
  </motion.button>
);

const settings = (theme) => ({
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
  autoplay: true,
  autoplaySpeed: 5000,
  nextArrow: <NextArrow theme={theme} />,
  prevArrow: <PrevArrow theme={theme} />,
  dotsClass: "slick-dots !bottom-[-3rem]",
});

const Testimonials = () => {
  const { theme } = useContext(ThemeContext);
  const [likedTestimonials, setLikedTestimonials] = useState(new Set());
  const [selectedTestimonial, setSelectedTestimonial] = useState(null);

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
      navigator.share({
        title: 'FindConnect Testimonial',
        text: text,
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(text);
      // You could add a toast notification here
    }
  };

  const handleTestimonialClick = (testimonial) => {
    setSelectedTestimonial(testimonial);
    // You could open a modal or navigate to a detailed view
  };

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-4 h-4 ${i < rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
      />
    ));
  };

  return (
    <div className={`relative max-w-6xl px-4 py-16 mx-auto md:py-24 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
      <div className="absolute top-0 w-32 h-32 -translate-x-1/2 rounded-full left-1/2 dark:bg-gray-800 blur-3xl opacity-30 dark:opacity-40" />
    
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative mb-16 text-center"
      >
        <h2 className={`text-4xl font-bold md:text-5xl ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
          What Our Users Say
        </h2>
        <p className="mt-4 text-lg text-gray-600 dark:text-gray-300">
          Real stories from our community members
        </p>
        <div className="w-24 h-1 mx-auto mt-4 rounded-full bg-purple-600 dark:bg-purple-400" />
      </motion.div>
    
      <div className="relative px-8 md:px-16">
        <Slider {...settings(theme)}>
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              className="outline-none"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <motion.div 
                className={`relative px-6 py-10 overflow-hidden shadow-xl rounded-2xl md:px-12 md:py-16 cursor-pointer ${
                  theme === 'dark' ? 'bg-gray-900' : 'bg-white border border-gray-200'
                }`}
                whileHover={{ 
                  scale: 1.02,
                  y: -5
                }}
                onClick={() => handleTestimonialClick(testimonial)}
              >
                <div className="absolute top-0 right-0 w-40 h-40 translate-x-20 -translate-y-20 rounded-full dark:bg-gray-700 blur-3xl opacity-20 dark:opacity-30" />
                
                <Quote className="absolute text-gray-400 dark:text-gray-400 w-28 h-28 top-4 right-4 rotate-12" />
    
                <div className="relative flex flex-col items-center">
                  <motion.div 
                    className="relative mb-8 group"
                    whileHover={{ scale: 1.05 }}
                  >
                    <div className="absolute inset-0 transition-opacity bg-blue-100 rounded-full dark:bg-gray-800 blur-md opacity-30 group-hover:opacity-40" />
                    <img
                      src={testimonial.image}
                      alt={testimonial.name}
                      className="relative object-cover w-32 h-32 border-4 border-white rounded-full shadow-lg dark:border-gray-700"
                    />
                  </motion.div>

                  {/* Rating Stars */}
                  <div className="flex items-center gap-1 mb-4">
                    {renderStars(testimonial.rating)}
                  </div>
    
                  <blockquote className="max-w-2xl mx-auto mb-6 text-center">
                    <p className={`text-xl md:text-2xl ${theme === 'dark' ? 'text-white' : 'text-gray-800'}`}>
                      "{testimonial.story}"
                    </p>
                  </blockquote>

                  {/* Category Badge */}
                  <div className="inline-flex items-center gap-1 px-3 py-1 mb-4 text-xs font-medium text-purple-700 bg-purple-100 rounded-full dark:bg-purple-900 dark:text-purple-300 border border-purple-200 dark:border-purple-700">
                    <span>{testimonial.category}</span>
                  </div>
    
                  <div className="text-center mb-6">
                    <h3 className={`text-xl font-semibold md:text-2xl ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                      {testimonial.name}
                    </h3>
                    <div className={`flex items-center justify-center gap-2 mt-1 text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
                      <MapPin className="w-4 h-4" />
                      <span>{testimonial.location}</span>
                      <span>•</span>
                      <Calendar className="w-4 h-4" />
                      <span>{new Date(testimonial.date).toLocaleDateString()}</span>
                    </div>
                  </div>

                  {/* Interactive Actions */}
                  <div className="flex items-center justify-center gap-6">
                    <motion.button
                      className={`flex items-center gap-2 px-4 py-2 text-sm font-medium transition-colors rounded-lg hover:bg-gray-100 ${theme === 'dark' ? 'text-gray-400 hover:bg-gray-800' : 'text-gray-600'}`}
                      onClick={(e) => {
                        e.stopPropagation();
                        handleLike(index);
                      }}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Heart 
                        className={`w-4 h-4 ${likedTestimonials.has(index) ? 'text-red-500 fill-current' : ''}`} 
                      />
                      <span>{testimonial.likes + (likedTestimonials.has(index) ? 1 : 0)}</span>
                    </motion.button>

                    <motion.button
                      className={`flex items-center gap-2 px-4 py-2 text-sm font-medium transition-colors rounded-lg hover:bg-gray-100 ${theme === 'dark' ? 'text-gray-400 hover:bg-gray-800' : 'text-gray-600'}`}
                      onClick={(e) => {
                        e.stopPropagation();
                        handleShare(testimonial);
                      }}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Share2 className="w-4 h-4" />
                      <span>Share</span>
                    </motion.button>

                    <div className={`flex items-center gap-2 px-4 py-2 text-sm font-medium ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                      <MessageCircle className="w-4 h-4" />
                      <span>{testimonial.comments}</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          ))}
        </Slider>
      </div>

      {/* Call to Action */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.8 }}
        className="mt-12 text-center"
      >
                 <p className={`mb-4 text-lg ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
           Join our community and share your success story!
         </p>
        <motion.button
          className="inline-flex items-center gap-2 px-6 py-3 font-semibold text-white transition-all bg-purple-600 border-2 border-purple-600 rounded-lg hover:bg-purple-700 hover:shadow-lg group"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <span>Share Your Story</span>
          <Quote className="w-4 h-4 transition-transform group-hover:rotate-12" />
        </motion.button>
      </motion.div>
    </div>
  );
};

export default Testimonials;