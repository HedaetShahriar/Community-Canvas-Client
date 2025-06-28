import { useEffect } from 'react';
import { List, LayoutGrid } from 'lucide-react';

const LayoutToggleButton = ({ layout, setLayout }) => {
    useEffect(() => {
        localStorage.setItem('eventLayout', layout);
    }, [layout]);
    return (
        <div className="bg-base-200 p-1 rounded-lg flex items-center gap-1">
            <button
                onClick={() => setLayout('list')}
                aria-label="Switch to list view"
                className={`p-3 cursor-pointer rounded-lg transition-colors ${
                    layout === 'list' ? 'bg-base-100' : 'bg-base-200 text-slate-500'
                }`}
            >
                <List className="w-5 h-5" />
            </button>
            <button
                onClick={() => setLayout('grid')}
                aria-label="Switch to grid view"
                className={`p-3 cursor-pointer rounded-lg transition-colors ${
                    layout === 'grid' ? 'bg-base-100' : 'bg-base-200 text-slate-500'
                }`}
            >
                <LayoutGrid className="w-5 h-5" />
            </button>
        </div>
    );
};

export default LayoutToggleButton;
