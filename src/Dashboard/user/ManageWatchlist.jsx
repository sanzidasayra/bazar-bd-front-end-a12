import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useAuth from "../../hooks/useAuth";
import { FaPlusCircle, FaTrashAlt } from "react-icons/fa";
import Spinner from "../../components/Shared/Spinner";

const ManageWatchlist = () => {
  const { user, loading } = useAuth();
  const [watchlist, setWatchlist] = useState([]);
  const navigate = useNavigate();
  const axiosSecure = useAxiosSecure();

  useEffect(() => {
    if (loading) return;

    if (!user?.email) {
      toast.error("User email not found");
      return;
    }

    const fetchWatchlist = async () => {
      try {
        const res = await fetch(
          `https://bazar-bd-back-end-a12.onrender.com/watchlist?email=${user.email}`
        );
        if (!res.ok) throw new Error("Network response was not ok");

        const data = await res.json();
        setWatchlist(data);
      } catch (error) {
        console.error("Error fetching watchlist:", error);
        toast.error("Failed to load watchlist");
      }
    };

    fetchWatchlist();
  }, [user.email, loading, user]);

  if (loading) {
    return <Spinner />;
  }

  const handleRemove = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You want to remove this item from your watchlist.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, remove it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure
          .delete(`/watchlist/${id}`)
          .then((res) => {
            if (res.data.deletedCount > 0) {
              toast.success("Removed from watchlist!");
              setWatchlist((prev) => prev.filter((item) => item._id !== id));
            } else {
              toast.error("Failed to remove item.");
            }
          })
          .catch(() => toast.error("Error removing item."));
      }
    });
  };

  const handleAddMore = () => {
    navigate("/all-products");
  };

  return (
    <div className="px-4 py-6 bg-gray-50 dark:bg-gray-900 min-h-screen">
      <h2 className="text-3xl font-bold text-center mb-8 text-blue-600 dark:text-gray-50 mt-10">
        Manage Watchlist
      </h2>

      {watchlist.length === 0 ? (
        <p className="text-center text-gray-500 dark:text-gray-300">
          Your watchlist is empty.
        </p>
      ) : (
        <div className="overflow-x-auto shadow-xl rounded-lg max-w-6xl mx-auto">
          <table className="min-w-full table-auto border border-gray-200 dark:border-gray-700 rounded-xl bg-white dark:bg-gray-800">
            <thead className="bg-gradient-to-r from-green-100 to-blue-100 dark:from-gray-700 dark:to-gray-800 text-gray-800 dark:text-gray-200">
              <tr>
                <th className="px-6 py-3 text-left font-semibold">Product</th>
                <th className="px-6 py-3 text-left font-semibold">Market</th>
                <th className="px-6 py-3 text-left font-semibold">Date</th>
                <th className="px-6 py-3 text-center font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
              {watchlist.map((item) => (
                <tr
                  key={item._id}
                  className="hover:bg-gray-100 dark:hover:bg-gray-700 transition"
                >
                  <td className="px-6 py-3 text-gray-800 dark:text-gray-200">
                    {item.itemName}
                  </td>
                  <td className="px-6 py-3 text-gray-700 dark:text-gray-300">
                    {item.marketName || "N/A"}
                  </td>
                  <td className="px-6 py-3 text-gray-700 dark:text-gray-300">
                    {new Date(item.date).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-3 flex justify-center gap-4 text-lg">
                    <button
                      onClick={handleAddMore}
                      className="text-green-600 dark:text-green-400 hover:text-green-800 dark:hover:text-green-300 transition"
                      title="Add More"
                    >
                      <FaPlusCircle />
                    </button>
                    <button
                      onClick={() => handleRemove(item._id)}
                      className="text-red-600 dark:text-red-400 hover:text-red-800 dark:hover:text-red-300 transition"
                      title="Remove"
                    >
                      <FaTrashAlt />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default ManageWatchlist;
