import React from 'react';
import { Github, Facebook, Linkedin } from 'lucide-react';
import { Link, NavLink } from 'react-router';
import logo from '../assets/logo.png';
const Footer = () => {
    const navLinks = (
        <>
            <li>
                <NavLink
                    to="/"
                    className={({ isActive }) =>
                        `px-3 py-1 rounded transition-colors duration-150 ${isActive
                            ? "text-accent-content"
                            : " hover:text-accent-content"
                        }`
                    }
                >
                    Home
                </NavLink>
            </li>
            <li>
                <NavLink
                    to="/upcoming-events"
                    className={({ isActive }) =>
                        `px-3 py-1 rounded transition-colors duration-150 ${isActive
                            ? "text-accent-content"
                            : " hover:text-accent-content"
                        }`
                    }
                >
                    Upcoming Events
                </NavLink>
            </li>
            <li>
                <NavLink
                    to="/contact"
                    className={({ isActive }) =>
                        `px-3 py-1 rounded transition-colors duration-150 ${isActive
                            ? "text-accent-content"
                            : "hover:text-accent-content"
                        }`
                    }
                >
                    Contact
                </NavLink>
            </li>
        </>
    );
    // const dropdownLinks = (
    //     <>
    //         <li><NavLink to="/create-event">Create Event</NavLink></li>
    //         <li><NavLink to="/manage-events">Manage Events</NavLink></li>
    //         <li><NavLink to="/joined-events">Joined Events</NavLink></li>
    //     </>

    // );
    const legalLinks = [
        { href: "/privacy", text: "Privacy Policy" }, { href: "/terms", text: "Terms of Service" },
    ];
    const socialLinks = [
        { href: "https://github.com/HedaetShahriar", icon: <Github size={18} /> },
        { href: "https://www.facebook.com/Hedaetshahriarhimon/", icon: <Facebook size={18} /> },
        { href: "https://www.linkedin.com/in/hedaet-shahriar/", icon: <Linkedin size={18} /> },
    ];
    return (
        <footer className="bg-base-200/60 backdrop-blur-xl border-t border-gray-400/80">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="py-8 flex flex-col items-center justify-between gap-8 md:flex-row">
                    <div className='flex items-center gap-2'>
                        <Link to="/">
                            <img src={logo} className='w-14 h-14' alt="" />
                        </Link>
                        <Link to="/" className="text-xl md:text-2xl font-semibold">
                            CommunityCanvas
                        </Link>
                    </div>
                    <nav>
                        <ul className="flex flex-col items-center justify-center gap-4">
                            <div className='flex flex-wrap gap-4'>
                                {navLinks}
                            </div>
                            {/* <div className='flex flex-wrap gap-4'>
                                {dropdownLinks}
                            </div> */}
                        </ul>
                    </nav>
                    <div className="flex items-center space-x-4">
                        {socialLinks.map((social) => (
                            <a key={social.href} href={social.href} target="_blank" rel="noopener noreferrer" className=" hover:text-blue-600 transition-colors duration-300">
                                {social.icon}
                                <span className="sr-only">{social.href}</span>
                            </a>
                        ))}
                    </div>
                </div>
                <div className="py-4 border-t border-gray-200/80 flex flex-col-reverse items-center justify-between gap-4 md:flex-row">
                    <p className="text-sm ">&copy; {new Date().getFullYear()} EventHub. All rights reserved.</p>
                    <nav>
                        <ul className="flex items-center gap-x-6">
                            {legalLinks.map((link) => (
                                <li key={link.href}>
                                    <Link to={link.href} className="text-sm hover:text-blue-700 transition-colors duration-300">{link.text}</Link>
                                </li>
                            ))}
                        </ul>
                    </nav>
                </div>
            </div>
        </footer>
    );
};

export default Footer;