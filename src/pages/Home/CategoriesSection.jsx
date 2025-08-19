import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const CategoriesSection = () => {
  const [categories, setCategories] = useState([]);
  const [visibleCount, setVisibleCount] = useState(5);
  const initialCount = 5;
  const navigate = useNavigate();

  useEffect(() => {
    const data = [
      { id: 1, title: "Fruits", image: "https://i.ibb.co.com/BHSQpZTR/fruits.jpg" },
      { id: 2, title: "Vegetables", image: "https://i.ibb.co.com/bRvmFfJT/veg.webp" },
      { id: 3, title: "Snacks", image: "https://i.ibb.co.com/67sZ7f3S/snaks.webp" },
      { id: 4, title: "Fish", image: "https://i.ibb.co.com/53JGyv0/fish.jpg" },
      { id: 5, title: "Meats", image: "https://i.ibb.co.com/7xQdw17h/meats.jpg" },
      { id: 6, title: "Chal", image: "https://i.ibb.co.com/XxLGZ7kv/chal.jpg" },
      { id: 7, title: "Dal", image: "https://i.ibb.co.com/8DNRqnFQ/dal.jpg" },
    ];
    setCategories(data);
  }, []);

  const handleToggle = () => {
    if (visibleCount === categories.length) {
      setVisibleCount(initialCount);
    } else {
      setVisibleCount(categories.length);
    }
  };

  const handleCategoryClick = (catTitle) => {
    navigate(`/all-products?category=${catTitle}`);
  };

  return (
    <>
      <div className="text-center mt-20 mb-8 px-4">
        <h2 className="lg:text-4xl text-3xl font-bold mb-3 text-center text-[#EC5800] dark:text-gray-50">Shop by Category</h2>
        <p className="text-gray-700 lg:text-lg max-w-3xl mx-auto dark:text-gray-300">
          Explore our wide range of categories to find your favorite products quickly and easily.  
          From fresh fruits and vegetables to snacks and essentials, we’ve got everything you need in one place.
        </p>
      </div>

      <div className="px-6 py-6 rounded-2xl shadow-lg bg-white dark:bg-gray-800">
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-6">
          {categories.slice(0, visibleCount).map((cat) => (
            <div
  key={cat.id}
  onClick={() => navigate(`/all-products?category=${cat.value}`)} // ✅ value should match DB
  className="bg-white dark:bg-gray-600 shadow-xl rounded-xl overflow-hidden hover:scale-105 transition-transform duration-300 cursor-pointer min-h-[180px]"
>
  <img src={cat.image} alt={cat.title} className="w-full h-32 object-cover"/>
  <h3 className="text-center font-semibold text-lg p-2 dark:text-gray-100">{cat.title}</h3>
</div>

          ))}
        </div>

        {categories.length > initialCount && (
          <div className="text-center mt-6">
            <button
              onClick={handleToggle}
              className="bg-orange-500 text-white px-6 py-2 rounded-lg hover:bg-orange-600 dark:bg-gray-600 dark:hover:bg-gray-700 font-semibold transition-colors"
            >
              {visibleCount === categories.length ? "Show Less" : "Show More"}
            </button>
          </div>
        )}
      </div>
    </>
  );
};

export default CategoriesSection;
