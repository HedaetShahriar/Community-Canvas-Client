import React, { useCallback, useEffect, useState } from 'react';
import { 
    ArrowLeft, 
    ArrowRight
} from 'lucide-react';
import { Link } from 'react-router';

const Banner = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const slides = [
        {
            bgImage: "url('https://placehold.co/1600x900/2563EB/FFFFFF?text=Community+Effort')",
            tag: "Upcoming Event",
            title: "Road Cleaning in Mirpur 10, Dhaka",
            description: "Join your neighbors to help clean up our streets and make our community a more beautiful place to live.",
            buttonText: "Join The Event",
            buttonClass: "bg-secondary hover:bg-secondary-hover",
        },
        {
            bgImage: "url('https://placehold.co/1600x900/10B981/FFFFFF?text=Go+Green')",
            tag: "Upcoming Event",
            title: "Tree Plantation in Hossainpur",
            description: "Help us plant 100 new saplings to improve our local environment and create green spaces for future generations.",
            buttonText: "Learn More",
            buttonClass: "bg-primary hover:bg-primary-hover",
        },
        {
            bgImage: "url('https://placehold.co/1600x900/F97316/FFFFFF?text=Give+Back')",
            tag: "Upcoming Event",
            title: "Food Distribution in Gulshan",
            description: "We're collecting and distributing food packages to families in need. Your help can make a huge difference.",
            buttonText: "Volunteer Now",
            buttonClass: "bg-secondary hover:bg-secondary-hover",
        },
    ];

    const goToSlide = useCallback((index) => {
        setCurrentIndex((index + slides.length) % slides.length);
    }, [slides.length]);

    useEffect(() => {
        const slideInterval = setInterval(() => {
            goToSlide(currentIndex + 1);
        }, 7000);
        return () => clearInterval(slideInterval);
    }, [currentIndex, goToSlide]);

    return (
        <section className="relative w-full h-[90vh] md:h-[85vh] text-white overflow-hidden shadow-lg">
            <div className="w-full h-full flex transition-transform duration-700 ease-in-out" style={{ transform: `translateX(-${currentIndex * 100}%)` }}>
                {slides.map((slide, index) => (
                    <div key={index} className="w-full h-full flex-shrink-0 relative bg-cover bg-center" style={{ backgroundImage: slide.bgImage }}>
                        <div className="absolute inset-0 bg-black/50"></div>
                        <div className="relative z-10 container mx-auto px-6 h-full flex flex-col justify-center text-center items-center">
                            <span className="bg-secondary text-white font-semibold px-4 py-1 rounded-full mb-4">{slide.tag}</span>
                            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold leading-tight max-w-3xl">{slide.title}</h1>
                            <p className="text-base md:text-lg mt-4 max-w-xl">{slide.description}</p>
                            <div className="mt-8">
                                <Link to={`event/${slides.id}`} className={`${slide.buttonClass} text-white font-bold px-6 py-3 md:px-8 md:py-4 rounded-full transition-all text-base md:text-lg shadow-md`}>
                                    {slide.buttonText}
                                </Link>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <button onClick={() => goToSlide(currentIndex - 1)} className="absolute top-1/2 left-3 md:left-4 transform -translate-y-1/2 bg-white/20 hover:bg-white/40 text-white p-2 md:p-3 rounded-full transition-all backdrop-blur-sm">
                <ArrowLeft className="w-5 h-5 md:w-6 md:h-6" />
            </button>
            <button onClick={() => goToSlide(currentIndex + 1)} className="absolute top-1/2 right-3 md:right-4 transform -translate-y-1/2 bg-white/20 hover:bg-white/40 text-white p-2 md:p-3 rounded-full transition-all backdrop-blur-sm">
                <ArrowRight className="w-5 h-5 md:w-6 md:h-6" />
            </button>

            <div className="absolute bottom-6 md:bottom-8 left-1/2 -translate-x-1/2 flex space-x-3">
                {slides.map((_, index) => (
                    <button key={index} onClick={() => goToSlide(index)} className={`h-3 rounded-full transition-all duration-300 ${currentIndex === index ? 'bg-white w-8' : 'bg-white/50 w-3'}`}></button>
                ))}
            </div>
        </section>
    );
};

export default Banner;