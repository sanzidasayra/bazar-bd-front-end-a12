import React, { useEffect, useState } from "react";

const AdminNewsletter = () => {
  const [subscribers, setSubscribers] = useState([]);

  useEffect(() => {
    fetch("https://bazar-bd-back-end-a12.onrender.com/newsletter") // backend GET route
      .then(res => res.json())
      .then(data => setSubscribers(data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Newsletter Subscribers</h2>
      <table className="min-w-full border">
        <thead>
          <tr>
            <th className="border px-4 py-2">Email</th>
            <th className="border px-4 py-2">Subscribed At</th>
          </tr>
        </thead>
        <tbody>
          {subscribers.map((sub) => (
            <tr key={sub._id}>
              <td className="border px-4 py-2">{sub.email}</td>
              <td className="border px-4 py-2">
                {new Date(sub.subscribedAt).toLocaleString()}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminNewsletter;
