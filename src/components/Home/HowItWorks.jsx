import React, { useState } from 'react';
import imageSearch from '../../assets/searchEvents.png';
import imageEventPage from '../../assets/joinedEvent.png';
import imageVolunteers from '../../assets/volunteers Working.png';

const HowItWorks = () => {
    const [activeTab, setActiveTab] = useState('discover');

    const TabButton = ({ tabId, children }) => (
        <button
            onClick={() => setActiveTab(tabId)}
            className={`w-full sm:w-auto text-base md:text-lg font-semibold py-4 px-6 text-center border-b-4 transition-all duration-300 ${activeTab === tabId ? 'border-success text-success' : 'border-transparent text-body'
                }`}
        >
            {children}
        </button>
    );

    const TabPanel = ({ tabId, title, text, imgSrc }) => (
        <div className={activeTab === tabId ? '' : 'hidden'}>
            <div className="grid md:grid-cols-2 items-center gap-8 md:gap-12">
                <div className="text-center md:text-left">
                    <h3 className="text-2xl md:text-3xl font-bold text-dark">{title}</h3>
                    <p className="mt-4 text-base md:text-lg text-body">{text}</p>
                </div>
                <div className="bg-gray-100 p-6 md:p-8 rounded-2xl shadow-md">
                    <img src={imgSrc} alt={`${title} Mockup`} className="rounded-xl w-full h-auto" />
                </div>
            </div>
        </div>
    );

    return (
        <section className="bg-base-100 pt-16 md:pt-20">
            <div className="container mx-auto px-6">
                <div className="text-center mb-12 md:mb-16">
                    <h2 className="text-3xl md:text-4xl font-bold text-dark">How Community Canvas Works</h2>
                    <p className="mt-4 text-base md:text-lg max-w-2xl mx-auto">A simple guide to becoming a part of the change in your neighborhood.</p>
                </div>
                <div className="flex flex-col sm:flex-row justify-center border-b border-gray-200 mb-12">
                    <TabButton tabId="discover">1. Discover</TabButton>
                    <TabButton tabId="join">2. Join</TabButton>
                    <TabButton tabId="participate">3. Participate</TabButton>
                </div>
                <div>
                    <TabPanel tabId="discover" title="Find Passionate Events" text="Easily find local opportunities. Search by cause or location to find the perfect event for you." imgSrc={imageEventPage} />
                    <TabPanel tabId="join" title="Join with a Single Click" text="Signing up is effortless. Click 'Join' and all event details are added to your personal dashboard." imgSrc={imageSearch} />
                    <TabPanel tabId="participate" title="Connect with Your Community" text="Show up, meet like-minded people, and make a real difference together. It's more than volunteering—it's building connections." imgSrc={imageVolunteers}/>
                </div>
            </div>
        </section>
    );
};

export default HowItWorks;