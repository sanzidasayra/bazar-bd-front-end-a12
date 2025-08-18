import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"; 
import useAuth from "../../hooks/useAuth";

const AllOrder = () => {
  const { user } = useAuth();
  const navigate = useNavigate(); 

  const [orders, setOrders] = useState([]);

  useEffect(() => {
    if (user?.role !== "admin") {
      // ✅ redirect if not admin
    }
  }, [user, navigate]);

  useEffect(() => {
    if (user?.email) {
      console.log("Fetching orders for:", user.email);

      fetch(
        `https://bazar-bd-back-end-a12.onrender.com/all-orders`
      )
        .then((res) => {
          console.log("Raw response:", res); 
          if (!res.ok) throw new Error("Network response was not ok");
          return res.json();
        })
        .then((data) => {
          console.log("Orders fetched from server:", data); 
          setOrders(data);
        })
        .catch((err) => {
          console.error("Error fetching orders:", err);
        });
    }
  }, [user]);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-4 py-10">
      <div>
        <h1 className='text-3xl font-bold text-center mb-8 text-blue-600 dark:text-white'>
          All Orders
        </h1>
      </div>
      <div className='overflow-x-auto rounded-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 shadow-lg max-w-6xl mx-auto'>
        <table className='min-w-full divide-y divide-gray-200 dark:divide-gray-700 text-sm'>
          <thead className='bg-gradient-to-r from-green-100 to-blue-100 dark:from-gray-700 dark:to-gray-800 text-gray-800 dark:text-gray-200 font-semibold'>
            <tr>
              <th className='px-6 py-4 text-left'>#</th>
              <th className='px-6 py-4 text-left'>Order ID</th>
              <th className='px-6 py-4 text-left'>Product</th>
              <th className='px-6 py-4 text-left'>Buyer Email</th>
              <th className='px-6 py-4 text-left'>Price</th>
              <th className='px-6 py-4 text-left'>Date</th>
              <th className='px-6 py-4 text-left'>Transaction ID</th>
            </tr>
          </thead>
          <tbody className='divide-y divide-gray-100 dark:divide-gray-700'>
            {orders.length === 0 ? (
              <tr>
                <td
                  colSpan='7'
                  className='px-6 py-10 text-center text-gray-500 dark:text-gray-400'
                >
                 No orders found.
                </td>
              </tr>
            ) : (
              orders.map((order, index) => (
                <tr
                  key={order._id}
                  className='hover:bg-blue-50 dark:hover:bg-gray-700 transition-colors duration-200 group'
                >
                  <td className='px-6 py-4 font-medium text-gray-700 dark:text-gray-200'>
                    {index + 1}
                  </td>
                  <td className='px-6 py-4 text-gray-600 dark:text-gray-300 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-150'>
                    {order._id}
                  </td>
                  <td className='px-6 py-4 text-gray-700 dark:text-gray-200'>
                    {order.productName}
                  </td>
                  <td className='px-6 py-4 text-gray-600 dark:text-gray-300'>
                    {order.buyerEmail}
                  </td>
                  <td className='px-6 py-4 text-green-600 dark:text-green-400 font-semibold'>
                    ৳{order.price}
                  </td>
                  <td className='px-6 py-4'>
                    <span className='inline-block bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded-full text-xs text-gray-800 dark:text-gray-200'>
                      {new Date(order.date).toLocaleDateString()}
                    </span>
                  </td>
                  <td className='px-6 py-4 text-gray-600 dark:text-gray-300'>
                    {order.transactionId}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AllOrder;
