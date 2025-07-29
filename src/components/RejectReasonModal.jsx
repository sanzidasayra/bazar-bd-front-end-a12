import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const RejectReasonModal = ({ isOpen, onClose, selectedProduct, refetch }) => {
  const [reason, setReason] = useState("");
  const [feedback, setFeedback] = useState("");

  const handleReject = async () => {
    try {
      await axios.patch(`http://localhost:5000/products/reject/${selectedProduct._id}`, {
        reason,
        feedback,
      });
      toast.success("Product Rejected");
      onClose();
      refetch();
      setReason("");
      setFeedback("");
    } catch {
      toast.error("Failed to reject product");
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-xl shadow-md w-[90%] md:w-[400px] space-y-4">
        <h3 className="text-xl font-semibold text-red-600">Reject Product</h3>
        <input
          className="w-full border px-3 py-2 rounded"
          placeholder="Reason (e.g. wrong info)"
          value={reason}
          onChange={(e) => setReason(e.target.value)}
        />
        <textarea
          className="w-full border px-3 py-2 rounded"
          placeholder="Optional feedback..."
          value={feedback}
          onChange={(e) => setFeedback(e.target.value)}
        />
        <div className="flex justify-end gap-3">
          <button onClick={onClose} className="text-gray-500">Cancel</button>
          <button onClick={handleReject} className="bg-red-500 text-white px-4 py-1 rounded">
            Reject
          </button>
        </div>
      </div>
    </div>
  );
};

export default RejectReasonModal;
