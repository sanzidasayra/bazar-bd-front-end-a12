import React, { useState, useEffect } from 'react';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer
} from 'recharts';
import useAxiosSecure from '../../hooks/useAxiosSecure';

const ViewPriceTrend = () => {
  const [products, setProducts] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);
  const [priceData, setPriceData] = useState([]);
  const axiosSecure = useAxiosSecure();

  useEffect(() => {
    axiosSecure.get('/products/all-no-limit')
      .then(res => {
        setProducts(res.data);
        if (res.data.length > 0) setSelectedItem(res.data[0]);
      })
      .catch(err => console.error(err));
  }, [axiosSecure]);

  useEffect(() => {
    if (!selectedItem?._id) return;

    axiosSecure.get(`/products/${selectedItem._id}/price-history`)
      .then(res => setPriceData(res.data))
      .catch(err => console.error(err));
  }, [axiosSecure, selectedItem]);

  const calculateTrend = () => {
    if (priceData.length < 2) return 0;
    const first = priceData[0].price;
    const last = priceData[priceData.length - 1].price;
    const change = ((last - first) / first) * 100;
    return change.toFixed(1);
  };

  return (
    <div className="flex flex-col md:flex-row w-full p-4 bg-white dark:bg-gray-800 rounded shadow-md transition-colors duration-300">
      {/* Left sidebar */}
      <div className="w-full md:w-1/4 border-b md:border-b-0 md:border-r border-gray-200 dark:border-gray-600 pr-0 md:pr-4 mb-4 md:mb-0">
        <h2 className="font-semibold mb-2 text-gray-700 dark:text-gray-300">Tracked Items</h2>
        {products.map(item => (
          <button
            key={item._id}
            onClick={() => setSelectedItem(item)}
            className={`block px-3 py-2 rounded w-full text-left mb-2 transition-colors duration-300
              ${
                selectedItem?._id === item._id
                  ? 'bg-gray-200 dark:bg-gray-700 font-bold text-gray-900 dark:text-white'
                  : 'hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-800 dark:text-gray-200'
              }`}
          >
            {item.itemName}
          </button>
        ))}
      </div>

      {/* Right content */}
      <div className="w-full md:w-3/4 pl-0 md:pl-6">
        {selectedItem && (
          <>
            <h2 className="text-xl font-bold mb-1 text-gray-900 dark:text-white">{selectedItem.itemName}</h2>
            <p className="text-sm text-gray-600 dark:text-gray-300">{selectedItem.marketName}</p>
            <p className="text-sm mb-3 text-gray-600 dark:text-gray-300">Vendor: {selectedItem.vendorName}</p>

            {priceData.length > 0 ? (
              <>
                <div style={{ width: '100%', height: 250 }}>
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={priceData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#ccc" />
                      <XAxis
                        dataKey="date"
                        tickFormatter={date => {
                          const d = new Date(date);
                          return d.toLocaleDateString('en-US', { day: '2-digit', month: 'short' });
                        }}
                        stroke="#8884d8"
                      />
                      <YAxis stroke="#8884d8" />
                      <Tooltip contentStyle={{ backgroundColor: '#f9f9f9', borderRadius: '8px' }} />
                      <Line type="monotone" dataKey="price" stroke="#2563eb" dot={{ r: 5 }} />
                    </LineChart>
                  </ResponsiveContainer>
                </div>

                <p className="mt-3 text-sm text-gray-700 dark:text-gray-300">
                  Trend:{' '}
                  <span className={`font-semibold ${calculateTrend() > 0 ? 'text-green-600' : 'text-red-500'}`}>
                    {calculateTrend() > 0 ? '+' : ''}
                    {calculateTrend()}% last 7 days
                  </span>
                </p>
              </>
            ) : (
              <p className="text-gray-500 dark:text-gray-400">No price history available for this product.</p>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default ViewPriceTrend;
