import React from 'react';

const Pagination = ({ currentPage, totalItems, itemsPerPage, onPageChange }) => {
    const totalPages = Math.ceil(totalItems / itemsPerPage);

    const handlePrevious = () => {
        if (currentPage > 1) onPageChange(currentPage - 1);
    };

    const handleNext = () => {
        if (currentPage < totalPages) onPageChange(currentPage + 1);
    };

    const renderPageNumbers = () => {
        return Array.from({ length: totalPages }, (_, i) => i + 1).map(number => (
            <button
                key={number}
                onClick={() => onPageChange(number)}
                className={`w-12 h-12 rounded-lg shadow-sm font-bold transition-colors ${
                    number === currentPage
                        ? 'bg-primary text-base-100'
                        : 'bg-base-100 hover:bg-primary/10 hover:text-primary'
                }`}
            >
                {number}
            </button>
        ));
    };

    return (
        <div className="container mx-auto flex justify-center mt-16">
            <div className="flex items-center flex-wrap gap-2">
                <button
                    onClick={handlePrevious}
                    className="bg-base-100 p-3 cursor-pointer rounded-lg shadow-sm hover:bg-primary/10 hover:text-primary transition-colors"
                    disabled={currentPage === 1}
                >
                    Previous
                </button>
                {renderPageNumbers()}
                <button
                    onClick={handleNext}
                    className="bg-base-100 p-3 cursor-pointer rounded-lg shadow-sm hover:bg-primary/10 hover:text-primary transition-colors"
                    disabled={currentPage === totalPages}
                >
                    Next
                </button>
            </div>
        </div>
    );
};

export default Pagination;
