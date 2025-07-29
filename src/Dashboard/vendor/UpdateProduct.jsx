import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";

const UpdateProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await fetch(
          `https://bazar-bd-back-end-a12.onrender.com/products/${id}`
        );
        if (!res.ok) throw new Error("Product not found");
        const data = await res.json();
        reset({
          itemName: data.itemName || "",
          pricePerUnit: data.pricePerUnit || "",
          marketName: data.marketName || "",
          marketDate: data.marketDate?.split("T")[0] || "",
          productImage: data.productImage || "",
          itemDescription: data.itemDescription || "",
        });
        // eslint-disable-next-line no-unused-vars
      } catch (err) {
        toast.error("Failed to load product.");
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id, reset]);

  const onSubmit = async (updatedProduct) => {
    try {
      const res = await fetch(
        `https://bazar-bd-back-end-a12.onrender.com/products/${id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(updatedProduct),
        }
      );

      if (res.ok) {
        toast.success("Product updated successfully!");
        navigate("/dashboard/vendor/my-products");
      } else {
        toast.error("Failed to update product.");
      }
      // eslint-disable-next-line no-unused-vars
    } catch (err) {
      toast.error("An error occurred while updating.");
    }
  };

  if (loading) return <p className='text-center py-6'>Loading...</p>;

  return (
    <div className='max-w-xl mx-auto p-10 shadow-2xl rounded-2xl'>
      <h2 className='text-3xl font-bold text-center mb-8 text-[#03373D]'>
        Update Product
      </h2>
      <form onSubmit={handleSubmit(onSubmit)} className='space-y-4'>
        {/* Item Name */}
        <div>
          <label
            htmlFor='itemName'
            className='block text-sm font-medium text-[#03373D]'
          >
            Item Name
          </label>
          <input
            type='text'
            {...register("itemName", { required: "Item name is required" })}
            id='itemName'
            className='w-full border p-2'
            placeholder='Item Name'
          />
          {errors.itemName && (
            <p className='text-red-500'>{errors.itemName.message}</p>
          )}
        </div>

        {/* Price Per Unit */}
        <div>
          <label
            htmlFor='pricePerUnit'
            className='block text-sm font-medium text-[#03373D]'
          >
            Price per Unit
          </label>
          <input
            type='number'
            step='0.01'
            {...register("pricePerUnit", {
              required: "Price is required",
              min: { value: 0, message: "Price must be positive" },
            })}
            id='pricePerUnit'
            className='w-full border p-2'
            placeholder='Price per Unit'
          />
          {errors.pricePerUnit && (
            <p className='text-red-500'>{errors.pricePerUnit.message}</p>
          )}
        </div>

        {/* Market Name */}
        <div>
          <label
            htmlFor='marketName'
            className='block text-sm font-medium text-[#03373D]'
          >
            Market Name
          </label>
          <input
            type='text'
            {...register("marketName", { required: "Market name is required" })}
            id='marketName'
            className='w-full border p-2'
            placeholder='Market Name'
          />
          {errors.marketName && (
            <p className='text-red-500'>{errors.marketName.message}</p>
          )}
        </div>

        {/* Market Date */}
        <div>
          <label
            htmlFor='marketDate'
            className='block text-sm font-medium text-[#03373D]'
          >
            Market Date
          </label>
          <input
            type='date'
            {...register("marketDate", { required: "Market date is required" })}
            id='marketDate'
            className='w-full border p-2'
          />
          {errors.marketDate && (
            <p className='text-red-500'>{errors.marketDate.message}</p>
          )}
        </div>

        {/* Product Image URL */}
        <div>
          <label
            htmlFor='productImage'
            className='block text-sm font-medium text-[#03373D]'
          >
            Image URL
          </label>
          <input
            type='url'
            {...register("productImage", { required: "Image URL is required" })}
            id='productImage'
            className='w-full border p-2'
            placeholder='Image URL'
          />
          {errors.productImage && (
            <p className='text-red-500'>{errors.productImage.message}</p>
          )}
        </div>

        {/* Item Description */}
        <div>
          <label
            htmlFor='itemDescription'
            className='block text-sm font-medium text-[#03373D]'
          >
            Item Description
          </label>
          <textarea
            {...register("itemDescription", {
              required: "Description is required",
            })}
            id='itemDescription'
            className='w-full border p-2'
            placeholder='Item Description'
          />
          {errors.itemDescription && (
            <p className='text-red-500'>{errors.itemDescription.message}</p>
          )}
        </div>

        {/* Submit Button */}
        <button
          type='submit'
          className='w-full bg-[#CAEB66] text-black py-2 rounded-xl hover:bg-[#A3D75C]'
        >
          Update Product
        </button>
      </form>
    </div>
  );
};

export default UpdateProduct;
