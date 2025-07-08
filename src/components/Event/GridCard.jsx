import React, { use, useEffect, useState } from 'react';
import { Calendar, MapPin } from 'lucide-react';
import { motion } from 'framer-motion';
import { Link } from 'react-router';
import Swal from 'sweetalert2';
import axios from 'axios';
import AuthContext from '../../contexts/AuthContext';

const MotionLink = motion.create(Link);

const GridCard = ({ event, setHasJoined }) => {
    const [alreadyJoined, setAlreadyJoined] = useState(false);
    const { user } = use(AuthContext);
    // console.log(event);
    const { _id, title, date, description, imageUrl, location, type, volunteersNeeded, volunteersJoined, joinedUsers, addedBy, organizer } = event;
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

    const eventTypeColors = {
        'Cleanup': 'bg-blue-100 text-blue-800',
        'Plantation': 'bg-green-100 text-green-800',
        'Donation': 'bg-yellow-100 text-yellow-800',
        'Education': 'bg-purple-100 text-purple-800',
        'Social Work': 'bg-blue-100 text-blue-800',
    };

    const volunteerPercentage = (volunteersJoined / volunteersNeeded) * 100;

    useEffect(() => {
        if (user) {
            if (joinedUsers.includes(user?.email)) {
                setAlreadyJoined(true);
            }
        }
    }, [joinedUsers, user]);

    const handleJoin = (id) => {
        if (!user) {
            Swal.fire({
                title: 'Please Log In first',
                text: 'You need to be logged in to join an event.',
                icon: 'warning',
                timer: 2000,
                showConfirmButton: false,
                timerProgressBar: true,
            });
            return;
        }
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
                axios.patch(`${import.meta.env.VITE_API_URL}/events/${id}/join`, {
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
                        setAlreadyJoined(true);
                        setHasJoined(prev => !prev);
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
        <motion.div
            layout
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.3 }}
            className="bg-base-100 rounded-xl shadow-md overflow-hidden max-w-sm mx-auto"
        >
            <div className="h-48 relative overflow-hidden">
                <img
                    src={imageUrl}
                    alt={title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                <p className={`absolute top-2 right-2 px-3 py-1 text-xs font-semibold rounded-full ${eventTypeColors[type]}`}>{type}</p>
            </div>
            <div className="p-5">
                <h2 className="text-xl font-bold">{title}</h2>
                <div className="flex items-center mt-4">
                    <Calendar className="w-5 h-5 mr-3" />
                    <span>{formattedDate}</span>
                </div>
                <div className="flex items-center mt-2">
                    <MapPin className="w-5 h-5 mr-3" />
                    <span>{location}</span>
                </div>

                <div className="mt-4">
                    <div className="flex justify-between items-center text-sm">
                        <p>Volunteers</p>
                        <p className="font-semibold">{volunteersJoined} / {volunteersNeeded} Joined</p>
                    </div>
                    <div className="w-full bg-base-300 rounded-full h-2.5 mt-2">
                        <div
                            className="bg-primary h-2.5 rounded-full"
                            style={{ width: `${volunteerPercentage}%` }}
                        ></div>
                    </div>
                </div>
                <div className="flex gap-3 mt-4">
                    <Link to={`/events/${event._id}`} className="w-full bg-primary text-primary-content text-center font-bold py-3 px-4 rounded-lg hover:bg-secondary transition-colors duration-300">
                        Details
                    </Link>
                    <button
                        onClick={() => handleJoin(_id)}
                        className={`w-full bg-primary text-primary-content font-bold py-3 px-4 rounded-lg hover:bg-secondary transition-colors duration-300 ${alreadyJoined ? 'opacity-50 cursor-not-allowed' : ''}`}
                        disabled={alreadyJoined}
                    >
                        {alreadyJoined ? 'Joined' : 'Join Event'}
                    </button>
                </div>
            </div>
        </motion.div>

    );
};

export default GridCard;