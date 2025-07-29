import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import { toast } from "react-toastify";
import { FaStar } from "react-icons/fa";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user, role } = useAuth();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  const [reviews, setReviews] = useState([]);
  const [userRating, setUserRating] = useState(0);
  const [commentText, setCommentText] = useState("");

  useEffect(() => {
    fetch(`http://localhost:5000/products/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setProduct(data);
        setTimeout(() => setLoading(false), 500);
      })
      .catch((err) => {
        console.error("Error fetching product:", err);
        setLoading(false);
      });
  }, [id]);

  const handlePay = (id) => {
    console.log('Proceed to payment for', id);

      navigate(`/payment/${id}`)

  }

  useEffect(() => {
    if (product?._id) {
      fetch(`http://localhost:5000/reviews/${product._id}`)
        .then((res) => res.json())
        .then((data) => setReviews(data));
    }
  }, [product]);

  const handleReviewSubmit = async () => {
    if (!user) {
      toast.error("You must be logged in to submit a review.");
      return;
    }

    const newReview = {
      productId: product._id,
      userName: user.displayName,
      userEmail: user.email,
      rating: userRating,
      comment: commentText,
      date: new Date(),
    };

    const res = await fetch("http://localhost:5000/reviews", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newReview),
    });
if (res.ok) {
  toast.success("Review added!");
  setCommentText("");
  setUserRating(0);

  fetch(`http://localhost:5000/reviews/${product._id}`)
    .then((res) => res.json())
    .then((updatedReviews) => setReviews(updatedReviews));
} else {
  toast.error("Failed to submit review.");
}

  };

  if (loading) {
    return (
      <div className="text-center mt-10 text-xl">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="text-center mt-10 text-red-500 text-xl">
        Product not found.
      </div>
    );
  }


  const handleAddToWatchlist = async () => {
  if (!user) {
    toast.error("Please login to add items to watchlist");
    return;
  }

  const watchlistItem = {
    productId: product._id,
    itemName: product.itemName,
    productImage: product.productImage,
    userEmail: user.email,
    date: new Date(),
  };

  try {
    const res = await fetch("http://localhost:5000/watchlist", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(watchlistItem),
    });

    if (res.ok) {
      toast.success("Added to watchlist!");
    } else if (res.status === 409) {
      toast.info("Already in watchlist.");
    } else {
      throw new Error("Failed to add to watchlist.");
    }
  } catch (err) {
    console.error("Watchlist error:", err);
    toast.error("Could not add to watchlist.");
  }
};




  return (
    <div className="max-w-5xl mx-auto mt-10 p-6 rounded-xl shadow-2xl bg-[#f2fcf9]">
      <div className="flex flex-col md:flex-row gap-6">
        <img
          src={product.productImage}
          alt={product.itemName}
          className="w-full md:w-1/2 h-auto object-contain rounded-xl shadow"
        />

        <div className="flex-1 space-y-3 text-[#153c2e]">
          <h2 className="text-3xl font-bold">{product.itemName}</h2>
          <p>
            <span className="font-semibold">Market:</span> {product.marketName}
          </p>
          <p>
            <span className="font-semibold">Date:</span>{" "}
            {product.prices?.[0]?.date
              ? new Date(product.prices[0].date).toLocaleDateString()
              : "N/A"}
          </p>

          <div>
            <h3 className="font-semibold text-lg mb-1">Price History:</h3>
            <ul className="list-disc pl-5 text-gray-700">
              {product.prices?.map((item, i) => (
                <li key={i}>
                  {product.itemName} — ৳{item.price}/kg (
                  {new Date(item.date).toLocaleDateString()})
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-[#d4f2e1] p-4 rounded-lg mt-2">
            <h3 className="text-lg font-bold mb-2">Vendor Info</h3>
            <p>
              <span className="font-semibold">Name:</span>{" "}
              {product.vendorName || "Unknown"}
            </p>
            <p>
              <span className="font-semibold">Email:</span>{" "}
              {product.vendorEmail || "N/A"}
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 mt-4">
            <button
            onClick={handleAddToWatchlist}
              disabled={role === "admin" || role === "vendor"}
              className={`flex-1 px-4 py-2 rounded-full text-white transition-all ${
                role === "admin" || role === "vendor"
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-yellow-500 hover:bg-yellow-600"
              }`}
            >
              Add to Watchlist
            </button>

            <button onClick={() => handlePay(product._id)} className="flex-1 px-4 py-2 rounded-full bg-green-600 hover:bg-green-700 text-white transition-all">
              Buy Product
            </button>
          </div>
        </div>
      </div>

      <div className="mt-12">
        <h2 className="text-2xl font-bold mb-4">User Reviews</h2>

        {user && (
          <div className="bg-white p-4 rounded shadow mb-6">
            <div className="flex items-center gap-2 mb-2">
              {[1, 2, 3, 4, 5].map((num) => (
                <FaStar
                  key={num}
                  className={`cursor-pointer ${
                    num <= userRating ? "text-yellow-400" : "text-gray-300"
                  }`}
                  onClick={() => setUserRating(num)}
                />
              ))}
            </div>
            <textarea
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
              className="w-full p-2 border rounded"
              rows="3"
              placeholder="Write your feedback here..."
            ></textarea>
            <button
              onClick={handleReviewSubmit}
              className="mt-2 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
            >
              Submit Review
            </button>
          </div>
        )}

        {reviews.length === 0 ? (
          <p className="text-gray-500">No reviews yet.</p>
        ) : (
          <ul className="space-y-4">
            {reviews.map((rev, idx) => (
              <li key={idx} className="bg-white p-4 rounded shadow">
                <div className="flex justify-between items-center mb-2">
                  <p className="font-semibold">
                    {rev.userName} ({rev.userEmail})
                  </p>
                  <p className="text-sm text-gray-500">
                    {new Date(rev.date).toLocaleDateString()}
                  </p>
                </div>
                <div className="flex items-center text-yellow-400 mb-1">
                  {[...Array(rev.rating)].map((_, i) => (
                    <FaStar key={i} />
                  ))}
                </div>
                <p>{rev.comment}</p>
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className="mt-12">
        <h2 className="text-2xl font-bold mb-4">Price Trend Comparison</h2>
        {product.prices?.length > 0 ? (
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={product.prices}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis
                dataKey="date"
                tickFormatter={(d) => new Date(d).toLocaleDateString()}
              />
              <YAxis />
              <Tooltip formatter={(value) => `৳${value}`} />
              <Line
                type="monotone"
                dataKey="price"
                stroke="#38a169"
                strokeWidth={2}
              />
            </LineChart>
          </ResponsiveContainer>
        ) : (
          <p className="text-gray-500">No price trend data available.</p>
        )}
      </div>

      <div className="mt-12 text-center">
        <button
          onClick={() => navigate("/")}
          className="px-6 py-2 bg-[#1a3e31] hover:bg-[#0f2a21] text-white rounded-full transition duration-300"
        >
          Back to Home
        </button>
      </div>
    </div>
  );
};

export default ProductDetails;
