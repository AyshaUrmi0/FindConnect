import React from 'react';
import { PlusCircle, MapPin, Bell } from 'lucide-react';

const Banner = () => {
  return (
    <div className="relative h-[400px] sm:h-[450px] md:h-[500px] w-full overflow-hidden">
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
          <h1 className="mb-3 text-3xl font-bold text-white sm:text-4xl md:text-5xl sm:mb-4">
            Lost Something?<br />
            We'll Help You Find It
          </h1>
          <p className="mb-6 text-base text-gray-200 sm:text-lg sm:mb-8 max-w-prose">
            Your trusted platform for reconnecting lost items with their owners.
            Quick, secure, and community-driven.
          </p>

          {/* Action Buttons */}
          <div className="grid w-full max-w-lg grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-3 sm:gap-4">
  <button className="flex items-center justify-center gap-2 px-4 sm:px-6 py-2.5 sm:py-3 text-sm sm:text-base  border-2 border-purple-600 rounded-lg transition-colors hover:bg-purple-600 text-white">
    <PlusCircle className="w-4 h-4 sm:h-5 sm:w-5" />
    <span>Report Lost</span>
  </button>
  <button className="flex items-center justify-center gap-2 px-4 sm:px-6 py-2.5 sm:py-3 text-sm sm:text-base text-white border-2 border-purple-600 rounded-lg transition-colors hover:bg-purple-600 ">
    <MapPin className="w-4 h-4 sm:h-5 sm:w-5" />
    <span>Found Items</span>
  </button>
  <button className="flex items-center justify-center gap-2 px-4 sm:px-6 py-2.5 sm:py-3 text-sm sm:text-base  border-2 border-purple-600 rounded-lg transition-colors hover:bg-purple-600 text-white sm:col-span-2 md:col-span-1">
    <Bell className="w-4 h-4 sm:h-5 sm:w-5" />
    <span>Alerts</span>
  </button>
</div>

        </div>
      </div>
    </div>
  );
};

export default Banner;