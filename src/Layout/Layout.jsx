import React from 'react';
import Navbar from '../components/Navbar';
import { Outlet } from 'react-router';
import Footer from '../components/Footer';

const Layout = () => {
    return (
        <div>
            <Navbar />
            <div className='max-w-9/12 mx-auto px-4 lg:px-10'>
                <Outlet />
            </div>
            <Footer />
        </div>
    );
};

export default Layout;