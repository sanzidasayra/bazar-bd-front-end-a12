import React from 'react';
import Banner from './Banner';
import ProductSection from './ProductSection';
import AdvertisementCarousel from './AdvertisementCarousel';
import ReviewCarousel from '../../components/ReviewCarousel';
import Newsletter from './NewsLetter';
import CategoriesSection from './CategoriesSection';
import HowItWorks from './HowItWorks';
import MarketTips from './MarketTips';


const Home = () => {
    return (
        <>
        <Banner />
        <div className="w-11/12 sm:w-10/12 md:w-10/12 lg:w-8/12 mx-auto">
            
            <ProductSection />
            <AdvertisementCarousel />
            <CategoriesSection />
            <HowItWorks />
            <Newsletter />
            <MarketTips />
        </div>
            <ReviewCarousel />
        </>
    );
};

export default Home;