import React from 'react';
import { Calendar, MapPin, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

const EventRow = ({ event }) => {
    // Static data from the original GridCard for demonstration purposes
    // In a real app, this would come from the `event` prop
    const staticEvent = {
        title: 'Food Drive',
        subtitle: 'Food Distribution - Gulshan, Dhaka',
        date: 'July 25, 2025, 12:00 PM',
        location: 'Gulshan Community Park',
        tags: ['Hunger Relief', 'Social Support'],
        volunteers: {
            joined: 15,
            total: 20,
        },
    };

    // Mapping for event type colors, similar to the original card
    const eventTypeColors = {
        'Hunger Relief': 'bg-yellow-100 text-yellow-800',
        'Social Support': 'bg-blue-100 text-blue-800',
        'Cleanup': 'bg-blue-100 text-blue-800',
        'Plantation': 'bg-green-100 text-green-800',
        'Donation': 'bg-yellow-100 text-yellow-800',
        'Education': 'bg-purple-100 text-purple-800',
    };

    const volunteerPercentage = (staticEvent.volunteers.joined / staticEvent.volunteers.total) * 100;

    return (
        <motion.div
            layout
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="grid grid-cols-1 md:grid-cols-10 gap-x-6 gap-y-4 items-center bg-base-100 p-4 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 group"
        >
            {/* Image Section */}
            <div className="md:col-span-2 relative h-32 md:h-full rounded-lg overflow-hidden">
                <img 
                    src={`https://picsum.photos/seed/${event.id}/400/300`} 
                    alt={staticEvent.title} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" 
                />
                <p className={`absolute top-2 right-2 px-3 py-1 text-xs font-semibold rounded-full ${eventTypeColors[event.type] || 'bg-gray-100 text-gray-800'}`}>
                    {event.type}
                </p>
            </div>

            {/* Event Details Section */}
            <div className="md:col-span-4 flex flex-col justify-center">
                <h2 className="text-xl font-bold group-hover:text-primary transition-colors duration-300">{staticEvent.subtitle}</h2>
                <div className="flex items-center text-sm mt-2">
                    <Calendar className="w-4 h-4 mr-2 flex-shrink-0" />
                    <span>{staticEvent.date}</span>
                </div>
                <div className="flex items-center text-sm mt-1">
                    <MapPin className="w-4 h-4 mr-2 flex-shrink-0" />
                    <span>{staticEvent.location}</span>
                </div>
            </div>

            {/* Volunteer Progress Section */}
            <div className="md:col-span-2">
                <div className="flex justify-between items-center text-sm">
                    <p className="font-semibold">Volunteers</p>
                    <p>{staticEvent.volunteers.joined} / {staticEvent.volunteers.total}</p>
                </div>
                <div className="w-full bg-base-300 rounded-full h-2 mt-1">
                    <div
                        className="bg-primary h-2 rounded-full"
                        style={{ width: `${volunteerPercentage}%` }}
                    ></div>
                </div>
            </div>

            {/* Action Button Section */}
            <div className="md:col-span-2 text-left md:text-right">
                <button className="w-full md:w-auto inline-flex items-center justify-center bg-primary text-white font-bold py-2 px-4 rounded-lg hover:bg-secondary transition-colors duration-300">
                    Details
                    <ArrowRight className="w-4 h-4 ml-2" />
                </button>
            </div>
        </motion.div>
    );
};

export default EventRow;