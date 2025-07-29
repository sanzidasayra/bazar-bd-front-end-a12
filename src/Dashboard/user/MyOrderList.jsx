import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { toast } from "react-toastify";
import { FaSearch } from "react-icons/fa";
import useAuth from "../../hooks/useAuth";

const OrderList = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { user } = useAuth();

  useEffect(() => {
    if (user?.email) {
      fetch(`http://localhost:5000/orders?email=${user.email}`)
        .then((res) => {
          if (!res.ok) throw new Error("Failed to fetch orders");
          return res.json();
        })
        .then((data) => {
          console.log("Fetched orders data:", data); // Log fetched data
          // For each order, fetch the price history using the productId
          const ordersWithPriceHistory = data.map(async (order) => {
            if (order.productId) {
              // Fetch the price history of the product
              const priceHistoryResponse = await fetch(
                `http://localhost:5000/products/${order.productId}/price-history`
              );
              const priceHistory = await priceHistoryResponse.json();
              return { ...order, priceHistory };  // Add priceHistory to the order object
            }
            return order;
          });

          // Wait for all price histories to be fetched before setting the state
          Promise.all(ordersWithPriceHistory).then((ordersWithHistory) => {
            setOrders(ordersWithHistory);  // Set the orders with price history
            setLoading(false);  // Done fetching, so stop the loading spinner
          });
        })
        .catch((err) => {
          console.error("Error fetching orders:", err);
          toast.error("Could not load orders.");
          setLoading(false);  // Ensure loading is stopped on error
        });
    }
  }, [user]);

  const handleViewDetails = (productId) => {
    navigate(`/products/${productId}`);
  };

  if (loading) {
    return <div className="text-center py-10 text-lg font-semibold">Loading your orders...</div>;
  }

  if (orders.length === 0) {
    return <div className="text-center py-10 text-lg font-semibold">You have no orders yet.</div>;
  }

  return (
    <div className="container mx-auto px-4 py-6">
      <h2 className="text-3xl font-bold text-center mb-8 text-blue-600">My Order List</h2>

      {/* Table */}
      <div className="overflow-x-auto shadow-lg rounded-lg bg-white">
        <table className="min-w-full divide-y divide-gray-200 text-sm text-gray-700">
          <thead className="bg-gradient-to-r from-green-100 to-blue-100 text-gray-800"> {/* Blue theme for table header */}
            <tr>
              <th className="px-6 py-3 text-left">Product</th>
              <th className="px-6 py-3 text-left">Market</th>
              <th className="px-6 py-3 text-left">Price</th>
              <th className="px-6 py-3 text-left">Date</th>
              <th className="px-6 py-3 text-center">Action</th>
            </tr>
          </thead>
          <tbody className="bg-gray-50 divide-y divide-gray-100">
            {orders.map((order) => (
              <tr key={order._id} className="hover:bg-blue-50 transition-all duration-200">
                <td className="px-6 py-4 font-medium">{order.productName}</td>
                <td className="px-6 py-4">{order.marketName}</td>
                <td className="px-6 py-4 font-semibold text-green-700">৳{order.price}</td>
                <td className="px-6 py-4">
                  {new Date(order.date).toLocaleDateString()}
                </td>
                <td className="px-6 py-4 text-center">
                  <button
                    onClick={() => handleViewDetails(order.productId)}
                    className="inline-flex items-center gap-2 btn btn-neutral text-white font-semibold py-2 px-4 rounded-full shadow transition"
                  >
                    <FaSearch /> View Details
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Loop through orders and render Price Trend Chart for each product */}
      {orders.length > 0 && orders.map((order) => (
        order.priceHistory?.length > 0 && (
          <div className="mt-12" key={order._id}>
            <h3 className="text-xl font-semibold mb-4 text-gray-800">
              Price Trend for: <span className="text-blue-600">{order.productName}</span> {/* Blue theme for product name */}
            </h3>
            <ResponsiveContainer width="100%" height={320}>
              <LineChart data={order.priceHistory}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" tickFormatter={(d) => new Date(d).toLocaleDateString()} />
                <YAxis />
                <Tooltip formatter={(value) => `৳${value}`} />
                <Line type="monotone" dataKey="price" stroke="#16a34a" strokeWidth={3} /> {/* Green line for price trend */}
              </LineChart>
            </ResponsiveContainer>
          </div>
        )
      ))}
    </div>
  );
};

export default OrderList;
