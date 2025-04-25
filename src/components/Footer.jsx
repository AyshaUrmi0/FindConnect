import React, { useContext } from "react";
import { ThemeContext } from "../context/Authcontext/ThemeContext";

const Footer = () => {
  const { theme } = useContext(ThemeContext);

  return (
    <footer className={`${theme === 'light' ? 'bg-white text-gray-900' : 'bg-gray-900 text-white'} transition-colors duration-300`}>
      <div className="container px-4 py-10 mx-auto">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          <div>
            <h3 className={`text-xl font-bold ${theme === 'light' ? 'text-gray-900' : 'text-white'}`}>FindConnect</h3>
            <p className={`mt-2 text-sm ${theme === 'light' ? 'text-gray-700' : 'text-gray-300'}`}>
              FindConnect is a platform to connect people who have lost items with those who have found them. Together, we can recover lost belongings and make a difference.
            </p>
          </div>
    
          <div>
            <h3 className={`text-xl font-bold ${theme === 'light' ? 'text-gray-900' : 'text-white'}`}>Quick Links</h3>
            <ul className="mt-4 space-y-2">
              <li><a href="/" className={`${theme === 'light' ? 'text-gray-700' : 'text-gray-300'} hover:text-primary transition-colors duration-200`}>Home</a></li>
              <li><a href="/allItems" className={`${theme === 'light' ? 'text-gray-700' : 'text-gray-300'} hover:text-primary transition-colors duration-200`}>Lost & Found Items</a></li>
              <li><a href="/addItems" className={`${theme === 'light' ? 'text-gray-700' : 'text-gray-300'} hover:text-primary transition-colors duration-200`}>Add Lost Item</a></li>
              <li><a href="/login" className={`${theme === 'light' ? 'text-gray-700' : 'text-gray-300'} hover:text-primary transition-colors duration-200`}>Login</a></li>
            </ul>
          </div>
    
          <div>
            <h3 className={`text-xl font-bold ${theme === 'light' ? 'text-gray-900' : 'text-white'}`}>Follow Us</h3>
            <div className="mt-4 space-x-4">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className={`${theme === 'light' ? 'text-gray-700' : 'text-gray-300'} hover:text-primary transition-colors duration-200`}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" className="inline-block w-6 h-6" viewBox="0 0 24 24">
                  <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.661c0-.935.182-1.339 1.149-1.339h2.851v-5h-3.924c-4.139 0-6.076 2.019-6.076 5.385v2.615z" />
                </svg>
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className={`${theme === 'light' ? 'text-gray-700' : 'text-gray-300'} hover:text-primary transition-colors duration-200`}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" className="inline-block w-6 h-6" viewBox="0 0 24 24">
                  <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.956-2.178-1.555-3.594-1.555-2.717 0-4.916 2.198-4.916 4.917 0 .386.044.762.127 1.124-4.083-.205-7.699-2.159-10.126-5.134-.423.725-.666 1.562-.666 2.457 0 1.694.863 3.186 2.177 4.063-.802-.026-1.555-.246-2.212-.614v.061c0 2.367 1.685 4.342 3.918 4.787-.41.111-.844.171-1.292.171-.315 0-.624-.03-.927-.086.625 1.956 2.444 3.379 4.6 3.419-1.68 1.319-3.808 2.105-6.115 2.105-.398 0-.791-.023-1.175-.069 2.181 1.398 4.768 2.213 7.548 2.213 9.051 0 14.002-7.497 14.002-13.986 0-.213-.005-.425-.015-.636.962-.694 1.797-1.562 2.457-2.549z" />
                </svg>
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className={`${theme === 'light' ? 'text-gray-700' : 'text-gray-300'} hover:text-primary transition-colors duration-200`}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" className="inline-block w-6 h-6" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 1.366.062 2.633.333 3.608 1.308.975.975 1.246 2.242 1.308 3.608.058 1.266.07 1.646.07 4.851s-.012 3.584-.07 4.85c-.062 1.366-.333 2.633-1.308 3.608-.975.975-2.242 1.246-3.608 1.308-1.266.058-1.646.07-4.851.07s-3.584-.012-4.85-.07c-1.366-.062-2.633-.333-3.608-1.308-.975-.975-1.246-2.242-1.308-3.608-.058-1.266-.07-1.646-.07-4.851s.012-3.584.07-4.85c.062-1.366.333-2.633 1.308-3.608.975-.975 2.242-1.246 3.608-1.308 1.266-.058 1.646-.07 4.851-.07zm0-2.163c-3.259 0-3.667.012-4.947.071-1.327.062-2.56.354-3.608 1.401-1.048 1.048-1.339 2.281-1.401 3.608-.059 1.28-.071 1.689-.071 4.947s.012 3.667.071 4.947c.062 1.327.354 2.56 1.401 3.608 1.048 1.048 2.281 1.339 3.608 1.401 1.28.059 1.689.071 4.947.071s3.667-.012 4.947-.071c1.327-.062 2.56-.354 3.608-1.401 1.048-1.048 1.339-2.281 1.401-3.608.059-1.28.071-1.689.071-4.947s-.012-3.667-.071-4.947c-.062-1.327-.354-2.56-1.401-3.608-1.048-1.048-2.281-1.339-3.608-1.401-1.28-.059-1.689-.071-4.947-.071z" />
                  <circle cx="12" cy="12" r="3.5" />
                  <path d="M16.5 7.5c-.828 0-1.5.672-1.5 1.5s.672 1.5 1.5 1.5 1.5-.672 1.5-1.5-.672-1.5-1.5-1.5z" />
                </svg>
              </a>
            </div>
          </div>
        </div>
    
        <div className={`mt-8 border-t ${theme === 'light' ? 'border-gray-200' : 'border-gray-700'} transition-colors duration-300`}></div>
    
        <div className="mt-4 text-center">
          <p className={`text-sm ${theme === 'light' ? 'text-gray-700' : 'text-gray-300'}`}>&copy; {new Date().getFullYear()} FindConnect. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

