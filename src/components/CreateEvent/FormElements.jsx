// components/FormElements.jsx
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { AlertTriangle, Calendar, Tag } from 'lucide-react';

export const FormInput = ({
    id, label, icon: Icon, placeholder, type = 'text',
    value, onChange, error, as = 'input', children, disabled
}) => {
    const InputComponent = as;
    return (
        <div className="flex flex-col gap-1">
            <label htmlFor={id} className="font-semibold flex items-center gap-2">
                <Icon className={`w-5 h-5 ${error ? 'text-red-500' : ''}`} />
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
                className={`w-full pr-4 py-3 pl-3 bg-base-200 border-2 rounded-lg focus:outline-none transition-colors ${
                    error
                        ? 'border-red-500 focus:ring-1 focus:ring-red-500'
                        : 'border-slate-300 focus:ring-1 focus:ring-primary focus:border-primary'
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
                        className="text-sm text-red-600 flex items-center gap-1 mt-1"
                    >
                        <AlertTriangle className="w-4 h-4" /> {error}
                    </motion.p>
                )}
            </AnimatePresence>
        </div>
    );
};

export const DateInput = ({ value, onChange, error, disabled }) => {
    // Restrict selectable times between 8:00 AM and 11:59 PM
    const filterTime = (date) => {
        const hour = date.getHours();
        return hour >= 8 && hour <= 23;
    };

    return (
        <div className="flex flex-col gap-1">
            <label className="font-semibold flex items-center gap-2">
                <Calendar className={`h-5 w-5 ${error ? 'text-red-500' : ''}`} />
                Event Date & Time
            </label>
            <DatePicker
                selected={value}
                onChange={onChange}
                minDate={new Date()}
                showTimeSelect
                dateFormat="MMMM d, yyyy h:mm aa"
                placeholderText="Select a date and time"
                disabled={disabled}
                filterTime={filterTime}
                className={`w-full pr-4 py-3 pl-3 bg-base-200 border-2 rounded-lg focus:outline-none transition-colors ${
                    error
                        ? 'border-red-500 focus:ring-1 focus:ring-red-500'
                        : 'border-slate-300 focus:ring-1 focus:ring-primary focus:border-primary'
                }`}
            />
            <AnimatePresence>
                {error && (
                    <motion.p
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="text-sm text-red-600 flex items-center gap-1 mt-1"
                    >
                        <AlertTriangle className="w-4 h-4" /> {error}
                    </motion.p>
                )}
            </AnimatePresence>
        </div>
    );
};

export const EventTypeSelect = ({ value, onChange, error, disabled }) => (
    <FormInput
        as="select"
        id="type"
        label="Event Type"
        icon={Tag}
        value={value}
        onChange={onChange}
        error={error}
        disabled={disabled}
    >
        <option value="" disabled>Select event type</option>
        <option value="Cleanup">Cleanup</option>
        <option value="Plantation">Plantation</option>
        <option value="Donation">Donation</option>
        <option value="Education">Education</option>
        <option value="Social Work">Social Work</option>
    </FormInput>
);
