import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Lottie from "lottie-react";
import registerAnimation from '../../assets/Lottie/Register.json';
import Authcontext from "../../context/Authcontext/Authcontext";
import { ThemeContext } from "../../context/Authcontext/ThemeContext";

const Register = () => {
    const { createUser } = useContext(Authcontext);
    const { theme } = useContext(ThemeContext);
    const navigate = useNavigate();
    
    // State for form validation and UI controls
    const [showPassword, setShowPassword] = useState(false);
    const [passwordStrength, setPasswordStrength] = useState({
        hasLength: false,
        hasUppercase: false,
        hasLowercase: false,
        hasNumber: false,
        isValid: false
    });
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        photoURL: '',
        password: ''
    });
    const [isLoading, setIsLoading] = useState(false);

    // Handle input changes and validate password in real-time
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        
        if (name === 'password') {
            const hasLength = value.length >= 6;
            const hasUppercase = /[A-Z]/.test(value);
            const hasLowercase = /[a-z]/.test(value);
            const hasNumber = /\d/.test(value);
            const isValid = hasLength && hasUppercase && hasLowercase && hasNumber;
            
            setPasswordStrength({
                hasLength,
                hasUppercase,
                hasLowercase,
                hasNumber,
                isValid
            });
        }
    };

    const handleRegister = (e) => {
        e.preventDefault();
        setIsLoading(true);
        
        const { name, email, photoURL, password } = formData;

        if (!passwordStrength.isValid) {
            toast.error(
                "Please meet all password requirements."
            );
            setIsLoading(false);
            return;
        }

        createUser(email, password)
            .then((result) => {
                const user = result.user;
                console.log(user);
                toast.success("Registration successful!");
                navigate("/");
            })
            .catch((error) => {
                console.log(error);
                toast.error(error.message);
            })
            .finally(() => {
                setIsLoading(false);
            });
    };

    const getInputClasses = () => {
        return `w-full px-3 py-2 mt-1 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300 ${
            theme === 'dark' 
                ? 'bg-gray-800 text-gray-200 placeholder-gray-400 border-gray-700' 
                : 'bg-white border-gray-300'
        }`;
    };

    return (
        <div className={`flex items-center justify-center min-h-screen ${theme === 'dark' ? 'bg-gray-900 text-gray-200' : 'bg-blue-50 text-gray-800'}`}>
            <div className="flex flex-col w-full max-w-5xl p-6 rounded-lg shadow-lg md:flex-row bg-opacity-90 backdrop-filter backdrop-blur-sm" role="main">
                {/* Left side: Form */}
                <div className="flex-1 p-4 lg:p-8">
                    <h1 className="mb-6 text-3xl font-bold text-center text-blue-600">Create Your Account</h1>
                    <form onSubmit={handleRegister} aria-label="Registration form">
                        {/* Name Input */}
                        <div className="mt-4">
                            <label htmlFor="name" className="block text-sm font-medium">Full Name</label>
                            <input
                                id="name"
                                type="text"
                                name="name"
                                placeholder="Enter your full name"
                                value={formData.name}
                                onChange={handleInputChange}
                                className={getInputClasses()}
                                required
                                aria-required="true"
                            />
                        </div>

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

                        {/* Photo URL Input */}
                        <div className="mt-4">
                            <label htmlFor="photoURL" className="block text-sm font-medium">Profile Picture URL</label>
                            <input
                                id="photoURL"
                                type="url"
                                name="photoURL"
                                placeholder="https://example.com/your-photo.jpg"
                                value={formData.photoURL}
                                onChange={handleInputChange}
                                className={getInputClasses()}
                                required
                                aria-required="true"
                            />
                        </div>

                        {/* Password Input with toggle visibility */}
                        <div className="mt-4">
                            <label htmlFor="password" className="block text-sm font-medium">Password</label>
                            <div className="relative">
                                <input
                                    id="password"
                                    type={showPassword ? "text" : "password"}
                                    name="password"
                                    placeholder="Create a strong password"
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
                            
                            {/* Password requirements feedback */}
                            <div className="mt-2 space-y-1 text-xs">
                                <p className="font-medium">Password requirements:</p>
                                <ul className="ml-4 list-disc">
                                    <li className={passwordStrength.hasLength ? "text-green-500" : ""}>
                                        At least 6 characters
                                    </li>
                                    <li className={passwordStrength.hasUppercase ? "text-green-500" : ""}>
                                        At least one uppercase letter
                                    </li>
                                    <li className={passwordStrength.hasLowercase ? "text-green-500" : ""}>
                                        At least one lowercase letter
                                    </li>
                                    <li className={passwordStrength.hasNumber ? "text-green-500" : ""}>
                                        At least one number
                                    </li>
                                </ul>
                            </div>
                        </div>

                        {/* Submit Button */}
                        <button
                            type="submit"
                            className="w-full py-3 mt-6 text-white transition-colors duration-300 rounded-lg bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 disabled:opacity-70"
                            disabled={isLoading || !passwordStrength.isValid}
                            aria-label="Register account"
                        >
                            {isLoading ? "Creating Account..." : "Create Account"}
                        </button>
                    </form>

                    {/* Login link */}
                    <p className="mt-6 text-sm text-center">
                        Already have an account?{" "}
                        <Link to="/login" className="font-medium text-blue-600 hover:underline focus:outline-none focus:underline">
                            Sign in
                        </Link>
                    </p>
                </div>

                {/* Right side: Lottie Animation */}
                <div className="items-center justify-center flex-1 hidden p-4 md:flex">
                    <Lottie animationData={registerAnimation} loop={true} aria-hidden="true" />
                </div>
            </div>
        </div>
    );
};

export default Register;