import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import useAuth from "../hooks/useAuth";

const NavAllProducts = () => {
  const [products, setProducts] = useState([]);
  const [sortOrder, setSortOrder] = useState("");
  const [dateFrom, setDateFrom] = useState("");
  const [dateTo, setDateTo] = useState("");
  const [currentPage, setCurrentPage] = useState(0);
  const [totalCount, setTotalCount] = useState(0);
  const itemsPerPage = 6;

  const { user } = useAuth();
  const navigate = useNavigate();

  const numberOfPages = Math.ceil(totalCount / itemsPerPage);
  const pages = [...Array(numberOfPages).keys()];

  useEffect(() => {
    let url = `http://localhost:5000/products/search?status=approved&page=${currentPage}&size=${itemsPerPage}`;
    if (sortOrder) url += `&sort=${sortOrder}`;
    // Date logic:
    if (dateFrom && dateTo) {
      url += `&from=${dateFrom}&to=${dateTo}`;
    } else if (dateFrom) {
      url += `&date=${dateFrom}`;
    }

    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        setProducts(data.products || []);
        setTotalCount(data.total || 0);
      });
  }, [sortOrder, dateFrom, dateTo, currentPage]);

  const handleViewDetails = (id) => {
    if (!user) {
      navigate("/login");
    } else {
      navigate(`/products/${id}`);
    }
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
      <h2 className="text-3xl font-bold text-center mb-6">All Market Products</h2>

      <div className="flex flex-wrap justify-between items-center mb-6 gap-4">
        <div className="flex gap-2 items-center">
          <label className="font-semibold">Sort by Price:</label>
          <select
            className="border px-3 py-1 rounded"
            onChange={(e) => setSortOrder(e.target.value)}
            value={sortOrder}
          >
            <option value="">Default</option>
            <option value="asc">Low to High</option>
            <option value="desc">High to Low</option>
          </select>
        </div>

        <div className="flex gap-2 items-center">
          <label className="font-semibold">Filter by Date:</label>
          <input
            type="date"
            className="border px-3 py-1 rounded"
            value={dateFrom}
            onChange={handleDateFrom}
          />
          <span>-</span>
          <input
            type="date"
            className="border px-3 py-1 rounded"
            value={dateTo}
            onChange={handleDateTo}
            min={dateFrom || undefined}
            disabled={!dateFrom}
          />
          {(dateFrom || dateTo) && (
            <button
              className="ml-2 px-3 py-1 rounded bg-gray-100 hover:bg-gray-200 border"
              onClick={handleClearDates}
              type="button"
            >
              Clear
            </button>
          )}
        </div>
      </div>

      <div className="text-xs text-gray-500 mb-3 text-right">
        You can filter by a single date or a date range. To see all, leave date blank.
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.length === 0 ? (
          <div className="col-span-full text-center py-10 text-lg font-semibold text-gray-500">
            No products found for the selected filter.
          </div>
        ) : (
          products.map((product) => (
            <div key={product._id} className="bg-white shadow rounded-xl p-4">
              <img
                src={product.productImage}
                alt={product.itemName}
                className="w-full h-48 object-contain bg-gray-100 p-2 rounded-lg mb-4"
              />
              <h3 className="text-xl font-semibold mb-1">{product.itemName}</h3>
              <p className="text-gray-700 mb-1">
                Price: ৳{product.prices?.[0]?.price || "N/A"}
              </p>
              <p className="text-gray-700 mb-1">
                Date:{" "}
                {product.prices?.[0]?.date
                  ? new Date(product.prices[0].date).toLocaleDateString()
                  : "N/A"}
              </p>
              <p className="text-gray-700 mb-1">Market: {product.marketName}</p>
              <p className="text-gray-700 mb-4">Vendor: {product.vendorName}</p>
              <button
                onClick={() => handleViewDetails(product._id)}
                className="btn btn-neutral text-white py-2 px-4 rounded w-full"
              >
                View Details
              </button>
            </div>
          ))
        )}
      </div>

      <div className="flex justify-center mt-8 gap-2 flex-wrap">
        <button
          onClick={() => currentPage > 0 && setCurrentPage(currentPage - 1)}
          disabled={currentPage === 0}
          className="px-3 py-1 border rounded bg-gray-100 hover:bg-gray-200"
        >
          Previous
        </button>
        {pages.map((page) => (
          <button
            key={page}
            onClick={() => setCurrentPage(page)}
            className={`px-3 py-1 border rounded ${
              currentPage === page ? "bg-blue-500 text-white" : "bg-gray-100"
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
          className="px-3 py-1 border rounded bg-gray-100 hover:bg-gray-200"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default NavAllProducts;
