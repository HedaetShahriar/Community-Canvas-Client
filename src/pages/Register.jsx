import React, { use, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Link, useNavigate } from "react-router";
import { BsEye, BsEyeSlash } from 'react-icons/bs';
import AuthContext from "../contexts/AuthContext";
import logo from '../assets/logo.png';
// import { HiOutlineMail } from "react-icons/hi";
// import { TbLockPassword } from "react-icons/tb";

const Register = () => {
    const { registerUser, googleSignIn, updateUserProfile, setUser } = use(AuthContext);
    const navigate = useNavigate();
    const handleGoogleLogin = () => {
        googleSignIn()
            .then((result) => {
                const user = result.user;
                setUser(user);
                navigate('/');
                // console.log(user);
                // showAlert('Welcome back!', user.displayName);
                // navigate(`${location.state ? location.state : '/'}`);
            })
            .catch((error) => {
                console.error("Google Sign In Error:", error);
            });
    };
    const [showPassword, setShowPassword] = useState(false);
    const handleShowPassword = () => {
        setShowPassword(!showPassword);
    }
    const handleForm = (e) => {
        e.preventDefault();
        const form = e.target;
        const name = form.name.value;
        const photoURL = form.photoURL.value;
        const email = form.email.value;
        const password = form.password.value;

        registerUser(email, password)
            .then((result) => {
                const user = result.user;
                updateUserProfile(name, photoURL)
                    .then(() => {
                        setUser(user);
                        // showAlert('Registration successful!', name);
                        navigate('/');
                    })
                    .catch((error) => {
                        console.error("Profile Update Error:", error.message);
                    });
            })
            .catch((error) => {
                console.error("Registration Error:", error.message);
                // showAlert('Registration failed', error.message, 'error');
            });
    };
    return (
        <>
            <Navbar />
            <div className="min-h-[calc(100vh-250px)] flex items-center justify-center bg-base-200 py-6 md:py-10">
                <div className="bg-base-300 shadow-lg p-8  w-full flex flex-col md:flex-row rounded-4xl gap-6 md:max-w-3xl lg:max-w-4xl">
                    {/* left side */}
                    <div className="flex-1 flex flex-col items-center justify-center">
                        <img src={logo} className="w-2/5 md:w-1/2" alt="Logo" />
                        <h1 className="text-4xl font-bold text-center mb-6">Join Our Community!</h1>
                        <p className="text-center text-gray-600 mb-4">Create an account to get started and unlock all the features.</p>
                    </div>
                    {/* right side */}
                    <div className="flex-1">
                        <div className="text-center flex flex-col items-center">
                            <h2 className="text-3xl font-bold mb-4">Create Account</h2>
                            <button onClick={handleGoogleLogin} className="btn w-full mb-3">
                                <svg aria-label="Google logo" width="16" height="16" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><g><path d="m0 0H512V512H0" fill="#fff"></path><path fill="#34a853" d="M153 292c30 82 118 95 171 60h62v48A192 192 0 0190 341"></path><path fill="#4285f4" d="m386 400a140 175 0 0053-179H260v74h102q-7 37-38 57"></path><path fill="#fbbc02" d="m90 341a208 200 0 010-171l63 49q-12 37 0 73"></path><path fill="#ea4335" d="m153 219c22-69 116-109 179-50l55-54c-78-75-230-72-297 55"></path></g></svg>
                                Continue with Google
                            </button>
                        </div>
                        <div className="divider my-2">OR</div>
                        <p className=" text-center">Fill in the details below to register.</p>
                        {/* form */}
                        <form onSubmit={handleForm} className="flex flex-col gap-1">
                            <label className="label mt-1">Full Name</label>
                            <div className="relative">
                                <span className="absolute inset-y-0 z-10 left-0 pl-3 flex items-center pointer-events-none">
                                    {/* <HiOutlineMail size={22} /> */}
                                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-400"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
                                </span>
                                <input name="name" type="text" className="input pl-10 w-full focus:outline-none" placeholder="Enter your name" required />
                            </div>
                            <label className="label mt-1">Photo URL</label>
                            <div className="relative">
                                <span className="absolute inset-y-0 z-10 left-0 pl-3 flex items-center pointer-events-none">
                                    {/* <HiOutlineMail size={22} /> */}
                                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-400"><path d="M10.083 5H5a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-5.083"></path><path d="m14.5 6.5 3 3L8 19H5v-3Z"></path><path d="m14 3 6 6"></path></svg>
                                </span>
                                <input name="photoURL" type="url" className="input pl-10 w-full focus:outline-none" placeholder="https://example.com/your-photo.jpg" required />
                            </div>
                            <label className="label mt-1">Email</label>
                            <div className="relative">
                                <span className="absolute inset-y-0 z-10 left-0 pl-3 top-3">
                                    {/* <HiOutlineMail size={22} /> */}
                                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-400"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>
                                </span>
                                <input name="email" type="email" className="input pl-10 w-full validator focus:outline-none" placeholder="Enter your Email" required />
                                <p className="hidden pl-6 validator-hint">Enter valid email address</p>
                            </div>

                            <label className="label mt-1">Password</label>
                            <div className='relative'>
                                <span className="absolute inset-y-0 z-10 left-0 top-2.5 pl-3 ">
                                    {/* <TbLockPassword size={22} /> */}
                                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-400"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg>
                                </span>
                                <input name="password" autoComplete='current-password' type={!showPassword ? 'password' : 'text'} className="input validator pl-10 w-full pr-9 focus:outline-none" placeholder="Enter your Password" minLength="6"
                                    pattern="(?=.*[a-z])(?=.*[A-Z]).{6,}"
                                    title="Must be at least 6 characters, lowercase letter, uppercase letter" required />
                                <button type='button' onClick={handleShowPassword} className='absolute  right-2 top-2.5 z-10 text-gray-400'>
                                    {!showPassword ? <BsEye size={22} /> : <BsEyeSlash size={22} />}
                                </button>
                                <p className="hidden validator-hint pl-6">
                                    Must be at least 6 characters, including
                                    <br />At least one lowercase letter
                                    <br />At least one uppercase letter
                                </p>
                            </div>
                            <button type='submit' className='btn btn-neutral mt-4' >Sign up</button>

                        </form>
                        <p className='text-center mt-4'>Already have an account? <Link to="/auth/login" className='text-[#5dba76] font-semibold'>LogIn</Link></p>
                    </div>
                </div>

            </div>
            <Footer />
        </>
    );
};

export default Register;
