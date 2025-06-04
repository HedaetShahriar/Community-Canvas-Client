import React from 'react';
import { Link, NavLink } from 'react-router';
import ToggleTheme from './ToggleTheme';

const Navbar = () => {
    const user = null;
    const navLinks = (
        <>
            <li><NavLink to="/upcoming-events">Upcoming Events</NavLink></li>
            {user && (
                <>
                    <li><NavLink to="/create-event">Create Event</NavLink></li>
                    <li><NavLink to="/joined-events">Joined Events</NavLink></li>
                    <li><NavLink to="/manage-events">Manage Events</NavLink></li>
                </>
            )}
        </>
    );
    const logOut = () => {
        console.log("User logged out");
    }
    return (
        <div className="navbar bg-base-100 shadow-md">
            <div className="navbar-start">
                <Link to="/" className="btn btn-ghost text-xl">
                    CommunityCanvas
                </Link>
            </div>

            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal px-1">
                    {
                        navLinks
                    }
                </ul>
            </div>

            <div className="navbar-end">
                <ToggleTheme />
                {!user ? (
                    <Link to="/login" className="btn btn-sm btn-primary">Login</Link>
                ) : (
                    <div className="dropdown dropdown-end">
                        <div tabIndex={0} className="btn btn-ghost btn-circle avatar">
                            <div className="w-10 rounded-full">
                                <img src={user.photoURL || "https://i.ibb.co/ZYW3VTp/brown-brim.png"} alt="profile" />
                            </div>
                        </div>
                        <ul
                            tabIndex={0}
                            className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
                        >
                            <li className="font-bold text-sm text-center mb-1">
                                {user.displayName}
                            </li>
                            {
                                navLinks
                            }
                            <li>
                                <button onClick={logOut} className="btn btn-sm text-left">Logout</button>
                            </li>
                        </ul>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Navbar;