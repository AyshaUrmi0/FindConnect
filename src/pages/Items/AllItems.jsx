import React, { useEffect, useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { Search, MapPin, Calendar, ArrowRight, Loader2, Filter, SortAsc, SortDesc, X, Eye, Heart, Share2, Tag, Clock, User } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { ThemeContext } from '../../context/Authcontext/ThemeContext';

const AllItems = () => {
  const { theme } = useContext(ThemeContext);
  const [items, setItems] = useState([]); 
  const [searchQuery, setSearchQuery] = useState(""); 
  const [filteredItems, setFilteredItems] = useState([]); 
  const [loading, setLoading] = useState(true);
  const [showFilters, setShowFilters] = useState(false);
  const [sortBy, setSortBy] = useState('date');
  const [sortOrder, setSortOrder] = useState('desc');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [likedItems, setLikedItems] = useState(new Set());
  const [viewedItems, setViewedItems] = useState(new Set());

  const categories = [
    'Electronics', 'Accessories', 'Personal Items', 'Pets', 'Bags', 'Documents', 'Clothing', 'Books', 'Sports', 'Other'
  ];

  const statuses = ['Lost', 'Found', 'Returned'];

  useEffect(() => {
    setLoading(true);
    fetch("https://find-connect-server.vercel.app/allItems")
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
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
  }, [searchQuery, sortBy, sortOrder, selectedCategory, selectedStatus, items]);

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

    // Category filter
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(item => item.category === selectedCategory);
    }

    // Status filter
    if (selectedStatus !== 'all') {
      filtered = filtered.filter(item => item.status === selectedStatus);
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
    const newLiked = new Set(likedItems);
    if (newLiked.has(itemId)) {
      newLiked.delete(itemId);
    } else {
      newLiked.add(itemId);
    }
    setLikedItems(newLiked);
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
      // You could add a toast notification here
    }
  };

  const handleView = (itemId) => {
    setViewedItems(prev => new Set([...prev, itemId]));
  };

  const clearFilters = () => {
    setSearchQuery("");
    setSelectedCategory('all');
    setSelectedStatus('all');
    setSortBy('date');
    setSortOrder('desc');
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
        <Loader2 className="w-12 h-12 text-purple-600 animate-spin" />
      </div>
    );
  }

  return (
    <div className={`container p-4 mx-auto my-8 mt-20 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
      {/* Header Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center mb-8"
      >
        <h2 className="mb-4 text-3xl font-bold text-purple-600">
          All Find & Lost Items
        </h2>
        <p className={`max-w-3xl mx-auto text-lg ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
          Every lost item has a story to tell. Whether it's a child's favorite toy, a family photo album, or a vital piece of identification, every item has sentimental value and deserves to be back in the hands of the person who needs it most.
        </p>
        <div className="mt-4 text-sm text-gray-500">
          {filteredItems.length} items found
        </div>
      </motion.div>

      {/* Search and Filter Section */}
      <div className="mb-8 space-y-4">
        {/* Search Bar */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 w-5 h-5 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search by title, description, location, or category..."
            value={searchQuery}
            onChange={handleSearch}
            className={`w-full pl-10 pr-4 py-3 border rounded-lg shadow-sm focus:ring-2 focus:ring-purple-500 focus:border-transparent ${
              theme === 'dark' 
                ? 'bg-gray-800 border-gray-700 text-white placeholder-gray-400' 
                : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
            }`}
          />
        </div>

        {/* Filter Controls */}
        <div className="flex flex-wrap items-center gap-4">
          <motion.button
            onClick={() => setShowFilters(!showFilters)}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg border transition-colors ${
              theme === 'dark' 
                ? 'bg-gray-800 border-gray-700 hover:bg-gray-700' 
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
                ? 'bg-gray-800 border-gray-700 text-white' 
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
                ? 'bg-gray-800 border-gray-700 hover:bg-gray-700' 
                : 'bg-white border-gray-300 hover:bg-gray-50'
            }`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {sortOrder === 'asc' ? <SortAsc className="w-4 h-4" /> : <SortDesc className="w-4 h-4" />}
            {sortOrder === 'asc' ? 'Ascending' : 'Descending'}
          </motion.button>

          {(searchQuery || selectedCategory !== 'all' || selectedStatus !== 'all') && (
            <motion.button
              onClick={clearFilters}
              className="flex items-center gap-2 px-4 py-2 text-red-600 border border-red-600 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <X className="w-4 h-4" />
              Clear
            </motion.button>
          )}
        </div>

        {/* Advanced Filters */}
        <AnimatePresence>
          {showFilters && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className={`p-4 rounded-lg border ${
                theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-gray-50 border-gray-200'
              }`}
            >
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <div>
                  <label className="block mb-2 text-sm font-medium">Category</label>
                  <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className={`w-full px-3 py-2 rounded-lg border ${
                      theme === 'dark' 
                        ? 'bg-gray-700 border-gray-600 text-white' 
                        : 'bg-white border-gray-300 text-gray-900'
                    }`}
                  >
                    <option value="all">All Categories</option>
                    {categories.map(category => (
                      <option key={category} value={category}>{category}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block mb-2 text-sm font-medium">Status</label>
                  <select
                    value={selectedStatus}
                    onChange={(e) => setSelectedStatus(e.target.value)}
                    className={`w-full px-3 py-2 rounded-lg border ${
                      theme === 'dark' 
                        ? 'bg-gray-700 border-gray-600 text-white' 
                        : 'bg-white border-gray-300 text-gray-900'
                    }`}
                  >
                    <option value="all">All Status</option>
                    {statuses.map(status => (
                      <option key={status} value={status}>{status}</option>
                    ))}
                  </select>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

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
              Try adjusting your search criteria or filters
            </p>
          </motion.div>
        ) : (
          <motion.div
            key="items-grid"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
          >
            {filteredItems.map((item, index) => (
              <motion.div
                key={item._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className={`overflow-hidden transition-all duration-300 shadow-lg group rounded-xl hover:-translate-y-2 ${
                  theme === 'dark' ? 'bg-gray-800' : 'bg-white'
                }`}
              >
                <div className="relative overflow-hidden aspect-video">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 transition-opacity duration-300 opacity-0 bg-gradient-to-t from-black/60 to-transparent group-hover:opacity-100" />
                  
                  {/* Status Badge */}
                  <div className="absolute top-2 left-2">
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                      item.status === 'Lost' ? 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200' :
                      item.status === 'Found' ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' :
                      'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200'
                    }`}>
                      {item.status}
                    </span>
                  </div>

                  {/* Action Buttons */}
                  <div className="absolute top-2 right-2 flex gap-2">
                    <motion.button
                      onClick={() => handleLike(item._id)}
                      className="p-2 bg-white/90 rounded-full hover:bg-white transition-colors"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <Heart className={`w-4 h-4 ${likedItems.has(item._id) ? 'text-red-500 fill-current' : 'text-gray-600'}`} />
                    </motion.button>
                    <motion.button
                      onClick={() => handleShare(item)}
                      className="p-2 bg-white/90 rounded-full hover:bg-white transition-colors"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <Share2 className="w-4 h-4 text-gray-600" />
                    </motion.button>
                  </div>
                </div>
                
                <div className="p-4">
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="text-lg font-bold line-clamp-1 flex-1">
                      {item.title}
                    </h3>
                    {viewedItems.has(item._id) && (
                      <Eye className="w-4 h-4 text-blue-500" />
                    )}
                  </div>
                  
                  <p className={`mb-3 text-sm line-clamp-2 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
                    {item.description}
                  </p>

                  {/* Category Badge */}
                  {item.category && (
                    <div className="mb-3">
                      <span className="inline-flex items-center gap-1 px-2 py-1 text-xs font-medium text-purple-700 bg-purple-100 rounded-full dark:bg-purple-900 dark:text-purple-300">
                        <Tag className="w-3 h-3" />
                        {item.category}
                      </span>
                    </div>
                  )}
                  
                  <div className="space-y-2 mb-4 text-sm">
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-gray-500" />
                      <span className={theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}>{item.location}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4 text-gray-500" />
                      <span className={theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}>{getTimeAgo(item.date)}</span>
                    </div>
                    {item.user && (
                      <div className="flex items-center gap-2">
                        <User className="w-4 h-4 text-gray-500" />
                        <span className={theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}>{item.user}</span>
                      </div>
                    )}
                  </div>

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
    </div>
  );
};

export default AllItems;
