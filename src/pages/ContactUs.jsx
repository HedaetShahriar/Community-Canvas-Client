import React, { useState } from 'react';
import { Phone, Mail, MapPin, Send } from 'lucide-react';
import Footer from '../components/Footer';

const ContactUs = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [subject, setSubject] = useState('');
    const [message, setMessage] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = { name, email, subject, message };
        console.log("Contact Form Submitted:", formData);
        // Backend logic here
    };

    return (
        <>
            <div className="min-h-screen bg-base-200 antialiased">
                {/* Header Section */}
                <header className="bg-base-200 text-center py-16 px-6">
                    <h1 className="text-4xl md:text-6xl font-extrabold">Get in Touch</h1>
                    <p className="text-lg mt-4 max-w-2xl mx-auto">
                        We're here to help and answer any question you might have. We look forward to hearing from you!
                    </p>
                </header>

                {/* Main Content */}
                <section className="mb-10 px-2">
                    <div className="container mx-auto border-1 border-gray-300 p-6 rounded-2xl grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
                        {/* Left Column: Contact Info */}
                        <div className="flex flex-col justify-center gap-8">
                            <div className="flex gap-4">
                                <div className="w-12 h-12 rounded-lg flex items-center justify-center">
                                    <MapPin className="w-6 h-6" />
                                </div>
                                <div>
                                    <h3 className="text-lg font-bold">Our Headquarters</h3>
                                    <p className="">Dhaka, Bangladesh</p>
                                </div>
                            </div>
                            <div className="flex gap-4">
                                <div className="w-12 h-12 rounded-lg flex items-center justify-center">
                                    <Mail className="w-6 h-6" />
                                </div>
                                <div>
                                    <h3 className="text-lg font-bold">Email Us</h3>
                                    <a href="mailto:contact@commuserve.org" className="hover:underline">contact@commuserve.org</a>
                                    <p className="text-sm">For general inquiries and support</p>
                                </div>
                            </div>
                            <div className="flex gap-4">
                                <div className="w-12 h-12 rounded-lg flex items-center justify-center">
                                    <Phone className="w-6 h-6" />
                                </div>
                                <div>
                                    <h3 className="text-lg font-bold">Call Us</h3>
                                    <a href="tel:+8801700000000" className="hover:underline">+880 1700-000000</a>
                                    <p className="text-sm">Mon - Fri, 9am - 6pm</p>
                                </div>
                            </div>
                        </div>

                        {/* Right Column: Contact Form */}
                        <div className="bg-base-100 p-8 rounded-2xl shadow-lg">
                            <h2 className="text-2xl font-bold mb-6">Send Us a Message</h2>
                            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <label className="label">Full Name</label>
                                        <input
                                            id="name"
                                            type="text"
                                            value={name}
                                            onChange={(e) => setName(e.target.value)}
                                            placeholder="Enter your name"
                                            required
                                            className="input w-full px-4 py-3 bg-base-300 border-2 border-transparent rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:bg-base-300"
                                        />
                                    </div>
                                    <div>
                                        <label className="label">Email Address</label>
                                        <input
                                            id="email"
                                            type="email"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            placeholder="you@example.com"
                                            required
                                            className="input w-full px-4 py-3 bg-base-300 border-2 border-transparent rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:bg-base-300"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="label">Subject</label>
                                    <input
                                        id="subject"
                                        type="text"
                                        value={subject}
                                        onChange={(e) => setSubject(e.target.value)}
                                        placeholder="How can we help?"
                                        required
                                        className="input w-full px-4 py-3 bg-base-300 border-2 border-transparent rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:bg-base-300"
                                    />
                                </div>

                                <div>
                                    <label className="label">Your Message</label>
                                    <textarea
                                        id="message"
                                        value={message}
                                        onChange={(e) => setMessage(e.target.value)}
                                        placeholder="Write your message here..."
                                        rows={5}
                                        required
                                        className="textarea w-full px-4 py-3 bg-base-300 border-2 border-transparent rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:bg-base-300"
                                    />
                                </div>

                                <button
                                    type="submit"
                                    className="btn btn-primary w-full flex items-center justify-center gap-2 font-bold text-lg shadow-lg hover:bg-opacity-90 transition-all"
                                >
                                    Send Message <Send className="w-5 h-5" />
                                </button>
                            </form>
                        </div>
                    </div>
                </section>
            </div>
        </>
    );
};

export default ContactUs;
