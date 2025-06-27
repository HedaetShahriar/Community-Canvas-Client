import React, { useState, useEffect } from 'react';
import { Edit, Trash2, PlusCircle, X, MapPin, Calendar, Eye, List, LayoutGrid } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

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
        className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl flex flex-col"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 50 }}
      >
        <header className="flex-shrink-0 p-6 border-b border-slate-200 flex justify-between items-center">
          <h2 className="text-xl font-bold text-slate-800">Edit Event</h2>
          <button onClick={onClose} className="p-2 rounded-full hover:bg-slate-100">
            <X className="w-6 h-6 text-slate-600" />
          </button>
        </header>
        <form onSubmit={handleSubmit} className="p-8 flex-grow overflow-y-auto space-y-6">
          {/* Title */}
          <div>
            <label htmlFor="title" className="block text-sm font-bold text-slate-700 mb-2">Event Title</label>
            <input
              id="title"
              name="title"
              type="text"
              value={formData.title}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 bg-slate-100 border-2 border-transparent rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:bg-white transition"
              placeholder="Enter event title"
            />
          </div>

          {/* Location */}
          <div>
            <label htmlFor="location" className="block text-sm font-bold text-slate-700 mb-2">Location</label>
            <input
              id="location"
              name="location"
              type="text"
              value={formData.location}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 bg-slate-100 border-2 border-transparent rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:bg-white transition"
              placeholder="Enter location"
            />
          </div>

          {/* Description */}
          <div>
            <label htmlFor="description" className="block text-sm font-bold text-slate-700 mb-2">Description</label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              required
              rows={4}
              className="w-full px-4 py-3 bg-slate-100 border-2 border-transparent rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:bg-white transition"
              placeholder="Enter description"
            />
          </div>
        </form>
        <footer className="flex-shrink-0 p-6 border-t border-slate-200 flex justify-end gap-4">
          <button onClick={onClose} className="px-6 py-2 rounded-lg font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 transition-colors">Cancel</button>
          <button onClick={handleSubmit} className="px-6 py-2 rounded-lg font-semibold text-white bg-primary hover:bg-opacity-90 transition-colors">Save Changes</button>
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
        className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-8 text-center"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
      >
        <h2 className="text-2xl font-bold text-slate-900">Are you sure?</h2>
        <p className="text-slate-600 mt-2">
          Do you really want to delete the event <span className="font-semibold">"{event.title}"</span>? This action cannot be undone.
        </p>
        <div className="flex justify-center gap-4 mt-8">
          <button onClick={onClose} className="px-8 py-2 rounded-lg font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 transition-colors">Cancel</button>
          <button onClick={() => onConfirm(event.id)} className="px-8 py-2 rounded-lg font-semibold text-white bg-red-500 hover:bg-red-600 transition-colors">Delete</button>
        </div>
      </motion.div>
    </div>
  );
};

const EventCard = ({ event, onEdit, onDelete }) => (
  <motion.div
    layout
    initial={{ opacity: 0, scale: 0.9 }}
    animate={{ opacity: 1, scale: 1 }}
    exit={{ opacity: 0, scale: 0.9 }}
    transition={{ duration: 0.3 }}
    className="bg-white rounded-2xl shadow-sm overflow-hidden flex flex-col group transition-all hover:shadow-xl hover:-translate-y-1"
  >
    <div className="p-6 flex-grow">
      <div className="flex justify-between items-start mb-4">
        <span
          className={`inline-block px-3 py-1 text-xs font-bold uppercase tracking-wider rounded-full ${
            event.status === 'Upcoming' ? 'bg-blue-100 text-blue-800' : 'bg-gray-200 text-gray-700'
          }`}
        >
          {event.status}
        </span>
      </div>
      <h3 className="text-xl font-bold text-slate-800 mb-2">{event.title}</h3>
      <div className="space-y-2 text-sm text-slate-500">
        <p className="flex items-center gap-2"><MapPin className="w-4 h-4 text-slate-400" /> {event.location}</p>
        <p className="flex items-center gap-2"><Calendar className="w-4 h-4 text-slate-400" /> {new Date(event.date).toLocaleDateString('en-GB', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
      </div>
    </div>
    <footer className="bg-slate-50 p-4 border-t border-slate-100 flex justify-between items-center">
      <a href="#" className="inline-flex items-center gap-2 text-sm font-semibold text-primary hover:underline">
        <Eye className="w-4 h-4" /> View As
      </a>
      <div className="flex gap-2">
        <button onClick={() => onEdit(event)} className="p-2 text-slate-500 hover:bg-slate-200 hover:text-slate-800 rounded-md transition-colors">
          <Edit className="w-5 h-5" />
        </button>
        <button onClick={() => onDelete(event)} className="p-2 text-red-500 hover:bg-red-100 rounded-md transition-colors">
          <Trash2 className="w-5 h-5" />
        </button>
      </div>
    </footer>
  </motion.div>
);

const EventRow = ({ event, onEdit, onDelete }) => (
  <motion.div
    layout
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    transition={{ duration: 0.3 }}
    className="grid grid-cols-1 md:grid-cols-8 gap-4 items-center p-4 bg-white rounded-lg shadow-sm hover:bg-slate-50"
  >
    <div className="md:col-span-3">
      <p className="font-bold text-lg text-slate-800">{event.title}</p>
      <p className="text-sm text-slate-500">{event.location}</p>
    </div>
    <div className="md:col-span-2">
      <p className="font-semibold text-slate-700">{new Date(event.date).toLocaleDateString('en-GB', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
    </div>
    <div className="md:col-span-1">
      <span
        className={`inline-block px-3 py-1 text-xs font-bold uppercase tracking-wider rounded-full ${
          event.status === 'Upcoming' ? 'bg-blue-100 text-blue-800' : 'bg-gray-200 text-gray-700'
        }`}
      >
        {event.status}
      </span>
    </div>
    <div className="md:col-span-2 flex justify-start md:justify-end gap-2">
      <a href="#" className="p-2 text-sm font-semibold text-primary hover:underline flex items-center gap-1">
        <Eye className="w-4 h-4" /> View
      </a>
      <button onClick={() => onEdit(event)} className="p-2 text-slate-500 hover:bg-slate-200 hover:text-slate-800 rounded-md transition-colors">
        <Edit className="w-5 h-5" />
      </button>
      <button onClick={() => onDelete(event)} className="p-2 text-red-500 hover:bg-red-100 rounded-md transition-colors">
        <Trash2 className="w-5 h-5" />
      </button>
    </div>
  </motion.div>
);

const ManageEvents= ()=> {
  const [myEvents, setMyEvents] = useState([
    { id: 1, title: "Dhaka University Campus Cleanup", location: "Dhaka University, Dhaka", date: "2025-06-21", status: "Upcoming", description: "A cleanup drive..." },
    { id: 2, title: "Sylhet Tea Gardens Reforestation", location: "Sreemangal, Sylhet", date: "2025-08-02", status: "Upcoming", description: "Planting trees..." },
    { id: 3, title: "Winter Clothing Drive 2024", location: "Banani, Dhaka", date: "2024-12-15", status: "Completed", description: "Distributing clothes..." }
  ]);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [layout, setLayout] = useState('grid');

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
    <div className="bg-base-200 min-h-screen antialiased" style={{ fontFamily: 'Inter, sans-serif' }}>
      <div className="container mx-auto px-6 py-16 md:py-24">
        <header className="flex flex-col sm:flex-row justify-between sm:items-center gap-4 mb-8">
          <div>
            <h1 className="text-4xl font-extrabold text-slate-900">Manage My Events</h1>
            <p className="text-lg text-slate-600 mt-1">View, edit, or delete the events you've created.</p>
          </div>
          <a href="#" className="flex-shrink-0 inline-flex items-center justify-center gap-2 bg-primary text-primary-content font-bold py-3 px-6 rounded-lg shadow-lg hover:bg-opacity-90 transition-all">
            <PlusCircle className="w-6 h-6" /> Create New Event
          </a>
        </header>

        <div className="flex justify-end mb-8">
          <div className="bg-slate-200 p-1 rounded-lg flex items-center gap-1">
            <button onClick={() => setLayout('grid')} className={`px-3 py-1 rounded-md text-sm font-semibold flex items-center gap-2 ${layout === 'grid' ? 'bg-white shadow' : 'text-slate-600'}`}>
              <LayoutGrid className="w-4 h-4" /> Grid
            </button>
            <button onClick={() => setLayout('list')} className={`px-3 py-1 rounded-md text-sm font-semibold flex items-center gap-2 ${layout === 'list' ? 'bg-white shadow' : 'text-slate-600'}`}>
              <List className="w-4 h-4" /> List
            </button>
          </div>
        </div>

        <main>
          <AnimatePresence mode="wait">
            {myEvents.length > 0 ? (
              layout === 'grid' ? (
                <motion.div key="grid" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {myEvents.map(event => <EventCard key={event.id} event={event} onEdit={handleOpenEdit} onDelete={handleOpenDelete} />)}
                </motion.div>
              ) : (
                <motion.div key="list" className="space-y-4">
                  {myEvents.map(event => <EventRow key={event.id} event={event} onEdit={handleOpenEdit} onDelete={handleOpenDelete} />)}
                </motion.div>
              )
            ) : (
              <div className="text-center py-24 bg-white rounded-2xl shadow-sm">
                <h3 className="text-2xl font-bold text-slate-800">You haven't created any events yet.</h3>
                <p className="text-slate-600 mt-2 mb-6">Ready to make an impact? List your first event now!</p>
                <a href="#" className="inline-flex items-center justify-center gap-2 bg-primary text-primary-content font-bold py-3 px-6 rounded-lg shadow-lg hover:bg-opacity-90 transition-all">
                  <PlusCircle className="w-6 h-6" /> Create Your First Event
                </a>
              </div>
            )}
          </AnimatePresence>
        </main>
      </div>

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
  );
}
export default ManageEvents;
