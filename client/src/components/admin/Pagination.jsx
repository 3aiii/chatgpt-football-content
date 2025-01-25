import React from "react";

const Pagination = ({ totalPages, currentPage, onPageChange }) => {
  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      onPageChange(page);
    }
  };

  const generatePageNumbers = () => {
    const pages = [];
    if (totalPages <= 5) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      if (currentPage <= 3) {
        pages.push(1, 2, 3, "...", totalPages);
      } else if (currentPage >= totalPages - 2) {
        pages.push(1, "...", totalPages - 2, totalPages - 1, totalPages);
      } else {
        pages.push(
          1,
          "...",
          currentPage - 1,
          currentPage,
          currentPage + 1,
          "...",
          totalPages
        );
      }
    }
    return pages;
  };

  return (
    <div className="flex items-center justify-center gap-2 p-4">
      {/* Prev Button */}
      <button
        className={`w-10 h-10 flex items-center justify-center rounded-lg ${
          currentPage === 1
            ? "bg-gray-200 text-gray-400 cursor-not-allowed"
            : "bg-white text-gray-700 hover:bg-gray-100"
        }`}
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={currentPage === 1}
      >
        ❮
      </button>

      {/* Page Numbers */}
      {generatePageNumbers().map((page, index) => (
        <button
          key={index}
          className={`w-10 h-10 flex items-center justify-center rounded-lg ${
            page === currentPage
              ? "bg-purple-500 text-white"
              : page === "..."
              ? "bg-transparent text-gray-400 cursor-default"
              : "bg-white text-gray-700 hover:bg-gray-100"
          }`}
          onClick={() => typeof page === "number" && handlePageChange(page)}
          disabled={page === "..."}
        >
          {page}
        </button>
      ))}

      {/* Next Button */}
      <button
        className={`w-10 h-10 flex items-center justify-center rounded-lg ${
          currentPage === totalPages
            ? "bg-gray-200 text-gray-400 cursor-not-allowed"
            : "bg-white text-gray-700 hover:bg-gray-100"
        }`}
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        ❯
      </button>
    </div>
  );
};

export default Pagination;
