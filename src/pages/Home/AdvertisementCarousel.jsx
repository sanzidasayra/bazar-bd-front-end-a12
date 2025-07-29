import React, { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "../../components/styles/swiper.css";

const AdvertisementCarousel = () => {
  const [ads, setAds] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAds = async () => {
      try {
        const response = await fetch(
          "https://bazar-bd-back-end-a12.onrender.com/advertisements?status=approved"
        );
        const data = await response.json();
        setAds(data);
      } catch (error) {
        console.error("Error fetching advertisements:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchAds();
  }, []);

  if (loading) {
    return <div className='text-center mt-10'>Loading advertisements...</div>;
  }

  return (
    <div className='mt-10 px-4'>
      <h2 className='text-3xl font-bold text-center mb-6'>
        Advertisement Highlights
      </h2>
      <p className='text-center mb-6'>
        Explore all current promotions and vendor ads through this interactive
        carousel. All advertisements are dynamically loaded from the database.
      </p>

      <Swiper
        spaceBetween={50}
        slidesPerView={1}
        loop={true}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
      >
        {ads.map((ad) => (
          <SwiperSlide
            key={ad._id}
            className='bg-gray-200 p-6 rounded-lg shadow-lg'
          >
            <h3 className='text-xl font-bold'>{ad.adTitle}</h3>
            <p>{ad.description}</p>
            <a href='#' className='text-blue-500 mt-2 inline-block'>
              Learn More
            </a>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default AdvertisementCarousel;
