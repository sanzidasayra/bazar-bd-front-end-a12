import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { FaUserShield, FaStore } from "react-icons/fa";

const PER_PAGE = 10;

const AllUsers = () => {
  const [users, setUsers] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(0);

  useEffect(() => {
    axios
      .get(`https://bazar-bd-back-end-a12.onrender.com/users?search=${searchQuery}`)
      .then((res) => setUsers(res.data))
      .catch((err) => {
        console.error(err);
        toast.error("Failed to fetch users");
      });
  }, [searchQuery]);

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
    setCurrentPage(0); // Reset page on search
  };

  const handleRoleChange = (id, newRole) => {
    axios
      .patch(`https://bazar-bd-back-end-a12.onrender.com/users/role/${id}`, { role: newRole })
      .then(() => {
        toast.success("Role updated");
        setUsers((prev) =>
          prev.map((user) => (user._id === id ? { ...user, role: newRole } : user))
        );
      })
      .catch(() => toast.error("Failed to update role"));
  };

  // Pagination logic
  const totalPages = Math.ceil(users.length / PER_PAGE);
  const paginatedUsers = users.slice(currentPage * PER_PAGE, (currentPage + 1) * PER_PAGE);
  const pages = [...Array(totalPages).keys()];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-10">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl font-semibold mb-4 text-center text-gray-800 dark:text-gray-200">
          All Users
        </h2>

        <div className="mb-6 flex justify-center">
          <input
            type="text"
            placeholder="Search by name or email..."
            value={searchQuery}
            onChange={handleSearchChange}
            className="w-full max-w-md border border-gray-300 dark:border-gray-700 rounded-lg shadow-sm focus:outline-none focus:ring focus:border-blue-300 dark:bg-gray-800 dark:text-gray-200 p-2"
          />
        </div>

        <div className="overflow-x-auto rounded-xl shadow-xl bg-white/80 dark:bg-gray-800/90 backdrop-blur-md border border-gray-200 dark:border-gray-700">
          <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
            <thead className="bg-white/90 dark:bg-gray-700/80">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600 dark:text-gray-300">#</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600 dark:text-gray-300">Name</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600 dark:text-gray-300">Email</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600 dark:text-gray-300">Role</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600 dark:text-gray-300">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-100 dark:divide-gray-700">
              {paginatedUsers.length === 0 ? (
                <tr>
                  <td colSpan="5" className="text-center py-6 text-gray-400 dark:text-gray-500">
                    No users found.
                  </td>
                </tr>
              ) : (
                paginatedUsers.map((user, index) => (
                  <tr key={user._id} className="hover:bg-gray-50 dark:hover:bg-gray-700 transition">
                    <td className="px-6 py-4 text-sm text-gray-700 dark:text-gray-300">
                      {currentPage * PER_PAGE + index + 1}
                    </td>
                    <td className="px-6 py-4 font-medium text-gray-800 dark:text-gray-200">{user.name || "N/A"}</td>
                    <td className="px-6 py-4 text-sm text-gray-700 dark:text-gray-300">{user.email}</td>
                    <td className="px-6 py-4">
                      <span
                        className={`text-xs font-semibold px-3 py-1 rounded-full ${
                          user.role === "admin"
                            ? "bg-green-100 text-green-700 dark:bg-green-800 dark:text-green-300"
                            : user.role === "vendor"
                            ? "bg-blue-100 text-blue-700 dark:bg-blue-800 dark:text-blue-300"
                            : "bg-gray-200 text-gray-700 dark:bg-gray-700 dark:text-gray-300"
                        }`}
                      >
                        {user.role}
                      </span>
                    </td>
                    <td className="px-6 py-4 flex gap-2">
                      {user.role !== "admin" && (
                        <button
                          onClick={() => handleRoleChange(user._id, "admin")}
                          className="flex items-center gap-2 bg-green-100 hover:bg-green-200 dark:bg-green-800 dark:hover:bg-green-700 text-green-800 dark:text-green-300 text-xs font-semibold px-3 py-1 rounded-full"
                        >
                          <FaUserShield className="text-sm" />
                          Admin
                        </button>
                      )}
                      {user.role !== "vendor" && (
                        <button
                          onClick={() => handleRoleChange(user._id, "vendor")}
                          className="flex items-center gap-2 bg-blue-100 hover:bg-blue-200 dark:bg-blue-800 dark:hover:bg-blue-700 text-blue-800 dark:text-blue-300 text-xs font-semibold px-3 py-1 rounded-full"
                        >
                          <FaStore className="text-sm" />
                          Vendor
                        </button>
                      )}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center mt-6 gap-2 flex-wrap">
            <button
              onClick={() => currentPage > 0 && setCurrentPage(currentPage - 1)}
              disabled={currentPage === 0}
              className="px-3 py-1 border rounded bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 dark:text-gray-200 disabled:opacity-50"
            >
              Previous
            </button>
            {pages.map((page) => (
              <button
                key={page}
                onClick={() => setCurrentPage(page)}
                className={`px-3 py-1 border rounded ${
                  currentPage === page
                    ? "bg-blue-500 text-white dark:bg-blue-600"
                    : "bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 dark:text-gray-200"
                }`}
              >
                {page + 1}
              </button>
            ))}
            <button
              onClick={() => currentPage < totalPages - 1 && setCurrentPage(currentPage + 1)}
              disabled={currentPage === totalPages - 1}
              className="px-3 py-1 border rounded bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 dark:text-gray-200 disabled:opacity-50"
            >
              Next
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default AllUsers;
