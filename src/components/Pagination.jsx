import React from 'react';

const Pagination = () => (
    <div className="container mx-auto flex justify-center mt-16">
        <div className="flex items-center flex-wrap gap-2">
            <button className="bg-base-100 p-3 cursor-pointer rounded-lg shadow-sm  hover:bg-primary/10 hover:text-primary transition-colors">Previous</button>
            <button className="bg-primary cursor-pointer text-base-100bg-base-100 w-12 h-12 rounded-lg shadow-sm font-bold">1</button>
            <button className="bg-base-100 cursor-pointer w-12 h-12 rounded-lg shadow-sm font-bold  hover:bg-primary/10 hover:text-primary transition-colors">2</button>
            <button className="bg-base-100 cursor-pointer w-12 h-12 rounded-lg shadow-sm font-bold  hover:bg-primary/10 hover:text-primary transition-colors">3</button>
            <button className="bg-base-100 cursor-pointer p-3 rounded-lg shadow-sm  hover:bg-primary/10 hover:text-primary transition-colors">Next</button>
        </div>
    </div>
);

export default Pagination;