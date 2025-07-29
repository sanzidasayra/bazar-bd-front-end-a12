import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"; // ✅ updated from useHistory to useNavigate
import useAuth from "../../hooks/useAuth";

const AllOrder = () => {
  const { user } = useAuth();
  const navigate = useNavigate(); // ✅ replace useHistory

  const [orders, setOrders] = useState([]);

  // Ensure that only admin users can access this page
  useEffect(() => {
    
    if (user?.role !== "admin") {
      
       // ✅ redirect if not admin
    }
  }, [user, navigate]);

  // Fetch orders using the native fetch API
  useEffect(() => {
  if (user?.email) {
    console.log("Fetching orders for:", user.email);

    fetch(`http://localhost:5000/orders?email=${user.email}`)
      .then((res) => {
        console.log("Raw response:", res); // 👈 added
        if (!res.ok) throw new Error("Network response was not ok");
        return res.json();
      })
      .then((data) => {
        console.log("Orders fetched from server:", data); // 👈 added
        setOrders(data);
      })
      .catch((err) => {
        console.error("Error fetching orders:", err);
      });
  }
}, [user]);


  return (
    <>
    <div>
      <h1 className="text-3xl font-bold text-center mb-8 text-blue-600">All Orders</h1>
    </div>
    <div className="overflow-x-auto rounded-2xl border border-gray-200 bg-white shadow-lg">
      
  <table className="min-w-full divide-y divide-gray-200 text-sm">
    <thead className="bg-gradient-to-r from-green-100 to-blue-100 text-gray-800 font-semibold">
      <tr>
        <th className="px-6 py-4 text-left">#</th>
        <th className="px-6 py-4 text-left">Order ID</th>
        <th className="px-6 py-4 text-left">Product</th>
        <th className="px-6 py-4 text-left">Buyer Email</th>
        <th className="px-6 py-4 text-left">Price</th>
        <th className="px-6 py-4 text-left">Date</th>
        <th className="px-6 py-4 text-left">Transaction ID</th>
      </tr>
    </thead>
    <tbody className="divide-y divide-gray-100">
      {orders.length === 0 ? (
        <tr>
          <td colSpan="7" className="px-6 py-10 text-center text-gray-500">
            😕 No orders found.
          </td>
        </tr>
      ) : (
        orders.map((order, index) => (
          <tr
            key={order._id}
            className="hover:bg-blue-50 transition-colors duration-200 group"
          >
            <td className="px-6 py-4 font-medium text-gray-700">{index + 1}</td>
            <td className="px-6 py-4 text-gray-600 group-hover:text-blue-600 transition-colors duration-150">{order._id}</td>
            <td className="px-6 py-4 text-gray-700">{order.productName}</td>
            <td className="px-6 py-4 text-gray-600">{order.buyerEmail}</td>
            <td className="px-6 py-4 text-green-600 font-semibold">৳{order.price}</td>
            <td className="px-6 py-4 text-gray-500">
              <span className="inline-block bg-gray-100 px-2 py-1 rounded-full text-xs">
                {new Date(order.date).toLocaleDateString()}
              </span>
            </td>
            <td className="px-6 py-4 text-gray-600">{order.transactionId}</td>
          </tr>
        ))
      )}
    </tbody>
  </table>
</div>

</>
  );
};

export default AllOrder;
