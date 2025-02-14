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
    <div className="px-4 py-16 ">
      <div className="mx-auto text-center max-w-7xl">
        <h2 className="mb-12 text-4xl font-bold light:text-black dark:text-white">
          Images Simplify the Process
        </h2>

        {/* Wave image */}
        {/* <img
          src="https://cdn.prod.website-files.com/5fe22b52285ac81c0bafbab6/5fe3adf3112dc4f2737773b6_dotted-up.svg"
          alt="Wave pattern"
          className="w-full mb-12"
        /> */}

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
            className="p-8 transition-shadow duration-300 rounded-lg shadow-lg dark:bg-gray-700 hover:shadow-xl"
            variants={itemVariants}
          >
            <div className="mb-4 text-6xl font-bold text-purple-500 dark:text-purple-300">01</div>
            <FaCamera className="w-12 h-12 mx-auto mb-4 text-purple-500 dark:text-purple-300" />
            <h2 className="mb-4 text-2xl font-semibold dark:text-white">
              Snap & Log
            </h2>
            <p className="text-gray-600 dark:text-white">
              Take a photo of the found item and log it using our app.
            </p>
          </motion.div>

          {/* Step 2 */}
          <motion.div
            className="p-8 transition-shadow duration-300 rounded-lg shadow-lg dark:bg-gray-700 hover:shadow-xl"
            variants={itemVariants}
          >
            <div className="mb-4 text-6xl font-bold text-purple-500 dark:text-purple-300">02</div>
            <FaInfoCircle className="w-12 h-12 mx-auto mb-4 text-purple-500 dark:text-purple-300" />
            <h2 className="mb-4 text-2xl font-semibold dark:text-white">
              Add Info
            </h2>
            <p className="text-gray-600 dark:text-white">
              Add notable item information in the system.
            </p>
          </motion.div>

          {/* Step 3 */}
          <motion.div
            className="p-8 transition-shadow duration-300 rounded-lg shadow-lg dark:text-white hover:shadow-xl"
            variants={itemVariants}
          >
            <div className="mb-4 text-6xl font-bold text-purple-500 dark:text-purple-300">03</div>
            <FaChartLine className="w-12 h-12 mx-auto mb-4 text-purple-500 dark:text-purple-300" />
            <h2 className="mb-4 text-2xl font-semibold dark:text-white">
              Track & Manage
            </h2>
            <p className="text-gray-600 dark:text-white">
              Deliver the best experience for your customers and staff from our
              dashboard.
            </p>
          </motion.div>
        </motion.div>

        {/* Wave image */}
        {/* <img
          src="https://cdn.prod.website-files.com/5fe22b52285ac81c0bafbab6/5fe3adf4d2b0c82bc1f9e711_dotted-down.svg"
          alt="Wave pattern"
          className="w-full mt-12"
        /> */}
      </div>
    </div>
  );
};

export default ImageProcessSection;
