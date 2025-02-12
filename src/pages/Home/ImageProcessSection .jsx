import React from "react";
import { motion } from "framer-motion";
import { FaCamera, FaInfoCircle, FaChartLine } from "react-icons/fa";

const ImageProcessSection = () => {
  // Animation variants for Framer Motion
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 },
  };

  return (
    <div className="px-4 py-16 bg-gradient-to-r from-blue-50 to-purple-50">
      <div className="mx-auto text-center max-w-7xl">
        <h1 className="mb-12 text-4xl font-bold text-gray-800">
          Images Simplify the Process
        </h1>

        {/* Dotted line images */}
        <img
          src="https://cdn.prod.website-files.com/5fe22b52285ac81c0bafbab6/5fe3adf3112dc4f2737773b6_dotted-up.svg"
          alt="Dotted line"
          className="w-full mb-12"
        />

        {/* Process steps */}
        <motion.div
          className="grid grid-cols-1 gap-8 md:grid-cols-3"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {/* Step 1 */}
          <motion.div
            className="p-8 transition-shadow duration-300 bg-white rounded-lg shadow-lg hover:shadow-xl"
            variants={itemVariants}
          >
            <div className="mb-4 text-6xl font-bold text-blue-500">01</div>
            <FaCamera className="w-12 h-12 mx-auto mb-4 text-blue-500" />
            <h2 className="mb-4 text-2xl font-semibold text-gray-800">
              Snap &amp; Log
            </h2>
            <p className="text-gray-600">
              Take a photo of the found item and log it using our app.
            </p>
          </motion.div>

          {/* Step 2 */}
          <motion.div
            className="p-8 transition-shadow duration-300 bg-white rounded-lg shadow-lg hover:shadow-xl"
            variants={itemVariants}
          >
            <div className="mb-4 text-6xl font-bold text-purple-500">02</div>
            <FaInfoCircle className="w-12 h-12 mx-auto mb-4 text-purple-500" />
            <h2 className="mb-4 text-2xl font-semibold text-gray-800">
              Add Info
            </h2>
            <p className="text-gray-600">
              Add notable item information in the system.
            </p>
          </motion.div>

          {/* Step 3 */}
          <motion.div
            className="p-8 transition-shadow duration-300 bg-white rounded-lg shadow-lg hover:shadow-xl"
            variants={itemVariants}
          >
            <div className="mb-4 text-6xl font-bold text-green-500">03</div>
            <FaChartLine className="w-12 h-12 mx-auto mb-4 text-green-500" />
            <h2 className="mb-4 text-2xl font-semibold text-gray-800">
              Track &amp; Manage
            </h2>
            <p className="text-gray-600">
              Deliver the best experience for your customers and staff from our
              dashboard.
            </p>
          </motion.div>
        </motion.div>

        {/* Dotted line images */}
        <img
          src="https://cdn.prod.website-files.com/5fe22b52285ac81c0bafbab6/5fe3adf4d2b0c82bc1f9e711_dotted-down.svg"
          alt="Dotted line"
          className="w-full mt-12"
        />
      </div>
    </div>
  );
};

export default ImageProcessSection;