import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { FaUserShield, FaStore } from "react-icons/fa";

const AllUsers = () => {
  const [users, setUsers] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  const fetchUsers = async (query = "") => {
    try {
      const res = await axios.get(
        `https://bazar-bd-back-end-a12.onrender.com/users?search=${query}`
      );
      setUsers(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleSearchChange = (e) => {
    const query = e.target.value;
    setSearchQuery(query);
    fetchUsers(query);
  };

  const handleRoleChange = (id, newRole) => {
    axios
      .patch(`https://bazar-bd-back-end-a12.onrender.com/users/role/${id}`, {
        role: newRole,
      })
      .then(() => {
        toast.success("Role updated");
        fetchUsers(searchQuery);
      })
      .catch(() => toast.error("Failed to update role"));
  };

  return (
    <div className='p-6 min-h-screen bg-gradient-to-br from-[#fdfbfb] to-[#ebedee]'>
      <div className='max-w-6xl mx-auto'>
        <h2 className='text-3xl font-semibold text-gray-800 mb-4 text-center'>
          All Users
        </h2>

        <div className='mb-6 flex justify-center'>
          <input
            type='text'
            placeholder='Search by name or email...'
            value={searchQuery}
            onChange={handleSearchChange}
            className='w-full max-w-md px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring focus:border-blue-300'
          />
        </div>

        <div className='overflow-x-auto rounded-xl shadow-xl bg-white/80 backdrop-blur-md border border-gray-200'>
          <table className='min-w-full divide-y divide-gray-200'>
            <thead className='bg-white/90'>
              <tr>
                <th className='px-6 py-4 text-left text-sm font-semibold text-gray-600'>
                  #
                </th>
                <th className='px-6 py-4 text-left text-sm font-semibold text-gray-600'>
                  Name
                </th>
                <th className='px-6 py-4 text-left text-sm font-semibold text-gray-600'>
                  Email
                </th>
                <th className='px-6 py-4 text-left text-sm font-semibold text-gray-600'>
                  Role
                </th>
                <th className='px-6 py-4 text-left text-sm font-semibold text-gray-600'>
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className='bg-white divide-y divide-gray-100'>
              {users.length === 0 ? (
                <tr>
                  <td colSpan='5' className='text-center py-6 text-gray-400'>
                    No users found.
                  </td>
                </tr>
              ) : (
                users.map((user, index) => (
                  <tr key={user._id} className='hover:bg-gray-50 transition'>
                    <td className='px-6 py-4 text-sm text-gray-700'>
                      {index + 1}
                    </td>
                    <td className='px-6 py-4 font-medium text-gray-800'>
                      {user.name || "N/A"}
                    </td>
                    <td className='px-6 py-4 text-sm text-gray-700'>
                      {user.email}
                    </td>
                    <td className='px-6 py-4'>
                      <span
                        className={`text-xs font-semibold px-3 py-1 rounded-full ${
                          user.role === "admin"
                            ? "bg-green-100 text-green-700"
                            : user.role === "vendor"
                            ? "bg-blue-100 text-blue-700"
                            : "bg-gray-200 text-gray-700"
                        }`}
                      >
                        {user.role}
                      </span>
                    </td>
                    <td className='px-6 py-4 flex gap-2'>
                      {user.role !== "admin" && (
                        <button
                          onClick={() => handleRoleChange(user._id, "admin")}
                          className='flex items-center gap-2 bg-green-100 hover:bg-green-200 text-green-800 text-xs font-semibold px-3 py-1 rounded-full'
                        >
                          <FaUserShield className='text-sm' />
                          Admin
                        </button>
                      )}
                      {user.role !== "vendor" && (
                        <button
                          onClick={() => handleRoleChange(user._id, "vendor")}
                          className='flex items-center gap-2 bg-blue-100 hover:bg-blue-200 text-blue-800 text-xs font-semibold px-3 py-1 rounded-full'
                        >
                          <FaStore className='text-sm' />
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
      </div>
    </div>
  );
};

export default AllUsers;
