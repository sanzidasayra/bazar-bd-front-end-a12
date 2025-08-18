import { useEffect, useState } from "react";
import { toast } from "react-toastify";

const AllAds = () => {
  const [ads, setAds] = useState([]);

  useEffect(() => {
    fetch("https://bazar-bd-back-end-a12.onrender.com/advertisements")
      .then((res) => res.json())
      .then((data) => setAds(data))
      .catch((err) => console.error(err));
  }, []);

  const handleStatusChange = async (id, newStatus) => {
    try {
      const res = await fetch(
        `https://bazar-bd-back-end-a12.onrender.com/advertisements/${id}`,
        {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ status: newStatus }),
        }
      );

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to update status");

      toast.success(`Status updated to ${newStatus}`);
      setAds((prev) =>
        prev.map((ad) => (ad._id === id ? { ...ad, status: newStatus } : ad))
      );
    } catch (err) {
      toast.error(err.message);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this ad?")) return;

    try {
      const res = await fetch(
        `https://bazar-bd-back-end-a12.onrender.com/advertisements/${id}`,
        { method: "DELETE" }
      );
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to delete ad");

      toast.error("Advertisement deleted");
      setAds((prev) => prev.filter((ad) => ad._id !== id));
    } catch (err) {
      toast.error(err.message);
    }
  };

  return (
    <div className="p-6 min-h-screen bg-gray-50 dark:bg-gray-900 pt-10">
      <h2 className="text-3xl font-bold mb-6 text-gray-800 dark:text-gray-200 text-center">
        All Advertisements
      </h2>
      <div className="overflow-x-auto max-w-6xl mx-auto">
        <table className="min-w-full text-left text-gray-700 dark:text-gray-200 rounded-xl overflow-hidden shadow-lg ">
          <thead className="bg-gradient-to-r from-blue-100 to-green-100 dark:from-gray-700 dark:to-gray-800 text-gray-800 dark:text-gray-200 ">
            <tr>
              <th className="px-6 py-3 text-left">#</th>
              <th className="px-6 py-3 text-left">Title</th>
              <th className="px-6 py-3 text-left">Vendor</th>
              <th className="px-6 py-3 text-left">Status</th>
              <th className="px-6 py-3 text-left">Action</th>
            </tr>
          </thead>
          <tbody>
            {ads.length === 0 ? (
              <tr>
                <td
                  colSpan="5"
                  className="px-6 py-6 text-center text-gray-500 dark:text-gray-400"
                >
                  No advertisements found.
                </td>
              </tr>
            ) : (
              ads.map((ad, index) => (
                <tr
                  key={ad._id}
                  className={`transition-all duration-200 ${
                    index % 2 === 0
                      ? "bg-white dark:bg-gray-800"
                      : "bg-gray-50 dark:bg-gray-700"
                  }  `}
                >
                  <td className="px-6 py-4 font-medium">{index + 1}</td>
                  <td className="px-6 py-4">{ad.adTitle}</td>
                  <td className="px-6 py-4">{ad.vendorEmail}</td>
                  <td className="px-6 py-4">
                    <select
                      value={ad.status}
                      onChange={(e) =>
                        handleStatusChange(ad._id, e.target.value)
                      }
                      className={`border rounded px-3 py-1 text-sm font-medium 
                        ${
                          ad.status === "pending"
                            ? "bg-yellow-100 dark:bg-yellow-600 text-yellow-800 dark:text-yellow-100"
                            : ad.status === "approved"
                            ? "bg-green-100 dark:bg-gray-600 text-green-800 dark:text-green-100"
                            : "bg-red-100 dark:bg-red-600 text-red-800 dark:text-red-100"
                        }`}
                    >
                      <option value="pending">Pending</option>
                      <option value="approved">Approved</option>
                      <option value="rejected">Rejected</option>
                    </select>
                  </td>
                  <td className="px-6 py-4">
                    <button
                      onClick={() => handleDelete(ad._id)}
                      className="text-red-600 dark:text-red-400 font-semibold hover:underline"
                    >
                      Delete
                    </button>
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

export default AllAds;
