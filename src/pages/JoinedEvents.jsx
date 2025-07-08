import React, { useState, useEffect } from 'react';
import { MapPin, Calendar, ThumbsUp, Search } from 'lucide-react';
import { Link } from 'react-router';
import { motion, AnimatePresence } from 'framer-motion';
import LayoutToggleButton from '../components/LayoutToggleButton';
import useAuth from '../hooks/useAuth';
import useAxiosSecure from '../hooks/useAxiosSecure';
import Swal from 'sweetalert2';

const eventTypeColors = {
    'Cleanup': 'bg-blue-100 text-blue-800',
    'Plantation': 'bg-green-100 text-green-800',
    'Donation': 'bg-yellow-100 text-yellow-800',
    'Education': 'bg-purple-100 text-purple-800',
    'Social Support': 'bg-blue-100 text-blue-800',
};

const EventCardGrid = ({ event, onCancel }) => {
    const { _id, title, date, description, imageUrl, location, type, volunteersNeeded, volunteersJoined, organizer, status } = event || {};

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

    const volunteerPercentage = (volunteersJoined / volunteersNeeded) * 100;

    return (
        <motion.div
            layout
            initial={{ opacity: 0 }}
            animate={{ opacity: status === 'completed' ? 0.5 : 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-base-100 rounded-xl shadow-md overflow-hidden"
        >
            <div className="h-48 relative overflow-hidden">
                <img src={imageUrl} alt={title} className="w-full h-full object-cover" />
                <p className={`absolute top-2 right-2 px-3 py-1 text-xs font-semibold rounded-full ${eventTypeColors[type] || 'bg-gray-100 text-gray-800'}`}>{type}</p>
                <p className={`absolute top-2 left-2 px-3 py-1 text-xs font-semibold rounded-full ${status === 'completed' ? 'bg-gray-300 text-gray-700' : 'bg-red-200 text-red-700'}`}>
                    {status === 'completed' ? 'Completed' : 'Upcoming'}
                </p>
            </div>
            <div className="p-5">
                <h2 className="text-xl font-bold">{title}</h2>
                <div className="flex items-center mt-2 text-sm">
                    <Calendar className="w-4 h-4 mr-2" /> <span>{formattedDate}</span>
                </div>
                <div className="flex items-center mt-1 text-sm">
                    <MapPin className="w-4 h-4 mr-2" /> <span>{location}</span>
                </div>
                <div className="mt-3">
                    <div className="flex justify-between text-sm">
                        <span>Volunteers</span>
                        <span>{volunteersJoined || 0} / {volunteersNeeded || 20}</span>
                    </div>
                    <div className="w-full bg-base-300 h-2 rounded-full mt-1">
                        <div className="bg-primary h-2 rounded-full" style={{ width: `${volunteerPercentage}%` }} />
                    </div>
                </div>
                <div className="flex justify-between items-center gap-3 mt-4">
                    <Link to={`/events/${_id}`} className="bg-primary text-primary-content text-center px-3 py-2 rounded-xl w-full hover:bg-primary/90 transition-colors font-medium">View</Link>
                    <button
                        className='bg-primary text-primary-content w-full px-3 py-2 rounded-xl hover:bg-primary/90 transition-colors font-medium disabled:opacity-50'
                        onClick={() => onCancel(event._id)}
                        disabled={status === 'completed'}
                    >
                        Cancel
                    </button>
                </div>
            </div>
        </motion.div>
    );
};

const EventCardRow = ({ event, onCancel }) => {
    const { _id, title, date, description, imageUrl, location, type, volunteersNeeded, volunteersJoined, organizer, status } = event || {};

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

    const volunteerPercentage = (volunteersJoined / volunteersNeeded) * 100;

    return (
        <motion.div
            layout
            initial={{ opacity: 0 }}
            animate={{ opacity: status === 'completed' ? 0.5 : 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="flex flex-col md:flex-row items-center md:items-stretch bg-base-100 rounded-xl shadow-md p-4 md:p-6 gap-4 md:gap-6 w-full hover:shadow-lg transition-shadow duration-200"
        >
            <div className="relative w-full md:w-48 h-36 md:h-32 flex-shrink-0 rounded-lg overflow-hidden">
                <img
                    src={imageUrl}
                    alt={title}
                    className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                />
                <span className={`absolute top-2 right-2 px-3 py-1 text-xs font-semibold rounded-full ${eventTypeColors[type] || 'bg-gray-100 text-gray-800'}`}>
                    {type}
                </span>
                <span className={`absolute bottom-2 left-2 px-3 py-1 text-xs font-semibold rounded-full ${status === 'completed' ? 'bg-gray-300 text-gray-700' : 'bg-red-200 text-red-700'}`}>
                    {status === 'completed' ? 'Completed' : 'Upcoming'}
                </span>
            </div>

            <div className="w-full md:flex-1 flex flex-col justify-between min-w-0">
                <div>
                    <h2 className="text-lg md:text-xl font-bold truncate">{title}</h2>
                    <div className="flex items-center text-sm mt-1">
                        <Calendar className="w-4 h-4 mr-2" />
                        <span>{formattedDate}</span>
                    </div>
                    <div className="flex items-center text-sm mt-1">
                        <MapPin className="w-4 h-4 mr-2" />
                        <span className="truncate">{location}</span>
                    </div>
                </div>
                <div className="mt-3">
                    <div className="flex justify-between text-xs">
                        <span>Volunteers</span>
                        <span>{volunteersJoined || 0} / {volunteersNeeded || 20}</span>
                    </div>
                    <div className="w-full bg-base-300 h-2 rounded-full mt-1">
                        <div className="bg-primary h-2 rounded-full transition-all duration-300" style={{ width: `${volunteerPercentage}%` }} />
                    </div>
                </div>
            </div>

            <div className="flex justify-around w-full md:flex-col md:w-30 gap-2 md:ml-4">
                <Link to={`/events/${_id}`} className="bg-primary text-primary-content px-3 py-2 rounded-xl text-center w-full hover:bg-primary/90 transition-colors text-sm font-medium">View</Link>
                <button
                    className='bg-primary w-full text-primary-content px-3 py-2 rounded-xl hover:bg-primary/90 transition-colors text-sm font-medium disabled:opacity-50'
                    onClick={() => onCancel(_id)}
                    disabled={status === 'completed'}
                >
                    Cancel
                </button>
            </div>
        </motion.div>
    );
};

const JoinedEvents = () => {
    const { user } = useAuth();
    const [joinedEvents, setJoinedEvents] = useState([]);
    const axiosSecure =useAxiosSecure();

    useEffect(() => {
        axiosSecure.get(`/events/joined?email=${user.email}`)
        .then(res => {
            // console.log(res.data)
            setJoinedEvents(res.data);
        });
    }, []);

    const [layout, setLayout] = useState(localStorage.getItem('eventLayout') || 'grid');


    const sortedEvents = [...joinedEvents]
        .map(event => {
            const eventDate = new Date(event.date);
            const today = new Date();
            return {
                ...event,
                status: eventDate < today ? 'completed' : 'upcoming'
            };
        })
        .sort((a, b) => {
            const dateA = new Date(a.date);
            const dateB = new Date(b.date);
            const today = new Date();
            const aPast = dateA < today;
            const bPast = dateB < today;

            if (aPast && !bPast) return 1;
            if (!aPast && bPast) return -1;
            return aPast ? dateB - dateA : dateA - dateB;
        });

    const onCancel = (eventId) => {
        setJoinedEvents(prevEvents => prevEvents.filter(event => event._id !== eventId));
        axiosSecure.patch(`/events/cancel/${eventId}`, { email: user.email })
            .then(res => {
                if (res.data) {
                        Swal.fire({
                            icon: 'success',
                            title: 'Cancelled!',
                            text: 'You have successfully cancelled your participation in this event.',
                            timer: 2000,
                            showConfirmButton: false,
                        });
                }
            })
            .catch(err => {
                console.error(`Error cancelling event with ID: ${eventId}`, err);
            });
    };

    return (
        <div className="bg-base-200 min-h-[calc(100vh-250px)] py-16 px-6">
            <div className="container mx-auto">
                <div className="text-center mb-12">
                    <h1 className="text-4xl md:text-5xl font-extrabold">My Joined Events</h1>
                    <p className="text-lg mt-4">Thank you for your commitment! Here are the events you've signed up for.</p>
                </div>
                <div className="flex justify-end mb-6">
                    <LayoutToggleButton layout={layout} setLayout={setLayout} />
                </div>

                <AnimatePresence mode="wait">
                    {sortedEvents.length > 0 ? (
                        layout === 'grid' ? (
                            <motion.div key="grid" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                                {sortedEvents.map(event => (
                                    <EventCardGrid
                                        key={event._id}
                                        event={event}
                                        onCancel={onCancel}
                                    />
                                ))}
                            </motion.div>
                        ) : (
                            <motion.div key="list" className="space-y-4">
                                {sortedEvents.map(event => (
                                    <EventCardRow
                                        key={event._id}
                                        event={event}
                                        onCancel={onCancel}
                                    />
                                ))}
                            </motion.div>
                        )
                    ) : (
                        <div className="text-center py-24 bg-base-100 rounded-2xl shadow-sm">
                            <div className="mx-auto bg-primary/10 text-primary w-16 h-16 rounded-full flex items-center justify-center mb-6">
                                <ThumbsUp className="w-9 h-9" />
                            </div>
                            <h3 className="text-2xl font-bold">You haven't joined any events yet.</h3>
                            <p className="mt-2 mb-6">Ready to make an impact? Find an event that inspires you!</p>
                            <Link
                                to="/upcoming-events"
                                className="btn btn-primary px-6 py-3 font-bold flex items-center gap-2 w-xs mx-auto shadow-lg hover:bg-opacity-90 transition-all"
                            >
                                <Search className="w-5 h-5" /> Explore Events
                            </Link>
                        </div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
};

export default JoinedEvents;
