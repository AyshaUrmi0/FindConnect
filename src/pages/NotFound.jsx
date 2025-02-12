import { useNavigate } from "react-router-dom";

const NotFound = () => {
  const navigate = useNavigate();

  const handleGoHome = () => {
    navigate("/");
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen px-6 mt-6 text-center bg-gradient-to-br from-orange-100 via-red-200 to-orange-300">
      {/* Lost Item Illustration */}
      <div className="animate-bounce">
        <img
          src="https://i.ibb.co.com/F4trxBb8/png-clipart-emoji-sadness-emoticon-smiley-sad-emoji-crying-imoji-face-sticker-thumbnail-removebg-pre.png" 
          alt="Lost Item Illustration"
          className="w-80 md:w-96"
        />
      </div>

      {/* Not Found Message */}
      <h1 className="mt-6 text-4xl font-extrabold text-red-600 md:text-5xl">
        Oops! Page Not Found
      </h1>
      <p className="mt-2 text-lg text-gray-700 md:text-xl">
        It looks like this page is lost... just like some of the items on our site.
      </p>

      {/* Go Back Button */}
      <button
        onClick={handleGoHome}
        className="px-6 py-3 mt-6 text-lg font-semibold text-white transition-all duration-300 bg-red-500 rounded-full shadow-lg hover:bg-red-600 hover:shadow-2xl"
      >
        Go Back to Home
      </button>
    </div>
  );
};

export default NotFound;
