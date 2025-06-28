import React from 'react';
import Banner from '../components/Banner';
import Features from '../components/Features';
import HowItWorks from '../components/HowItWorks';
import Gallery from '../components/Gallery';
import Newsletter from '../components/Newsletter';
import CreateEventCTA from '../components/CreateEventCTA';

const Home = () => {
    return (
        <>
            <Banner />
            <Features />
            <HowItWorks />
            <Gallery />
            <Newsletter />
            <CreateEventCTA />
        </>
    );
};

export default Home;