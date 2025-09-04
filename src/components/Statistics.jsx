import React from 'react';
import { motion } from 'framer-motion';
import { useContext } from 'react';
import { ThemeContext } from '../context/Authcontext/ThemeContext';
import { 
  Package, 
  Search, 
  CheckCircle, 
  TrendingUp,
  Loader2,
  Users,
  Heart
} from 'lucide-react';
import useStatistics from '../hooks/useStatistics';

const Statistics = () => {
  const { theme } = useContext(ThemeContext);
  const { statistics, loading, error } = useStatistics();

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="text-center">
          <Loader2 className="w-12 h-12 text-purple-500 animate-spin mx-auto mb-4" />
          <p className={`text-lg ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
            Loading community statistics...
          </p>
        </div>
      </div>
    );
  }

  if (error || !statistics) {
    return (
      <div className="text-center py-12">
        <div className="text-6xl mb-4">📊</div>
        <h3 className="text-xl font-semibold mb-2">Statistics Unavailable</h3>
        <p className={`text-gray-500 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
          Unable to load community statistics at the moment
        </p>
      </div>
    );
  }

  const stats = [
    {
      title: 'Total Items',
      value: statistics.totalItems,
      icon: Package,
      color: 'text-blue-500',
      bgColor: 'bg-blue-100 dark:bg-blue-900/30',
      description: 'Items in our community'
    },
    {
      title: 'Lost Items',
      value: statistics.lostItems,
      icon: Search,
      color: 'text-red-500',
      bgColor: 'bg-red-100 dark:bg-red-900/30',
      description: 'Currently lost items'
    },
    {
      title: 'Found Items',
      value: statistics.foundItems,
      icon: CheckCircle,
      color: 'text-green-500',
      bgColor: 'bg-green-100 dark:bg-green-900/30',
      description: 'Successfully found items'
    },
    {
      title: 'Recovery Rate',
      value: `${statistics.recoveryRate}%`,
      icon: TrendingUp,
      color: 'text-purple-500',
      bgColor: 'bg-purple-100 dark:bg-purple-900/30',
      description: 'Success rate'
    }
  ];

  return (
    <div className={`py-12 ${theme === 'dark' ? 'bg-gray-900' : 'bg-gray-50'}`}>
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className={`text-4xl font-bold mb-4 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
            Community Statistics
          </h2>
          <p className={`text-lg ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'} max-w-2xl mx-auto`}>
            See the impact of our community in helping people find their lost items
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className={`p-6 rounded-xl shadow-lg transition-all duration-300 hover:shadow-xl hover:-translate-y-1 ${
                theme === 'dark' ? 'bg-gray-800 border border-gray-700' : 'bg-white border border-gray-200'
              }`}
            >
              <div className="flex items-center justify-between mb-4">
                <div>
                  <p className={`text-sm font-medium ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                    {stat.title}
                  </p>
                  <p className={`text-3xl font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                    {stat.value}
                  </p>
                </div>
                <div className={`p-3 rounded-lg ${stat.bgColor}`}>
                  <stat.icon className={`w-6 h-6 ${stat.color}`} />
                </div>
              </div>
              <p className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                {stat.description}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Additional Community Info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className={`text-center p-8 rounded-2xl shadow-xl ${
            theme === 'dark' 
              ? 'bg-gradient-to-r from-purple-900/50 to-blue-900/50 border border-purple-700' 
              : 'bg-gradient-to-r from-purple-50 to-blue-50 border border-purple-200'
          }`}
        >
          <div className="flex items-center justify-center gap-2 mb-4">
            <Users className="w-6 h-6 text-purple-500" />
            <h3 className={`text-2xl font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
              Join Our Community
            </h3>
          </div>
          <p className={`text-lg mb-4 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
            Help us increase the recovery rate by reporting found items and helping others
          </p>
          <div className="flex items-center justify-center gap-4 text-sm">
            <div className="flex items-center gap-2">
              <Heart className="w-4 h-4 text-red-500" />
              <span className={theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}>
                Community-driven
              </span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-green-500" />
              <span className={theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}>
                Secure & Private
              </span>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Statistics;
