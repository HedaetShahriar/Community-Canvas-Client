// components/EventForm.jsx
import React from 'react';
import { FormInput, DateInput, EventTypeSelect } from './FormElements';
import {
    PencilIcon, AlignLeft, MapPin, ImageIcon,
    UserCircle, Users
} from 'lucide-react';

const EventForm = ({ formData, errors, isLoading, handleChange, handleDateChange }) => (
    <>
        <FormInput
            id="title"
            label="Event Title"
            icon={PencilIcon}
            value={formData.title}
            onChange={handleChange}
            placeholder="e.g., Dhaka Cleanup"
            error={errors.title}
            disabled={isLoading}
        />
        <FormInput
            as="textarea"
            id="description"
            label="Description"
            icon={AlignLeft}
            value={formData.description}
            onChange={handleChange}
            placeholder="Describe your event..."
            error={errors.description}
            disabled={isLoading}
        />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <EventTypeSelect
                value={formData.type}
                onChange={handleChange}
                error={errors.type}
                disabled={isLoading}
            />
            <DateInput
                value={formData.date}
                onChange={handleDateChange}
                error={errors.date}
                disabled={isLoading}
            />
        </div>
        <FormInput
            id="location"
            label="Location"
            icon={MapPin}
            value={formData.location}
            onChange={handleChange}
            placeholder="e.g., Ramna Park"
            error={errors.location}
            disabled={isLoading}
        />
        <FormInput
            id="imageUrl"
            label="Image URL"
            icon={ImageIcon}
            value={formData.imageUrl}
            onChange={handleChange}
            placeholder="https://..."
            error={errors.imageUrl}
            disabled={isLoading}
        />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <FormInput
                id="organizer"
                label="Organizer Name"
                icon={UserCircle}
                value={formData.organizer}
                onChange={handleChange}
                placeholder="e.g., Youth Volunteers"
                error={errors.organizer}
                disabled={isLoading}
            />
            <FormInput
                type="number"
                id="volunteersNeeded"
                label="Volunteers Needed"
                icon={Users}
                value={formData.volunteersNeeded}
                onChange={handleChange}
                placeholder="e.g., 30"
                error={errors.volunteersNeeded}
                disabled={isLoading}
            />
        </div>
    </>
);

export default EventForm;
