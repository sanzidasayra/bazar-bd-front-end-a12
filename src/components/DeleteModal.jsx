import React from 'react';

const DeleteModal = ({ ad, onConfirm, onCancel }) => {
    return (
    <div className="fixed inset-0 bg-opacity-40 flex items-center justify-center z-50">
      <div className="bg-white p-8 rounded-3xl shadow-xl max-w-md w-full text-center">
        <h3 className="text-2xl text-gray-800 font-semibold mb-4">Confirm Deletion</h3>
        <p className="text-gray-600 mb-6">
          Are you sure you want to delete <span className="font-medium text-red-600">{ad.adTitle}</span>?
        </p>
        <div className="flex justify-center gap-4">
          <button
            onClick={onConfirm}
            className="bg-red-600 text-white px-6 py-3 rounded-lg hover:bg-red-700 transition duration-300"
          >
            Yes, Delete
          </button>
          <button
            onClick={onCancel}
            className="bg-gray-400 text-white px-6 py-3 rounded-lg hover:bg-gray-500 transition duration-300"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteModal;