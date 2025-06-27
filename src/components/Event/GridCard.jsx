import React from 'react';

import { Search, MapPin, List, LayoutGrid, ArrowRight, SlidersHorizontal } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
const GridCard = ({ event }) => {
    const eventTypeColors = {
        'Cleanup': 'bg-blue-100 text-blue-800',
        'Plantation': 'bg-green-100 text-green-800',
        'Donation': 'bg-yellow-100 text-yellow-800',
        'Education': 'bg-purple-100 text-purple-800',
    };
    return (
        <motion.div
            layout
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.3 }}
            className="bg-white rounded-2xl shadow-sm overflow-hidden group transform hover:-translate-y-1 transition-transform duration-300 flex flex-col"
        >
            <div className="h-48 overflow-hidden">
                <img src={`https://picsum.photos/seed/${event.id}/400/300`} alt={event.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
            </div>
            <div className="p-5 flex flex-col flex-grow">
                 <p className={`inline-block px-3 py-1 text-xs font-semibold rounded-full self-start mb-3 ${eventTypeColors[event.type] || 'bg-gray-100 text-gray-800'}`}>{event.type}</p>
                <h3 className="text-lg font-bold text-slate-900 mb-2 flex-grow">{event.title}</h3>
                <p className="flex items-center text-sm text-slate-600 mb-4">
                    <MapPin className="w-4 h-4 mr-2 flex-shrink-0" /> {event.location}
                </p>
                <div className="flex justify-between items-center mt-auto pt-4 border-t border-slate-100">
                    <p className="font-bold text-slate-800">{new Date(event.date).toLocaleDateString('en-GB', { month: 'short', day: 'numeric' })}</p>
                    <a href="#" className="font-bold text-sm text-primary hover:underline">View Details</a>
                </div>
            </div>
        </motion.div>
    );
};

export default GridCard;