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
    // Fetch all products using the new endpoint with no limit
    axiosSecure.get('/products/all-no-limit')  // Updated endpoint
      .then(res => {
        setProducts(res.data);  // Save all products in state
        if (res.data.length > 0) {
          setSelectedItem(res.data[0]);  // Select the first item as default
        }
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
    <div className="flex w-full p-4 bg-white rounded shadow-md ">
      <div className="w-1/4 border-r pr-4">
        <h2 className="font-semibold mb-2">Tracked Items</h2>
        {products.map(item => (
          <button
            key={item._id}
            onClick={() => setSelectedItem(item)}
            className={`block px-3 py-2 rounded w-full text-left mb-2 ${
              selectedItem?._id === item._id ? 'bg-gray-200 font-bold' : 'hover:bg-gray-50'
            }`}
          >
            {item.itemName}
          </button>
        ))}
      </div>

      <div className="w-3/4 pl-6">
        {selectedItem && (
          <>
            <h2 className="text-xl font-bold mb-1">{selectedItem.itemName}</h2>
            <p className="text-sm text-gray-600">{selectedItem.marketName}</p>
            <p className="text-sm mb-3">Vendor: {selectedItem.vendorName}</p>

            {priceData.length > 0 ? (
              <>
                <ResponsiveContainer width="100%" height={250}>
                  <LineChart data={priceData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis
                      dataKey="date"
                      tickFormatter={date => {
                        const d = new Date(date);
                        return d.toLocaleDateString('en-US', { day: '2-digit', month: 'short' });
                      }}
                    />
                    <YAxis />
                    <Tooltip />
                    <Line type="monotone" dataKey="price" stroke="#2563eb" dot={{ r: 5 }} />
                  </LineChart>
                </ResponsiveContainer>

                <p className="mt-3 text-sm">
                  Trend:{' '}
                  <span
                    className={`font-semibold ${calculateTrend() > 0 ? 'text-green-600' : 'text-red-500'}`}
                  >
                    {calculateTrend() > 0 ? '+' : ''}
                    {calculateTrend()}% last 7 days
                  </span>
                </p>
              </>
            ) : (
              <p className="text-gray-500">No price history available for this product.</p>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default ViewPriceTrend;
