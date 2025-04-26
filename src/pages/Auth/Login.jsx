import React, { useContext, useState } from "react";
import { useNavigate, Link, useLocation } from "react-router-dom";
import Lottie from "lottie-react";
import { toast } from "react-toastify";
import { GoogleButton } from "react-google-button";
import loginAnimation from '../../assets/Lottie/Login.json';
import Authcontext from "../../context/Authcontext/Authcontext";
import axios from "axios";
import { ThemeContext } from "../../context/Authcontext/ThemeContext";

const Login = () => {
  const { theme } = useContext(ThemeContext);
  const navigate = useNavigate();
  const { signInUser, signInWithGoogle, user, loading } = useContext(Authcontext);
  const location = useLocation();
  const from = location.state || { from: { pathname: "/" } };
  
  // State for form controls
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleLogin = (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    const { email, password } = formData;
    console.log("Logging in with", { email, password });

    signInUser(email, password)
      .then((result) => {
        console.log('signing  ', result.user.email);
        const user = { email: email };
        
        axios.post('https://find-connect-server.vercel.app/jwt', user, { withCredentials: true })
          .then(res => {
            console.log(res.data);
          })
          .catch(err => {
            console.log("JWT Error:", err);
          });

        console.log(user);
        navigate(from.from.pathname);
        toast.success("Login successful!");
      })
      .catch((error) => {
        console.log(error);
        if (error.code === 'auth/invalid-credential') {
          toast.error("User not found. Please register first.");
        } else {
          toast.error(error.code === 'auth/invalid-email' ? 'Please enter a valid email address' : error.message);
        }
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const handleGoogleSignIn = () => {
    setIsLoading(true);
    
    signInWithGoogle()
      .then((result) => {
        const user = result.user;
        console.log("Google sign-in successful:", user);
        navigate(from.from.pathname);
        toast.success("Google login successful!");
      })
      .catch((error) => {
        console.log(error);
        toast.error("Google login failed: " + error.message);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const getInputClasses = () => {
    return `w-full px-3 py-2 mt-1 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300 ${
      theme === "dark" 
        ? "bg-gray-700 text-white placeholder-gray-300 border-gray-600" 
        : "bg-white border-gray-300"
    }`;
  };

  return (
    <div className={`flex items-center justify-center min-h-screen ${theme === "dark" ? "bg-gray-900 text-gray-200" : "bg-blue-50 text-gray-800"}`}>
      <div className="flex flex-col-reverse w-full max-w-5xl p-6 rounded-lg shadow-lg md:flex-row bg-opacity-90 backdrop-filter backdrop-blur-sm">
        {/* Left side: Form */}
        <div className="flex-1 p-4 lg:p-8">
          <h1 className="mb-6 text-3xl font-bold text-center text-blue-600">Welcome Back</h1>
          
          <form onSubmit={handleLogin} aria-label="Login form">
            {/* Email Input */}
            <div className="mt-4">
              <label htmlFor="email" className="block text-sm font-medium">Email Address</label>
              <input
                id="email"
                type="email"
                name="email"
                placeholder="name@example.com"
                value={formData.email}
                onChange={handleInputChange}
                className={getInputClasses()}
                required
                aria-required="true"
              />
            </div>

            {/* Password Input with toggle visibility */}
            <div className="mt-4">
              <div className="flex justify-between">
                <label htmlFor="password" className="block text-sm font-medium">Password</label>
                <Link to="/forgot-password" className="text-xs text-blue-600 hover:underline focus:outline-none focus:underline">
                  Forgot Password?
                </Link>
              </div>
              <div className="relative">
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="Enter your password"
                  value={formData.password}
                  onChange={handleInputChange}
                  className={getInputClasses()}
                  required
                  aria-required="true"
                />
                <button 
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 flex items-center px-3 text-sm"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? "Hide" : "Show"}
                </button>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading || !formData.email || !formData.password}
              className="w-full py-3 mt-6 text-white transition-colors duration-300 rounded-lg bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 disabled:opacity-70"
              aria-label="Sign in to your account"
            >
              {isLoading ? "Signing In..." : "Sign In"}
            </button>

            {/* OR divider */}
            <div className="flex items-center my-6">
              <div className="flex-1 border-t border-gray-300"></div>
              <span className="px-4 text-sm text-gray-500">OR</span>
              <div className="flex-1 border-t border-gray-300"></div>
            </div>

            {/* Google Sign In Button */}
            <div className="flex items-center justify-center w-full">
              <GoogleButton 
                onClick={handleGoogleSignIn} 
                disabled={isLoading}
                style={{ width: '100%', borderRadius: '8px', opacity: isLoading ? 0.7 : 1 }}
              />
            </div>
          </form>

          {/* Register link */}
          <p className="mt-6 text-sm text-center">
            Don't have an account?{" "}
            <Link to="/register" className="font-medium text-blue-600 hover:underline focus:outline-none focus:underline">
              Create Account
            </Link>
          </p>
        </div>

        {/* Right side: Lottie Animation */}
        <div className="items-center justify-center flex-1 hidden p-4 md:flex">
          <Lottie animationData={loginAnimation} loop={true} aria-hidden="true" />
        </div>
      </div>
    </div>
  );
};

export default Login;