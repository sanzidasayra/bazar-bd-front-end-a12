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
    fetch(`https://bazar-bd-back-end-a12.onrender.com/products/${id}`)
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
    console.log("Proceed to payment for", id);

    navigate(`/payment/${id}`);
  };

  useEffect(() => {
    if (product?._id) {
      fetch(`https://bazar-bd-back-end-a12.onrender.com/reviews/${product._id}`)
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

    const res = await fetch(
      "https://bazar-bd-back-end-a12.onrender.com/reviews",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newReview),
      }
    );
    if (res.ok) {
      toast.success("Review added!");
      setCommentText("");
      setUserRating(0);

      fetch(`https://bazar-bd-back-end-a12.onrender.com/reviews/${product._id}`)
        .then((res) => res.json())
        .then((updatedReviews) => setReviews(updatedReviews));
    } else {
      toast.error("Failed to submit review.");
    }
  };

  if (loading) {
    return (
      <div className='text-center mt-10 text-xl'>
        <span className='loading loading-spinner loading-lg'></span>
      </div>
    );
  }

  if (!product) {
    return (
      <div className='text-center mt-10 text-red-500 text-xl'>
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
      const res = await fetch(
        "https://bazar-bd-back-end-a12.onrender.com/watchlist",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(watchlistItem),
        }
      );

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
    <div className='w-11/12 sm:w-10/12 md:w-10/12 lg:w-8/12 mx-auto mt-10 p-6 rounded-xl shadow-2xl bg-gray-50 dark:bg-gray-800 dark:text-gray-100'>
  <div className='flex flex-col md:flex-row gap-6'>
    <img
      src={product.productImage}
      alt={product.itemName}
      className='w-full md:w-1/2 h-auto object-contain rounded-xl shadow'
    />

    <div className='flex-1 space-y-3'>
      <h2 className='text-3xl font-bold'>{product.itemName}</h2>
      <p>
        <span className='font-semibold'>Market:</span> {product.marketName}
      </p>
      <p>
        <span className='font-semibold'>Current Price:</span>{" "}
        <span className='bg-[#EC5800] text-white dark:bg-gray-700 px-2 py-1 rounded font-bold'>
          {product.prices?.[0]?.price ? `৳${product.prices[0].price}/kg` : "N/A"}
        </span>
      </p>
      <p>
        <span className='font-semibold'>Date:</span>{" "}
        {product.prices?.[0]?.date
          ? new Date(product.prices[0].date).toLocaleDateString()
          : "N/A"}
      </p>

      <div>
        <h3 className='font-semibold text-lg mb-1'>Price History:</h3>
        <ul className='list-disc pl-5 text-gray-700 dark:text-gray-300'>
          {product.prices?.map((item, i) => (
            <li key={i}>
              {product.itemName} —{" "}
              <span className='bg-yellow-100 dark:bg-gray-700 px-1 rounded'>{`৳${item.price}/kg`}</span>{" "}
              ({new Date(item.date).toLocaleDateString()})
            </li>
          ))}
        </ul>
      </div>

      <div className='bg-[#d4f2e1] dark:bg-gray-700 p-4 rounded-lg mt-2'>
        <h3 className='text-lg font-bold mb-2'>Vendor Info</h3>
        <p>
          <span className='font-semibold'>Name:</span> {product.vendorName || "Unknown"}
        </p>
        <p>
          <span className='font-semibold'>Email:</span> {product.vendorEmail || "N/A"}
        </p>
      </div>

      <div className='flex flex-col sm:flex-row gap-4 mt-4'>
        <button
          onClick={handleAddToWatchlist}
          disabled={role === "admin" || role === "vendor"}
          className={`flex-1 px-4 py-2 rounded-full text-white transition-all ${
            role === "admin" || role === "vendor"
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-yellow-500 hover:bg-yellow-600 dark:bg-gray-700 dark:hover:dark:bg-gray-600"
          }`}
        >
          Add to Watchlist
        </button>

        <button
          onClick={() => handlePay(product._id)}
          className='flex-1 px-4 py-2 rounded-full bg-[#EC5800] hover:bg-[#d44c00] dark:bg-gray-700 dark:hover:dark:bg-gray-600 text-white transition-all'
        >
          Buy Product
        </button>
      </div>
    </div>
  </div>

  <div className='mt-12'>
    <h2 className='text-2xl font-bold mb-4'>User Reviews</h2>

    {user && (
      <div className='bg-white dark:bg-gray-700 dark:text-gray-100 p-4 rounded shadow mb-6'>
        <div className='flex items-center gap-2 mb-2'>
          {[1, 2, 3, 4, 5].map((num) => (
            <FaStar
              key={num}
              className={`cursor-pointer ${
                num <= userRating ? "text-yellow-400" : "text-gray-300 dark:text-gray-500"
              }`}
              onClick={() => setUserRating(num)}
            />
          ))}
        </div>
        <textarea
          value={commentText}
          onChange={(e) => setCommentText(e.target.value)}
          className='w-full p-2 border rounded dark:bg-gray-600 dark:text-gray-100 dark:border-gray-500'
          rows='3'
          placeholder='Write your feedback here...'
        ></textarea>
        <button
          onClick={handleReviewSubmit}
          className='mt-2 px-4 py-2 bg-[#EC5800] hover:bg-[#d44c00] dark:bg-gray-800 dark:hover:dark:bg-gray-600 text-white rounded-full'
        >
          Submit Review
        </button>
      </div>
    )}

    {reviews.length === 0 ? (
      <p className='text-gray-500 dark:text-gray-300'>No reviews yet.</p>
    ) : (
      <ul className='space-y-4'>
        {reviews.map((rev, idx) => (
          <li key={idx} className='bg-white dark:bg-gray-700 dark:text-gray-100 p-4 rounded shadow'>
            <div className='flex justify-between items-center mb-2'>
              <p className='font-semibold'>
                {rev.userName} ({rev.userEmail})
              </p>
              <p className='text-sm text-gray-500 dark:text-gray-300'>
                {new Date(rev.date).toLocaleDateString()}
              </p>
            </div>
            <div className='flex items-center text-yellow-400 mb-1'>
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

  <div className='mt-12'>
  <h2 className='text-2xl font-bold mb-4 dark:text-gray-100'>Price Trend Comparison</h2>
  {product.prices?.length > 0 ? (
    <ResponsiveContainer width='100%' height={300}>
      <LineChart data={product.prices}>
        <CartesianGrid 
          strokeDasharray='3 3' 
          stroke={document.documentElement.classList.contains('dark') ? '#4B5563' : '#ccc'} 
        />
        <XAxis
          dataKey='date'
          tickFormatter={(d) => new Date(d).toLocaleDateString()}
          stroke={document.documentElement.classList.contains('dark') ? '#F3F4F6' : '#000'} 
        />
        <YAxis stroke={document.documentElement.classList.contains('dark') ? '#F3F4F6' : '#000'} />
        <Tooltip 
          formatter={(value) => `৳${value}`}
          contentStyle={{
            backgroundColor: document.documentElement.classList.contains('dark') ? '#1F2937' : '#fff',
            color: document.documentElement.classList.contains('dark') ? '#F3F4F6' : '#000',
          }}
        />
        <Line
          type='monotone'
          dataKey='price'
          stroke={document.documentElement.classList.contains('dark') ? '#FFFFFF' : '#38a169'} // <-- white in dark
          strokeWidth={2}
          dot={{ stroke: '#f6e05e', strokeWidth: 2, fill: '#f6e05e' }}
          activeDot={{ r: 8, fill: '#f6e05e'  }}
        />
      </LineChart>
    </ResponsiveContainer>
  ) : (
    <p className='text-gray-500 dark:text-gray-300'>No price trend data available.</p>
  )}
</div>



  <div className='mt-12 text-center'>
    <button
      onClick={() => navigate("/")}
      className='px-6 py-2 bg-[#EC5800] hover:bg-[#d44c00]  dark:bg-gray-900 dark:hover:bg-gray-700 text-white rounded-full transition duration-300'
    >
      Back to Home
    </button>
  </div>
</div>

  );
};

export default ProductDetails;
