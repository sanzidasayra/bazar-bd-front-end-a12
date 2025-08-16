import React, { useState, useEffect } from "react";
import Spinner from "../../components/Shared/Spinner";

const AdvertisementMarquee = () => {
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
    return (
      <div className="text-center mt-10">
        <Spinner />
      </div>
    );
  }

  return (
    <div className="mt-20 px-4">
      <h2 className="text-4xl font-bold text-center mb-3 text-[#EC5800] dark:text-gray-50">
        Advertisement Highlights
      </h2>
      <p className="text-center mb-6 text-lg">
        Explore all current promotions and vendor ads through this interactive
        scrolling banner. All advertisements are dynamically loaded from the
        database.
      </p>

      <div className="overflow-hidden relative">
        <div className="flex animate-marquee space-x-6">
          {ads.map((ad) => (
            <div
              key={ad._id}
              className="flex-shrink-0 w-[400px] bg-white dark:bg-gray-800 rounded-lg shadow-lg p-4 flex"
            >
              <img
                src={ad.image}
                alt={ad.adTitle}
                className="w-32 h-32 object-cover rounded-lg mr-4"
              />
              <div className="flex flex-col justify-center">
                <h3 className="text-lg font-bold mb-1">{ad.adTitle}</h3>
                <p className="text-gray-600 dark:text-gray-200 text-sm">
                  {ad.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style>
        {`
          @keyframes marquee {
            0% { transform: translateX(100%); }
            100% { transform: translateX(-100%); }
          }
          .animate-marquee {
            display: flex;
            animation: marquee 30s linear infinite;
          }
        `}
      </style>
    </div>
  );
};

export default AdvertisementMarquee;
