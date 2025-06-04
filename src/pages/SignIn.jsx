import React, { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Link } from "react-router";
import { BsEye, BsEyeSlash } from 'react-icons/bs';
// import { HiOutlineMail } from "react-icons/hi";
// import { TbLockPassword } from "react-icons/tb";

const SignIn = () => {
    const handleGoogleLogin = () => {
        // Implement Google login logic here
        console.log("Google login clicked");
    };
    const [showPassword, setShowPassword] = useState(false);
    const handleShowPassword = () => {
        setShowPassword(!showPassword);
    }
    return (
        <>
            <Navbar />
            <div className="min-h-screen flex items-center justify-center bg-base-200">
                <div className="bg-base-300 shadow-lg rounded-lg p-8  w-full flex flex-col md:flex-row space-y-6 ">
                    <div className="flex-1">
                        <img src="" alt="Logo" />
                        <h1 className="text-4xl font-bold text-center mb-6">CommunityCanvas</h1>
                        <p className="text-center text-gray-600 mb-4">Connect with community through events</p>
                        <img src="" alt="singin animation" />

                    </div>
                    <div className="flex-1">
                        <div className="text-center flex flex-col items-center">
                            <h2 className="text-3xl font-bold mb-4">Welcome Back!</h2>
                            <button onClick={handleGoogleLogin} className="btn w-full mb-3">
                                <svg aria-label="Google logo" width="16" height="16" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><g><path d="m0 0H512V512H0" fill="#fff"></path><path fill="#34a853" d="M153 292c30 82 118 95 171 60h62v48A192 192 0 0190 341"></path><path fill="#4285f4" d="m386 400a140 175 0 0053-179H260v74h102q-7 37-38 57"></path><path fill="#fbbc02" d="m90 341a208 200 0 010-171l63 49q-12 37 0 73"></path><path fill="#ea4335" d="m153 219c22-69 116-109 179-50l55-54c-78-75-230-72-297 55"></path></g></svg>
                                Login with Google
                            </button>
                        </div>
                        <div className="divider my-2">OR</div>
                        <form className="flex flex-col gap-2">
                            <label className="label">Email</label>
                            <div className="relative">
                                <span className="absolute inset-y-0 z-10 left-0 pl-3 flex items-center pointer-events-none">
                                    {/* <HiOutlineMail size={22} /> */}
                                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-gray-400"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>
                                </span>
                                <input name="email" type="email" className="input pl-10 w-full focus:outline-none" placeholder="Enter your Email" required />
                            </div>

                            <label className="label">Password</label>
                            <div className='relative'>
                                <span className="absolute inset-y-0 z-10 left-0 pl-3 flex items-center pointer-events-none">
                                    {/* <TbLockPassword size={22} /> */}
                                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-gray-400"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg>
                                </span>
                                <input name="password" autoComplete='current-password' type={!showPassword ? 'password' : 'text'} className="input pl-10 w-full focus:outline-none" placeholder="Enter your Password" required />
                                <button type='button' onClick={handleShowPassword} className='absolute  right-2 top-2.5 z-10 text-gray-400'>{!showPassword ? <BsEye size={22} /> : <BsEyeSlash size={22} />}</button>
                            </div>
                            <div className="flex justify-between items-center">
                                <label className="label cursor-pointer">
                                    <input type="checkbox" className="checkbox checkbox-primary" />
                                    <span className="label-text">Remember me</span>
                                </label>
                                <label className="label cursor-pointer">
                                    <Link to="auth/login/forgotPassword" className='font-semibold'>Forgot Password?</Link>
                                </label>
                            </div>
                            <button type='submit' className='btn btn-neutral' >Login</button>

                        </form>
                        <p className='text-center'>Don't have an account? <Link to="/auth/register" className='text-[#5dba76] font-semibold'>Register</Link></p>
                    </div>
                </div>

            </div>
            <Footer />
        </>
    );
};

export default SignIn;
