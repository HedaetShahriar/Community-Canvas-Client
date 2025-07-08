import React from 'react';

const Spinner  = () => {
    return (
        <div className='min-h-[calc(100vh-250px)] flex justify-center items-center'>
            <span className='loading loading-bars loading-xl'></span>
        </div>
    );
};

export default Spinner ;