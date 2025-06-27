import React from 'react';

const Pagination = () => (
    <div className="flex justify-center mt-16">
        <div className="flex items-center gap-2">
            <button className="bg-white p-3 rounded-lg shadow-sm text-slate-500 hover:bg-primary/10 hover:text-primary transition-colors">Previous</button>
            <button className="bg-primary text-white w-12 h-12 rounded-lg shadow-sm font-bold">1</button>
            <button className="bg-white w-12 h-12 rounded-lg shadow-sm font-bold text-slate-500 hover:bg-primary/10 hover:text-primary transition-colors">2</button>
            <button className="bg-white w-12 h-12 rounded-lg shadow-sm font-bold text-slate-500 hover:bg-primary/10 hover:text-primary transition-colors">3</button>
            <button className="bg-white p-3 rounded-lg shadow-sm text-slate-500 hover:bg-primary/10 hover:text-primary transition-colors">Next</button>
        </div>
    </div>
);

export default Pagination;