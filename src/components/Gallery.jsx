import React from 'react';

const Gallery = () => {
    return (
        <section className="bg-light py-16 md:py-20">
            <div className="container mx-auto px-6">
                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-4xl font-bold text-dark">From Our Community Events</h2>
                    <p className="mt-4 text-base md:text-lg max-w-2xl mx-auto">See the impact we're making together. These are the moments that build a stronger community.</p>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-4">
                    <div className="group overflow-hidden rounded-lg md:rounded-2xl"><img src="https://placehold.co/500x500/10B981/FFFFFF?text=Teamwork" alt="Community Event 1" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300 ease-in-out" /></div>
                    <div className="group overflow-hidden rounded-lg md:rounded-2xl col-span-2"><img src="https://placehold.co/1000x500/2563EB/FFFFFF?text=Cleaning+Drive" alt="Community Event 2" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300 ease-in-out" /></div>
                    <div className="group overflow-hidden rounded-lg md:rounded-2xl"><img src="https://placehold.co/500x500/F97316/FFFFFF?text=Planting" alt="Community Event 3" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300 ease-in-out" /></div>
                    <div className="group overflow-hidden rounded-lg md:rounded-2xl col-span-2"><img src="https://placehold.co/1000x500/8B5CF6/FFFFFF?text=Happy+Volunteers" alt="Community Event 4" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300 ease-in-out" /></div>
                    <div className="group overflow-hidden rounded-lg md:rounded-2xl"><img src="https://placehold.co/500x500/EC4899/FFFFFF?text=Community+Art" alt="Community Event 5" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300 ease-in-out" /></div>
                    <div className="group overflow-hidden rounded-lg md:rounded-2xl"><img src="https://placehold.co/500x500/6D28D9/FFFFFF?text=Success" alt="Community Event 6" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300 ease-in-out" /></div>
                </div>
            </div>
        </section>
    );
};

export default Gallery;