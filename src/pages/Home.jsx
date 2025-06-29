import React from 'react';
import Banner from '../components/Home/Banner';
import Features from '../components/Home/Features';
import HowItWorks from '../components/Home/HowItWorks';
import Gallery from '../components/Home/Gallery';
import Newsletter from '../components/Home/Newsletter';
import CreateEventCTA from '../components/Home/CreateEventCTA';

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