import React, { useContext } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ThemeContext } from '../../context/Authcontext/ThemeContext';
import { 
  Search, 
  FileText, 
  Users, 
  Shield, 
  CheckCircle, 
  ArrowRight,
  Smartphone,
  MapPin,
  Clock,
  Heart,
  Star,
  Zap
} from 'lucide-react';

const HowItWorks = () => {
  const { theme } = useContext(ThemeContext);
  const navigate = useNavigate();

  const steps = [
    {
      icon: <FileText className="w-6 h-6" />,
      title: "Report Your Item",
      description: "Fill out a quick form with details about your lost item including description, location, and contact information.",
      color: "from-blue-500 to-blue-600",
      bgColor: "bg-blue-50 dark:bg-blue-900/20",
      borderColor: "border-blue-200 dark:border-blue-700"
    },
    {
      icon: <Search className="w-6 h-6" />,
      title: "Smart Matching",
      description: "Our intelligent system automatically matches your lost item report with found items in our database.",
      color: "from-purple-500 to-purple-600",
      bgColor: "bg-purple-50 dark:bg-purple-900/20",
      borderColor: "border-purple-200 dark:border-purple-700"
    },
    {
      icon: <Users className="w-6 h-6" />,
      title: "Secure Connection",
      description: "If there's a match, we securely connect you with the finder through our platform.",
      color: "from-green-500 to-green-600",
      bgColor: "bg-green-50 dark:bg-green-900/20",
      borderColor: "border-green-200 dark:border-green-700"
    },
    {
      icon: <CheckCircle className="w-6 h-6" />,
      title: "Reunite & Celebrate",
      description: "Meet up safely and celebrate the successful reunion with your lost belongings!",
      color: "from-orange-500 to-orange-600",
      bgColor: "bg-orange-50 dark:bg-orange-900/20",
      borderColor: "border-orange-200 dark:border-orange-700"
    }
  ];

  const features = [
    {
      icon: <Shield className="w-5 h-5" />,
      title: "Secure & Private",
      description: "Your personal information is protected with industry-standard security"
    },
    {
      icon: <Zap className="w-5 h-5" />,
      title: "Fast & Easy",
      description: "Quick reporting process that takes just a few minutes"
    },
    {
      icon: <Smartphone className="w-5 h-5" />,
      title: "Mobile Friendly",
      description: "Works perfectly on all devices - report from anywhere"
    },
    {
      icon: <Heart className="w-5 h-5" />,
      title: "Community Driven",
      description: "Join thousands of users helping each other find lost items"
    }
  ];

  const handleReportLostItem = () => {
    navigate('/addItems');
  };

  const handleBrowseFoundItems = () => {
    navigate('/allItems');
  };

  return (
    <div className={`min-h-screen pt-20 ${theme === 'dark' ? 'bg-gray-900' : 'bg-gray-50'}`}>
      <div className="container px-4 py-8 mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h1 className={`text-4xl md:text-5xl font-bold mb-10 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
            How FindConnect Works
          </h1>
          <p className={`text-lg md:text-xl ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'} max-w-3xl mx-auto`}>
            Lost something? Don't worry! Our simple 4-step process helps you reunite with your belongings quickly and safely.
          </p>
        </motion.div>

        {/* Main Content */}
        <div className="max-w-7xl mx-auto">
          {/* Steps Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mb-16"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              {steps.map((step, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                  className={`relative p-6 rounded-xl border-2 transition-all duration-300 hover:shadow-lg hover:-translate-y-1 ${step.bgColor} ${step.borderColor}`}
                >
                  {/* Step Number */}
                  <div className={`absolute -top-3 -left-3 w-8 h-8 rounded-full bg-gradient-to-r ${step.color} text-white flex items-center justify-center font-bold text-sm`}>
                    {index + 1}
                  </div>

                  {/* Icon */}
                  <div className={`w-12 h-12 rounded-lg bg-gradient-to-r ${step.color} text-white flex items-center justify-center mb-4`}>
                    {step.icon}
                  </div>

                  {/* Content */}
                  <h3 className={`text-lg font-semibold mb-2 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                    {step.title}
                  </h3>
                  <p className={`text-sm ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
                    {step.description}
                  </p>

                  {/* Arrow for connection */}
                  {index < steps.length - 1 && (
                    <div className="hidden lg:block absolute -right-3 top-1/2 transform -translate-y-1/2">
                      <ArrowRight className="w-6 h-6 text-gray-400" />
                    </div>
                  )}
                </motion.div>
              ))}
            </div>

            {/* Connection Line for Mobile */}
            <div className="lg:hidden flex justify-center mb-8">
              <div className="flex items-center space-x-2">
                {steps.map((_, index) => (
                  <React.Fragment key={index}>
                    <div className={`w-2 h-2 rounded-full bg-gradient-to-r ${steps[index].color}`}></div>
                    {index < steps.length - 1 && (
                      <div className="w-8 h-0.5 bg-gray-300 dark:bg-gray-600"></div>
                    )}
                  </React.Fragment>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Visual Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="grid items-center grid-cols-1 gap-12 lg:grid-cols-2 mb-16"
          >
            {/* Image Section */}
            <div className="relative">
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.6 }}
                className="relative"
              >
                <img
                  src="https://shop.troov.com/cdn/shop/files/coworkers-looking-at-mobile-device.jpg?v=1698063089&width=750"
                  alt="People using FindConnect to find lost items"
                  className="w-full h-auto rounded-2xl shadow-2xl"
                  loading="lazy"
                />
                {/* Overlay with stats */}
                <div className={`absolute bottom-4 left-4 right-4 p-4 rounded-xl backdrop-blur-sm ${
                  theme === 'dark' ? 'bg-black/50' : 'bg-white/90'
                }`}>
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-2">
                      <Users className="w-4 h-4 text-purple-500" />
                      <span className={theme === 'dark' ? 'text-white' : 'text-gray-900'}>10K+ Users</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      <span className={theme === 'dark' ? 'text-white' : 'text-gray-900'}>95% Success Rate</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Features Section */}
            <div className="space-y-6">
              <h2 className={`text-3xl font-bold mb-6 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                Why Choose FindConnect?
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {features.map((feature, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 0.8 + index * 0.1 }}
                    className={`flex items-start gap-3 p-4 rounded-lg transition-all duration-300 hover:shadow-md ${
                      theme === 'dark' ? 'bg-gray-800 hover:bg-gray-700' : 'bg-white hover:bg-gray-50'
                    } border border-gray-200 dark:border-gray-700`}
                  >
                    <div className="w-10 h-10 rounded-lg bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center text-purple-600 dark:text-purple-400">
                      {feature.icon}
                    </div>
                    <div>
                      <h3 className={`font-semibold mb-1 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                        {feature.title}
                      </h3>
                      <p className={`text-sm ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
                        {feature.description}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Call to Action */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className={`text-center p-8 rounded-2xl shadow-xl ${
              theme === 'dark' 
                ? 'bg-gradient-to-r from-purple-900/50 to-blue-900/50 border border-purple-700' 
                : 'bg-gradient-to-r from-purple-50 to-blue-50 border border-purple-200'
            }`}
          >
            <h2 className={`text-2xl font-bold mb-4 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
              Ready to Find Your Lost Item?
            </h2>
            <p className={`text-lg mb-6 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
              Join thousands of users who have successfully reunited with their belongings
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.button
                onClick={handleReportLostItem}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-3 bg-purple-600 hover:bg-purple-700 text-white font-semibold rounded-lg transition-colors flex items-center justify-center gap-2"
              >
                <FileText className="w-5 h-5" />
                Report Lost Item
              </motion.button>
              <motion.button
                onClick={handleBrowseFoundItems}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-3 bg-white hover:bg-gray-50 text-purple-600 font-semibold rounded-lg border-2 border-purple-600 transition-colors flex items-center justify-center gap-2"
              >
                <Search className="w-5 h-5" />
                Browse Found Items
              </motion.button>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default HowItWorks;
  