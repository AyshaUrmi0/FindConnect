import React from "react";
import { motion } from "framer-motion";

const testimonials = [
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

const Testimonials = () => {
  return (
    <div className="w-11/12 mx-auto my-16">
      <h2 className="mb-8 text-3xl font-bold text-center text-gray-600">
        Success Stories
      </h2>
      <p className="text-center text-gray-600"> Our users have shared their experiences with us.</p>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {testimonials.map((testimonial, index) => (
          <motion.div
            key={index}
            className="p-6 text-center bg-white rounded-lg shadow"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.2 }}
          >
            <img
              src={testimonial.image}
              alt={testimonial.name}
              className="w-16 h-16 mx-auto rounded-full"
            />
            <h3 className="mt-4 text-xl font-bold">{testimonial.name}</h3>
            <p className="text-sm text-gray-500">{testimonial.location}</p>
            <p className="mt-4 text-sm italic text-gray-600">
              "{testimonial.story}"
            </p>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Testimonials;
