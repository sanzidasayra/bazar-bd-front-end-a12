import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import { FaShoppingBasket, FaMapMarkerAlt } from "react-icons/fa";
import SkeletonCard from "../../components/SkeletonCard"; // import Skeleton

const ProductSection = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(
          "https://bazar-bd-back-end-a12.onrender.com/products"
        );
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  const handleViewDetails = (productId) => {
    if (user) {
      navigate(`/products/${productId}`);
    } else {
      navigate("/login", { state: { from: `/products/${productId}` } });
    }
  };

  return (
    <div>
      <div className="text-center mb-10">
        <h2 className="lg:text-5xl md:text-4xl text-3xl font-bold mb-2 text-[#EC5800] flex justify-center items-center gap-2 dark:text-gray-50">
          <FaShoppingBasket className="inline text-[#EC5800] dark:text-gray-50" />{" "}
          Featured Products
        </h2>
        <p className="text-base md:text-lg max-w-3xl mx-auto text-gray-700 dark:text-gray-300">
          Discover today’s best prices for essentials at <strong className="text-[#EC5800] dark:text-gray-50">BazarBD</strong>.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 auto-rows-fr">
        {loading
          ? Array(6).fill(0).map((_, idx) => <SkeletonCard key={idx} />) // just skeletons
          : products.map((product) => {
              const latestPrice = product.prices?.[0];
              return (
                <div
                  key={product._id}
                  className="relative bg-white dark:bg-gray-800 rounded-3xl shadow-lg hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300 overflow-hidden flex flex-col"
                >
                  <span className="absolute top-3 right-3 px-3 py-1 bg-gradient-to-r from-[#EC5800] to-[#FFA500] dark:from-gray-700 dark:to-gray-900 text-white rounded-full font-bold text-xs shadow z-10 dark:text-gray-50">
                    NEW
                  </span>
                  <img
                    src={product.productImage}
                    alt={product.itemName}
                    className="w-full h-56 object-cover bg-gray-100 dark:bg-gray-700"
                  />
                  <div className="p-5 flex-1 flex flex-col justify-between">
                    <div>
                      <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100 mb-1">
                        {product.itemName}
                      </h3>
                      

                      <div className="flex items-center gap-2 mb-2">
                        <FaMapMarkerAlt className="text-green-600 dark:text-gray-400" />
                        <span className="text-sm text-gray-700 dark:text-gray-300 font-medium">
                          {product?.marketName || "Unknown Market"}
                        </span>
                      </div>
                    </div>

                    <div className="flex flex-col items-center my-2">
                      <span className="text-2xl font-extrabold text-[#14b89e] dark:text-gray-300 tracking-tight">
                        {latestPrice ? `৳${latestPrice.price}` : "N/A"}
                      </span>

                      <span className="text-xs text-gray-500 dark:text-gray-400">
                        {latestPrice?.date
                          ? `as of ${new Date(latestPrice.date).toLocaleDateString()}`
                          : "No price data"}
                      </span>
                    </div>

                    <button
                      onClick={() => handleViewDetails(product._id)}
                      className="btn bg-[#EC5800] dark:bg-gray-800 w-full mt-4 rounded-xl font-bold text-white dark:text-gray-50 text-lg tracking-wide shadow dark:border-gray-700 hover:bg-[#d44c00] dark:hover:bg-gray-700"
                    >
                      View Details
                    </button>
                  </div>
                </div>
              );
            })}
      </div>
    </div>
  );
};

export default ProductSection;
