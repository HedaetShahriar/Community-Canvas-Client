import React, { useEffect, useRef, useState } from 'react';

import { Search, MapPin, List, LayoutGrid, ArrowRight, SlidersHorizontal } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import LayoutToggleButton from '../LayoutToggleButton';
const SearchFilter = ({ searchQuery, setSearchQuery, eventType, setEventType, layout, setLayout }) => {
    const [isFilterOpen, setIsFilterOpen] = useState(false);
    const filterRef = useRef(null);
    const eventTypes = ["All", "Cleanup", "Plantation", "Donation", "Education"];

    // Close dropdown when clicking outside
    useEffect(() => {
        function handleClickOutside(event) {
            if (filterRef.current && !filterRef.current.contains(event.target)) {
                setIsFilterOpen(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, [filterRef]);

    return (
        <div className="bg-base-100 p-4 rounded-2xl shadow-sm mb-8 sticky top-20 z-20">
            <div className="flex justify-between items-center gap-4">
                <div className="relative flex-grow transition-all duration-300">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5" />
                    <input
                        type="text"
                        placeholder="Search by event name or location..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className={`w-full pl-12 pr-4 py-3 bg-base-200 border-2 border-transparent rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:bg-base-100 transition-all duration-300 ${
                            searchQuery
                                ? 'md:w-full'
                                : 'md:w-full'
                        }`}
                    />
                </div>
                <div
                    className={`flex items-center gap-2 transition-all duration-300 ${
                        searchQuery ? 'hidden md:flex' : ''
                    }`}
                >
                    {/* Filter Dropdown Button */}
                    <div className="relative" ref={filterRef}>
                        <button
                            onClick={() => setIsFilterOpen(!isFilterOpen)}
                            className="flex items-center gap-2 px-4 py-3 rounded-lg bg-base-100 border-2 border-base-200 hover:border-base-300 hover:bg-base-200 transition-colors"
                        >
                            <SlidersHorizontal className="w-5 h-5 text-slate-500" />
                            <span className="font-semibold cursor-pointer  hidden sm:inline">Filters</span>
                        </button>
                        <AnimatePresence>
                            {isFilterOpen && (
                                <motion.div
                                    initial={{ opacity: 0, y: -10 }}
                                    animate={{ opacity: 1, y: 10 }}
                                    exit={{ opacity: 0, y: -10 }}
                                    className="absolute top-full right-0 mt-2 w-64 bg-base-100 rounded-2xl shadow-lg border border-base-200 p-4 z-30"
                                >
                                    <div>
                                        <p className="font-bold mb-2">Event Type</p>
                                        <div className="grid grid-cols-2 gap-2">
                                            {eventTypes.map(type => (
                                                <button
                                                    key={type}
                                                    onClick={() => { setEventType(type); setIsFilterOpen(false); }}
                                                    className={`px-3 py-2 cursor-pointer text-sm font-semibold rounded-lg transition-colors ${eventType === type
                                                            ? 'bg-slate-900 text-white'
                                                            : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                                                        }`}
                                                >{type}</button>
                                            ))}
                                        </div>
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                    <LayoutToggleButton layout={layout} setLayout={setLayout}/>
                </div>
            </div>
        </div>
    );
};

export default SearchFilter;