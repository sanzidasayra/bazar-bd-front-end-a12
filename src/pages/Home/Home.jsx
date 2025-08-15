import React from 'react';
import Banner from './Banner';
import MarketTips from './MarketTips';
import RisingFallingPrices from './RisingFallingPrices';
import MyProducts from '../../Dashboard/vendor/MyProducts';
import ProductSection from './ProductSection';
import AdvertisementCarousel from './AdvertisementCarousel';


const Home = () => {
    return (
        <div className="w-11/12 sm:w-10/12 md:w-10/12 lg:w-8/12 mx-auto">
            <Banner />
            <ProductSection />
            <AdvertisementCarousel />
            <RisingFallingPrices />
            <MarketTips />
        </div>
    );
};

export default Home;