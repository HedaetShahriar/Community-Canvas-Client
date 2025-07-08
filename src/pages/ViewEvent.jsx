import { use, useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import { MapPin, Calendar, Tag, Send, ThumbsUp, UserCircle, Users } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useParams } from 'react-router';
import axios from 'axios';
import AuthContext from '../contexts/AuthContext';
import Spinner from '../components/Spinner';


const ViewEvent = () => {
    const { id } = useParams();
    const { user } = use(AuthContext);
    const [event, setEvent] = useState();
    const [hasJoined, setHasJoined] = useState(false);
    const [imgError, setImgError] = useState(false);

    useEffect(() => {
        axios.get(`${import.meta.env.VITE_API_URL}/events/${id}`)
            .then(response => {
                setEvent(response.data);
                const alreadyJoined = response.data.joinedUsers.includes(user.email);
                setHasJoined(alreadyJoined);
            })
            .catch(error => {
                console.error('Error fetching event:', error);
            });
    }, [hasJoined, id, user.email]);
    
    if (!event) {
        return (<Spinner />);
    }

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

    const handleJoin = () => {
        Swal.fire({
            title: 'Confirm Your Spot?',
            text: `You are about to join "${title}"`,
            icon: 'question',
            showCancelButton: true,
            confirmButtonText: 'Yes, Count Me In!',
            cancelButtonText: 'Not Now',
            confirmButtonColor: '#4ade80',
            cancelButtonColor: '#f87171',
        }).then((result) => {
            if (result.isConfirmed) {
                axios.patch(`${import.meta.env.VITE_API_URL}/events/${_id}/join`, {
                    email: user.email,
                }).then((response) => {
                    if (response.data.success) {
                        Swal.fire({
                            title: 'Joined Successfully!',
                            text: `You have successfully joined the event "${title}".`,
                            icon: 'success',
                            confirmButtonText: 'Great!',
                            confirmButtonColor: '#8b5cf6'
                        });
                        setHasJoined(true);
                    } else {
                        Swal.fire({
                            title: 'Already Joined',
                            text: 'You have already joined this event.',
                            icon: 'info',
                            confirmButtonText: 'OK',
                            confirmButtonColor: '#8b5cf6'
                        });
                    }
                }).catch((error) => {
                    console.error('Error joining event:', error);
                    Swal.fire({
                        title: 'Error',
                        text: 'There was an issue joining the event. Please try again later.',
                        icon: 'error',
                        confirmButtonText: 'OK',
                        confirmButtonColor: '#f87171'
                    });
                });
            }
        });
    };

    return (
        <div className="bg-base-300 min-h-screen font-sans relative">
            <motion.article initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
                <header className="h-[50vh] relative">
                    <img
                        src={imgError ? 'https://via.placeholder.com/1600x900/cccccc/ffffff?text=Image+Not+Found' : imageUrl}
                        alt={title}
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
                            <h1 className="text-3xl md:text-5xl font-bold leading-tight">{title}</h1>

                            {/* --- Main Details Section (now includes Volunteers) --- */}
                            <div className="mt-6 pt-6 border-t border-slate-200 ">
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-x-6 gap-y-6 font-medium">
                                    <div className="flex items-center gap-3"><Calendar className="w-5 h-5 text-primary" /> {formattedDate}</div>
                                    <div className="flex items-center gap-3"><MapPin className="w-5 h-5 text-primary" /> {location}</div>
                                    <div className="flex items-center gap-3"><Tag className="w-5 h-5 text-primary" /> {type}</div>
                                </div>

                                {/* --- NEW: Volunteer Progress Section --- */}
                                {volunteersNeeded > 0 && (
                                    <div className="mt-6">
                                        <div className="flex items-center gap-3 mb-2">
                                            <Users className="w-5 h-5 text-primary" />
                                            <span className="font-bold ">
                                                {volunteersJoined} / {volunteersNeeded} Volunteers
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
                                <p className="text-lg leading-relaxed whitespace-pre-line">{description}</p>
                            </div>
                            <div className="md:col-span-1 bg-base-100 p-6 rounded-xl shadow-lg h-fit">
                                <h2 className="text-2xl font-bold mb-4 border-b pb-2 border-slate-200">Organizer</h2>
                                <div className="flex items-center gap-4">
                                    <UserCircle className="w-10 h-10 text-primary" />
                                    <p className="text-lg font-semibold">{organizer}</p>
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