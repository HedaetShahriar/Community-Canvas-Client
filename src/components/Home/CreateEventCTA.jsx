import React from 'react';
import backgroundImage from '../../assets/background1.png'

const CreateEventCTA = () => {
    return (
        <section className="relative bg-cover bg-center mt-10 md:mt-20" style={{ backgroundImage: `url(${backgroundImage})`, backgroundSize: 'cover' }}>
        <div className="container mx-auto px-6 py-20 md:py-24">
            <div className="absolute inset-0 bg-black/30"></div>
            <div className="mx-auto max-w-2xl">
                <div className="text-center bg-white/10 backdrop-blur-md p-8 sm:p-12 rounded-2xl border border-white/20">
                    <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">Your Idea Can Spark a Movement.</h2>
                    <p className="mx-auto mt-6 max-w-xl text-base md:text-lg leading-8 text-gray-300">Don't wait for change. Be the one to start it. Post your event idea and inspire others to join you.</p>
                    <div className="mt-10 flex items-center justify-center">
                        <a href="#" className="rounded-md bg-secondary px-6 py-3 text-lg font-semibold text-secondary-content shadow-sm hover:bg-secondary-hover focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-secondary transition-transform hover:scale-105">Start an Event Today</a>
                    </div>
                </div>
            </div>
        </div>
    </section>
    );
};

export default CreateEventCTA;