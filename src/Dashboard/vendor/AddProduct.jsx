/* eslint-disable no-unused-vars */
import { useForm, useFieldArray, Controller } from "react-hook-form";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useState } from "react";
import useAuth from "../../hooks/useAuth";
import { ImCross } from "react-icons/im";
import { TiPlus } from "react-icons/ti";
import { toast } from "react-toastify";

const AddProduct = () => {
  const { user } = useAuth();

  const {
    register,
    handleSubmit,
    control,
    reset,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      prices: [{ date: new Date(), price: "" }],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "prices",
  });

  const pricePerUnitValue = watch("pricePerUnit"); 
  const pricesArray = watch("prices"); 

  const [marketDate] = useState(new Date());

  const validatePrice = (data) => {
    const priceList = data.prices || [];
    for (let i = 0; i < priceList.length; i++) {
      if (Number(priceList[i].price) < 60) {
        return false;
      }
    }
    return true;
  };

  const onSubmit = (data) => {
    if (!validatePrice(data)) {
      toast.error("⚠️ All prices must be at least 60৳!");
      return;
    }

    const formData = {
      ...data,
      status: "pending",
      vendorEmail: user?.email,
      vendorName: user?.displayName || "",
      marketDate,
    };

    fetch("https://bazar-bd-back-end-a12.onrender.com/products", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((res) => res.json())
      .then((result) => {
        if (result.insertedId) {
          toast.success("Product added successfully!");
          reset();
        } else {
          toast.error("Failed to add product.");
        }
      })
      .catch((err) => {
        console.error("Error:", err);
        toast.error("Server error. Try again later.");
      });
  };

  return (
    <div className='max-w-4xl mx-auto p-6 bg-white shadow-2xl rounded-lg'>
      <h2 className='text-3xl font-bold text-center mb-6 text-[#03373D]'>
        Add Market Product
      </h2>
      <form onSubmit={handleSubmit(onSubmit)} className='space-y-4'>
        <div>
          <label className='block font-medium mb-1'>Vendor Email</label>
          <input
            type='email'
            value={user?.email}
            readOnly
            className='input input-bordered w-full'
          />
        </div>
        <div>
          <label className='block font-medium mb-1'>Vendor Name</label>
          <input
            type='text'
            value={user?.displayName}
            readOnly
            className='input input-bordered w-full'
          />
        </div>
        <div>
          <label className='block font-medium mb-1'>Market Name</label>
          <input
            {...register("marketName", { required: true })}
            className='input input-bordered w-full'
            placeholder='e.g. Karwan Bazar'
          />
        </div>
        <div>
          <label className='block font-medium mb-1'>Market Date</label>
          <input
            type='text'
            value={marketDate.toLocaleDateString()}
            readOnly
            className='input input-bordered w-full bg-gray-100 cursor-not-allowed'
          />
        </div>
        <div>
          <label className='block font-medium mb-1'>Market Description</label>
          <textarea
            {...register("marketDescription", { required: true })}
            className='textarea textarea-bordered w-full'
            placeholder='e.g. Established in 1985, located in central Dhaka...'
          />
        </div>
        <div>
          <label className='block font-medium mb-1'>Item Name</label>
          <input
            {...register("itemName", { required: true })}
            className='input input-bordered w-full'
            placeholder='e.g. Onion'
          />
        </div>
        <div>
          <label className='block font-medium mb-1'>Product Image URL</label>
          <input
            {...register("productImage", { required: true })}
            className='input input-bordered w-full'
            placeholder='Image URL'
          />
        </div>
        <div>
          <label className='block font-medium mb-1'>
            Price per Unit (e.g., ৳60/kg)
          </label>
          <input
            {...register("pricePerUnit", { required: true, min: 60 })}
            type='number'
            className='input input-bordered w-full'
          />
          {errors.pricePerUnit && (
            <p className='text-red-500 text-xs mt-1'>
              Price per unit must be at least 60৳
            </p>
          )}
          {pricePerUnitValue !== undefined &&
            pricePerUnitValue !== "" &&
            Number(pricePerUnitValue) < 60 && (
              <p className='text-orange-600 text-xs mt-1'>
                ⚠️ Warning: Price is below 60৳ Transaction will fail if price is
                below 60৳{" "}
              </p>
            )}
        </div>
        <div>
          <label className='block font-medium mb-1'>Item Description</label>
          <textarea
            {...register("itemDescription")}
            className='textarea textarea-bordered w-full'
            placeholder='e.g. Fresh, local onions from Pabna'
          />
        </div>
        <div>
          <label className='block font-medium mb-2'>Price & Date History</label>
          {fields.map((field, index) => (
            <div key={field.id} className='flex items-center gap-2 mb-2'>
              <Controller
                control={control}
                name={`prices[${index}].date`}
                defaultValue={field.date ? new Date(field.date) : new Date()}
                render={({ field: { onChange, value } }) => (
                  <DatePicker
                    selected={value ? new Date(value) : null}
                    onChange={onChange}
                    className='input input-bordered'
                    dateFormat='MM/dd/yyyy'
                  />
                )}
              />
              <input
                {...register(`prices[${index}].price`, {
                  required: true,
                  min: 60,
                })}
                type='number'
                placeholder='৳ Price'
                className='input input-bordered'
              />
              <button
                type='button'
                className='btn btn-error btn-sm'
                onClick={() => remove(index)}
              >
                <ImCross size={18} />
              </button>
              <div>
                {errors.prices?.[index]?.price && (
                  <p className='text-red-500 text-xs ml-2'>
                    At least 60৳ required
                  </p>
                )}
                {pricesArray?.[index]?.price !== undefined &&
                  pricesArray[index].price !== "" &&
                  Number(pricesArray[index].price) < 60 && (
                    <p className='text-orange-600 text-xs ml-2'>
                      ⚠️ Warning: Price is below 60৳
                    </p>
                  )}
              </div>
            </div>
          ))}
          <button
            type='button'
            className='btn btn-outline btn-primary mt-2'
            onClick={() => append({ date: new Date(), price: "" })}
          >
            <TiPlus size={20} /> Add Price Entry
          </button>
        </div>
        <button
          type='submit'
          className='w-full bg-[#EC5800] hover:bg-[#d44c00] text-white py-2 rounded-xl '
        >
          Submit Product
        </button>
      </form>
    </div>
  );
};

export default AddProduct;
