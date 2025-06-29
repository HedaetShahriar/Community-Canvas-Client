import React, { useState } from 'react';
import Swal from 'sweetalert2';
import { MapPin, Calendar, Tag, ArrowLeft, Send, ThumbsUp, UserCircle, Users } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

// --- Helper: Default event data with volunteer info ---
const defaultEvent = {
    id: 2,
    title: "Community Tree Plantation Drive",
    description: "Be a part of the green revolution! We are aiming to plant over 500 saplings in the Ramna Park area to enhance its biodiversity and create a healthier environment for everyone. All tools and saplings will be provided. Just bring your enthusiasm!",
    location: "Ramna Park, Dhaka",
    date: "2025-08-15T08:30:00",
    type: "Plantation",
    organizer: "Green Dhaka Initiative",
    imageUrl: "https://images.unsplash.com/photo-1518895949257-7621c3c78a0f?q=80&w=1600",
    // New data for volunteers
    volunteers: {
        joined: 28,
        needed: 50,
    }
};

// --- The Updated Component ---
const ViewEvent = ({ event = defaultEvent, onBack }) => {

    const [hasJoined, setHasJoined] = useState(false);
    const [imgError, setImgError] = useState(false);

    // Calculate volunteer percentage, handling division by zero
    const volunteerPercentage = event.volunteers?.needed > 0
        ? (event.volunteers.joined / event.volunteers.needed) * 100
        : 0;

    const handleJoin = () => {
        Swal.fire({
            title: 'Confirm Your Spot?',
            text: `You are about to join "${event.title}"`,
            icon: 'question',
            showCancelButton: true,
            confirmButtonText: 'Yes, Count Me In!',
            cancelButtonText: 'Not Now',
            confirmButtonColor: '#4ade80',
            cancelButtonColor: '#f87171',
        }).then((result) => {
            if (result.isConfirmed) {
                Swal.fire({
                    title: 'Joined Successfully!',
                    text: `Awesome! We'll see you at ${event.location}.`,
                    icon: 'success',
                    confirmButtonText: 'Great!',
                    confirmButtonColor: '#8b5cf6'
                });
                setHasJoined(true);
            }
        });
    };

    const formattedDate = new Date(event.date).toLocaleDateString('en-GB', {
        weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit'
    });

    return (
        <div className="bg-base-300 min-h-screen font-sans relative">
            <div className='container mx-auto relative'>
                <button
                onClick={onBack}
                className="absolute top-6 left-6 z-20 flex items-center gap-2 bg-black/40 px-4 py-2 rounded-lg hover:bg-black/60 backdrop-blur-sm transition-colors duration-300"
            >
                <ArrowLeft className="w-5 h-5" /> Back to Events
            </button>
            </div>

            <motion.article initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
                <header className="h-[50vh] relative">
                    <img
                        src={imgError ? 'https://via.placeholder.com/1600x900/cccccc/ffffff?text=Image+Not+Found' : event.imageUrl}
                        alt={event.title}
                        onError={() => setImgError(true)}
                        className="absolute inset-0 w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                </header>

                <div className='container mx-auto'>
                    <div className="max-w-4xl mx-auto px-6 pb-24 -mt-32 md:-mt-24 relative z-10">
                        <motion.div
                            className="bg-base-100 p-6 md:p-8 rounded-2xl shadow-2xl"
                            initial={{ opacity: 0, y: 50 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2, duration: 0.5 }}
                        >
                            <h1 className="text-3xl md:text-5xl font-bold leading-tight">{event.title}</h1>

                            {/* --- Main Details Section (now includes Volunteers) --- */}
                            <div className="mt-6 pt-6 border-t border-slate-200 ">
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-x-6 gap-y-6 font-medium">
                                    <div className="flex items-center gap-3"><Calendar className="w-5 h-5 text-primary" /> {formattedDate}</div>
                                    <div className="flex items-center gap-3"><MapPin className="w-5 h-5 text-primary" /> {event.location}</div>
                                    <div className="flex items-center gap-3"><Tag className="w-5 h-5 text-primary" /> {event.type}</div>
                                </div>

                                {/* --- NEW: Volunteer Progress Section --- */}
                                {event.volunteers && (
                                    <div className="mt-6">
                                        <div className="flex items-center gap-3 mb-2">
                                            <Users className="w-5 h-5 text-primary" />
                                            <span className="font-bold ">
                                                {event.volunteers.joined} / {event.volunteers.needed} Volunteers
                                            </span>
                                        </div>
                                        <div className="w-full bg-base-300 rounded-full h-2.5">
                                            <motion.div
                                                className="bg-primary h-2.5 rounded-full"
                                                style={{ width: `${volunteerPercentage}%` }}
                                                initial={{ width: 0 }}
                                                animate={{ width: `${volunteerPercentage}%` }}
                                                transition={{ duration: 1, delay: 0.5 }}
                                            />
                                        </div>
                                    </div>
                                )}
                            </div>
                        </motion.div>

                        <motion.div className="grid md:grid-cols-3 gap-8 mt-12" initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4, duration: 0.5 }}>
                            <div className="md:col-span-2 bg-base-100 p-6 rounded-xl shadow-lg">
                                <h2 className="text-2xl font-bold  mb-4 border-b pb-2 border-slate-200">About this Event</h2>
                                <p className="text-lg leading-relaxed whitespace-pre-line">{event.description}</p>
                            </div>
                            <div className="md:col-span-1 bg-base-100 p-6 rounded-xl shadow-lg h-fit">
                                <h2 className="text-2xl font-bold mb-4 border-b pb-2 border-slate-200">Organizer</h2>
                                <div className="flex items-center gap-4">
                                    <UserCircle className="w-10 h-10 text-primary" />
                                    <p className="text-lg font-semibold">{event.organizer}</p>
                                </div>
                            </div>
                        </motion.div>
                    </div>

                    <div className="fixed bottom-6 right-6 md:bottom-8 md:right-8 z-20">
                        <AnimatePresence>
                            {!hasJoined ? (
                                <motion.button
                                    onClick={handleJoin}
                                    className="bg-primary text-primary-content font-bold text-lg py-4 px-8 rounded-full shadow-2xl flex items-center gap-3"
                                    initial={{ opacity: 0, y: 50 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, scale: 0.8 }}
                                    whileHover={{ scale: 1.05, boxShadow: '0px 10px 30px rgba(0, 0, 0, 0.3)' }}
                                    whileTap={{ scale: 0.95 }}
                                >
                                    <Send className="w-6 h-6" /> Join Event
                                </motion.button>
                            ) : (
                                <motion.div
                                    className="bg-primary text-primary-content font-bold text-lg py-4 px-8 rounded-full shadow-2xl flex items-center gap-3"
                                    initial={{ opacity: 0, scale: 0.8 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                >
                                    <ThumbsUp className="w-6 h-6" /> You're In!
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                </div>
            </motion.article>
        </div>
    );
};

export default ViewEvent;