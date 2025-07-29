/* eslint-disable no-unused-vars */
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { FcAdvertising } from "react-icons/fc";
import useAuth from "../../hooks/useAuth";
import { useState } from "react";

const AddAds = () => {
  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm();
  const { user } = useAuth();

  // Live preview of ad as you type
  const adTitle = watch("adTitle") || "";
  const description = watch("description") || "";

  const onSubmit = async (data) => {
    const adPayload = {
      adTitle: data.adTitle,
      description: data.description,
      vendorEmail: user.email,
    };

    try {
      const res = await fetch(
        "https://bazar-bd-back-end-a12.onrender.com/advertisements",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(adPayload),
        }
      );

      const result = await res.json();
      if (res.ok) {
        toast.success("✅ Advertisement submitted!");
        reset();
      } else {
        toast.error(result.message || "Submission failed.");
      }
    } catch (error) {
      toast.error("Server error!");
    }
  };

  return (
    <div className='max-w-2xl mx-auto p-8 bg-white shadow-2xl rounded-xl'>
      <h2 className='text-3xl font-extrabold mb-7 text-center flex items-center justify-center gap-2 text-[#3c3c6e]'>
        <FcAdvertising size={38} /> Post Your Market Ad!
      </h2>
      <div className='flex flex-col md:flex-row gap-6'>
        {/* Form Section */}
        <form onSubmit={handleSubmit(onSubmit)} className='flex-1 space-y-5'>
          <div>
            <label className='block text-sm font-semibold mb-1 text-[#52616B]'>
              Advertisement Title
            </label>
            <input
              {...register("adTitle", { required: true, minLength: 4 })}
              placeholder='e.g. Fresh Mangoes in Stock!'
              className='w-full border border-[#d0e1f9] p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#CAEB66]'
              maxLength={50}
            />
            {errors.adTitle && (
              <span className='text-red-500 text-xs'>
                Title is required (min 4 characters)
              </span>
            )}
          </div>
          <div>
            <label className='block text-sm font-semibold mb-1 text-[#52616B]'>
              Short Description
            </label>
            <textarea
              {...register("description", { required: true, minLength: 10 })}
              placeholder='Write a short, catchy ad description...'
              className='w-full border border-[#d0e1f9] p-3 rounded-lg min-h-[80px] focus:outline-none focus:ring-2 focus:ring-[#CAEB66]'
              maxLength={150}
            />
            {errors.description && (
              <span className='text-red-500 text-xs'>
                Description required (min 10 characters)
              </span>
            )}
          </div>
          <button
            type='submit'
            className='w-full bg-[#CAEB66] text-black font-bold py-3 rounded-lg hover:bg-[#A3D75C] transition'
          >
            Submit Advertisement
          </button>
        </form>

        {/* Live Preview Section */}
        <div className='flex-1'>
          <div className='bg-gradient-to-br from-[#faffee] to-[#e7f6d5] shadow-xl rounded-xl p-5 border border-[#caeb66]'>
            <div className='flex items-center mb-3 gap-2'>
              <FcAdvertising size={30} />
              <span className='font-bold text-[#03373D] text-lg'>
                Ad Preview
              </span>
            </div>
            <div className='border-b mb-2 border-[#dbecd6]' />
            <div>
              <div className='font-bold text-xl text-[#3c3c6e] mb-2 truncate'>
                {adTitle ? (
                  adTitle
                ) : (
                  <span className='italic text-gray-400'>
                    Your ad title will appear here
                  </span>
                )}
              </div>
              <div className='text-sm text-[#3c3c6e] min-h-[40px]'>
                {description ? (
                  description
                ) : (
                  <span className='italic text-gray-400'>
                    Description will be shown here
                  </span>
                )}
              </div>
              <div className='mt-3 text-xs text-gray-500'>
                <span>Vendor: </span>
                <span className='font-medium'>
                  {user?.email || (
                    <span className='italic'>Logged in vendor</span>
                  )}
                </span>
              </div>
            </div>
          </div>
          <div className='mt-2 text-xs text-gray-400 italic text-center'>
            Your ad will be reviewed before publishing.
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddAds;
