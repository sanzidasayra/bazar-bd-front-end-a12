import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

const UpdateAdModal = ({ ad, closeModal }) => {
  const { register, handleSubmit } = useForm({
    defaultValues: {
      adTitle: ad.adTitle,
      description: ad.description,
    },
  });

  const onSubmit = async (data) => {
    try {
      const res = await fetch(`http://localhost:5000/advertisements/${ad._id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const result = await res.json();
      if (res.ok) {
        toast.success("Advertisement updated");
        closeModal();
      } else {
        toast.error(result.message || "Update failed");
      }
    } catch {
      toast.error("Server error during update");
    }
  };

  return (
    <div className="fixed inset-0 bg-opacity-40 flex items-center justify-center z-50">
      <div className="bg-white p-8 rounded-3xl shadow-xl w-full max-w-lg">
        <h3 className="text-2xl text-gray-900 font-semibold mb-6 text-center">Update Advertisement</h3>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="relative">
            <label htmlFor="adTitle" className=" left-4 top-0 text-gray-500">Ad Title</label>
            <input
              {...register("adTitle", { required: "Ad Title is required" })}
              id="adTitle"
              className="w-full p-4 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
              placeholder="Ad Title"
            />
          </div>

          <div className="relative">
            <label htmlFor="description" className=" left-4 top-0 text-gray-500">Description</label>
            <textarea
              {...register("description", { required: "Description is required" })}
              id="description"
              className="w-full p-4 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
              placeholder="Description"
            />
          </div>

          <div className="flex justify-between mt-6">
            <button
              type="submit"
              className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition duration-300"
            >
              Update
            </button>
            <button
              type="button"
              onClick={closeModal}
              className="bg-gray-400 text-white px-6 py-3 rounded-lg hover:bg-gray-500 transition duration-300"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateAdModal;
