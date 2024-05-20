import React from 'react';

const Pagination = ({ currentPage, totalBlogs, blogsPerPage, onPageChange }) => {
    const totalPages = Math.ceil(totalBlogs / blogsPerPage);

    return (
        <div className="flex justify-center my-4">
            <button
                onClick={() => onPageChange(currentPage - 1)}
                disabled={currentPage === 0}
                className="px-4 py-2 mx-1 bg-rose-500 text-zinc-100 rounded disabled:opacity-50"
            >
                Prev
            </button>
            <span className="px-4 py-2 mx-1">
                Page {currentPage + 1} of {totalPages}
            </span>
            <button
                onClick={() => onPageChange(currentPage + 1)}
                disabled={currentPage >= totalPages - 1}
                className="px-4 py-2 mx-1 bg-rose-500 text-zinc-100 rounded disabled:opacity-50"
            >
                Next
            </button>
        </div>
    );
};

export default Pagination;
