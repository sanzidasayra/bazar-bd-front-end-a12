import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom"; // ✅ useLocation add
import useAuth from "../hooks/useAuth";
import SkeletonCard from "./SkeletonCard";

const NavAllProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sortOrder, setSortOrder] = useState("");
  const [dateFrom, setDateFrom] = useState("");
  const [dateTo, setDateTo] = useState("");
  const [currentPage, setCurrentPage] = useState(0);
  const [totalCount, setTotalCount] = useState(0);
  const itemsPerPage = 8;

  const { user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation(); // ✅ get query params

  const numberOfPages = Math.ceil(totalCount / itemsPerPage);
  const pages = [...Array(numberOfPages).keys()];

  // ✅ query params theke category catch
  const queryParams = new URLSearchParams(location.search);
  const category = queryParams.get("category");

  useEffect(() => {
    setLoading(true);
    let url = `https://bazar-bd-back-end-a12.onrender.com/products/search?status=approved&page=${currentPage}&size=${itemsPerPage}`;
    
    if (sortOrder) url += `&sort=${sortOrder}`;
    if (dateFrom && dateTo) {
      url += `&from=${dateFrom}&to=${dateTo}`;
    } else if (dateFrom) {
      url += `&date=${dateFrom}`;
    }
    if (category) {
      url += `&category=${category}`; // ✅ category filter add
    }

    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        setProducts(data.products || []);
        setTotalCount(data.total || 0);
        console.log("Fetching URL:", url);

      })
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, [sortOrder, dateFrom, dateTo, currentPage, category]); // ✅ category dependency add

  const handleViewDetails = (id) => {
    if (!user) navigate("/login");
    else navigate(`/products/${id}`);
  };

  const handleDateFrom = (e) => {
    setDateFrom(e.target.value);
    if (!e.target.value) setDateTo("");
  };
  const handleDateTo = (e) => setDateTo(e.target.value);
  const handleClearDates = () => {
    setDateFrom("");
    setDateTo("");
  };

  return (
    <div className="p-4 max-w-7xl mx-auto mt-15">
      <h2 className="text-3xl font-bold text-center mb-6 dark:text-gray-100">
        {category ? `Products in ${category}` : "All Market Products"} {/* ✅ heading update */}
      </h2>

      {/* Filters */}
      <div className="flex flex-wrap justify-between items-center mb-6 gap-4">
        <div className="flex gap-2 items-center">
          <label className="font-semibold dark:text-gray-200">Sort by Price:</label>
          <select
            className="border px-3 py-1 rounded dark:bg-gray-800 dark:text-gray-200 dark:border-gray-700"
            onChange={(e) => setSortOrder(e.target.value)}
            value={sortOrder}
          >
            <option value="">Default</option>
            <option value="asc">Low to High</option>
            <option value="desc">High to Low</option>
          </select>
        </div>

        <div className="flex gap-2 items-center">
          <label className="font-semibold dark:text-gray-200">Filter by Date:</label>
          <input
            type="date"
            className="border px-3 py-1 rounded dark:bg-gray-800 dark:text-gray-200 dark:border-gray-700"
            value={dateFrom}
            onChange={handleDateFrom}
          />
          <span className="dark:text-gray-200">-</span>
          <input
            type="date"
            className="border px-3 py-1 rounded dark:bg-gray-800 dark:text-gray-200 dark:border-gray-700"
            value={dateTo}
            onChange={handleDateTo}
            min={dateFrom || undefined}
            disabled={!dateFrom}
          />
          {(dateFrom || dateTo) && (
            <button
              className="ml-2 px-3 py-1 rounded bg-gray-100 hover:bg-gray-200 border dark:bg-gray-700 dark:hover:bg-gray-600 dark:text-gray-200 dark:border-gray-600"
              onClick={handleClearDates}
              type="button"
            >
              Clear
            </button>
          )}
        </div>
      </div>

      <div className="text-xs text-gray-500 mb-3 text-right dark:text-gray-400">
        You can filter by a single date or a date range. To see all, leave date blank.
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {loading
          ? Array(itemsPerPage)
              .fill(0)
              .map((_, idx) => <SkeletonCard key={idx} />)
          : products.length === 0 ? (
            <div className="col-span-full text-center py-10 text-lg font-semibold text-gray-500 dark:text-gray-400">
              No products found for the selected filter.
            </div>
          ) : (
            products.map((product) => (
              <div
                key={product._id}
                className="bg-white dark:bg-gray-800 shadow rounded-xl p-4"
              >
                <img
                  src={product.productImage}
                  alt={product.itemName}
                  className="w-full h-48 object-contain bg-gray-100 dark:bg-gray-700 p-2 rounded-lg mb-4"
                />
                <h3 className="text-xl font-semibold mb-1 dark:text-gray-100">
                  {product.itemName}
                </h3>
           <p className="text-gray-700 mb-1 dark:text-gray-300">
  Price: ৳{
    product.prices && product.prices.length > 0
      ? product.prices.reduce((closest, current) => {
          const today = new Date();
          const currentDiff = Math.abs(new Date(current.date) - today);
          const closestDiff = Math.abs(new Date(closest.date) - today);
          return currentDiff < closestDiff ? current : closest;
        }).price
      : "N/A"
  }
</p>


                <p className="text-gray-700 mb-1 dark:text-gray-300">
                  Date:{" "}
                  {product.prices?.[0]?.date
                    ? new Date(product.prices[0].date).toLocaleDateString()
                    : "N/A"}
                </p>
                <p className="text-gray-700 mb-1 dark:text-gray-300">
                  Market: {product.marketName}
                </p>
                <p className="text-gray-700 mb-4 dark:text-gray-300">
                  Vendor: {product.vendorName}
                </p>
                <button
                  onClick={() => handleViewDetails(product._id)}
                  className="bg-[#EC5800] hover:bg-[#d44c00] font-bold text-lg text-white py-2 px-4 rounded w-full dark:border-gray-700 dark:bg-gray-600 dark:hover:bg-gray-700 dark:text-gray-50"
                >
                  View Details
                </button>
              </div>
            ))
          )}
      </div>

      {/* Pagination */}
      <div className="flex justify-center mt-8 gap-2 flex-wrap">
        <button
          onClick={() => currentPage > 0 && setCurrentPage(currentPage - 1)}
          disabled={currentPage === 0}
          className="px-3 py-1 border rounded bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 dark:text-gray-200 dark:border-gray-600"
        >
          Previous
        </button>
        {pages.map((page) => (
          <button
            key={page}
            onClick={() => setCurrentPage(page)}
            className={`px-3 py-1 border rounded ${
              currentPage === page
                ? "bg-[#EC5800] text-white dark:bg-gray-600 dark:text-gray-50"
                : "bg-gray-200 text-gray-800 dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600"
            }`}
          >
            {page + 1}
          </button>
        ))}
        <button
          onClick={() =>
            currentPage < numberOfPages - 1 && setCurrentPage(currentPage + 1)
          }
          disabled={currentPage >= numberOfPages - 1}
          className="px-3 py-1 border rounded bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 dark:text-gray-200 dark:border-gray-600"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default NavAllProducts;
