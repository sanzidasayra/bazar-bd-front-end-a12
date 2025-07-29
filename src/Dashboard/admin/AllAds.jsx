import { useEffect, useState } from "react";
import { toast } from "react-toastify";

const AllAds = () => {
  const [ads, setAds] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/advertisements")
      .then((res) => res.json())
      .then((data) => setAds(data));
  }, []);

  const handleStatusChange = (id, newStatus) => {
    fetch(`http://localhost:5000/advertisements/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status: newStatus }),
    })
      .then((res) => res.json())
      .then(() => {
        toast.success(`Status updated to ${newStatus}`);
        setAds((prev) =>
          prev.map((ad) =>
            ad._id === id ? { ...ad, status: newStatus } : ad
          )
        );
      });
  };

  const handleDelete = (id) => {
    if (!confirm("Are you sure you want to delete this ad?")) return;

    fetch(`http://localhost:5000/advertisements/${id}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then(() => {
        toast.error("Advertisement deleted");
        setAds((prev) => prev.filter((ad) => ad._id !== id));
      });
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">All Advertisements</h2>
      <div className="overflow-x-auto bg-white rounded-xl shadow">
        <table className="min-w-full text-sm text-left">
          <thead className="bg-gray-100 text-gray-700">
            <tr>
              <th className="px-4 py-2">#</th>
              <th className="px-4 py-2">Title</th>
              <th className="px-4 py-2">Vendor</th>
              <th className="px-4 py-2">Status</th>
              <th className="px-4 py-2">Action</th>
            </tr>
          </thead>
          <tbody>
            {ads.map((ad, index) => (
              <tr key={ad._id} className="border-t hover:bg-gray-50">
                <td className="px-4 py-2">{index + 1}</td>
                <td className="px-4 py-2">{ad.adTitle}</td>
                <td className="px-4 py-2">{ad.vendorEmail}</td>
                <td className="px-4 py-2">
                  <select
                    value={ad.status}
                    onChange={(e) => handleStatusChange(ad._id, e.target.value)}
                    className="border px-2 py-1 rounded"
                  >
                    <option value="pending">Pending</option>
                    <option value="approved">Approved</option>
                    <option value="rejected">Rejected</option>
                  </select>
                </td>
                <td className="px-4 py-2">
                  <button
                    onClick={() => handleDelete(ad._id)}
                    className="text-red-600 font-semibold hover:underline"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
            {ads.length === 0 && (
              <tr>
                <td colSpan="5" className="px-4 py-4 text-center text-gray-500">
                  No advertisements found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AllAds;
