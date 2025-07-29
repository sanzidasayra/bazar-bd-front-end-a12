import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import "react-toastify/dist/ReactToastify.css";

const MyProducts = () => {
  const { user } = useAuth();
  const [products, setProducts] = useState([]);

  useEffect(() => {
    if (!user?.email) return;

    fetch(
      `https://bazar-bd-back-end-a12.onrender.com/products/vendor?email=${user.email}`
    )
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setProducts(data);
        } else {
          console.error("Expected array but got:", data);
          setProducts([]);
        }
      })
      .catch((error) => {
        console.error("Error fetching products:", error);
        setProducts([]);
      });
  }, [user]);

  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "Do you want to delete this product?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "No, keep it",
      reverseButtons: true,
    });

    if (result.isConfirmed) {
      try {
        const res = await fetch(
          `https://bazar-bd-back-end-a12.onrender.com/products/${id}`,
          {
            method: "DELETE",
          }
        );

        if (!res.ok) {
          const data = await res.json();
          toast.error(data.error || "Failed to delete product.");
          return;
        }

        const result = await res.json();
        if (result.success) {
          toast.success("Product deleted successfully!");
          setProducts(products.filter((p) => p._id !== id));
        } else {
          toast.error("Failed to delete product.");
        }
        // eslint-disable-next-line no-unused-vars
      } catch (err) {
        toast.error("Server error during deletion.");
      }
    }
  };

  return (
    <div className='p-4'>
      <h2 className='text-3xl font-bold mb-6 text-[#03373D] text-center'>
        My Products
      </h2>
      <div className='overflow-x-auto bg-white shadow-md rounded-xl'>
        <table className='min-w-full text-sm text-left border border-gray-200 rounded-xl overflow-hidden'>
          <thead className='bg-[#F7F7F7] uppercase text-gray-700 text-xs'>
            <tr>
              <th className='p-3'>Item</th>
              <th className='p-3'>Price</th>
              <th className='p-3'>Market</th>
              <th className='p-3'>Date</th>
              <th className='p-3'>Status</th>
              <th className='p-3'>Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product, idx) => (
              <tr
                key={product._id}
                className={`border-t transition duration-300 ${
                  idx % 2 === 0 ? "bg-white" : "bg-gray-50"
                } hover:bg-[#E8F8F5]`}
              >
                <td className='p-3 font-medium text-gray-800'>
                  {product.itemName}
                </td>
                <td className='p-3 text-gray-700'>
                  ৳{product.pricePerUnit}/kg
                </td>
                <td className='p-3 text-gray-700'>{product.marketName}</td>
                <td className='p-3 text-gray-700'>
                  {new Date(product.marketDate).toLocaleDateString()}
                </td>
                <td className='p-3'>
                  {product.status === "approved" && (
                    <span className='px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-700'>
                      Approved
                    </span>
                  )}
                  {product.status === "pending" && (
                    <span className='px-2 py-1 text-xs font-semibold rounded-full bg-yellow-100 text-yellow-700'>
                      Pending
                    </span>
                  )}
                  {product.status === "rejected" && (
                    <div className='p-2 bg-red-50 border-l-4 border-red-400 rounded mt-2 text-sm text-red-800'>
                      <p>
                        <strong>Reason:</strong> {product.rejectionReason}
                      </p>
                      <p>
                        <strong>Feedback:</strong> {product.rejectionFeedback}
                      </p>
                    </div>
                  )}
                </td>
                <td className='p-3 space-x-2'>
                  <Link to={`/dashboard/vendor/update-product/${product._id}`}>
                    <button className='px-3 py-1 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs'>
                      Update
                    </button>
                  </Link>
                  <button
                    onClick={() => handleDelete(product._id)}
                    className='px-3 py-1 bg-red-600 hover:bg-red-700 text-white rounded-lg text-xs'
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
            {products.length === 0 && (
              <tr>
                <td
                  colSpan='6'
                  className='text-center py-6 text-gray-500 text-sm'
                >
                  No products found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MyProducts;
