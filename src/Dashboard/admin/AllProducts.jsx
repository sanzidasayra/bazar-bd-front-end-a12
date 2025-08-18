/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import axios from "axios";
import RejectReasonModal from "../../components/RejectReasonModal";
import DeleteProductModal from "../../components/DeleteProductModal";
import { toast } from "react-toastify";
import { FaCheck, FaTrash, FaEdit, FaTimes } from "react-icons/fa";

const PAGE_SIZE = 10;

const AllProducts = () => {
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [showRejectModal, setShowRejectModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const [currentPage, setCurrentPage] = useState(0);
  const [totalCount, setTotalCount] = useState(0);

  const fetchProducts = async (page = 0) => {
    try {
      const res = await axios.get(
        `https://bazar-bd-back-end-a12.onrender.com/products/all?page=${page}&size=${PAGE_SIZE}`
      );
      if (res.data.products) {
        setProducts(res.data.products);
        setTotalCount(res.data.total);
      } else {
        setProducts(res.data);
        setTotalCount(res.data.length);
      }
    } catch (err) {
      toast.error("Failed to load products");
    }
  };

  useEffect(() => {
    fetchProducts(currentPage);
  }, [currentPage]);

  const handleApprove = async (id) => {
    try {
      await axios.patch(
        `https://bazar-bd-back-end-a12.onrender.com/products/approve/${id}`
      );
      toast.success("Product Approved");
      fetchProducts(currentPage);
    } catch (err) {
      toast.error("Approval failed");
    }
  };

  const handleReject = (product) => {
    setSelectedProduct(product);
    setShowRejectModal(true);
  };

  const handleDelete = (product) => {
    setSelectedProduct(product);
    setShowDeleteModal(true);
  };
  const confirmDelete = async (id) => {
    try {
      await axios.delete(
        `https://bazar-bd-back-end-a12.onrender.com/products/${id}`
      );
      toast.success("Product deleted!");
      setShowDeleteModal(false);
      setSelectedProduct(null);
      fetchProducts(currentPage);
    } catch (err) {
      toast.error("Failed to delete product");
    }
  };

  const handleUpdate = (id) => {
    window.location.href = `/dashboard/vendor/update-product/${id}`;
  };

  const numberOfPages = Math.ceil(totalCount / PAGE_SIZE);
  const pages = [...Array(numberOfPages).keys()];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <h2 className="text-xl md:text-2xl font-bold mb-6 text-gray-800 dark:text-gray-200 text-center ">
        All Products
      </h2>

      <div className="overflow-auto shadow rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 max-w-6xl mx-auto "> 
        <table className="min-w-full text-sm text-left text-gray-800 dark:text-gray-200">
          <thead className="bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 uppercase text-xs">
            <tr>
              <th className="px-4 py-3">#</th>
              <th className="px-4 py-3">Item</th>
              <th className="px-4 py-3">Market</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
            {products.map((p, index) => (
              <tr key={p._id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                <td className="px-4 py-3 font-medium">
                  {currentPage * PAGE_SIZE + index + 1}
                </td>
                <td className="px-4 py-3">{p.itemName}</td>
                <td className="px-4 py-3">{p.marketName}</td>
                <td className="px-4 py-3 capitalize">
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-semibold ${
                      p.status === "approved"
                        ? "bg-green-100 text-green-700 dark:bg-green-800 dark:text-green-300"
                        : p.status === "rejected"
                        ? "bg-red-100 text-red-700 dark:bg-red-800 dark:text-red-300"
                        : "bg-yellow-100 text-yellow-700 dark:bg-yellow-800 dark:text-yellow-300"
                    }`}
                  >
                    {p.status}
                  </span>
                </td>
                <td className="px-4 py-3 space-x-2">
                  {p.status === "pending" && (
                    <>
                      <button
                        onClick={() => handleApprove(p._id)}
                        className="bg-green-500 hover:bg-green-600 dark:bg-green-700 dark:hover:bg-green-600 text-white p-2 rounded"
                        title="Approve"
                      >
                        <FaCheck />
                      </button>
                      <button
                        onClick={() => handleReject(p)}
                        className="bg-red-500 hover:bg-red-600 dark:bg-red-700 dark:hover:bg-red-600 text-white p-2 rounded"
                        title="Reject"
                      >
                        <FaTimes />
                      </button>
                    </>
                  )}
                  <button
                    onClick={() => handleUpdate(p._id)}
                    className="bg-yellow-500 hover:bg-yellow-600 dark:bg-yellow-700 dark:hover:bg-yellow-600 text-white p-2 rounded"
                    title="Update"
                  >
                    <FaEdit />
                  </button>
                  <button
                    onClick={() => handleDelete(p)}
                    className="bg-gray-700 hover:bg-gray-800 dark:bg-gray-600 dark:hover:bg-gray-500 text-white p-2 rounded"
                    title="Delete"
                  >
                    <FaTrash />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {products.length === 0 && (
          <div className="text-center py-6 text-gray-500 dark:text-gray-400">
            No products found.
          </div>
        )}
      </div>

      <div className="flex justify-center mt-8 gap-2 flex-wrap">
  <button
    onClick={() => currentPage > 0 && setCurrentPage(currentPage - 1)}
    disabled={currentPage === 0}
    className="px-3 py-1 border rounded 
               bg-gray-100 hover:bg-gray-200 text-gray-800
               dark:bg-gray-700 dark:hover:bg-gray-600 dark:text-white"
  >
    Previous
  </button>

  {pages.map((page) => (
    <button
      key={page}
      onClick={() => setCurrentPage(page)}
      className={`px-3 py-1 border rounded 
        ${
          currentPage === page
            ? "bg-blue-500 text-white dark:bg-blue-700"
            : "bg-gray-100 hover:bg-gray-200 text-gray-800 dark:bg-gray-700 dark:hover:bg-gray-600 dark:text-white"
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
    className="px-3 py-1 border rounded 
               bg-gray-100 hover:bg-gray-200 text-gray-800
               dark:bg-gray-700 dark:hover:bg-gray-600 dark:text-white"
  >
    Next
  </button>
</div>

      <RejectReasonModal
        isOpen={showRejectModal}
        onClose={() => setShowRejectModal(false)}
        selectedProduct={selectedProduct}
        refetch={() => fetchProducts(currentPage)}
      />
      <DeleteProductModal
        isOpen={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        onDelete={confirmDelete}
        product={selectedProduct}
      />
    </div>
  );
};

export default AllProducts;
