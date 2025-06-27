import React from 'react';

import { Search, MapPin, List, LayoutGrid, ArrowRight, SlidersHorizontal } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
const LayoutToggleButton = ({ layout, active, onClick, children }) => (
     <button 
        onClick={onClick}
        aria-label={`Switch to ${layout} view`}
        className={`p-3 rounded-lg transition-colors ${
            active 
                ? 'bg-slate-900 text-white'
                : 'bg-white text-slate-500 hover:bg-slate-100'
        }`}
    >
        {children}
    </button>
);

export default LayoutToggleButton;