import React, { useState, useEffect } from 'react';
import { Edit, Trash2, PlusCircle, X, MapPin, Calendar, Eye, Tag } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router';
import LayoutToggleButton from '../components/LayoutToggleButton';
import DatePicker from 'react-datepicker';

const eventTypeColors = {
    'Cleanup': 'bg-blue-100 text-blue-800',
    'Plantation': 'bg-green-100 text-green-800',
    'Donation': 'bg-yellow-100 text-yellow-800',
    'Education': 'bg-purple-100 text-purple-800',
    'Social Support': 'bg-blue-100 text-blue-800',
};

const EditEventModal = ({ event, isOpen, onClose, onSave }) => {
    const [formData, setFormData] = useState(event);

    useEffect(() => {
        setFormData(event);
    }, [event]);

    if (!isOpen) return null;

    const handleChange = e => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = e => {
        e.preventDefault();
        onSave(formData);
    };

    return (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <motion.div
                className="bg-base-100 rounded-2xl shadow-2xl w-full max-w-2xl"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 50 }}
            >
                <header className="p-6 border-b border-slate-200 flex justify-between items-center">
                    <h2 className="text-xl font-bold">Edit Event</h2>
                    <button onClick={onClose} className="p-2 rounded-full hover:bg-slate-100">
                        <X className="w-6 h-6" />
                    </button>
                </header>
                <form onSubmit={handleSubmit} className="p-8 space-y-6">
                    <div>
                        <label htmlFor="title" className="block text-sm font-bold mb-2">Event Title</label>
                        <input
                            id="title"
                            name="title"
                            type="text"
                            value={formData.title}
                            onChange={handleChange}
                            required
                            className="w-full px-4 py-3 bg-base-300 border rounded-lg focus:outline-none focus:ring-1 focus:ring-primary transition"
                        />
                    </div>
                    <div>
                        <label htmlFor="location" className="block text-sm font-bold mb-2">Location</label>
                        <input
                            id="location"
                            name="location"
                            type="text"
                            value={formData.location}
                            onChange={handleChange}
                            required
                            className="w-full px-4 py-3 bg-base-300 border rounded-lg focus:outline-none focus:ring-1 focus:ring-primary transition"
                        />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="font-semibold flex items-center gap-2 mb-1">
                                <Tag className="h-5 w-5" /> Event Type
                            </label>
                            <select
                                name="eventType"
                                value={formData.eventType}
                                onChange={handleChange}
                                className="w-full px-3 py-3 bg-base-100 border rounded-lg focus:outline-none focus:ring-1 focus:ring-primary transition"
                            >
                                <option disabled>Select event type</option>
                                <option>Cleanup</option>
                                <option>Plantation</option>
                                <option>Donation</option>
                                <option>Education</option>
                            </select>
                        </div>
                        <div>
                            <label className="font-semibold flex items-center gap-2 mb-1">
                                <Calendar className="h-5 w-5" /> Event Date
                            </label>
                            <DatePicker
                                selected={new Date(formData.date)}
                                onChange={(date) => setFormData({ ...formData, date })}
                                minDate={new Date()}
                                className="w-full py-3 px-3 bg-base-100 border rounded-lg focus:outline-none focus:ring-1 focus:ring-primary transition"
                            />
                        </div>
                    </div>
                    <div>
                        <label htmlFor="description" className="block text-sm font-bold mb-2">Description</label>
                        <textarea
                            id="description"
                            name="description"
                            rows={4}
                            value={formData.description}
                            onChange={handleChange}
                            className="w-full px-4 py-3 bg-base-300 border rounded-lg focus:outline-none focus:ring-1 focus:ring-primary transition"
                        />
                    </div>
                </form>
                <footer className="p-6 border-t border-slate-200 flex justify-end gap-4">
                    <button onClick={onClose} className="px-6 py-2 rounded-lg font-semibold bg-slate-100 hover:bg-slate-200">Cancel</button>
                    <button onClick={handleSubmit} className="px-6 py-2 rounded-lg font-semibold bg-primary text-white hover:bg-opacity-90">Save Changes</button>
                </footer>
            </motion.div>
        </div>
    );
};

const DeleteConfirmationModal = ({ event, isOpen, onClose, onConfirm }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <motion.div
                className="bg-base-100 rounded-2xl shadow-2xl w-full max-w-md p-8 text-center"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
            >
                <h2 className="text-2xl font-bold">Are you sure?</h2>
                <p className="mt-2">Delete "<strong>{event.title}</strong>"? This cannot be undone.</p>
                <div className="flex justify-center gap-4 mt-8">
                    <button onClick={onClose} className="px-6 py-2 rounded-lg bg-slate-100 hover:bg-slate-200 font-semibold">Cancel</button>
                    <button onClick={() => onConfirm(event.id)} className="px-6 py-2 rounded-lg bg-red-500 text-white hover:bg-red-600 font-semibold">Delete</button>
                </div>
            </motion.div>
        </div>
    );
};

const EventCardGrid = ({ event, onEdit, onDelete }) => {
    const volunteerPercentage = (event.joined || 0) / (event.total || 1) * 100;

    return (
        <motion.div
            layout
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.3 }}
            className="bg-base-100 rounded-xl shadow-md overflow-hidden"
        >
            <div className="h-48 relative overflow-hidden">
                <img src={`https://picsum.photos/seed/${event.id}/400/300`} alt={event.title} className="w-full h-full object-cover" />
                <p className={`absolute top-2 right-2 px-3 py-1 text-xs font-semibold rounded-full ${eventTypeColors[event.type] || 'bg-gray-100 text-gray-800'}`}>{event.type}</p>
            </div>
            <div className="p-5">
                <h2 className="text-xl font-bold">{event.title}</h2>
                <div className="flex items-center mt-2 text-sm">
                    <Calendar className="w-4 h-4 mr-2" /> <span>{new Date(event.date).toLocaleString()}</span>
                </div>
                <div className="flex items-center mt-1 text-sm">
                    <MapPin className="w-4 h-4 mr-2" /> <span>{event.location}</span>
                </div>
                <div className="mt-3">
                    <div className="flex justify-between text-sm">
                        <span>Volunteers</span>
                        <span>{event.joined || 0} / {event.total || 20}</span>
                    </div>
                    <div className="w-full bg-base-300 h-2 rounded-full mt-1">
                        <div className="bg-primary h-2 rounded-full" style={{ width: `${volunteerPercentage}%` }} />
                    </div>
                </div>
                <div className="flex justify-between items-center mt-4">
                    <Link to={`/event/${event.id}`} className="text-sm flex items-center gap-2 hover:underline"><Eye className="w-4 h-4" /> View</Link>
                    <div className="flex gap-2">
                        <button onClick={() => onEdit(event)}><Edit className="w-5 h-5 hover:text-blue-500" /></button>
                        <button onClick={() => onDelete(event)}><Trash2 className="w-5 h-5 text-red-500 hover:text-red-600" /></button>
                    </div>
                </div>
            </div>
        </motion.div>
    );
};

const EventCardRow = ({ event, onEdit, onDelete }) => {
    const volunteerPercentage = (event.joined || 0) / (event.total || 1) * 100;

    return (
        <motion.div
            layout
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.25 }}
            className="flex flex-col md:flex-row items-center md:items-stretch bg-base-100 rounded-xl shadow-md p-4 md:p-6 gap-4 md:gap-6 w-full hover:shadow-lg transition-shadow duration-200"
        >
            {/* Image Section */}
            <div className="relative w-full md:w-48 h-36 md:h-32 flex-shrink-0 rounded-lg overflow-hidden">
                <img
                    src={`https://picsum.photos/seed/${event.id}/400/300`}
                    alt={event.title}
                    className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                />
                <span className={`absolute top-2 right-2 px-3 py-1 text-xs font-semibold rounded-full ${eventTypeColors[event.type] || 'bg-gray-100 text-gray-800'}`}>
                    {event.type}
                </span>
            </div>

            {/* Event Details */}
            <div className="w-full md:flex-1 flex flex-col justify-between min-w-0">
                <div>
                    <h2 className="text-lg md:text-xl font-bold truncate">{event.title}</h2>
                    <div className="flex items-center text-sm  mt-1">
                        <Calendar className="w-4 h-4 mr-2" />
                        <span>{new Date(event.date).toLocaleString()}</span>
                    </div>
                    <div className="flex items-center text-sm  mt-1">
                        <MapPin className="w-4 h-4 mr-2" />
                        <span className="truncate">{event.location}</span>
                    </div>
                </div>
                <div className="mt-3">
                    <div className="flex justify-between text-xs ">
                        <span>Volunteers</span>
                        <span>{event.joined || 0} / {event.total || 20}</span>
                    </div>
                    <div className="w-full bg-base-300 h-2 rounded-full mt-1">
                        <div className="bg-primary h-2 rounded-full transition-all duration-300" style={{ width: `${volunteerPercentage}%` }} />
                    </div>
                </div>
            </div>

            {/* Actions */}
            <div className="flex justify-between md:flex-col w-full md:w-20  gap-2 md:ml-4">
                <Link
                    to={`/event/${event.id}`}
                    className="inline-flex justify-center items-center gap-1 text-primary-content bg-primary rounded-2xl px-5 md:px-3 py-1 hover:underline text-sm font-medium"
                >
                    <Eye className="w-4 h-4" /> View
                </Link>
                <div className="flex gap-2">
                    <button
                        onClick={() => onEdit(event)}
                        className="p-2 rounded-full hover:bg-blue-50 transition"
                        title="Edit"
                    >
                        <Edit className="w-5 h-5" />
                    </button>
                    <button
                        onClick={() => onDelete(event)}
                        className="p-2 rounded-full hover:bg-red-50 transition"
                        title="Delete"
                    >
                        <Trash2 className="w-5 h-5 text-red-500" />
                    </button>
                </div>
            </div>
        </motion.div>
    );
};

const ManageEvents = () => {
    const [myEvents, setMyEvents] = useState([
        { id: 1, title: "Campus Cleanup", location: "Dhaka University", date: "2025-07-10", type: "Cleanup", joined: 12, total: 20 },
        { id: 2, title: "Tree Plantation", location: "Sylhet", date: "2025-08-02", type: "Plantation", joined: 8, total: 25 },
        { id: 3, title: "Clothing Drive", location: "Banani", date: "2024-12-15", type: "Donation", joined: 20, total: 20 }
    ]);
    const [layout, setLayout] = useState(localStorage.getItem('eventLayout') || 'grid');

    const [selectedEvent, setSelectedEvent] = useState(null);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

    const handleOpenEdit = event => {
        setSelectedEvent(event);
        setIsEditModalOpen(true);
    };
    const handleOpenDelete = event => {
        setSelectedEvent(event);
        setIsDeleteModalOpen(true);
    };
    const handleSaveChanges = updatedEvent => {
        setMyEvents(myEvents.map(e => e.id === updatedEvent.id ? updatedEvent : e));
        setIsEditModalOpen(false);
    };
    const handleDeleteConfirm = eventId => {
        setMyEvents(myEvents.filter(e => e.id !== eventId));
        setIsDeleteModalOpen(false);
    };

    return (
        <div className="bg-base-200 min-h-screen py-16 px-4 md:px-8">
            <div className="container mx-auto">
                <div className="flex flex-col text-center md:text-left md:flex-row justify-between items-center gap-4 mb-8">
                    <div>
                        <h1 className="text-4xl font-bold">Manage My Events</h1>
                        <p className="text-lg mt-1">Edit or delete your events</p>
                    </div>
                    <Link to={"/create-event"} className="inline-flex items-center gap-2 bg-primary text-primary-content px-5 w-50 py-3 rounded-lg font-semibold hover:bg-opacity-90">
                        <PlusCircle className="w-5 h-5" /> Create New Event
                    </Link>
                </div>
                <div className="flex justify-end mb-6">
                    <LayoutToggleButton layout={layout} setLayout={setLayout} />
                </div>

                <AnimatePresence mode="wait">
                    {myEvents.length > 0 ? (
                        layout === 'grid' ? (
                            <motion.div key="grid" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                                {myEvents.map(event => (
                                    <EventCardGrid
                                        key={event.id}
                                        event={event}
                                        onEdit={handleOpenEdit}
                                        onDelete={handleOpenDelete}
                                    />
                                ))}
                            </motion.div>
                        ) : (
                            <motion.div key="list" className="space-y-4">
                                {myEvents.map(event => (
                                    <EventCardRow
                                        key={event.id}
                                        event={event}
                                        onEdit={handleOpenEdit}
                                        onDelete={handleOpenDelete}
                                    />
                                ))}
                            </motion.div>
                        )
                    ) : (
                        <motion.div className="text-center py-24 bg-base-100 rounded-xl shadow">
                            <h3 className="text-2xl font-bold">No events created yet</h3>
                            <p className="mt-2 mb-6">Start by listing your first event</p>
                            <a href="#" className="inline-flex items-center gap-2 bg-primary text-primary-content px-6 py-3 rounded-lg hover:bg-opacity-90">
                                <PlusCircle className="w-5 h-5" /> Create Event
                            </a>
                        </motion.div>
                    )}
                </AnimatePresence>

                <AnimatePresence>
                    {isEditModalOpen && (
                        <EditEventModal
                            event={selectedEvent}
                            isOpen={isEditModalOpen}
                            onClose={() => setIsEditModalOpen(false)}
                            onSave={handleSaveChanges}
                        />
                    )}
                    {isDeleteModalOpen && (
                        <DeleteConfirmationModal
                            event={selectedEvent}
                            isOpen={isDeleteModalOpen}
                            onClose={() => setIsDeleteModalOpen(false)}
                            onConfirm={handleDeleteConfirm}
                        />
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
};

export default ManageEvents;
