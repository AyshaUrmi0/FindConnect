import React, { useContext } from 'react';
import Slider from "react-slick";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { ThemeContext } from '../../context/Authcontext/ThemeContext';

const testimonials = [
  {
    name: "Emma Johnson",
    location: "London",
    story: "This Lost & Found platform has been a game-changer! It's so easy to report and find lost items. Highly recommend it!",
    image: "https://i.postimg.cc/2SVKchW9/androgynous-avatar-non-binary-queer-person.jpg",
  },
  {
    name: "Michael Roberts",
    location: "Chicago",
    story: "Our organization used to struggle with lost belongings, but this system has made everything smooth and efficient.",
    image: "https://i.postimg.cc/g0hBdpNv/3d-illustration-cartoon-business-character-with-round-frame-gray-background.jpg",
  },
  {
    name: "Sophia Williams",
    location: "New York",
    story: "Finding my lost phone was never this easy. The community support and notifications helped me get it back in no time!",
    image: "https://i.postimg.cc/Xqj2wC38/3d-rendered-illustration-cartoon-character-with-face-picture-frame.jpg",
  },
  {
    name: "David Thompson",
    location: "San Francisco",
    story: "As a customer support rep, this tool has significantly reduced the workload for handling lost item inquiries.",
    image: "https://i.postimg.cc/2SVKchW9/androgynous-avatar-non-binary-queer-person.jpg",
  },
  {
    name: "John Doe",
    location: "New York",
    story: "I found my lost wallet within hours of posting. This platform is amazing!",
    image: "https://i.postimg.cc/2SVKchW9/androgynous-avatar-non-binary-queer-person.jpg",
  },
  {
    name: "Jane Smith",
    location: "California",
    story: "Someone returned my lost phone through this site. Highly recommend it!",
    image: "https://i.postimg.cc/g0hBdpNv/3d-illustration-cartoon-business-character-with-round-frame-gray-background.jpg",
  },
  {
    name: "Mike Johnson",
    location: "Texas",
    story: "I found a set of car keys and was able to return them to the owner. Great experience!",
    image: "https://i.postimg.cc/Xqj2wC38/3d-rendered-illustration-cartoon-character-with-face-picture-frame.jpg",
  },
];

const PrevArrow = ({ onClick, theme }) => (
  <button
    onClick={onClick}
    className={`absolute left-0 z-10 p-3 transition-all -translate-y-1/2 rounded-full shadow-lg cursor-pointer md:p-4 top-1/2 hover:bg-gray-50 group ${
      theme === 'dark' ? 'bg-gray-800' : 'bg-white'
    }`}
    aria-label="Previous slide"
  >
    <ChevronLeft className="w-6 h-6 text-gray-600 transition-transform group-hover:-translate-x-0.5" />
  </button>
);

const NextArrow = ({ onClick, theme }) => (
  <button
    onClick={onClick}
    className={`absolute right-0 z-10 p-3 transition-all -translate-y-1/2 rounded-full shadow-lg cursor-pointer md:p-4 top-1/2 hover:bg-gray-50 group ${
      theme === 'dark' ? 'bg-gray-800' : 'bg-white'
    }`}
    aria-label="Next slide"
  >
    <ChevronRight className="w-6 h-6 text-gray-600 transition-transform group-hover:translate-x-0.5" />
  </button>
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

  return (
    <div className={`relative max-w-6xl px-4 py-16 mx-auto md:py-24 ${theme === 'dark' ? 'bg-black text-white' : 'bg-white text-black'}`}>
      <div className="absolute top-0 w-32 h-32 -translate-x-1/2 rounded-full left-1/2 dark:bg-gray-800 blur-3xl opacity-30 dark:opacity-40" />
    
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative mb-16 text-center"
      >
        <h2 className="text-4xl font-bold md:text-5xl">
          What Our Users Say
        </h2>
        <div className="w-24 h-1 mx-auto mt-4 rounded-full dark:bg-purple-400" />
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
              <div className={`relative px-6 py-10 overflow-hidden shadow-lg rounded-2xl md:px-12 md:py-16 ${
                theme === 'dark' ? 'bg-gray-900' : 'bg-white'
              }`}>
                <div className="absolute top-0 right-0 w-40 h-40 translate-x-20 -translate-y-20 rounded-full dark:bg-gray-700 blur-3xl opacity-20 dark:opacity-30" />
                
                <Quote className="absolute dark:text-gray-400 w-28 h-28 top-4 right-4 rotate-12" />
    
                <div className="relative flex flex-col items-center">
                  <div className="relative mb-8 group">
                    <div className="absolute inset-0 transition-opacity bg-blue-100 rounded-full dark:bg-gray-800 blur-md opacity-30 group-hover:opacity-40" />
                    <img
                      src={testimonial.image}
                      alt={testimonial.name}
                      className="relative object-cover w-32 h-32 border-4 border-white rounded-full shadow-lg dark:border-gray-700"
                    />
                  </div>
    
                  <blockquote className="max-w-2xl mx-auto mb-8 text-center">
                    <p className="text-xl md:text-2xl">
                      "{testimonial.story}"
                    </p>
                  </blockquote>
    
                  <div className="text-center">
                    <h3 className="text-xl font-semibold md:text-2xl">
                      {testimonial.name}
                    </h3>
                    <p className="mt-1">
                      {testimonial.location}
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </Slider>
      </div>
    </div>
  );
};

export default Testimonials;