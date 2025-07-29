/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { FaEdit, FaTrash } from "react-icons/fa";
import UpdateAdModal from "../../components/UpdateAdModal";
import DeleteModal from "../../components/DeleteModal";
import useAuth from "../../hooks/useAuth";

const MyAds = () => {
  const { user } = useAuth();
  const [ads, setAds] = useState([]);
  const [selectedAd, setSelectedAd] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [adToDelete, setAdToDelete] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const fetchAds = async () => {
    if (!user?.email) return;

    try {
      const res = await fetch(
        `https://bazar-bd-back-end-a12.onrender.com/advertisements?email=${user.email}`
      );
      if (!res.ok) throw new Error("Fetch failed");
      const data = await res.json();
      setAds(data);
      // eslint-disable-next-line no-unused-vars
    } catch (err) {
      toast.error("Failed to load advertisements");
    }
  };

  const handleDelete = (ad) => {
    setAdToDelete(ad);
    setShowDeleteModal(true);
  };

  const handleUpdateClick = (ad) => {
    setSelectedAd(ad);
    setShowModal(true);
  };

  const confirmDelete = async () => {
    try {
      const res = await fetch(
        `https://bazar-bd-back-end-a12.onrender.com/advertisements/${adToDelete._id}`,
        {
          method: "DELETE",
        }
      );
      if (res.ok) {
        toast.success("Advertisement deleted");
        fetchAds();
      } else {
        toast.error("Failed to delete advertisement");
      }
    } catch {
      toast.error("Server error during deletion");
    } finally {
      setAdToDelete(null);
      setShowDeleteModal(false);
    }
  };

  useEffect(() => {
    if (user?.email) {
      fetchAds();
    }
  }, [user]);

  return (
    <div className='max-w-6xl mx-auto p-4'>
      <h2 className='text-3xl font-semibold mb-6 text-gray-800'>
        My Advertisements
      </h2>

      {ads.length === 0 ? (
        <p className='text-center text-gray-500'>No advertisements found.</p>
      ) : (
        <div className='overflow-x-auto shadow-lg rounded-lg border border-gray-200'>
          <table className='w-full text-sm text-gray-700'>
            <thead className='bg-gradient-to-r from-blue-500 to-teal-500 text-white'>
              <tr>
                <th className='p-3 text-left'>Title</th>
                <th className='p-3 text-left'>Description</th>
                <th className='p-3 text-left'>Status</th>
                <th className='p-3 text-center'>Actions</th>
              </tr>
            </thead>
            <tbody className='bg-white'>
              {ads.map((ad) => (
                <tr
                  key={ad._id}
                  className='border-b hover:bg-gray-50 transition duration-300'
                >
                  <td className='p-3'>{ad.adTitle}</td>
                  <td className='p-3'>{ad.description}</td>
                  <td className='p-3 capitalize'>{ad.status}</td>
                  <td className='p-3 text-center flex justify-center gap-4'>
                    <button
                      className='text-blue-600 hover:text-blue-800 transition duration-200'
                      onClick={() => handleUpdateClick(ad)}
                    >
                      <FaEdit size={24} />
                    </button>
                    <button
                      className='text-red-600 hover:text-red-800 transition duration-200'
                      onClick={() => handleDelete(ad)}
                    >
                      <FaTrash size={20} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {showModal && selectedAd && (
        <div className='fixed inset-0 flex justify-center items-center z-50'>
          <div className='absolute inset-0 bg-gray-900 opacity-30' />
          <div className='relative z-10 bg-white rounded-lg shadow-lg p-6 max-w-lg w-full'>
            <UpdateAdModal
              ad={selectedAd}
              closeModal={() => {
                setShowModal(false);
                setSelectedAd(null);
                fetchAds();
              }}
            />
          </div>
        </div>
      )}

      {showDeleteModal && adToDelete && (
        <DeleteModal
          ad={adToDelete}
          onConfirm={confirmDelete}
          onCancel={() => {
            setAdToDelete(null);
            setShowDeleteModal(false);
          }}
        />
      )}
    </div>
  );
};

export default MyAds;
