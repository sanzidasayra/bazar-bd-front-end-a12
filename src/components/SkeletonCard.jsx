// SkeletonCard.jsx
const SkeletonCard = () => {
  return (
    <div className="relative bg-white dark:bg-gray-800 rounded-3xl shadow-lg animate-pulse flex flex-col overflow-hidden">
      {/* NEW Badge */}
      <span className="absolute top-3 right-3 px-3 py-1 bg-gray-300 dark:bg-gray-700 rounded-full font-bold text-xs"></span>

      {/* Image Placeholder */}
      <div className="w-full h-56 bg-gray-300 dark:bg-gray-700"></div>

      {/* Content */}
      <div className="p-5 flex-1 flex flex-col justify-between">
        <div className="space-y-3">
          <div className="h-6 bg-gray-300 dark:bg-gray-700 rounded w-3/4"></div>
          <div className="flex items-center gap-2">
            <div className="h-4 w-20 bg-gray-300 dark:bg-gray-700 rounded"></div>
          </div>
        </div>

        <div className="flex flex-col items-center my-2 space-y-2">
          <div className="h-8 w-16 bg-gray-300 dark:bg-gray-700 rounded"></div>
          <div className="h-3 w-24 bg-gray-300 dark:bg-gray-700 rounded"></div>
        </div>

        <div className="h-10 bg-gray-300 dark:bg-gray-700 rounded-xl w-full mt-4"></div>
      </div>
    </div>
  );
};

export default SkeletonCard;
