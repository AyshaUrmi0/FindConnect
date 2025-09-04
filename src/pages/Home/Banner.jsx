import React, { useContext } from 'react';
import { ThemeContext } from '../../context/Authcontext/ThemeContext';
import { Link } from 'react-router-dom';
import { PlusCircle, MapPin, Bell } from 'lucide-react';

const Banner = () => {
  const { theme } = useContext(ThemeContext);

  return (
    <div className="relative pt-20 h-[350px] sm:h-[400px] md:h-[450px] lg:h-[500px] w-full overflow-hidden">
      {/* Banner Image */}
      <div className="absolute inset-0">
        <img
          src="https://i.ibb.co.com/rKK7vFwj/header-girl-mobile.jpg"
          alt="Lost and Found Banner"
          className="object-cover w-full h-full"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/50" />
      </div>

      {/* Content */}
      <div className="relative flex flex-col justify-center h-full px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <div className="max-w-2xl">
          <h1 className="mb-3 text-2xl font-bold text-white sm:text-3xl md:text-4xl lg:text-5xl sm:mb-4">
            Lost Something?<br />
            We'll Help You Find It
          </h1>
          <p className="mb-4 text-sm text-gray-200 sm:text-base md:text-lg sm:mb-6 lg:mb-8 max-w-prose">
            Your trusted platform for reconnecting lost items with their owners.
            Quick, secure, and community-driven.
          </p>

          {/* Action Buttons */}
          <div className="flex flex-col gap-3 sm:grid sm:grid-cols-2 lg:grid-cols-3 sm:gap-4 max-w-lg">
            <Link
              to="/addItems"
              className="flex items-center justify-center gap-2 px-4 py-3 text-sm sm:text-base border-2 border-purple-600 rounded-lg transition-colors hover:bg-purple-600 text-white font-medium"
            >
              <PlusCircle className="w-4 h-4 sm:w-5 sm:h-5" />
              <span>Report Lost</span>
            </Link>
            <Link
              to="/allItems"
              className="flex items-center justify-center gap-2 px-4 py-3 text-sm sm:text-base text-white border-2 border-purple-600 rounded-lg transition-colors hover:bg-purple-600 font-medium"
            >
              <MapPin className="w-4 h-4 sm:w-5 sm:h-5" />
              <span>Browse Items</span>
            </Link>
            <Link
              to="/myItems"
              className="flex items-center justify-center gap-2 px-4 py-3 text-sm sm:text-base border-2 border-purple-600 rounded-lg transition-colors hover:bg-purple-600 text-white font-medium sm:col-span-2 lg:col-span-1"
            >
              <Bell className="w-4 h-4 sm:w-5 sm:h-5" />
              <span>My Items</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Banner;