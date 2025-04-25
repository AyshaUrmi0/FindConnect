import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { ThemeContext } from "../context/Authcontext/ThemeContext";

const NotFound = () => {
  const navigate = useNavigate();
  const { theme } = useContext(ThemeContext);

  const handleGoHome = () => {
    navigate("/");
  };

  return (
    <div className={`flex flex-col items-center justify-center h-screen px-6 mt-6 text-center transition-colors duration-300 ${
      theme === 'light' 
        ? 'bg-gradient-to-br from-orange-100 via-red-200 to-orange-300' 
        : 'bg-gradient-to-br from-gray-800 via-gray-900 to-gray-800'
    }`}>
      {/* Lost Item Illustration */}
      <div className="animate-bounce">
        <img
          src="https://i.ibb.co.com/F4trxBb8/png-clipart-emoji-sadness-emoticon-smiley-sad-emoji-crying-imoji-face-sticker-thumbnail-removebg-pre.png" 
          alt="Lost Item Illustration"
          className="w-80 md:w-96"
        />
      </div>

      {/* Not Found Message */}
      <h1 className={`mt-6 text-4xl font-extrabold md:text-5xl ${
        theme === 'light' ? 'text-red-600' : 'text-red-400'
      }`}>
        Oops! Page Not Found
      </h1>
      <p className={`mt-2 text-lg md:text-xl ${
        theme === 'light' ? 'text-gray-700' : 'text-gray-300'
      }`}>
        It looks like this page is lost... just like some of the items on our site.
      </p>

      {/* Go Back Button */}
      <button
        onClick={handleGoHome}
        className={`px-6 py-3 mt-6 text-lg font-semibold text-white transition-all duration-300 rounded-full shadow-lg ${
          theme === 'light' 
            ? 'bg-red-500 hover:bg-red-600 hover:shadow-2xl' 
            : 'bg-red-600 hover:bg-red-700 hover:shadow-2xl'
        }`}
      >
        Go Back to Home
      </button>
    </div>
  );
};

export default NotFound;
