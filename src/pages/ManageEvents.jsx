import React, { useState } from 'react';
import { PlusCircle, List, LayoutGrid, Edit, Trash2, MapPin, Calendar, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

// Simple Event Card (Grid or List style) with Edit/Delete buttons
const EventCard = ({ event, onEdit, onDelete }) => (
  <motion.div 
    layout
    initial={{ opacity: 0, scale: 0.95 }} 
    animate={{ opacity: 1, scale: 1 }} 
    exit={{ opacity: 0, scale: 0.95 }} 
    transition={{ duration: 0.2 }}
    className="bg-white p-4 rounded-lg shadow-sm flex flex-col"
  >
    <div className="flex justify-between mb-2">
      <h3 className="font-bold text-lg">{event.title}</h3>
      <span className="text-xs px-2 py-1 rounded-full bg-slate-200">{event.status}</span>
    </div>
    <p className="text-sm text-slate-500 flex items-center gap-1"><MapPin size={14} /> {event.location}</p>
    <p className="text-sm text-slate-500 flex items-center gap-1"><Calendar size={14} /> {event.date}</p>
    <div className="flex justify-end gap-2 mt-4">
      <button onClick={onEdit} className="text-slate-600 hover:text-black"><Edit size={18} /></button>
      <button onClick={onDelete} className="text-red-500 hover:text-red-700"><Trash2 size={18} /></button>
    </div>
  </motion.div>
);

// Simple Edit Modal with motion animation
const EditModal = ({ event, onClose, onSave }) => {
  const [title, setTitle] = useState(event.title);
  const [location, setLocation] = useState(event.location);

  const handleSubmit = e => {
    e.preventDefault();
    onSave({ ...event, title, location });
  };

  return (
    <motion.div 
      className="fixed inset-0 bg-black/40 flex items-center justify-center z-50"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div 
        className="bg-white rounded-lg p-6 w-full max-w-md"
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 50, opacity: 0 }}
      >
        <button onClick={onClose} className="mb-4 float-right text-gray-600 hover:text-gray-900"><X size={20} /></button>
        <h2 className="text-xl font-bold mb-4">Edit Event</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block font-semibold mb-1">Title</label>
            <input value={title} onChange={e => setTitle(e.target.value)} className="w-full border rounded px-3 py-2" />
          </div>
          <div>
            <label className="block font-semibold mb-1">Location</label>
            <input value={location} onChange={e => setLocation(e.target.value)} className="w-full border rounded px-3 py-2" />
          </div>
          <button type="submit" className="bg-primary text-white px-4 py-2 rounded hover:bg-primary/90">Save</button>
        </form>
      </motion.div>
    </motion.div>
  );
};

// Simple Delete Confirmation Modal
const DeleteModal = ({ event, onClose, onDelete }) => (
  <motion.div 
    className="fixed inset-0 bg-black/40 flex items-center justify-center z-50"
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
  >
    <motion.div 
      className="bg-white rounded-lg p-6 w-full max-w-sm text-center"
      initial={{ scale: 0.9, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      exit={{ scale: 0.9, opacity: 0 }}
    >
      <h2 className="text-xl font-bold mb-4">Delete "{event.title}"?</h2>
      <div className="flex justify-center gap-4">
        <button onClick={onClose} className="px-4 py-2 rounded bg-slate-200 hover:bg-slate-300">Cancel</button>
        <button onClick={() => onDelete(event.id)} className="px-4 py-2 rounded bg-red-500 text-white hover:bg-red-600">Delete</button>
      </div>
    </motion.div>
  </motion.div>
);

const ManageEvents= ()=> {
  const [events, setEvents] = useState([
    { id: 1, title: "Cleanup Drive", location: "Dhaka", date: "2025-07-01", status: "Upcoming" },
    { id: 2, title: "Tree Planting", location: "Sylhet", date: "2024-12-20", status: "Completed" }
  ]);
  const [layout, setLayout] = useState('grid');
  const [editingEvent, setEditingEvent] = useState(null);
  const [deletingEvent, setDeletingEvent] = useState(null);

  const saveEvent = updated => {
    setEvents(events.map(e => e.id === updated.id ? updated : e));
    setEditingEvent(null);
  };

  const deleteEvent = id => {
    setEvents(events.filter(e => e.id !== id));
    setDeletingEvent(null);
  };

  return (
    <div className="min-h-screen bg-base-200 px-6 py-10 font-sans">
      <div className="flex justify-between mb-6">
        <h1 className="text-3xl font-bold">Manage Events</h1>
        <button className="flex items-center gap-2 bg-primary text-white px-4 py-2 rounded-md">
          <PlusCircle size={18} /> Create
        </button>
      </div>

      <div className="flex justify-end mb-4">
        <div className="bg-slate-200 p-1 rounded-md flex gap-1">
          <button
            onClick={() => setLayout('grid')}
            className={`px-3 py-1 rounded ${layout === 'grid' ? 'bg-white shadow' : ''}`}
          >
            <LayoutGrid size={16} />
          </button>
          <button
            onClick={() => setLayout('list')}
            className={`px-3 py-1 rounded ${layout === 'list' ? 'bg-white shadow' : ''}`}
          >
            <List size={16} />
          </button>
        </div>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={layout}
          className={layout === 'grid' ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4' : 'space-y-4'}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          {events.length === 0 && <p>No events found.</p>}
          {events.map(event => (
            <EventCard
              key={event.id}
              event={event}
              onEdit={() => setEditingEvent(event)}
              onDelete={() => setDeletingEvent(event)}
            />
          ))}
        </motion.div>
      </AnimatePresence>

      <AnimatePresence>
        {editingEvent && (
          <EditModal
            event={editingEvent}
            onClose={() => setEditingEvent(null)}
            onSave={saveEvent}
          />
        )}
        {deletingEvent && (
          <DeleteModal
            event={deletingEvent}
            onClose={() => setDeletingEvent(null)}
            onDelete={deleteEvent}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
export default ManageEvents;
