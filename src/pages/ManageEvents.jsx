import React, { useState, useEffect } from 'react';
import { Edit, Trash2, PlusCircle, X, MapPin, Calendar, Eye, Tag, Send, Loader2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router';
import LayoutToggleButton from '../components/LayoutToggleButton';
import DatePicker from 'react-datepicker';
import useAxiosSecure from '../hooks/useAxiosSecure';
import useAuth from '../hooks/useAuth';
import axios from 'axios';
import Swal from 'sweetalert2';

const eventTypeColors = {
    'Cleanup': 'bg-blue-100 text-blue-800',
    'Plantation': 'bg-green-100 text-green-800',
    'Donation': 'bg-yellow-100 text-yellow-800',
    'Education': 'bg-purple-100 text-purple-800',
    'Social Work': 'bg-blue-100 text-blue-800',
};

const EditEventModal = ({ event, isOpen, onClose, onSave }) => {
    const [formData, setFormData] = useState(event || {});
    const [errors, setErrors] = useState({});
    const [isSaving, setIsSaving] = useState(false);

    useEffect(() => {
        setFormData(event || {});
    }, [event]);

    if (!isOpen) return null;

    const filterTime = (date) => {
        const hour = date.getHours();
        return hour >= 8 && hour <= 23;
    };

    const handleChange = e => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleDateChange = date => {
        setFormData(prev => ({ ...prev, date }));
    };

    const validateForm = () => {
        const newErrors = {};
        if (!formData.title?.trim()) newErrors.title = 'Event title is required.';
        if (!formData.description?.trim()) newErrors.description = 'A description is required.';
        if (!formData.location?.trim()) newErrors.location = 'Location is required.';
        if (!formData.imageUrl?.trim()) newErrors.imageUrl = 'Image URL is required.';
        if (!formData.date) newErrors.date = 'Please select a date.';
        if (!formData.organizer?.trim()) newErrors.organizer = 'Organizer name is required.';
        if (!formData.volunteersNeeded || isNaN(formData.volunteersNeeded) || Number(formData.volunteersNeeded) <= 0)
            newErrors.volunteersNeeded = 'Enter a valid number > 0.';
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = e => {
        e.preventDefault();
        if (!validateForm()) return;

        setIsSaving(true);
        const payload = {
            ...formData,
            date: formData.date
                ? (formData.date instanceof Date
                    ? formData.date.toISOString()
                    : new Date(formData.date).toISOString())
                : null,
            volunteersNeeded: Number(formData.volunteersNeeded),
        };
        axios.patch(`${import.meta.env.VITE_API_URL}/events/my-events/${event._id}`, payload)
            .then(response => {
                onSave(response.data);
            })
            .catch(error => {
                console.error("Error updating event:", error);
                setErrors({ api: 'Failed to update event. Please try again.' });
            })
            .finally(() => {
                setIsSaving(false);
            });
    };

    return (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4 overflow-y-auto">
            <motion.div
                className="bg-base-100 rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] flex flex-col"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 50 }}
            >
                <header className="p-6 border-b border-slate-200 flex justify-between items-center flex-shrink-0">
                    <h2 className="text-xl font-bold">Edit Event</h2>
                    <button onClick={onClose} className="p-2 rounded-full hover:bg-slate-100">
                        <X className="w-6 h-6" />
                    </button>
                </header>

                <div className="overflow-y-auto p-8 space-y-6 flex-1">
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <label className="block text-sm font-bold mb-2">Event Title</label>
                            <input
                                name="title"
                                type="text"
                                value={formData.title}
                                onChange={handleChange}
                                className="w-full px-4 py-3 bg-base-200 border rounded-lg"
                            />
                            {errors.title && <p className="text-red-500 text-sm mt-1">{errors.title}</p>}
                        </div>

                        <div>
                            <label className="block text-sm font-bold mb-2">Location</label>
                            <input
                                name="location"
                                type="text"
                                value={formData.location}
                                onChange={handleChange}
                                className="w-full px-4 py-3 bg-base-200 border rounded-lg"
                            />
                            {errors.location && <p className="text-red-500 text-sm mt-1">{errors.location}</p>}
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="font-semibold flex items-center gap-2 mb-1">
                                    <Tag className="h-5 w-5" /> Event Type
                                </label>
                                <select
                                    name="type"
                                    value={formData.type}
                                    onChange={handleChange}
                                    className="w-full px-3 py-3 bg-base-200 border rounded-lg"
                                >
                                    <option value="" disabled>Select event type</option>
                                    <option value="Cleanup">Cleanup</option>
                                    <option value="Plantation">Plantation</option>
                                    <option value="Donation">Donation</option>
                                    <option value="Education">Education</option>
                                    <option value="Social Work">Social Work</option>
                                </select>
                                {errors.eventType && <p className="text-red-500 text-sm mt-1">{errors.eventType}</p>}
                            </div>
                            <div className="flex flex-col gap-1">
                                <label className="font-semibold flex items-center gap-2">
                                    <Calendar className={`h-5 w-5 ${errors.date ? 'text-red-500' : ''}`} />
                                    Event Date & Time
                                </label>
                                <DatePicker
                                    name="date"
                                    selected={formData.date? new Date(formData.date) : null}
                                    onChange={handleDateChange}
                                    minDate={new Date()}
                                    showTimeSelect
                                    dateFormat="MMMM d, yyyy h:mm aa"
                                    placeholderText="Select a date and time"
                                    filterTime={filterTime}
                                    className={`w-full py-3 px-3 bg-base-200 border rounded-lg`}
                                />
                                {errors.date && <p className="text-red-500 text-sm mt-1">{errors.date}</p>}
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-bold mb-2">Image URL</label>
                            <input
                                name="imageUrl"
                                type="text"
                                value={formData.imageUrl}
                                onChange={handleChange}
                                className="w-full px-4 py-3 bg-base-200 border rounded-lg"
                            />
                            {errors.imageUrl && <p className="text-red-500 text-sm mt-1">{errors.imageUrl}</p>}
                        </div>

                        <div>
                            <label className="block text-sm font-bold mb-2">Organizer</label>
                            <input
                                name="organizer"
                                type="text"
                                value={formData.organizer}
                                onChange={handleChange}
                                className="w-full px-4 py-3 bg-base-200 border rounded-lg"
                            />
                            {errors.organizer && <p className="text-red-500 text-sm mt-1">{errors.organizer}</p>}
                        </div>

                        <div>
                            <label className="block text-sm font-bold mb-2">Volunteers Needed</label>
                            <input
                                name="volunteersNeeded"
                                type="number"
                                value={formData.volunteersNeeded}
                                onChange={handleChange}
                                className="w-full px-4 py-3 bg-base-200 border rounded-lg"
                            />
                            {errors.volunteersNeeded && <p className="text-red-500 text-sm mt-1">{errors.volunteersNeeded}</p>}
                        </div>

                        <div>
                            <label className="block text-sm font-bold mb-2">Description</label>
                            <textarea
                                name="description"
                                rows={4}
                                value={formData.description}
                                onChange={handleChange}
                                className="w-full px-4 py-3 bg-base-200 border rounded-lg"
                            />
                            {errors.description && <p className="text-red-500 text-sm mt-1">{errors.description}</p>}
                        </div>
                    </form>
                </div>

                <footer className="p-6 border-t bg-base-100 flex justify-end gap-4 flex-shrink-0">
                    <button
                        onClick={onClose}
                        className="px-6 py-2 rounded-lg font-semibold bg-secondary hover:bg-primary"
                    >
                        Cancel
                    </button>

                    <motion.button
                        onClick={handleSubmit}
                        disabled={isSaving}
                        className="px-6 py-2 rounded-lg font-semibold bg-primary text-primary-content hover:bg-primary/90 disabled:bg-slate-400 disabled:cursor-not-allowed flex items-center gap-2"
                        whileHover={{ scale: isSaving ? 1 : 1.02 }}
                        whileTap={{ scale: isSaving ? 1 : 0.98 }}
                    >
                        {isSaving ? <Loader2 className="w-5 h-5 animate-spin" /> : <Send className="w-5 h-5" />} Save Changes
                    </motion.button>
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
                    <button onClick={() => onConfirm(event._id)} className="px-6 py-2 rounded-lg bg-red-500 text-white hover:bg-red-600 font-semibold">Delete</button>
                </div>
            </motion.div>
        </div>
    );
};

const EventCardGrid = ({ event, onEdit, onDelete }) => {
    const { _id, title, date, description, imageUrl, location, type, volunteersNeeded, volunteersJoined, organizer } = event || {};

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
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.3 }}
            className="bg-base-100 rounded-xl shadow-md overflow-hidden"
        >
            <div className="h-48 relative overflow-hidden">
                <img
                    src={imageUrl}
                    alt={title} className="w-full h-full object-cover"
                />
                <p className={`absolute top-2 right-2 px-3 py-1 text-xs font-semibold rounded-full ${eventTypeColors[type] || 'bg-gray-100 text-gray-800'}`}>{type}</p>
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
                <div className="flex justify-between items-center mt-4">
                    <Link to={`/events/${_id}`} className="text-sm flex items-center gap-2 hover:underline"><Eye className="w-4 h-4" /> View</Link>
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
    const { _id, title, date, description, imageUrl, location, type, volunteersNeeded, volunteersJoined, organizer } = event || {};

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
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.25 }}
            className="flex flex-col md:flex-row items-center md:items-stretch bg-base-100 rounded-xl shadow-md p-4 md:p-6 gap-4 md:gap-6 w-full hover:shadow-lg transition-shadow duration-200"
        >
            {/* Image Section */}
            <div className="relative w-full md:w-48 h-36 md:h-32 flex-shrink-0 rounded-lg overflow-hidden">
                <img
                    src={imageUrl}
                    alt={title}
                    className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                />
                <span className={`absolute top-2 right-2 px-3 py-1 text-xs font-semibold rounded-full ${eventTypeColors[type] || 'bg-gray-100 text-gray-800'}`}>
                    {type}
                </span>
            </div>

            {/* Event Details */}
            <div className="w-full md:flex-1 flex flex-col justify-between min-w-0">
                <div>
                    <h2 className="text-lg md:text-xl font-bold truncate">{title}</h2>
                    <div className="flex items-center text-sm  mt-1">
                        <Calendar className="w-4 h-4 mr-2" />
                        <span>{formattedDate}</span>
                    </div>
                    <div className="flex items-center text-sm  mt-1">
                        <MapPin className="w-4 h-4 mr-2" />
                        <span className="truncate">{location}</span>
                    </div>
                </div>
                <div className="mt-3">
                    <div className="flex justify-between text-xs ">
                        <span>Volunteers</span>
                        <span>{volunteersJoined || 0} / {volunteersNeeded || 20}</span>
                    </div>
                    <div className="w-full bg-base-300 h-2 rounded-full mt-1">
                        <div className="bg-primary h-2 rounded-full transition-all duration-300" style={{ width: `${volunteerPercentage}%` }} />
                    </div>
                </div>
            </div>

            {/* Actions */}
            <div className="flex justify-between md:flex-col w-full md:w-20  gap-2 md:ml-4">
                <Link
                    to={`/events/${_id}`}
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
    const [myEvents, setMyEvents] = useState([]);
    const [selectedEvent, setSelectedEvent] = useState(null);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [isUpdated, setIsUpdated] = useState(false);

    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();
    // const [isUdating, setIsUpdating] = useState(false);

    useEffect(() => {
        axiosSecure.get(`/events/my-events?email=${user.email}`)
            .then(response => {
                // console.log("My Events:", response.data);
                setMyEvents(response.data);
            })
            .catch(error => {
                console.error("Error fetching my events:", error);
            });
    }, [isUpdated]);



    const [layout, setLayout] = useState(localStorage.getItem('eventLayout') || 'grid');

    const handleOpenEdit = event => {
        setSelectedEvent(event);
        setIsEditModalOpen(true);
    };
    const handleOpenDelete = event => {
        setSelectedEvent(event);
        setIsDeleteModalOpen(true);
    };
    // Fix saving by matching _id
    const handleSaveChanges = updatedEvent => {
        setMyEvents(myEvents.map(e => e._id === updatedEvent._id ? updatedEvent : e));
        setIsUpdated(!isUpdated);
        Swal.fire({
            title: 'Event Updated!',
            text: `"${updatedEvent.title}" has been successfully updated.`,
            icon: 'success',
            confirmButtonText: 'OK',        
            confirmButtonColor: '#8b5cf6',
        });
        setIsEditModalOpen(false);
        setSelectedEvent(null);
    };

    // Fix deleting by _id
    const handleDeleteConfirm = eventId => {
        setMyEvents(myEvents.filter(e => e._id !== eventId));
        axiosSecure.delete(`/events/my-events/${eventId}?email=${user.email}`)
            .then(response => {
            if (response.data.success) {
                Swal.fire({
                    title: 'Event Deleted!',
                    text: `"${selectedEvent.title}" has been successfully deleted.`,
                    icon: 'success',
                    confirmButtonText: 'OK',        
                    confirmButtonColor: '#8b5cf6',
                });
            }  else {
                console.error("Delete failed:", response.data.message);
            }
            })
            .catch(error => {
                console.error("Error deleting event:", error);
            });
        setIsDeleteModalOpen(false);
        setSelectedEvent(null);
    };

    return (
        <div className="bg-base-200 min-h-[calc(100vh-250px)] py-16 px-4 md:px-8">
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
                                        key={event._id}
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
                                        key={event._id}
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
