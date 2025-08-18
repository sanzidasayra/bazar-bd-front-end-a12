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
      fetch(
        `https://bazar-bd-back-end-a12.onrender.com/orders?email=${user.email}`
      )
        .then((res) => {
          if (!res.ok) throw new Error("Failed to fetch orders");
          return res.json();
        })
        .then((data) => {
          const ordersWithPriceHistory = data.map(async (order) => {
            if (order.productId) {
              const priceHistoryResponse = await fetch(
                `https://bazar-bd-back-end-a12.onrender.com/products/${order.productId}/price-history`
              );
              const priceHistory = await priceHistoryResponse.json();
              return { ...order, priceHistory };
            }
            return order;
          });

          Promise.all(ordersWithPriceHistory).then((ordersWithHistory) => {
            setOrders(ordersWithHistory);
            setLoading(false);
          });
        })
        .catch((err) => {
          console.error("Error fetching orders:", err);
          toast.error("Could not load orders.");
          setLoading(false);
        });
    }
  }, [user]);

  const handleViewDetails = (productId) => {
    navigate(`/products/${productId}`);
  };

  if (loading) {
    return (
      <div className='text-center py-10 text-lg font-semibold text-gray-800 dark:text-gray-200'>
        Loading your orders...
      </div>
    );
  }

  if (orders.length === 0) {
    return (
      <div className='text-center py-10 text-lg font-semibold text-gray-800 dark:text-gray-200'>
        You have no orders yet.
      </div>
    );
  }

  return (
    <div className="bg-gray-800">
      <div className='container mx-auto '>
      <h2 className='text-3xl font-bold text-center mb-8 text-blue-600 dark:text-gray-50 mt-10'>
        My Order List
      </h2>

      {/* Table */}
      <div className='overflow-x-auto shadow-lg rounded-lg bg-white dark:bg-gray-800'>
        <table className='min-w-full divide-y divide-gray-200 dark:divide-gray-700 text-sm text-gray-700 dark:text-gray-300'>
          <thead className='bg-gradient-to-r from-green-100 to-blue-100 dark:from-gray-700 dark:to-gray-600 text-gray-800 dark:text-gray-200'>
            <tr>
              <th className='px-6 py-3 text-left'>Product</th>
              <th className='px-6 py-3 text-left'>Market</th>
              <th className='px-6 py-3 text-left'>Price</th>
              <th className='px-6 py-3 text-left'>Date</th>
              <th className='px-6 py-3 text-center'>Action</th>
            </tr>
          </thead>
          <tbody className='bg-gray-50 dark:bg-gray-900 divide-y divide-gray-100 dark:divide-gray-700'>
            {orders.map((order) => (
              <tr
                key={order._id}
                className='hover:bg-blue-50 dark:hover:bg-gray-700 transition-all duration-200'
              >
                <td className='px-6 py-4 font-medium'>{order.productName}</td>
                <td className='px-6 py-4'>{order.marketName}</td>
                <td className='px-6 py-4 font-semibold text-green-700 dark:text-green-400'>
                  ৳{order.price}
                </td>
                <td className='px-6 py-4'>
                  {new Date(order.date).toLocaleDateString()}
                </td>
                <td className='px-6 py-4 text-center'>
                  <button
                    onClick={() => handleViewDetails(order.productId)}
                    className='inline-flex items-center gap-2 btn btn-neutral text-white font-semibold py-2 px-4 rounded-full shadow transition bg-blue-600 dark:bg-blue-500 hover:bg-blue-700 dark:hover:bg-blue-600'
                  >
                    <FaSearch /> View Details
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Price Trend Charts */}
      {orders.length > 0 &&
        orders.map(
          (order) =>
            order.priceHistory?.length > 0 && (
              <div className='mt-12' key={order._id}>
                <h3 className='text-xl font-semibold mb-4 text-gray-800 dark:text-gray-200'>
                  Price Trend for:{" "}
                  <span className='text-blue-600 dark:text-blue-400'>{order.productName}</span>
                </h3>
                <div className='bg-white dark:bg-gray-800 p-4 rounded shadow-md'>
                  <ResponsiveContainer width='100%' height={320}>
                    <LineChart data={order.priceHistory}>
                      <CartesianGrid strokeDasharray='3 3' stroke='#ccc' />
                      <XAxis
                        dataKey='date'
                        stroke='#8884d8'
                        tickFormatter={(d) => new Date(d).toLocaleDateString()}
                      />
                      <YAxis stroke='#8884d8' />
                      <Tooltip
                        contentStyle={{ backgroundColor: '#f9f9f9', borderRadius: '8px', color: '#000' }}
                      />
                      <Line
                        type='monotone'
                        dataKey='price'
                        stroke='#16a34a'
                        strokeWidth={3}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>
            )
        )}
    </div>
    </div>
  );
};

export default OrderList;
