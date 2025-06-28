// pages/CreateEvent.jsx
import React, { useState } from 'react';
import Swal from 'sweetalert2';
import { motion } from 'framer-motion';
import { Send, Loader2 } from 'lucide-react';
import EventForm from '../components/CreateEvent/EventForm';

const CreateEvent = () => {
    const [formData, setFormData] = useState({
        title: '', description: '', type: '', imageUrl: '',
        location: '', date: null, organizer: '', volunteersNeeded: '',
    });
    const [errors, setErrors] = useState({});
    const [isClicked, setIsClicked] = useState(false);

    const handleChange = e => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleDateChange = date => {
        setFormData(prev => ({ ...prev, date }));
    };

    const validateForm = () => {
        const newErrors = {};
        if (!formData.title.trim()) newErrors.title = 'Event title is required.';
        if (!formData.description.trim()) newErrors.description = 'A description is required.';
        if (!formData.location.trim()) newErrors.location = 'Location is required.';
        if (!formData.imageUrl.trim()) newErrors.imageUrl = 'Image URL is required.';
        if (!formData.type) newErrors.type = 'Please select an event type.';
        if (!formData.date) newErrors.date = 'Please select a date and time.';
        if (!formData.organizer.trim()) newErrors.organizer = 'Organizer name is required.';
        if (!formData.volunteersNeeded || isNaN(formData.volunteersNeeded) || Number(formData.volunteersNeeded) <= 0)
            newErrors.volunteersNeeded = 'Please enter a valid number greater than 0.';
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = e => {
        e.preventDefault();
        if (!validateForm()) return;
        setIsClicked(true);

        setTimeout(() => {
            setIsClicked(false);
            Swal.fire({
                title: 'Event Created!',
                text: `"${formData.title}" has been successfully submitted.`,
                icon: 'success',
                confirmButtonText: 'Awesome!',
                confirmButtonColor: '#8b5cf6',
            });
        }, 2000);
    };

    return (
        <div className="bg-base-200 min-h-screen p-4 sm:p-8 flex items-center justify-center">
            <motion.div
                className="w-full max-w-2xl"
                initial={{ opacity: 0, y: -50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, ease: 'easeOut' }}
            >
                <div className="bg-base-100 p-8 rounded-2xl shadow-lg">
                    <header className="mb-8 text-center">
                        <h1 className="text-3xl font-extrabold">Create an Event</h1>
                        <p className="mt-2">Organize something meaningful for your community.</p>
                    </header>

                    <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                        <EventForm
                            formData={formData}
                            errors={errors}
                            isClicked={isClicked}
                            handleChange={handleChange}
                            handleDateChange={handleDateChange}
                        />

                        <motion.button
                            type="submit"
                            disabled={isClicked}
                            className="w-full mt-4 flex items-center justify-center gap-3 bg-primary text-primary-content hover:bg-primary/90 disabled:bg-slate-400 font-bold text-lg py-3 px-8 rounded-lg shadow-lg transition-all duration-300 disabled:cursor-not-allowed"
                            whileHover={{ scale: isClicked ? 1 : 1.02 }}
                            whileTap={{ scale: isClicked ? 1 : 0.98 }}
                        >
                            {isClicked ? (
                                <>
                                    <Loader2 className="w-6 h-6 animate-spin" /> Submitting...
                                </>
                            ) : (
                                <>
                                    <Send className="w-5 h-5" /> Create Event
                                </>
                            )}
                        </motion.button>
                    </form>
                </div>
            </motion.div>
        </div>
    );
};

export default CreateEvent;
