import React, { useState } from 'react';
import Swal from 'sweetalert2';
import { MapPin, Calendar, Tag, ArrowLeft, Send, ThumbsUp } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
const ViewEvent = () => {
    const event = {
        id: 1,
        title: "Dhaka University Campus Cleanup",
        description: "Join us for a massive cleanup drive across the Dhaka University campus...",
        location: "Dhaka University, Dhaka",
        date: "2025-06-21T09:00:00",
        type: "Cleanup",
        imageUrl: "https://images.unsplash.com/photo-1627891185434-41dea778378c?q=80&w=1600"
    };

    const [hasJoined, setHasJoined] = useState(false);
    const [imgError, setImgError] = useState(false);

    const handleJoin = () => {
        Swal.fire({
            title: 'Joined Successfully!',
            text: `You're in for "${event.title}"`,
            icon: 'success',
            confirmButtonText: 'Awesome!',
            confirmButtonColor: '#8b5cf6'
        }).then(() => setHasJoined(true));
    };

    const formattedDate = new Date(event.date).toLocaleDateString('en-GB', {
        weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'
    });

    return (
        <div className="bg-white dark:bg-slate-900 min-h-screen font-sans relative">
            {/* Back Button */}
            <a href="/upcoming-events" className="absolute top-8 left-8 z-20 flex items-center gap-2 bg-black/30 text-white px-4 py-2 rounded-lg hover:bg-black/50 backdrop-blur-sm">
                <ArrowLeft className="w-5 h-5" /> Back
            </a>

            <motion.article initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
                {/* Hero Image */}
                <header className="h-[50vh] relative">
                    <img
                        src={imgError ? '/fallback.jpg' : event.imageUrl}
                        alt={event.title}
                        onError={() => setImgError(true)}
                        className="absolute inset-0 w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black/20" />
                </header>

                {/* Main Content */}
                <div className="max-w-4xl mx-auto px-6 pb-24 -mt-24 relative z-10">
                    <motion.div
                        className="bg-white dark:bg-slate-800 p-8 rounded-2xl shadow-xl"
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                    >
                        <h1 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white">{event.title}</h1>
                        <div className="flex flex-wrap gap-x-8 gap-y-4 mt-6 pt-6 border-t border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 font-medium">
                            <div className="flex items-center gap-3"><Calendar className="w-5 h-5 text-primary" /> {formattedDate}</div>
                            <div className="flex items-center gap-3"><MapPin className="w-5 h-5 text-primary" /> {event.location}</div>
                            <div className="flex items-center gap-3"><Tag className="w-5 h-5 text-primary" /> {event.type}</div>
                        </div>
                    </motion.div>

                    <motion.div className="mt-12" initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
                        <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-200 mb-4 border-b pb-2 border-slate-200 dark:border-slate-700">About this Event</h2>
                        <p className="text-lg leading-relaxed text-slate-600 dark:text-slate-300">{event.description}</p>
                    </motion.div>
                </div>

                {/* Floating Button */}
                <div className="fixed bottom-8 right-8 z-20">
                    <AnimatePresence>
                        {!hasJoined ? (
                            <motion.button
                                onClick={handleJoin}
                                className="bg-primary text-white font-bold text-lg py-4 px-8 rounded-full shadow-2xl flex items-center gap-3"
                                initial={{ opacity: 0, y: 50 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: 50 }}
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                <Send className="w-6 h-6" /> Join this Event
                            </motion.button>
                        ) : (
                            <motion.div
                                className="bg-green-500 text-white font-bold text-lg py-4 px-8 rounded-full shadow-2xl flex items-center gap-3"
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                            >
                                <ThumbsUp className="w-6 h-6" /> You've Joined!
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </motion.article>
        </div>
    );
};

export default ViewEvent;