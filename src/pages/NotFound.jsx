// import "animate.css";
import { useNavigate } from "react-router-dom";

const NotFound = () => {
  const navigate = useNavigate();

  const handleGoHome = () => {
    navigate("/");
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen text-center bg-gray-100">
     
      <div className="animate__animated animate__bounce">
        <img
          src="https://i.ibb.co.com/7jxYptg/6325254.jpg"
          alt="404 Not Found"
          className="w-full max-w-md mx-auto"
        />
      </div>
   
      <div className="animate__animated animate__fadeInDown animate__delay-1s">
        <h1 className="mt-4 text-4xl font-bold text-red-600">Oops! Page Not Found</h1>
        <p className="mt-2 text-gray-500">Sorry, the page you’re looking for doesn’t exist.</p>
      </div>
   
      <div className="animate__animated animate__fadeInUp animate__delay-2s">
        <button
          onClick={handleGoHome}
          className="px-4 py-2 mt-6 text-white transition-all duration-300 bg-red-400 rounded hover:bg-red-100"
        >
          Go Back to Home
        </button>
      </div>
    </div>
  );
};

export default NotFound;
