import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Lottie from "lottie-react";
import registerAnimation from '../../assets/Lottie/Register.json';
import Authcontext from "../../context/Authcontext/Authcontext";

const Register = () => {
    const { createUser } = useContext(Authcontext);

    const navigate = useNavigate();

    const handleRegister = (e) => {
        e.preventDefault();
        const form = e.target;
        const name = form.name.value;
        const email = form.email.value;
        const photoURL = form.photoURL.value;
        const password = form.password.value;

        const passwordRegex =
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d@$!%*?&]{6,}$/;

        if (!passwordRegex.test(password)) {
            toast.error(
                "Password must have at least 6 characters, one uppercase letter, one lowercase letter, and one number."
            );
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
            });
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-blue-100">
            <div className="flex flex-col w-full max-w-5xl p-6 bg-white rounded-lg shadow-md md:flex-row">
                {/* Left side: Form */}
                <div className="flex-1 p-4">
                    <h2 className="text-2xl font-bold text-center text-blue-600">Register</h2>
                    <form onSubmit={handleRegister}>
                        {/* Name Input */}
                        <div className="mt-4">
                            <label className="block text-sm font-medium">Name</label>
                            <input
                                type="text"
                                name="name"
                                className="w-full px-3 py-2 mt-1 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
                                required
                            />
                        </div>

                        {/* Email Input */}
                        <div className="mt-4">
                            <label className="block text-sm font-medium">Email</label>
                            <input
                                type="email"
                                name="email"
                                className="w-full px-3 py-2 mt-1 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
                                required
                            />
                        </div>

                        {/* Photo URL Input */}
                        <div className="mt-4">
                            <label className="block text-sm font-medium">Photo URL</label>
                            <input
                                type="url"
                                name="photoURL"
                                className="w-full px-3 py-2 mt-1 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
                                required
                            />
                        </div>

                        {/* Password Input */}
                        <div className="mt-4">
                            <label className="block text-sm font-medium">Password</label>
                            <input
                                type="password"
                                name="password"
                                className="w-full px-3 py-2 mt-1 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
                                required
                            />
                        </div>

                        {/* Submit Button */}
                        <button
                            type="submit"
                            className="w-full py-2 mt-6 text-white rounded-lg bg-gradient-to-r from-orange-400 via-red-500 to-red-600 "
                        >
                            Register
                        </button>
                    </form>

                    {/* Login link */}
                    <p className="mt-4 text-sm text-center">
                        Already have an account?{" "}
                        <Link to="/login" className="text-blue-600 hover:underline">
                            Login
                        </Link>
                    </p>
                </div>

                {/* Right side: Lottie Animation */}
                <div className="flex-1 p-4">
                    <Lottie animationData={registerAnimation} loop={true} />
                </div>
            </div>
        </div>
    );
};

export default Register;
