import React from 'react';
import teamworkImage from '../../assets/teamwork.png';
import cleaningDriveImage from '../../assets/cleaning.png';
import plantingImage from '../../assets/planting.png';
import happyVolunteersImage from '../../assets/happyVolunteers.png';
import communityArtImage from '../../assets/communityArt.png';
import successImage from '../../assets/success.png';

const Gallery = () => {
    return (
        <section className="bg-light py-16 md:py-20">
            <div className="container mx-auto px-6">
                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-4xl font-bold text-dark">From Our Community Events</h2>
                    <p className="mt-4 text-base md:text-lg max-w-2xl mx-auto">See the impact we're making together. These are the moments that build a stronger community.</p>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-4">
                    <div className="group overflow-hidden rounded-lg md:rounded-2xl">
                        <img src={teamworkImage} alt="Community Event 1" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300 ease-in-out" />

                    </div>
                    <div className="group overflow-hidden rounded-lg  md:rounded-2xl md:col-span-2">
                        <img src={cleaningDriveImage} alt="Community Event 2" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300 ease-in-out" />
                    </div>
                    <div className="group  overflow-hidden rounded-lg md:rounded-2xl">
                        <img src={plantingImage} alt="Community Event 3" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300 ease-in-out" />
                    </div>
                    <div className="group overflow-hidden rounded-lg md:rounded-2xl md:col-span-2">
                        <img src={happyVolunteersImage} alt="Community Event 4" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300 ease-in-out" />
                    </div>
                    <div className="group overflow-hidden rounded-lg md:rounded-2xl">
                        <img src={communityArtImage} alt="Community Event 5" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300 ease-in-out" />
                    </div>
                    <div className="group overflow-hidden rounded-lg md:rounded-2xl">
                        <img src={successImage} alt="Community Event 6" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300 ease-in-out" />
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Gallery;