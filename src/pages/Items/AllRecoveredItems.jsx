import React, { useContext, useEffect, useState } from "react";
import { FaTh, FaList } from "react-icons/fa";
import Authcontext from "../../context/Authcontext/Authcontext";
import { ThemeContext } from "../../context/Authcontext/ThemeContext";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Grid3X3, 
  List, 
  MapPin, 
  Calendar, 
  User, 
  CheckCircle, 
  Award,
  TrendingUp,
  Clock,
  Eye,
  Share2,
  ArrowLeft,
  Search,
  Filter,
  SortAsc,
  SortDesc
} from "lucide-react";
import Loading from "../../layouts/Loading";

const AllRecoveredItems = () => {
  const { user } = useContext(Authcontext);
  const { theme } = useContext(ThemeContext);
  const [recoveredItems, setRecoveredItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isTableLayout, setIsTableLayout] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredItems, setFilteredItems] = useState([]);
  const [sortBy, setSortBy] = useState('date');
  const [sortOrder, setSortOrder] = useState('desc');
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    if (user?.email) {
      fetch(`https://find-connect-server.vercel.app/recoveredItems`)
        .then((res) => res.json())
        .then((data) => {
          setRecoveredItems(data);
          setFilteredItems(data);
          setLoading(false);
        })
        .catch((err) => {
          console.error(err);
          setLoading(false);
        });
    }
  }, [user]);

  useEffect(() => {
    applyFilters();
  }, [searchQuery, sortBy, sortOrder, recoveredItems]);

  const applyFilters = () => {
    let filtered = [...recoveredItems];

    // Search filter
    if (searchQuery.trim()) {
      filtered = filtered.filter(
        (item) =>
          item.itemDetails?.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
          item.recoveredLocation?.toLowerCase().includes(searchQuery.toLowerCase()) ||
          item.recoveredBy?.name?.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Sorting
    filtered.sort((a, b) => {
      let aValue, bValue;
      
      switch (sortBy) {
        case 'date':
          aValue = new Date(a.recoveredDate);
          bValue = new Date(b.recoveredDate);
          break;
        case 'title':
          aValue = a.itemDetails?.title?.toLowerCase();
          bValue = b.itemDetails?.title?.toLowerCase();
          break;
        case 'location':
          aValue = a.recoveredLocation?.toLowerCase();
          bValue = b.recoveredLocation?.toLowerCase();
          break;
        default:
          aValue = new Date(a.recoveredDate);
          bValue = new Date(b.recoveredDate);
      }

      if (sortOrder === 'asc') {
        return aValue > bValue ? 1 : -1;
      } else {
        return aValue < bValue ? 1 : -1;
      }
    });

    setFilteredItems(filtered);
  };

  const handleSearch = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleShare = (item) => {
    const text = `${item.itemDetails?.title} was recovered at ${item.recoveredLocation} on FindConnect`;
    if (navigator.share) {
      navigator.share({
        title: 'FindConnect Recovered Item',
        text: text,
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(text);
    }
  };

  const getTimeAgo = (date) => {
    const now = new Date();
    const itemDate = new Date(date);
    const diffInHours = Math.floor((now - itemDate) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return 'Just now';
    if (diffInHours < 24) return `${diffInHours}h ago`;
    if (diffInHours < 168) return `${Math.floor(diffInHours / 24)}d ago`;
    return `${Math.floor(diffInHours / 168)}w ago`;
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Loading />
      </div>
    );
  }

  return (
    <div className={`min-h-screen ${theme === 'dark' ? 'bg-gray-900' : 'bg-gray-50'}`}>
      <div className="container px-4 py-8 mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8"
        >
          <div className="flex items-center justify-center gap-2 mb-4">
            <motion.button
              onClick={() => window.history.back()}
              className={`p-2 rounded-full transition-colors ${
                theme === 'dark' ? 'hover:bg-gray-800' : 'hover:bg-gray-200'
              }`}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <ArrowLeft className="w-5 h-5" />
            </motion.button>
            <h1 className={`text-4xl font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
              Recovered Items
            </h1>
          </div>
          <p className={`text-lg ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
            Successfully reunited items with their owners
          </p>
          <div className="mt-4 text-sm text-gray-500">
            {filteredItems.length} items recovered
          </div>
        </motion.div>

        {/* Search and Controls */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className={`max-w-6xl mx-auto p-6 rounded-2xl shadow-xl mb-8 ${
            theme === 'dark' ? 'bg-gray-800 border border-gray-700' : 'bg-white border border-gray-200'
          }`}
        >
          {/* Search Bar */}
          <div className="relative mb-6">
            <Search className="absolute left-3 top-1/2 w-5 h-5 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search recovered items..."
              value={searchQuery}
              onChange={handleSearch}
              className={`w-full pl-10 pr-4 py-3 border rounded-lg shadow-sm focus:ring-2 focus:ring-purple-500 focus:border-transparent ${
                theme === 'dark' 
                  ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' 
                  : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
              }`}
            />
          </div>

          {/* Controls */}
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <motion.button
                onClick={() => setShowFilters(!showFilters)}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg border transition-colors ${
                  theme === 'dark' 
                    ? 'bg-gray-700 border-gray-600 hover:bg-gray-600' 
                    : 'bg-white border-gray-300 hover:bg-gray-50'
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Filter className="w-4 h-4" />
                Filters
              </motion.button>

              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className={`px-4 py-2 rounded-lg border ${
                  theme === 'dark' 
                    ? 'bg-gray-700 border-gray-600 text-white' 
                    : 'bg-white border-gray-300 text-gray-900'
                }`}
              >
                <option value="date">Date</option>
                <option value="title">Title</option>
                <option value="location">Location</option>
              </select>

              <motion.button
                onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg border transition-colors ${
                  theme === 'dark' 
                    ? 'bg-gray-700 border-gray-600 hover:bg-gray-600' 
                    : 'bg-white border-gray-300 hover:bg-gray-50'
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {sortOrder === 'asc' ? <SortAsc className="w-4 h-4" /> : <SortDesc className="w-4 h-4" />}
                {sortOrder === 'asc' ? 'Ascending' : 'Descending'}
              </motion.button>
            </div>

            <motion.button
              onClick={() => setIsTableLayout(!isTableLayout)}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                theme === 'dark' 
                  ? 'bg-purple-600 hover:bg-purple-700' 
                  : 'bg-purple-600 hover:bg-purple-700'
              } text-white`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {isTableLayout ? (
                <>
                  <Grid3X3 className="w-4 h-4" />
                  <span>Grid View</span>
                </>
              ) : (
                <>
                  <List className="w-4 h-4" />
                  <span>Table View</span>
                </>
              )}
            </motion.button>
          </div>
        </motion.div>

        {/* Content */}
        <AnimatePresence mode="wait">
          {filteredItems.length === 0 ? (
            <motion.div
              key="no-results"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center py-12"
            >
              <div className="text-6xl mb-4">🎉</div>
              <h3 className="text-xl font-semibold mb-2">No recovered items found</h3>
              <p className={`text-gray-500 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                {searchQuery ? 'Try adjusting your search criteria' : 'No items have been recovered yet'}
              </p>
            </motion.div>
          ) : (
            <motion.div
              key="content"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className={`max-w-6xl mx-auto p-6 rounded-2xl shadow-xl ${
                theme === 'dark' ? 'bg-gray-800 border border-gray-700' : 'bg-white border border-gray-200'
              }`}
            >
              {isTableLayout ? (
                // Table Layout
                <div className="overflow-x-auto">
                  <table className="w-full text-sm border-collapse md:text-base">
                    <thead>
                      <tr className={`${theme === 'dark' ? 'bg-gray-700' : 'bg-gray-50'}`}>
                        <th className={`px-4 py-3 text-left font-semibold ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                          Item Title
                        </th>
                        <th className={`px-4 py-3 text-left font-semibold ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                          Recovered Location
                        </th>
                        <th className={`px-4 py-3 text-left font-semibold ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                          Recovered Date
                        </th>
                        <th className={`px-4 py-3 text-left font-semibold ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                          Recovered By
                        </th>
                        <th className={`px-4 py-3 text-left font-semibold ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredItems.map((item, index) => (
                        <motion.tr
                          key={item._id}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.5, delay: index * 0.1 }}
                          className={`border-b ${theme === 'dark' ? 'border-gray-700 hover:bg-gray-700' : 'border-gray-200 hover:bg-gray-50'}`}
                        >
                          <td className="px-4 py-3">
                            <div className="flex items-center gap-2">
                              <CheckCircle className="w-4 h-4 text-green-500" />
                              <span className={`font-medium ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                                {item.itemDetails?.title}
                              </span>
                            </div>
                          </td>
                          <td className="px-4 py-3">
                            <div className="flex items-center gap-2">
                              <MapPin className="w-4 h-4 text-gray-500" />
                              <span className={theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}>
                                {item.recoveredLocation}
                              </span>
                            </div>
                          </td>
                          <td className="px-4 py-3">
                            <div className="flex items-center gap-2">
                              <Calendar className="w-4 h-4 text-gray-500" />
                              <span className={theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}>
                                {new Date(item.recoveredDate).toLocaleDateString()}
                              </span>
                            </div>
                          </td>
                          <td className="px-4 py-3">
                            <div className="flex items-center gap-2">
                              <User className="w-4 h-4 text-gray-500" />
                              <span className={theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}>
                                {item.recoveredBy?.name}
                              </span>
                            </div>
                          </td>
                          <td className="px-4 py-3">
                            <motion.button
                              onClick={() => handleShare(item)}
                              className="p-2 text-gray-500 hover:text-purple-600 transition-colors"
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.9 }}
                            >
                              <Share2 className="w-4 h-4" />
                            </motion.button>
                          </td>
                        </motion.tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                // Card Layout
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                  {filteredItems.map((item, index) => (
                    <motion.div
                      key={item._id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      className={`p-6 rounded-xl shadow-lg transition-all duration-300 hover:shadow-xl hover:-translate-y-1 ${
                        theme === 'dark' ? 'bg-gray-700 border border-gray-600' : 'bg-white border border-gray-200'
                      }`}
                    >
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex items-center gap-2">
                          <CheckCircle className="w-5 h-5 text-green-500" />
                          <h3 className={`text-lg font-semibold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                            {item.itemDetails?.title}
                          </h3>
                        </div>
                        <motion.button
                          onClick={() => handleShare(item)}
                          className="p-2 text-gray-500 hover:text-purple-600 transition-colors"
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                        >
                          <Share2 className="w-4 h-4" />
                        </motion.button>
                      </div>

                      <div className="space-y-3">
                        <div className="flex items-center gap-2">
                          <MapPin className="w-4 h-4 text-gray-500" />
                          <span className={`text-sm ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
                            <span className="font-medium">Location:</span> {item.recoveredLocation}
                          </span>
                        </div>

                        <div className="flex items-center gap-2">
                          <Calendar className="w-4 h-4 text-gray-500" />
                          <span className={`text-sm ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
                            <span className="font-medium">Date:</span> {new Date(item.recoveredDate).toLocaleDateString()}
                          </span>
                        </div>

                        <div className="flex items-center gap-2">
                          <User className="w-4 h-4 text-gray-500" />
                          <span className={`text-sm ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
                            <span className="font-medium">By:</span> {item.recoveredBy?.name}
                          </span>
                        </div>

                        <div className="flex items-center gap-2">
                          <Clock className="w-4 h-4 text-gray-500" />
                          <span className={`text-sm ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
                            {getTimeAgo(item.recoveredDate)}
                          </span>
                        </div>
                      </div>

                      <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-600">
                        <div className="flex items-center gap-2 text-green-600 dark:text-green-400">
                          <Award className="w-4 h-4" />
                          <span className="text-sm font-medium">Successfully Recovered</span>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default AllRecoveredItems;
