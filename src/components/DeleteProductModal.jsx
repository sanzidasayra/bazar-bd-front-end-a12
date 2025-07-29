import React from "react";

const DeleteProductModal = ({ isOpen, onClose, onDelete, product }) => {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/30 z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-sm shadow-xl">
        <h3 className="text-lg font-bold mb-2 text-red-700">Confirm Delete</h3>
        <p>
          Are you sure you want to delete <span className="font-semibold">{product?.itemName}</span> from <span className="font-semibold">{product?.marketName}</span>?
        </p>
        <div className="flex gap-3 mt-5">
          <button
            className="bg-red-500 hover:bg-red-600 text-white px-4 py-1 rounded"
            onClick={() => onDelete(product?._id)}
          >
            Delete
          </button>
          <button
            className="bg-gray-300 hover:bg-gray-400 text-gray-800 px-4 py-1 rounded"
            onClick={onClose}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteProductModal;
