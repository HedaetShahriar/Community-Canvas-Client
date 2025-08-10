import React, { useContext, useEffect, useState } from 'react';
import {
    MapPin, Calendar, Send, ThumbsUp, UserCircle, Users,
    HelpCircle, Share2, Image as ImageIcon, Award, ChevronsRight, X, Star
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLocation, useNavigate, useParams } from 'react-router';
import axios from 'axios';
import Swal from 'sweetalert2';

// Import your actual components and context from your project
import AuthContext from '../contexts/AuthContext';
import Spinner from '../components/Spinner';
import EventCountdown from '../components/Events/EventCountdown';

const ViewEvent = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const pageLocation = useLocation();
    const { user } = useContext(AuthContext);

    const [event, setEvent] = useState(null);
    const [hasJoined, setHasJoined] = useState(false);
    const [imgError, setImgError] = useState(false);
    const [modal, setModal] = useState({ isOpen: false, content: null });
    const [activeFaq, setActiveFaq] = useState(0);

    // Fetch initial event data
    useEffect(() => {
        axios.get(`${import.meta.env.VITE_API_URL}/events/${id}`)
            .then(response => {
                setEvent(response.data);
                if (user?.email) {
                    const alreadyJoined = response.data.joinedUsers.includes(user?.email);
                    setHasJoined(alreadyJoined);
                }
            })
            .catch(error => {
                console.error('Error fetching event:', error);
                // Optionally navigate to a 404 page or show an error component
            });
    }, [id, user]);

    // Refetch data only when join status changes to update volunteer count
    useEffect(() => {
        if (event) { // Only refetch if event data already exists
            axios.get(`${import.meta.env.VITE_API_URL}/events/${id}`)
                .then(response => setEvent(response.data))
                .catch(error => console.error('Error refetching event data:', error));
        }
    }, [hasJoined, id, user?.email]);


    if (!event) return <Spinner />;

    const { _id, title, date, description, imageUrl, location, type,
        volunteersNeeded, volunteersJoined, organizer, images } = event;

    const formattedDate = new Date(date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
    const formattedTime = new Date(date).toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true });
    const volunteerPercentage = volunteersNeeded > 0 ? (volunteersJoined / volunteersNeeded) * 100 : 0;

    const handleImageClick = (img) => setModal({ isOpen: true, content: <img src={img} alt="Event gallery" className="max-w-[90vw] max-h-[80vh] rounded-lg shadow-2xl" /> });

    const handleJoin = () => {
        if (!user) {
            Swal.fire({
                title: 'Please Log In',
                text: 'You need to be logged in to join this event.',
                icon: 'warning',
                showCancelButton: true,
                confirmButtonText: 'Log In',
                confirmButtonColor: '#4f46e5',
                cancelButtonColor: '#ef4444'
            }).then(result => {
                if (result.isConfirmed) navigate('/auth/login', { state: pageLocation.pathname });
            });
            return;
        }

        Swal.fire({
            title: 'Confirm Your Spot?',
            text: `You are about to join "${title}"`,
            icon: 'question',
            showCancelButton: true,
            confirmButtonText: 'Yes, Get My Ticket!',
            cancelButtonText: 'Not Now',
            confirmButtonColor: '#4f46e5',
            cancelButtonColor: '#ef4444'
        }).then(result => {
            if (result.isConfirmed) {
                axios.patch(`${import.meta.env.VITE_API_URL}/events/${_id}/join`, { email: user.email })
                    .then(response => {
                        if (response.data.success) {
                            Swal.fire({
                                title: 'Joined Successfully!',
                                text: `Welcome to "${title}". We're excited to have you!`,
                                icon: 'success',
                                confirmButtonColor: '#4f46e5'
                            });
                            setHasJoined(true);
                        } else {
                            Swal.fire({
                                title: 'Oops!',
                                text: response.data.message || 'You might have already joined.',
                                icon: 'info',
                                confirmButtonColor: '#4f46e5'
                            });
                        }
                    })
                    .catch(() => Swal.fire({
                        title: 'Error',
                        text: 'There was an issue joining. Please try again later.',
                        icon: 'error',
                        confirmButtonColor: '#ef4444'
                    }));
            }
        });
    };

    const highlights = event.highlights || [
        { icon: Users, title: "Community Connection", desc: "Meet your neighbors, make new friends, and strengthen community bonds." },
        { icon: Star, title: "Fun for All Ages", desc: "Enjoy a variety of games, crafts, and activities suitable for the whole family." },
        { icon: Award, title: "Support Local", desc: "Discover and support talented local artisans, vendors, and food stalls." },
        { icon: ChevronsRight, title: "Live Entertainment", desc: "Enjoy fantastic music and performances from artists in our community." }
    ];
    const faqs = event.faqs || [
        { q: "Is there an entry fee?", a: "No, this event is completely free and open to all members of the community." },
        { q: "Can I bring my pet?", a: "Well-behaved pets on a leash are welcome in the park grounds." },
        { q: "What if it rains?", a: "In case of heavy rain, the event will be rescheduled. Please check our social media for updates." }
    ];

    return (
        <div className="bg-base-200 font-sans">
            <AnimatePresence>
                {modal.isOpen && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 bg-black/30 backdrop-blur-sm z-50 flex items-center justify-center" onClick={() => setModal({ isOpen: false, content: null })}>
                        <motion.div initial={{ scale: 0.9 }} animate={{ scale: 1 }} exit={{ scale: 0.9 }} onClick={e => e.stopPropagation()} className="relative">
                            {modal.content}
                            <button onClick={() => setModal({ isOpen: false, content: null })} className="absolute -top-3 -right-3 bg-base-200 rounded-full p-2 shadow-lg">
                                <X size={24} />
                            </button>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            <motion.article initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8 }}>
                <header className="relative h-[40vh] w-full flex flex-col items-center justify-center text-center  p-4">
                    <div className="absolute inset-0">
                        <img
                            src={imgError ? 'https://placehold.co/1920x1080/111827/ffffff?text=Event+Banner' : imageUrl}
                            alt={`Promo for ${title}`}
                            onError={() => setImgError(true)}
                            className="w-full h-full  object-cover"
                        />
                        <div className="absolute inset-0 bg-gray-900/20"></div>
                    </div>

                    <motion.div
                        className="relative z-10 text-center bg-transparent container backdrop-blur-xs p-6 rounded-4xl"
                        initial={{ y: 50, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ duration: 0.8, delay: 0.2, ease: 'easeOut' }}
                    >
                        <span className="inline-block bg-accent/60 text-accent-content px-4 py-1 rounded-full text-sm font-bold mb-4 uppercase tracking-widest">{type}</span>
                        <h1 className="text-4xl md:text-5xl lg:text-6xl  text-white/90 font-extrabold mb-6 leading-tight" style={{ textShadow: '0 0 20px rgba(129, 140, 248, 0.3)' }}>{title}</h1>
                        <div className="max-w-2xl mx-auto space-y-3 text-xl md:text-2xl font-semibold text-white/90">
                            <p className="flex items-center justify-center gap-3"><Calendar className="text-accent w-6 h-6" /> <span>{formattedDate} at {formattedTime}</span></p>
                            <p className="flex items-center justify-center gap-3"><MapPin className="text-accent w-6 h-6" /> <span>{location}</span></p>
                        </div>
                    </motion.div>
                </header>

                <main className="container mx-auto px-4 lg:px-8 py-16">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        <div className="lg:col-span-2 space-y-10">
                            <section>
                                <h2 className="text-4xl font-bold text-center mb-4 md:text-left">About The Event</h2>
                                <p className="text-lg leading-relaxed  whitespace-pre-line text-center md:text-left">{description}</p>
                            </section>

                            <section>
                                <h2 className="text-4xl font-bold mb-8 text-center md:text-left">What to Expect</h2>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    {highlights.map((item, i) => (
                                        <div key={i} className="bg-base-100 p-6 rounded-2xl border border-gray-700/20 transform hover:-translate-y-2 hover:border-indigo-500/50 transition-all duration-300 group">
                                            <item.icon className="w-10 h-10 text-indigo-400 mb-4 transition-colors group-hover:text-indigo-300" />
                                            <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                                            <p className="">{item.desc}</p>
                                        </div>
                                    ))}
                                </div>
                            </section>

                            {images && images.length > 0 && (
                                <section>
                                    <h2 className="text-4xl font-bold mb-8 text-center md:text-left">Gallery</h2>
                                    <div className="grid grid-cols-2 gap-4">
                                        {images.map((img, index) => (
                                            <div key={index} className="relative overflow-hidden rounded-xl shadow-lg cursor-pointer group" onClick={() => handleImageClick(img)}>
                                                <img src={img} alt={`Gallery image ${index + 1}`} className="w-full h-64 object-cover transform group-hover:scale-110 transition-transform duration-300" />
                                                <div className="absolute inset-0 bg-base-100 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                                                    <p className=" font-bold text-lg">View Image</p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </section>
                            )}

                            <section>
                                <h2 className="text-4xl font-bold mb-8 text-center md:text-left">Location</h2>
                                <div className="w-full h-96 rounded-2xl shadow-xl overflow-hidden border border-gray-700/20">
                                    <iframe
                                        src={`https://www.google.com/maps?q=${encodeURIComponent(location)}&output=embed`}
                                        className="w-full h-full border-0"
                                        style={{ filter: 'hue-rotate(240deg)' }}
                                        allowFullScreen
                                        loading="lazy"
                                        referrerPolicy="no-referrer-when-downgrade"
                                    ></iframe>
                                </div>
                            </section>

                            <section>
                                <h2 className="text-4xl font-bold mb-8 text-center md:text-left">Frequently Asked Questions</h2>
                                <div className="space-y-4">
                                    {faqs.map((faq, i) => (
                                        <div key={i} className={`border border-gray-700/50 rounded-xl p-6 transition-all duration-300 ${activeFaq === i ? 'bg-base-100' : ''}`}>
                                            <button onClick={() => setActiveFaq(i)} className="w-full text-left text-xl font-semibold flex justify-between items-center">
                                                <span>{faq.q}</span>
                                                <motion.div animate={{ rotate: activeFaq === i ? 180 : 0 }}><ChevronsRight className="transform transition-transform" /></motion.div>
                                            </button>
                                            <AnimatePresence>
                                                {activeFaq === i && (
                                                    <motion.div initial={{ height: 0, opacity: 0, marginTop: 0 }} animate={{ height: 'auto', opacity: 1, marginTop: '16px' }} exit={{ height: 0, opacity: 0, marginTop: 0 }} className="overflow-hidden">
                                                        <p className="">{faq.a}</p>
                                                    </motion.div>
                                                )}
                                            </AnimatePresence>
                                        </div>
                                    ))}
                                </div>
                            </section>
                        </div>

                        <aside className="lg:sticky top-24 h-fit space-y-6">
                            <div className="bg-base-100 border border-gray-700/20 rounded-2xl p-6 space-y-6">
                                <h3 className="text-2xl font-bold text-center">Join This Event</h3>
                                {volunteersNeeded > 0 && (
                                    <div>
                                        <div className="flex items-center justify-between gap-3 mb-2 font-semibold ">
                                            <div className="flex items-center gap-2"><Users size={20} /> Volunteers</div>
                                            <span>{volunteersJoined} / {volunteersNeeded}</span>
                                        </div>
                                        <div className="w-full bg-base-300 rounded-full h-2.5">
                                            <div className="bg-indigo-500 h-2.5 rounded-full" style={{ width: `${volunteerPercentage}%` }}></div>
                                        </div>
                                    </div>
                                )}
                                {!hasJoined ? (
                                    <button onClick={handleJoin} className="btn btn-primary w-full btn-lg">
                                        <Send size={20} /> join this Event
                                    </button>
                                ) : (
                                    <div className="btn bg-green-600  w-full btn-lg cursor-not-allowed">
                                        <ThumbsUp /> You're In!
                                    </div>
                                )}
                                <button className="btn btn-outline border-primary hover:bg-primary hover:text-primary-content w-full">
                                    <Share2 size={20} /> Share Event
                                </button>
                            </div>
                            <div className="bg-base-100 border border-gray-700/20 rounded-2xl p-6">
                                <h3 className="text-2xl font-bold mb-4 text-center">Event Countdown</h3>
                                <EventCountdown startDate={date} endDate={date} />
                            </div>
                            <div className="bg-base-100 border border-gray-700/20 rounded-2xl p-6">
                                <h3 className="text-2xl font-bold mb-4 flex items-center gap-3"><UserCircle />Organizer</h3>
                                <p className="text-xl ">{organizer}</p>
                            </div>
                        </aside>
                    </div>
                </main >
            </motion.article >
        </div >
    );
};

export default ViewEvent;
