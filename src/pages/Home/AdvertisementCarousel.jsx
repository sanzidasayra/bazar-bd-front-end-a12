import React, { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import "swiper/css";
import "swiper/css/navigation";
import Spinner from "../../components/Shared/Spinner";

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
    return <div className="text-center mt-10"> <Spinner /> </div>;
  }

  return (
    <div className="mt-10 px-4 relative">
      <h2 className="text-3xl font-bold text-center mb-6">
        Advertisement Highlights
      </h2>
      <p className="text-center mb-6">
        Explore all current promotions and vendor ads through this interactive
        carousel. All advertisements are dynamically loaded from the database.
      </p>

      {/* Custom Arrows */}
      <div className="absolute inset-y-1/2 left-0 z-10 -translate-y-1/2">
        <button className="swiper-button-prev text-white">
          <FaArrowLeft />
        </button>
      </div>
      <div className="absolute inset-y-1/2 right-0 z-10 -translate-y-1/2">
        <button className="swiper-button-next text-white">
          <FaArrowRight />
        </button>
      </div>

      <Swiper
        spaceBetween={20}
        slidesPerView={1}
        loop={true}
        navigation={{
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev",
        }}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
        }}
        breakpoints={{
          640: { slidesPerView: 1 },   // mobile
          768: { slidesPerView: 2 },   // tablet
          1024: { slidesPerView: 3 },  // laptop
          1280: { slidesPerView: 4 },  // desktop (4 cards)
        }}
        modules={[Navigation, Autoplay]}
      >
        {ads.map((ad) => (
          <SwiperSlide key={ad._id}>
            <div className="bg-white rounded-lg shadow-lg p-4 h-full flex flex-col">
              <img
                src={ad.image}
                alt={ad.adTitle}
                className="w-full h-40 object-cover rounded-lg mb-3"
              />
              <h3 className="text-lg font-bold mb-1">{ad.adTitle}</h3>
              <p className="text-gray-600 text-sm flex-grow">{ad.description}</p>
              <a
                href="#"
                className="text-blue-500 mt-3 inline-block font-medium hover:underline"
              >
                Learn More →
              </a>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default AdvertisementCarousel;
