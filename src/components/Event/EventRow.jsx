import React from 'react';
import { Calendar, MapPin } from 'lucide-react';
import { motion } from 'framer-motion';
import { Link } from 'react-router';

const EventRow = ({ event }) => {
    const { _id, title, date, imageUrl, location, type, volunteersNeeded, volunteersJoined } = event;

    const dateObj = new Date(date);
    const formattedDate = dateObj.toLocaleDateString('en-US', {
        weekday: 'short',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: 'numeric',
        minute: '2-digit',
        hour12: true,
    });

    const eventTypeColors = {
        'Cleanup': 'bg-blue-100 text-blue-800',
        'Plantation': 'bg-green-100 text-green-800',
        'Donation': 'bg-yellow-100 text-yellow-800',
        'Education': 'bg-purple-100 text-purple-800',
        'Social Work': 'bg-blue-100 text-blue-800',
    };

    const volunteerPercentage = (volunteersJoined / volunteersNeeded) * 100;

    return (
        <motion.div
            layout
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="flex flex-col md:flex-row md:justify-between gap-4 items-center bg-base-100 p-4 rounded-xl shadow-md max-w-sm md:max-w-full mx-auto hover:shadow-lg transition-shadow duration-300 group"
        >
            <div className="flex flex-col md:flex-row items-start md:items-center gap-4">
                {/* Image Section */}
                <div className="relative h-32 w-full md:w-40 flex-shrink-0 rounded-lg overflow-hidden">
                    <img
                        src={imageUrl}
                        alt={title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <p className={`absolute top-2 right-2 px-3 py-1 text-xs font-semibold rounded-full ${eventTypeColors[type] || 'bg-gray-100 text-gray-800'}`}>
                        {type}
                    </p>
                </div>

                {/* Event Details Section */}
                <div className="flex flex-col justify-center min-w-0">
                    <h2 className="text-xl font-bold group-hover:text-primary transition-colors duration-300">{title}</h2>
                    <div className="flex items-center text-sm mt-2">
                        <Calendar className="w-4 h-4 mr-2 flex-shrink-0" />
                        <span>{formattedDate}</span>
                    </div>
                    <div className="flex items-center text-sm mt-1">
                        <MapPin className="w-4 h-4 mr-2 flex-shrink-0" />
                        <span>{location}</span>
                    </div>
                </div>
            </div>

            {/* Volunteer Progress Section */}
            <div className="flex flex-col justify-center w-full md:w-40">
                <div className="flex justify-between items-center text-sm">
                    <p className="font-semibold">Volunteers</p>
                    <p>{volunteersJoined} / {volunteersNeeded}</p>
                </div>
                <div className="w-full bg-base-300 rounded-full h-2 mt-1">
                    <div
                        className="bg-primary h-2 rounded-full"
                        style={{ width: `${volunteerPercentage}%` }}
                    ></div>
                </div>
            </div>

            {/* Action Button Section */}
            <div className="flex gap-3 md:flex-col lg:flex-row w-full md:w-auto md:justify-end">
                <Link to={`/events/${_id}`} className="w-full md:w-auto bg-primary text-primary-content text-center font-bold py-2 px-4 rounded-lg hover:bg-secondary transition-colors duration-300">
                    Details
                </Link>
                <button className="w-full md:w-auto bg-primary text-primary-content font-bold py-2 px-4 rounded-lg hover:bg-secondary transition-colors duration-300">
                    Join <span className='md:hidden lg:inline'>Event</span>
                </button>
            </div>
        </motion.div>
    );
};

export default EventRow;
