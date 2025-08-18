import React, { useEffect, useState } from "react";

const AdminNewsletter = () => {
  const [subscribers, setSubscribers] = useState([]);

  useEffect(() => {
    fetch("https://bazar-bd-back-end-a12.onrender.com/newsletter") // backend GET route
      .then((res) => res.json())
      .then((data) => setSubscribers(data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="min-h-screen p-6 bg-gray-50 dark:bg-gray-900 transition-colors duration-300 pt-10">
      <h2 className="text-3xl font-bold mb-6 text-gray-800 dark:text-gray-50 text-center">
        Newsletter Subscribers
      </h2>
      <div className="overflow-x-auto shadow-lg rounded-xl border border-gray-200 dark:border-gray-700 max-w-6xl mx-auto">
        <table className="min-w-full text-sm divide-y divide-gray-200 dark:divide-gray-700">
          <thead className="bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 uppercase text-xs">
            <tr>
              <th className="px-6 py-3 text-left">Email</th>
              <th className="px-6 py-3 text-left">Subscribed At</th>
            </tr>
          </thead>
          <tbody className="bg-white dark:bg-gray-900 divide-y divide-gray-100 dark:divide-gray-700">
            {subscribers.length === 0 ? (
              <tr>
                <td colSpan="2" className="px-6 py-6 text-center text-gray-500 dark:text-gray-400">
                  No subscribers found.
                </td>
              </tr>
            ) : (
              subscribers.map((sub, index) => (
                <tr
                  key={sub._id}
                  className={`hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors duration-200 ${
                    index % 2 === 0 ? " dark:bg-gray-850" : "bg-white dark:bg-gray-900"
                  }`}
                >
                  <td className="px-6 py-4 text-gray-800 dark:text-gray-200">{sub.email}</td>
                  <td className="px-6 py-4 text-gray-600 dark:text-gray-400">
                    {new Date(sub.subscribedAt).toLocaleString()}
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

export default AdminNewsletter;
