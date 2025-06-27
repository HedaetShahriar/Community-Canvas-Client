import React from 'react';


import { Search, MapPin, List, LayoutGrid, ArrowRight, SlidersHorizontal } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
const EventRow = ({ event }) => {
    const eventTypeColors = {
        'Cleanup': 'border-blue-500',
        'Plantation': 'border-green-500',
        'Donation': 'border-yellow-500',
        'Education': 'border-purple-500',
    };

    return (
        <motion.div 
            layout
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="grid grid-cols-1 md:grid-cols-10 gap-6 items-center bg-white p-6 rounded-2xl shadow-sm hover:shadow-xl hover:ring-2 hover:ring-primary transition-all duration-300 group"
        >
            <div className="md:col-span-2">
                <p className="font-bold text-lg text-slate-800">{new Date(event.date).toLocaleDateString('en-GB', { month: 'long', day: 'numeric' })}</p>
                <p className="text-sm text-slate-500">{new Date(event.date).getFullYear()}</p>
            </div>
            <div className="md:col-span-4">
                <h3 className="text-xl font-bold text-slate-900 group-hover:text-primary transition-colors">{event.title}</h3>
                <p className="flex items-center text-slate-600 mt-1">
                    <MapPin className="w-4 h-4 mr-2 flex-shrink-0" /> {event.location}
                </p>
            </div>
            <div className="md:col-span-2 text-left md:text-center">
                <span className={`inline-block px-3 py-1 text-xs font-semibold rounded-full border-l-4 ${eventTypeColors[event.type] || 'border-gray-500'}`}>
                    {event.type}
                </span>
            </div>
            <div className="md:col-span-2 text-left md:text-right">
                <a href="#" className="inline-flex items-center font-bold py-2 px-4 rounded-lg bg-slate-100 text-slate-700 group-hover:bg-primary group-hover:text-primary-content transition-all">
                    Details <ArrowRight className="w-4 h-4 ml-2" />
                </a>
            </div>
        </motion.div>
    );
};

export default EventRow;