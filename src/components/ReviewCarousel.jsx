import React, { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import Spinner from "./Shared/Spinner";

const ReviewCarousel = () => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const data = [
      { id: 1, name: "Sadia Rahman", comment: "Very accurate price updates! Makes shopping much easier.", image: "https://i.pravatar.cc/100?img=1" },
      { id: 2, name: "Rafi Ahmed", comment: "Helps me plan my shopping efficiently. Great app!", image: "https://i.pravatar.cc/100?img=2" },
      { id: 3, name: "Nabila Khan", comment: "Smooth UI and easy navigation. Love the responsive design.", image: "https://i.pravatar.cc/100?img=3" },
      { id: 4, name: "Tanvir Hossain", comment: "Vendor updates are timely and accurate. Very helpful.", image: "https://i.pravatar.cc/100?img=4" },
      { id: 5, name: "Farhana Akter", comment: "Love the watchlist feature! Makes tracking prices simple.", image: "https://i.pravatar.cc/100?img=5" },
      { id: 6, name: "Imran Ali", comment: "Comparison charts are very helpful for price trends.", image: "https://i.pravatar.cc/100?img=6" },
      { id: 7, name: "Maya Chowdhury", comment: "Intuitive UI, very nice design and layout.", image: "https://i.pravatar.cc/100?img=7" },
      { id: 8, name: "Rashedul Islam", comment: "Convenient to see all vendors’ prices in one place.", image: "https://i.pravatar.cc/100?img=8" },
    ];
    setReviews(data);
    setLoading(false);
  }, []);

  if (loading) {
    return (
      <div className="text-center mt-10">
        <Spinner />
      </div>
    );
  }

  return (
    <div className="mt-20  relative">
      <h2 className="text-3xl font-bold text-center mb-3 text-orange-400 dark:text-gray-50">User Reviews</h2>
      <p className="text-center mb-6 text-gray-600 dark:text-gray-300 text-lg">
        See what our users are saying about the platform and their experiences.
      </p>

      <Swiper
        spaceBetween={30}
        slidesPerView={1}
        loop={true}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        breakpoints={{
          640: { slidesPerView: 1 },
          768: { slidesPerView: 2 },
          1024: { slidesPerView: 3 },
          1280: { slidesPerView: 5 },
        }}
        modules={[Autoplay]}
      >
        {reviews.map((review) => (
          <SwiperSlide key={review.id}>
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-2xl p-6 flex flex-col items-center text-center h-full min-h-[300px] transition-transform duration-300 ease-in-out hover:scale-105 mb-10">
              <img
                src={review.image}
                alt={review.name}
                className="w-20 h-20 rounded-full object-cover mb-4 border-4 border-orange-400 dark:border-gray-300 transition-transform duration-300 ease-in-out"
              />
              <div className="flex flex-col justify-between h-full">
                <h3 className="text-lg font-semibold mb-2">{review.name}</h3>
                <p className="text-gray-700 dark:text-gray-300 text-sm md:text-base">{review.comment}</p>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default ReviewCarousel;
