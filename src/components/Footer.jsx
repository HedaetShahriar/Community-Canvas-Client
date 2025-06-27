import React from 'react';
import { Github, Facebook,Linkedin } from 'lucide-react';
import { Link } from 'react-router';
const Footer = () => {
    const navigationLinks = [
        { href: "/events", text: "Events" }, { href: "/about", text: "About" }, { href: "/contact", text: "Contact" },
    ];
    const legalLinks = [
        { href: "/privacy", text: "Privacy Policy" }, { href: "/terms", text: "Terms of Service" },
    ];
    const socialLinks = [
        { href: "https://github.com/HedaetShahriar", icon: <Github size={18} /> },
        { href: "https://www.facebook.com/Hedaetshahriarhimon/", icon: <Facebook size={18} /> },
        { href: "https://www.linkedin.com/in/hedaet-shahriar/", icon: <Linkedin size={18} /> },
    ];
    return (
        <footer className="bg-base-200/60 backdrop-blur-xl border-t border-gray-200/80">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="py-8 flex flex-col items-center justify-between gap-8 md:flex-row">
                    <Link to="/" className="flex items-center gap-2.5">
                        {/* <div className="bg-blue-600 p-2 rounded-lg">logo</div> */}
                        {/* LOGO */}
                        <span className="text-lg font-semibold">CommunityCanvas</span>
                    </Link>
                    <nav>
                        <ul className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3">
                            {navigationLinks.map((link) => (
                                <li key={link.href}>
                                    <Link to={link.href} className="text-sm font-medium  hover:text-blue-600 transition-colors duration-300">{link.text}</Link>
                                </li>
                            ))}
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