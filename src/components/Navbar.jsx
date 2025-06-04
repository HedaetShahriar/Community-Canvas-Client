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
    const dropdownLinks = (
        <>
            <li><NavLink to="create-event">Create Event</NavLink></li>
            <li><NavLink to="manage-events">Manage Events</NavLink></li>
            <li><NavLink to="joined-events">Joined Events</NavLink></li>
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

            <div className="navbar-end space-x-3">
                <ToggleTheme />
                {!user ? (
                    <Link to="auth/login" className="btn btn-sm btn-primary">Login</Link>
                    // <button onClick={googleSignIn}> login</button>
                ) : (
                    <div className="dropdown dropdown-end">
                        <div className='flex items-center gap-2'>
                            <div tabIndex={0} className="btn btn-ghost btn-circle avatar">
                                <div className="w-10 rounded-full">
                                    <img src={user.
                                        photoURL || "https://i.ibb.co/ZYW3VTp/brown-brim.png"} alt="profile" />
                                </div>
                            </div>
                            < button onClick={handleLogOut} className='btn hidden md:block btn-secondary btn-outline rounded-full p-2'><MdLogout size={24} /></button>
                        </div>
                        <ul
                            tabIndex={0}
                            className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
                        >
                            {
                                dropdownLinks
                            }
                            <div className='divider my-1'></div>
                            <li>
                                <button onClick={handleLogOut} className='btn btn-secondary btn-sm'><MdLogout size={24} /> Logout</button>
                            </li>
                        </ul>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Navbar;