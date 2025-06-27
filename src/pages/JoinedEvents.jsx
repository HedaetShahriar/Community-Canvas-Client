import React, { useState} from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { MapPin, Calendar, ArrowRight, Search, ThumbsUp } from 'lucide-react';

const JoinedEvents = () => {
    const [joinedEvents, setJoinedEvents] = useState([
        { id: 1, title: "Cox's Bazar Beach Cleanup Drive", location: "Inani Beach, Cox's Bazar", date: "2025-07-19", organizer: "BD Clean" },
        { id: 2, title: "Sylhet Tea Gardens Reforestation", location: "Sreemangal, Sylhet", date: "2025-08-02", organizer: "Green Thumb Society" },
        { id: 3, title: "Dhaka University Campus Cleanup", location: "Dhaka University, Dhaka", date: "2025-06-21", organizer: "DUCSU" },
        { id: 4, title: "Winter Clothing Drive 2024", location: "Banani, Dhaka", date: "2024-12-15", organizer: "Jaago Foundation" }
    ]);

    const sortedEvents = [...joinedEvents].sort((a, b) => {
        const dateA = new Date(a.date);
        const dateB = new Date(b.date);
        const today = new Date();

        const aPast = dateA < today;
        const bPast = dateB < today;

        if (aPast && !bPast) return 1;
        if (!aPast && bPast) return -1;
        return aPast ? dateB - dateA : dateA - dateB;
    });

    return (
        <>
            <div className="bg-base-200 min-h-screen antialiased font-sans">
                <div className="container mx-auto px-6 py-16 md:py-24">
                    {/* Page Header */}
                    <header className="text-center max-w-3xl mx-auto mb-12">
                        <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900">My Joined Events</h1>
                        <p className="text-lg text-slate-600 mt-4">Thank you for your commitment! Here are the events you've signed up for.</p>
                    </header>

                    {/* Event List or Empty State */}
                    <main>
                        {sortedEvents.length > 0 ? (
                            <div className="bg-white rounded-2xl shadow-sm p-4 space-y-2">
                                {/* Table Header */}
                                <div className="hidden md:grid grid-cols-10 gap-4 p-4 text-xs font-bold text-slate-500 uppercase tracking-wider">
                                    <div className="col-span-5">Event</div>
                                    <div className="col-span-2">Date</div>
                                    <div className="col-span-2">Status</div>
                                    <div className="col-span-1"></div>
                                </div>

                                {/* Event Rows */}
                                {sortedEvents.map((event) => {
                                    const isCompleted = new Date(event.date) < new Date();
                                    return (
                                        <div key={event.id} className={`grid grid-cols-1 md:grid-cols-10 gap-4 items-center p-4 rounded-lg transition-colors duration-200 ${isCompleted ? 'bg-slate-50' : 'bg-white hover:bg-slate-50'}`}>
                                            <div className="md:col-span-5">
                                                <p className={`font-bold text-lg ${isCompleted ? 'text-slate-500' : 'text-slate-800'}`}>{event.title}</p>
                                                <p className="flex items-center text-sm text-slate-500 mt-1">
                                                    <MapPin className="w-4 h-4 mr-2" /> {event.location}
                                                </p>
                                            </div>
                                            <div className="md:col-span-2">
                                                <p className={`flex items-center font-semibold ${isCompleted ? 'text-slate-500' : 'text-slate-700'}`}>
                                                    <Calendar className="w-4 h-4 mr-2" /> {new Date(event.date).toLocaleDateString('en-GB', { month: 'long', day: 'numeric', year: 'numeric' })}
                                                </p>
                                            </div>
                                            <div className="md:col-span-2">
                                                <div className="flex items-center">
                                                    <span className={`h-2 w-2 rounded-full mr-2 ${isCompleted ? 'bg-gray-400' : 'bg-green-500'}`}></span>
                                                    <span className={`font-semibold text-sm ${isCompleted ? 'text-slate-500' : 'text-slate-700'}`}>
                                                        {isCompleted ? 'Completed' : 'Upcoming'}
                                                    </span>
                                                </div>
                                            </div>
                                            <div className="md:col-span-1 text-left md:text-right">
                                                <a href="#" className="inline-flex items-center font-semibold text-sm text-primary hover:underline">
                                                    Details <ArrowRight className="w-4 h-4 ml-1" />
                                                </a>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        ) : (
                            <div className="text-center py-24 bg-white rounded-2xl shadow-sm">
                                <div className="mx-auto bg-primary/10 text-primary w-16 h-16 rounded-full flex items-center justify-center mb-6">
                                    <ThumbsUp className="w-9 h-9" />
                                </div>
                                <h3 className="text-2xl font-bold text-slate-800">You haven't joined any events yet.</h3>
                                <p className="text-slate-600 mt-2 mb-6">Ready to make an impact? Find an event that inspires you!</p>
                                <a href="/upcoming-events" className="btn btn-primary px-6 py-3 font-bold flex items-center gap-2 shadow-lg hover:bg-opacity-90 transition-all">
                                    <Search className="w-5 h-5" /> Explore Events
                                </a>
                            </div>
                        )}
                    </main>
                </div>
            </div>
        </>
    );
};

export default JoinedEvents;
