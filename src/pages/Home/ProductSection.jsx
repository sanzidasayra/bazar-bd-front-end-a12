import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import { FaShoppingBasket, FaMapMarkerAlt } from "react-icons/fa";

const ProductSection = () => {
  const [products, setProducts] = useState([]);
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("http://localhost:5000/products");
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.error("Error fetching products:", error);
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
    <div className="px-4 sm:px-6 lg:px-8 py-12 bg-gradient-to-br from-lime-100 via-white to-[#d2f9e1] rounded-4xl shadow-xl">
      <div className="text-center mb-10">
        <h2 className="text-3xl font-bold mb-2 text-[#1a3e31] flex justify-center items-center gap-2">
          <FaShoppingBasket className="inline text-lime-500" /> Featured Products
        </h2>
        <p className="text-base md:text-lg max-w-3xl mx-auto text-gray-700">
          Discover today’s best prices for essentials at <strong>BazarBD</strong>.<br />
          See what’s fresh, trending, and a great deal!
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {products.map((product) => {
          const latest = product.prices?.[0];
          return (
            <div
              key={product._id}
              className="relative bg-white rounded-3xl shadow-lg hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300 overflow-hidden flex flex-col"
            >
              <span className="absolute top-3 right-3 px-3 py-1 bg-gradient-to-r from-[#CAEB66] to-[#A3D75C] text-black rounded-full font-bold text-xs shadow z-10">
                NEW
              </span>
              <img
                src={product.productImage}
                alt={product.itemName}
                className="w-full h-56 object-cover bg-gray-100"
              />

              <div className="p-5 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="text-lg font-bold text-gray-900 mb-1">{product.itemName}</h3>
                  <div className="flex items-center gap-2 mb-2">
                    <FaMapMarkerAlt className="text-green-600" />
                    <span className="text-sm text-gray-700 font-medium">{product.marketName}</span>
                  </div>
                </div>

                <div className="flex flex-col items-center my-2">
                  <span className="text-3xl font-extrabold text-[#14b89e] tracking-tight">
                    {latest ? `৳${latest.price}` : "N/A"}
                  </span>
                  <span className="text-xs text-gray-500">
                    {latest?.date ? `as of ${new Date(latest.date).toLocaleDateString()}` : "No price data"}
                  </span>
                </div>

                <button
                  onClick={() => handleViewDetails(product._id)}
                  className="btn btn-neutral w-full mt-4 rounded-xl font-bold text-white text-lg tracking-wide shadow"
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
