import React, { useEffect, useState } from 'react';
import { MdOutlineDarkMode, MdOutlineLightMode } from 'react-icons/md';

const ToggleTheme = () => {
    const [theme, setTheme] = useState(() => {
        const savedTheme = localStorage.getItem('theme');
        return savedTheme ? savedTheme : 'light';
    });

    useEffect(() => {
        localStorage.setItem('theme', theme);
        document.documentElement.setAttribute('data-theme', theme);
    }, [theme]);

    const handleToggle = () => {
        setTheme(prev => (prev === 'light' ? 'dim' : 'light'));
    };

    return (
        <div>
            <label className="swap swap-rotate">
                <input
                    type="checkbox"
                    onChange={handleToggle}
                    checked={theme === 'dim'}
                    className="theme-controller"
                    value="dim"
                />
                <div className="swap-off text-yellow-600">
                    <MdOutlineLightMode size={32} />
                </div>
                <div className="swap-on">
                    <MdOutlineDarkMode size={32} />
                </div>
            </label>
        </div>
    );
};

export default ToggleTheme;