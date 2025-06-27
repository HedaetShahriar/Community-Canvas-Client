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
            <div className="min-h-screen bg-base-100 antialiased font-sans">
                {/* Header Section */}
                <header className="bg-base-200 text-center py-24 px-6">
                    <h1 className="text-4xl md:text-6xl font-extrabold text-slate-900">Get in Touch</h1>
                    <p className="text-lg text-slate-600 mt-4 max-w-2xl mx-auto">
                        We're here to help and answer any question you might have. We look forward to hearing from you!
                    </p>
                </header>

                {/* Main Content */}
                <section className="py-24 px-6">
                    <div className="container mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
                        {/* Left Column: Contact Info */}
                        <div className="space-y-8">
                            <div className="flex gap-4">
                                <div className="w-12 h-12 bg-primary/10 text-primary rounded-lg flex items-center justify-center">
                                    <MapPin className="w-6 h-6" />
                                </div>
                                <div>
                                    <h3 className="text-lg font-bold text-slate-800">Our Headquarters</h3>
                                    <p className="text-slate-600">Dhaka, Bangladesh</p>
                                </div>
                            </div>
                            <div className="flex gap-4">
                                <div className="w-12 h-12 bg-primary/10 text-primary rounded-lg flex items-center justify-center">
                                    <Mail className="w-6 h-6" />
                                </div>
                                <div>
                                    <h3 className="text-lg font-bold text-slate-800">Email Us</h3>
                                    <a href="mailto:contact@commuserve.org" className="text-primary hover:underline">contact@commuserve.org</a>
                                    <p className="text-sm text-slate-500">For general inquiries and support</p>
                                </div>
                            </div>
                            <div className="flex gap-4">
                                <div className="w-12 h-12 bg-primary/10 text-primary rounded-lg flex items-center justify-center">
                                    <Phone className="w-6 h-6" />
                                </div>
                                <div>
                                    <h3 className="text-lg font-bold text-slate-800">Call Us</h3>
                                    <a href="tel:+8801700000000" className="text-primary hover:underline">+880 1700-000000</a>
                                    <p className="text-sm text-slate-500">Mon - Fri, 9am - 6pm</p>
                                </div>
                            </div>
                        </div>

                        {/* Right Column: Contact Form */}
                        <div className="bg-white p-8 rounded-2xl shadow-lg">
                            <h2 className="text-2xl font-bold text-slate-800 mb-6">Send Us a Message</h2>
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
                                            className="input w-full px-4 py-3 bg-slate-100 border-2 border-transparent rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:bg-white"
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
                                            className="input w-full px-4 py-3 bg-slate-100 border-2 border-transparent rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:bg-white"
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
                                        className="input w-full px-4 py-3 bg-slate-100 border-2 border-transparent rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:bg-white"
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
                                        className="textarea w-full px-4 py-3 bg-slate-100 border-2 border-transparent rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:bg-white"
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
            <Footer />
        </>
    );
};

export default ContactUs;
