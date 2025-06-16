import React, { use } from 'react';
import { Link, NavLink } from 'react-router';
import ToggleTheme from './ToggleTheme';
import { MdLogout } from 'react-icons/md';
import AuthContext from '../contexts/AuthContext';

const Navbar = () => {
    const { user, logOut } = use(AuthContext);
    // console.log(user);

    const navLinks = (
        <>
            <li><NavLink to="/">Home</NavLink></li>
            <li><NavLink to="/upcoming-events">Upcoming Events</NavLink></li>
            <li><NavLink to="/about">About</NavLink></li>
            <li><NavLink to="/contact">Contact</NavLink></li>
        </>
    );
    const dropdownLinks = (
        <>
            <li><NavLink to="/create-event">Create Event</NavLink></li>
            <li><NavLink to="/manage-events">Manage Events</NavLink></li>
            <li><NavLink to="/joined-events">Joined Events</NavLink></li>
        </>

    );
    const handleLogOut = () => {
        console.log("Logging out...");
        logOut()
            .then(() => {
                console.log("Logout successful");
            })
            .catch((error) => {
                console.error("Error logging out:", error);
            });
    }
    return (
        <div className="navbar bg-base-100 shadow-lg px-4 sticky top-0 z-50">
            {/* Navbar Start: Mobile dropdown and Logo */}
            <div className="navbar-start">
                <div className="dropdown">
                    <label tabIndex={0} className="btn btn-ghost lg:hidden">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M4 6h16M4 12h8m-8 6h16"
                            />
                        </svg>
                    </label>
                    <ul
                        tabIndex={0}
                        className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
                    >
                        {navLinks}
                    </ul>
                </div>
                <Link to="/" className="btn btn-ghost text-xl md:text-2xl font-bold text-primary">
                    CommuServe
                </Link>
            </div>

            {/* Navbar Center: Desktop navigation links */}
            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal px-1 font-semibold">{navLinks}</ul>
            </div>

            {/* Navbar End: Theme toggle and User profile section */}
            <div className="navbar-end gap-3">
                {/* Theme Toggle using daisyUI swap component */}
                {/* <label className="swap swap-rotate">
          <input
            type="checkbox"
            onChange={handleToggleTheme}
            checked={theme === 'dark'}
          /> */}
                {/* Sun icon (light mode) */}
                {/* <svg className="swap-on h-6 w-6 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M5.64,17l-.71.71a1,1,0,0,0,0,1.41,1,1,0,0,0,1.41,0l.71-.71A1,1,0,0,0,5.64,17ZM5,12a1,1,0,0,0-1-1H3a1,1,0,0,0,0,2H4A1,1,0,0,0,5,12Zm7-7a1,1,0,0,0,1-1V3a1,1,0,0,0-2,0V4A1,1,0,0,0,12,5ZM5.64,7.05a1,1,0,0,0,.7.29,1,1,0,0,0,.71-.29l.71-.71a1,1,0,0,0-1.41-1.41l-.71.71A1,1,0,0,0,5.64,7.05ZM18.36,17A1,1,0,0,0,17,18.36l.71.71a1,1,0,0,0,1.41,0,1,1,0,0,0,0-1.41ZM20,12a1,1,0,0,0-1-1H18a1,1,0,0,0,0,2h1A1,1,0,0,0,20,12ZM17,5.64a1,1,0,0,0-.71-.29,1,1,0,0,0-.7.29l-.71.71a1,1,0,1,0,1.41,1.41l.71-.71A1,1,0,0,0,17,5.64ZM12,15a3,3,0,1,0,0-6A3,3,0,0,0,12,15Zm0,2a5,5,0,1,0,0-10A5,5,0,0,0,12,17Z"/></svg> */}
                {/* Moon icon (dark mode) */}
                {/* <svg className="swap-off h-6 w-6 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M21.64,13a1,1,0,0,0-1.05-.14,8.05,8.05,0,0,1-3.37.73A8.15,8.15,0,0,1,9.08,5.49a8.59,8.59,0,0,1,.25-2A1,1,0,0,0,8,2.36,10.14,10.14,0,1,0,22,14.05,1,1,0,0,0,21.64,13Zm-9.5,6.69A8.14,8.14,0,0,1,7.08,5.22a10.14,10.14,0,0,0,9.5,9.5A8.14,8.14,0,0,1,12.14,19.69Z"/></svg>
        </label> */}

                <ToggleTheme />
                {user ? (
                    <div className="dropdown dropdown-end">
                        <label
                            tabIndex={0}
                            className="btn btn-ghost btn-circle avatar"
                            title={user?.displayName || 'User profile'} // Show user's name on hover
                        >
                            <div className="w-10 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                                <img
                                    alt="User profile picture"
                                    src={
                                        user.photoURL || 'https://placehold.co/100x100/a3e635/000000?text=U'
                                    }
                                    referrerPolicy='no-referrer'
                                />
                            </div>
                        </label>
                        <ul
                            tabIndex={0}
                            className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
                        >
                            {dropdownLinks}
                            <div className='divider my-1'></div>
                            <li>
                                <button onClick={handleLogOut} className='btn btn-secondary btn-sm'><MdLogout size={24} /> Logout</button>
                            </li>
                        </ul>
                    </div>
                ) : (
                    <Link to="/auth/login" className="btn btn-primary btn-outline">
                        Login
                    </Link>
                )}
            </div>
        </div>
    );
};

export default Navbar;