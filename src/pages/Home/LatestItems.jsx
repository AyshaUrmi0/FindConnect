import React, { useEffect, useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ShoppingBag, 
  Search, 
  MapPin, 
  Calendar, 
  ArrowRight, 
  Loader2,
  Heart,
  Share2,
  Eye,
  Tag,
  User,
  Clock,
  Filter,
  SortAsc,
  SortDesc
} from 'lucide-react';
import { ThemeContext } from '../../context/Authcontext/ThemeContext';

const LatestItems = () => {
  const { theme } = useContext(ThemeContext);
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredItems, setFilteredItems] = useState([]);
  const [sortBy, setSortBy] = useState('date');
  const [sortOrder, setSortOrder] = useState('desc');
  const [showFilters, setShowFilters] = useState(false);
  const [likedItems, setLikedItems] = useState([]);
  const [viewedItems, setViewedItems] = useState([]);

  useEffect(() => {
    fetch("https://find-connect-server.vercel.app/Items")
      .then((res) => res.json())
      .then((data) => {
        setItems(data);
        setFilteredItems(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    applyFilters();
  }, [searchQuery, sortBy, sortOrder, items]);

  const applyFilters = () => {
    let filtered = [...items];

    // Search filter
    if (searchQuery.trim()) {
      filtered = filtered.filter(
        (item) =>
          item.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
          item.description?.toLowerCase().includes(searchQuery.toLowerCase()) ||
          item.location?.toLowerCase().includes(searchQuery.toLowerCase()) ||
          item.category?.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Sorting
    filtered.sort((a, b) => {
      let aValue, bValue;
      
      switch (sortBy) {
        case 'date':
          aValue = new Date(a.date);
          bValue = new Date(b.date);
          break;
        case 'title':
          aValue = a.title?.toLowerCase();
          bValue = b.title?.toLowerCase();
          break;
        case 'location':
          aValue = a.location?.toLowerCase();
          bValue = b.location?.toLowerCase();
          break;
        default:
          aValue = new Date(a.date);
          bValue = new Date(b.date);
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

  const handleLike = (itemId) => {
    setLikedItems(prev => 
      prev.includes(itemId) 
        ? prev.filter(id => id !== itemId)
        : [...prev, itemId]
    );
  };

  const handleShare = (item) => {
    const text = `${item.title} - ${item.location} on FindConnect`;
    if (navigator.share) {
      navigator.share({
        title: 'FindConnect Item',
        text: text,
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(text);
    }
  };

  const handleView = (itemId) => {
    setViewedItems(prev => 
      prev.includes(itemId) ? prev : [...prev, itemId]
    );
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

  const getStatusColor = (status) => {
    switch (status) {
      case 'found':
        return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400';
      case 'notFound':
        return 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400';
      case 'returned':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-400';
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'found':
        return 'Found';
      case 'notFound':
        return 'Lost';
      case 'returned':
        return 'Returned';
      default:
        return 'Unknown';
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Loader2 className="w-12 h-12 text-purple-500 animate-spin" />
      </div>
    );
  }

  return (
    <div className={`container px-4 mx-auto my-12 ${theme === 'dark' ? 'text-white' : 'text-black'}`}>
      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative mb-12 text-center"
      >
        <h2 className="mb-4 text-3xl font-bold md:text-4xl lg:text-5xl">
          Recent Find & Lost Items
        </h2>
        <p className={`max-w-2xl mx-auto md:text-lg ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
          Have a recent find or lost item? Share it with the community and help others reconnect with their belongings.
        </p>
        <div className="absolute top-0 w-24 h-1 -translate-x-1/2 left-1/2 bg-gradient-to-r from-purple-500 to-blue-500" />
      </motion.div>

      {/* Search and Controls */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className={`max-w-4xl mx-auto p-6 rounded-2xl shadow-xl mb-8 ${
          theme === 'dark' ? 'bg-gray-800 border border-gray-700' : 'bg-white border border-gray-200'
        }`}
      >
        {/* Search Bar */}
        <div className="relative mb-6">
          <Search className="absolute left-3 top-1/2 w-5 h-5 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search for items..."
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

          <div className={`text-sm ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
            {filteredItems.length} items found
          </div>
        </div>
      </motion.div>

      {/* Items Grid */}
      <AnimatePresence mode="wait">
        {filteredItems.length === 0 ? (
          <motion.div
            key="no-results"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-12"
          >
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-xl font-semibold mb-2">No items found</h3>
            <p className={`text-gray-500 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
              {searchQuery ? 'Try adjusting your search criteria' : 'No items available at the moment'}
            </p>
          </motion.div>
        ) : (
          <motion.div
            key="items-grid"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
          >
            {filteredItems.map((item, index) => (
              <motion.div
                key={item._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className={`overflow-hidden transition-all duration-300 rounded-xl shadow-lg hover:shadow-xl hover:-translate-y-1 ${
                  theme === 'dark' ? 'bg-gray-800 border border-gray-700' : 'bg-white border border-gray-200'
                }`}
              >
                {/* Image Section */}
                <div className="relative overflow-hidden aspect-video group">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 transition-opacity duration-300 opacity-0 bg-gradient-to-t from-black/60 to-transparent group-hover:opacity-100" />
                  
                  {/* Status Badge */}
                  <div className="absolute top-3 left-3">
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(item.status)}`}>
                      {getStatusText(item.status)}
                    </span>
                  </div>

                  {/* Interactive Buttons */}
                  <div className="absolute top-3 right-3 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <motion.button
                      onClick={() => handleLike(item._id)}
                      className={`p-2 rounded-full transition-colors ${
                        likedItems.includes(item._id)
                          ? 'bg-red-500 text-white'
                          : 'bg-white/90 text-gray-700 hover:bg-red-500 hover:text-white'
                      }`}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <Heart className={`w-4 h-4 ${likedItems.includes(item._id) ? 'fill-current' : ''}`} />
                    </motion.button>
                    <motion.button
                      onClick={() => handleShare(item)}
                      className="p-2 rounded-full bg-white/90 text-gray-700 hover:bg-purple-500 hover:text-white transition-colors"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <Share2 className="w-4 h-4" />
                    </motion.button>
                  </div>

                  {/* Viewed Indicator */}
                  {viewedItems.includes(item._id) && (
                    <div className="absolute top-3 left-1/2 transform -translate-x-1/2">
                      <Eye className="w-4 h-4 text-white bg-black/50 rounded-full p-1" />
                    </div>
                  )}
                </div>

                {/* Content Section */}
                <div className="p-6">
                  <div className="flex items-start justify-between mb-3">
                    <h3 className={`text-lg font-semibold line-clamp-1 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                      {item.title}
                    </h3>
                  </div>

                  <p className={`mb-4 text-sm line-clamp-2 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
                    {item.description}
                  </p>

                  {/* Category Badge */}
                  {item.category && (
                    <div className="flex items-center gap-2 mb-3">
                      <Tag className="w-4 h-4 text-gray-500" />
                      <span className={`text-xs px-2 py-1 rounded-full ${
                        theme === 'dark' ? 'bg-gray-700 text-gray-300' : 'bg-gray-100 text-gray-600'
                      }`}>
                        {item.category}
                      </span>
                    </div>
                  )}

                  {/* Location and Date */}
                  <div className="flex items-center gap-4 mb-4 text-sm">
                    <div className="flex items-center gap-1">
                      <MapPin className="w-4 h-4 text-gray-500" />
                      <span className={theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}>
                        {item.location}
                      </span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="w-4 h-4 text-gray-500" />
                      <span className={theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}>
                        {getTimeAgo(item.date)}
                      </span>
                    </div>
                  </div>

                  {/* User Info */}
                  {item.contactInfo?.name && (
                    <div className="flex items-center gap-2 mb-4 text-sm">
                      <User className="w-4 h-4 text-gray-500" />
                      <span className={theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}>
                        {item.contactInfo.name}
                      </span>
                    </div>
                  )}

                  {/* View Details Button */}
                  <Link
                    to={`/items/${item._id}`}
                    onClick={() => handleView(item._id)}
                    className="flex items-center justify-center w-full gap-2 px-4 py-2 font-semibold text-purple-600 transition-colors border-2 border-purple-600 rounded-lg hover:bg-purple-600 hover:text-white group"
                  >
                    View Details
                    <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                  </Link>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* See All Button */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        className="mt-12 text-center"
      >
        <Link
          to="/allItems"
          className="inline-flex items-center gap-2 px-8 py-4 font-bold text-purple-600 transition-colors border-2 border-purple-600 rounded-full hover:bg-purple-600 hover:text-white group"
        >
          <ShoppingBag className="w-5 h-5" />
          See All Items
          <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
        </Link>
      </motion.div>
    </div>
  );
};

export default LatestItems;