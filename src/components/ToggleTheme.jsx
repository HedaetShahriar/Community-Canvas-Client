import React from 'react';
import { MdOutlineDarkMode, MdOutlineLightMode } from 'react-icons/md';

const ToggleTheme = () => {
    return (
        <div>
            <label className="swap swap-rotate">
                {/* this hidden checkbox controls the state */}
                <input type="checkbox" className="theme-controller" value="dim" />

                {/* sun icon */}
                <div className="swap-off text-yellow-600">
                    <MdOutlineLightMode size={32} />
                </div>
                {/* moon icon */}
                <div className="swap-on">
                    <MdOutlineDarkMode size={32} />
                </div>
            </label>
        </div>
    );
};

export default ToggleTheme;