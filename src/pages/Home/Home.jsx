import React from 'react';
import Banner from './Banner';
import MarketTips from './MarketTips';
import RisingFallingPrices from './RisingFallingPrices';
import MyProducts from '../../Dashboard/vendor/MyProducts';
import ProductSection from './ProductSection';
import AdvertisementCarousel from './AdvertisementCarousel';


const Home = () => {
    return (
        <div>
            <Banner />
            <ProductSection />
            <AdvertisementCarousel />
            <RisingFallingPrices />
            <MarketTips />
        </div>
    );
};

export default Home;