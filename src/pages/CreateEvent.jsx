import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import Swal from 'sweetalert2';
import 'react-datepicker/dist/react-datepicker.css';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Type as PencilIcon,
    Pilcrow,
    Calendar,
    MapPin,
    Image as ImageIcon,
    Tag,
    Send,
    Loader2,
    AlertTriangle,
} from 'lucide-react';

const FormInput = ({ id, label, icon: Icon,placeholder, type = 'text', value, onChange, error, as = 'input', children, disabled }) => {
    const InputComponent = as;
    return (
        <div className="flex flex-col gap-1">
            <label htmlFor={id} className="font-semibold flex items-center gap-2">
                <Icon className={`w-5 h-5 ${error ? 'text-red-500' : 'text-gray-400'}`} />
                {label}
            </label>
            <InputComponent
                id={id}
                name={id}
                type={type}
                value={value}
                placeholder={placeholder}
                onChange={onChange}
                disabled={disabled}
                className={`w-full pr-4 py-3 pl-3 bg-base-100 border-2 rounded-lg focus:outline-none transition-colors ${error
                        ? 'border-red-500 focus:ring-1 focus:ring-red-500'
                        : 'border-transparent focus:ring-1 focus:ring-green-600 focus:border-green-600'
                    }`}
                rows={as === 'textarea' ? 4 : undefined}
            >
                {children}
            </InputComponent>
            <AnimatePresence>
                {error && (
                    <motion.p
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="text-sm text-red-600 flex items-center gap-1"
                    >
                        <AlertTriangle className="w-4 h-4" /> {error}
                    </motion.p>
                )}
            </AnimatePresence>
        </div>
    );
};

const CreateEvent = () => {
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        eventType: '',
        thumbnailUrl: '',
        location: '',
        eventDate: null,
    });
    const [errors, setErrors] = useState({});
    const [isLoading, setIsLoading] = useState(false);

    const handleChange = e => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleDateChange = date => {
        setFormData(prev => ({ ...prev, eventDate: date }));
    };

    const validateForm = () => {
        const newErrors = {};
        if (!formData.title.trim()) newErrors.title = 'Event title is required.';
        if (!formData.description.trim()) newErrors.description = 'A description is required.';
        if (!formData.location.trim()) newErrors.location = 'Location is required.';
        if (!formData.thumbnailUrl.trim()) newErrors.thumbnailUrl = 'Image URL is required.';
        if (!formData.eventType) newErrors.eventType = 'Please select an event type.';
        if (!formData.eventDate) newErrors.eventDate = 'Please select a date.';
        
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = e => {
        e.preventDefault();
        if (!validateForm()) return;
        setIsLoading(true);
        setTimeout(() => {
            setIsLoading(false);
            Swal.fire({
                title: 'Event Created!',
                text: 'Your event has been successfully submitted.',
                icon: 'success',
                confirmButtonText: 'Okay',
                confirmButtonColor: '#22c55e', // green button like signup
            });
        }, 2000);
    };

    return (
        <div className="bg-base-100 min-h-screen p-4 sm:p-8 flex items-center justify-center font-sans">
            <motion.div
                className="w-full max-w-2xl"
                initial={{ opacity: 0, y: -50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, ease: 'easeOut' }}
            >
                <div className="bg-base-200 p-8 rounded-xl shadow-lg border border-gray-300">
                    <header className="mb-8 text-center">
                        <h1 className="text-3xl font-extrabold">Create an Event</h1>
                        <p className=" mt-2">Organize something meaningful for your community.</p>
                    </header>

                    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                        <FormInput
                            id="title"
                            label="Event Title"
                            icon={PencilIcon}
                            value={formData.title}
                            onChange={handleChange}
                            placeholder="Enter the title of your event"
                            error={errors.title}
                            disabled={isLoading}
                        />
                        <FormInput
                            as="textarea"
                            id="description"
                            label="Description"
                            icon={Pilcrow}
                            value={formData.description}
                            onChange={handleChange}
                            placeholder="Describe your event in detail"
                            error={errors.description}
                            disabled={isLoading}
                        />

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <FormInput
                                as="select"
                                id="eventType"
                                label="Event Type"
                                icon={Tag}
                                value={formData.eventType}
                                onChange={handleChange}
                                error={errors.eventType}
                                disabled={isLoading}
                            >
                                <option value="" disabled>Select event type</option>
                                <option>Cleanup</option>
                                <option>Plantation</option>
                                <option>Donation</option>
                                <option>Education</option>
                            </FormInput>

                            <div className="flex flex-col">
                                <label className="font-semibold flex items-center gap-2 mb-1">
                                    <Calendar className={`h-5 w-5 ${errors.eventDate ? 'text-red-500' : 'text-gray-400'}`} />
                                    Event Date
                                </label>
                                <DatePicker
                                    selected={formData.eventDate}
                                    onChange={handleDateChange}
                                    minDate={new Date()}
                                    placeholderText="Select a date"
                                    disabled={isLoading}
                                    className={`w-full py-3 pl-3 pr-4 bg-base-100 border-2 rounded-lg focus:outline-none focus:bg-base-100 transition-colors ${errors.eventDate ? 'border-red-500' : 'border-transparent focus:border-green-600'
                                        }`}
                                />
                                <AnimatePresence>
                                    {errors.eventDate && (
                                        <motion.p
                                            initial={{ opacity: 0, y: -10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, y: -10 }}
                                            className="text-sm text-red-600 flex items-center gap-1 mt-1"
                                        >
                                            <AlertTriangle className="w-4 h-4" /> {errors.eventDate}
                                        </motion.p>
                                    )}
                                </AnimatePresence>
                            </div>
                        </div>

                        <FormInput
                            id="location"
                            label="Location"
                            icon={MapPin}
                            value={formData.location}
                            onChange={handleChange}
                            placeholder="Enter the event location"
                            error={errors.location}
                            disabled={isLoading}
                        />
                        <FormInput
                            id="thumbnailUrl"
                            label="Image URL"
                            icon={ImageIcon}
                            value={formData.thumbnailUrl}
                            onChange={handleChange}
                            placeholder="Enter a URL for the event image"
                            error={errors.thumbnailUrl}
                            disabled={isLoading}
                        />

                        <motion.button
                            type="submit"
                            disabled={isLoading}
                            className="w-full mt-4 flex items-center justify-center gap-2 bg-primary hover:bg-green-700 disabled:bg-gray-400 text-base-100 font-bold text-lg py-3 px-8 rounded-lg shadow-lg transition-all disabled:cursor-not-allowed"
                            whileHover={{ scale: isLoading ? 1 : 1.02 }}
                            whileTap={{ scale: isLoading ? 1 : 0.98 }}
                        >
                            {isLoading ? (
                                <>
                                    <Loader2 className="w-6 h-6 animate-spin" />
                                    Submitting...
                                </>
                            ) : (
                                <>
                                    <Send className="w-5 h-5" />
                                    Create Event
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
