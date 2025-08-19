import React, { useState, useEffect } from "react";

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

  return (
    <div className="mt-20 px-4">
      <h2 className="lg:text-4xl md:text-3xl text-2xl font-bold text-center mb-3 text-[#EC5800] dark:text-gray-50">
        Advertisement Highlights
      </h2>
      <p className="text-center max-w-3xl mx-auto mb-6 lg:text-lg">
  Discover exclusive vendor promotions and seasonal highlights in this
  scrolling banner. Stay updated with the latest market deals and
  advertisements.
</p>



      <div className="overflow-hidden relative w-full">
        {loading ? (
          // Skeleton loader
          <div className="flex space-x-6 animate-pulse">
            {[...Array(5)].map((_, idx) => (
              <div
                key={idx}
                className="flex-shrink-0 w-[400px] h-32 bg-gray-200 dark:bg-gray-700 rounded-lg shadow-lg p-4 flex"
              >
                <div className="w-32 h-32 bg-gray-300 dark:bg-gray-600 rounded-lg mr-4" />
                <div className="flex flex-col justify-center flex-1">
                  <div className="h-5 bg-gray-300 dark:bg-gray-600 rounded mb-2 w-3/4" />
                  <div className="h-3 bg-gray-300 dark:bg-gray-600 rounded w-full" />
                  <div className="h-3 bg-gray-300 dark:bg-gray-600 rounded w-5/6 mt-1" />
                </div>
              </div>
            ))}
          </div>
        ) : (
          // Actual ads marquee (duplicated for infinite loop)
          <div className="flex animate-marquee space-x-6">
            {[...ads, ...ads].map((ad, idx) => (
              <div
                key={idx}
                className="flex-shrink-0 w-[400px] bg-white dark:bg-gray-800 rounded-lg shadow-lg p-4 flex"
              >
                <img
                  src={ad.imageUrl}
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
        )}
      </div>

      <style>
        {`
          @keyframes marquee {
            0% { transform: translateX(0%); }
            100% { transform: translateX(-50%); }
          }
          .animate-marquee {
            display: flex;
            animation: marquee 20s linear infinite;
            width: max-content;
          }
        `}
      </style>
    </div>
  );
};

export default AdvertisementMarquee;
