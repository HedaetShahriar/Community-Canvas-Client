import React from 'react';

import { Search, MapPin, List, LayoutGrid, ArrowRight, SlidersHorizontal } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
const LayoutToggleButton = ({ layout, active, onClick, children }) => (
     <button 
        onClick={onClick}
        aria-label={`Switch to ${layout} view`}
        className={`p-3 cursor-pointer rounded-lg transition-colors ${
            active 
                ? 'bg-base-100 '
                : 'bg-base-200 text-slate-500 '
        }`}
    >
        {children}
    </button>
);

export default LayoutToggleButton;