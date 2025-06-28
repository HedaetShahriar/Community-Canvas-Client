import React from 'react';

const Newsletter = () => {
    return (
        <section className="py-16 md:py-20">
            <div className="container mx-auto px-6 text-center">
                <h2 className="text-3xl md:text-4xl font-bold text-dark">Stay Connected</h2>
                <p className="mt-4 text-base md:text-lg max-w-2xl mx-auto">Join our newsletter for updates on new events, success stories, and opportunities to get involved.</p>
                <div className="mt-10 max-w-xl mx-auto">
                    <form className="flex flex-col sm:flex-row gap-3">
                        <input type="email" placeholder="Enter your email address" className="flex-grow w-full px-5 py-4 rounded-full border border-gray-300 focus:ring-2 focus:ring-primary focus:outline-none" required />
                        <button type="submit" className="bg-primary text-white font-semibold px-8 py-4 rounded-full hover:bg-primary-hover transition-all">Subscribe</button>
                    </form>
                </div>
            </div>
        </section>
    );
};

export default Newsletter;