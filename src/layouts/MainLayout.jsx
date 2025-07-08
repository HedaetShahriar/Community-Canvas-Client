import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Outlet } from 'react-router';

const MainLayout = () => {
    return (
        <>
            <Navbar />
            <div className='min-h-[calc(100vh-250px)]'>
                <Outlet />
            </div>
            <Footer />
        </>
    );
};

export default MainLayout;