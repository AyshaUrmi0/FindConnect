import React, { useEffect, useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { ShoppingBag, Search, MapPin, Calendar, ArrowRight, Loader2 } from 'lucide-react';
import { ThemeContext } from '../../context/Authcontext/ThemeContext';

const LatestItems = () => {
  const { theme } = useContext(ThemeContext);
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("https://find-connect-server.vercel.app/Items")
      .then((res) => res.json())
      .then((data) => {
        setItems(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Loader2 className="w-12 h-12 text-yellow-500 animate-spin" />
      </div>
    );
  }

  return (
    <div className={`container px-4 mx-auto my-12 ${theme === 'dark' ? ' text-white' : ' text-black'}`}>
      {/* Hero Section */}
      <div className="relative mb-12 text-center">
        <h2 className="mb-4 text-3xl font-bold md:text-4xl lg:text-5xl">
          Recent Find & Lost Items
        </h2>
        <p className="max-w-2xl mx-auto md:text-lg">
          Have a recent find or lost item? Share it with the community and help others reconnect with their belongings.
        </p>
        <div className="absolute top-0 w-24 h-1 -translate-x-1/2 left-1/2" />
      </div>

      {/* Search Bar */}
      <div className={`relative max-w-2xl px-4 py-2 mx-auto mb-12 border border-gray-500 rounded-full shadow-lg ${
        theme === 'dark' ? 'bg-gray-800' : 'bg-white'
      }`}>
        <div className="flex items-center">
          <Search className="w-5 h-5" />
          <input
            type="text"
            placeholder="Search for items..."
            className={`w-full px-4 py-2 bg-transparent outline-none ${
              theme === 'dark' ? 'text-white placeholder-gray-400' : 'text-black placeholder-gray-500'
            }`}
          />
        </div>
      </div>

      {/* Items Grid */}
      <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((item) => (
          <div
            key={item._id}
            className={`overflow-hidden transition-transform duration-300 shadow-lg group rounded-xl hover:-translate-y-2 ${
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
            </div>
            
            <div className="p-6">
              <h3 className="mb-3 text-xl font-bold line-clamp-1">
                {item.title}
              </h3>
              <p className={`mb-4 text-sm line-clamp-2 ${
                theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
              }`}>
                {item.description}
              </p>
              
              <div className="flex items-center gap-4 mb-4 text-sm">
                <div className="flex items-center gap-1">
                  <MapPin className="w-4 h-4" />
                  <span>{item.location}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Calendar className="w-4 h-4" />
                  <span>{new Date(item.date).toLocaleDateString()}</span>
                </div>
              </div>

              <Link
                to={`/items/${item._id}`}
                className="flex items-center justify-center w-full gap-2 px-6 py-3 font-semibold text-purple-600 transition-colors border-2 border-purple-600 rounded-lg hover:bg-purple-600 hover:text-white group"
              >
                View Details
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          </div>
        ))}
      </div>

      {/* See All Button */}
      <div className="mt-12 text-center">
        <Link
          to="/allItems"
          className="inline-flex items-center gap-2 px-8 py-4 font-bold text-purple-600 transition-colors border-2 border-purple-600 rounded-full hover:bg-purple-600 hover:text-white group"
        >
          <ShoppingBag className="w-5 h-5" />
          See All Items
          <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
        </Link>
      </div>
    </div>
  );
};

export default LatestItems;