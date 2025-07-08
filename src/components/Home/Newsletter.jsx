import React from 'react';

const Newsletter = () => {
    return (
        <section className="py-16 md:py-20">
            <div className="container mx-auto px-6 text-center">
                <h2 className="text-3xl md:text-4xl font-bold text-dark">Stay Connected</h2>
                <p className="mt-4 text-base md:text-lg max-w-2xl mx-auto">Join our newsletter for updates on new events, success stories, and opportunities to get involved.</p>
                <div className="mt-10 max-w-xl mx-auto">
                    <form className="flex flex-col sm:flex-row gap-3">
                        <input type="email" placeholder="Enter your email address" className="flex-grow w-full px-5 py-4 rounded-full border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:outline-none" required />
                        <button
                            type="submit"
                            className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-bold px-8 py-4 rounded-full shadow-lg hover:from-blue-600 hover:to-indigo-700 transition-all duration-200"
                        >
                            Subscribe
                        </button>
                    </form>
                </div>
            </div>
        </section>
    );
};

export default Newsletter;