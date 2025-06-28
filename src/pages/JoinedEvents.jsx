import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { MapPin, Calendar, ArrowRight, Search, ThumbsUp, Link } from 'lucide-react';

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
                        <h1 className="text-4xl md:text-5xl font-extrabold">My Joined Events</h1>
                        <p className="text-lg mt-4">Thank you for your commitment! Here are the events you've signed up for.</p>
                    </header>

                    {/* Event List or Empty State */}
                    <main>
                        {sortedEvents.length > 0 ? (
                            <div className="overflow-x-auto rounded-2xl border border-gray-200 shadow-sm">
                                <table className="table w-full min-w-[640px]">
                                    <thead className="bg-base-100 text-center  font-semibold text-sm rounded-t-lg">
                                        <tr>
                                            <th className="py-4 rounded-tl-2xl">No</th>
                                            <th className="py-4">Event</th>
                                            <th>Date</th>
                                            <th>Status</th>
                                            {/* <th>Last Watered</th>
                                            <th>Next Watering Date</th> */}
                                            <th className="rounded-tr-2xl">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody className="">
                                        {sortedEvents.map((event, index) => {
                                            const isCompleted = new Date(event.date) < new Date();
                                            return (
                                                <tr className={`transition-colors duration-200 ${isCompleted ? 'bg-base-300' : 'bg-base-100 hover:bg-base-300'}`} key={event.id}>
                                                    <td className="py-3 font-medium">{index + 1}</td>
                                                    <td className='text-left'>
                                                        <p className={`font-bold text-lg ${isCompleted ? 'text-slate-500' : ''}`}>{event.title}</p>
                                                        <p className="flex items-center text-sm text-slate-500 mt-1">
                                                            <MapPin className="w-4 h-4 mr-2" /> {event.location}
                                                        </p>
                                                    </td>
                                                    <td>
                                                        <p className={`flex items-center font-semibold ${isCompleted ? 'text-slate-500' : ''}`}>
                                                            <Calendar className="w-4 h-4 mr-2" /> {new Date(event.date).toLocaleDateString('en-GB', { month: 'long', day: 'numeric', year: 'numeric' })}
                                                        </p>
                                                    </td>
                                                    <td>
                                                        <span className={`h-2 w-2 p-2 rounded-full mr-2 ${isCompleted ? '' : 'bg-green-500'}`}>
                                                            <span className={`font-semibold text-sm ${isCompleted ? 'text-slate-500' : 'text-white'}`}>
                                                                {isCompleted ? 'Completed' : 'Upcoming'}
                                                            </span>
                                                        </span>
                                                    </td>
                                                    <td>
                                                        <Link
                                                            to={`/plants/details/${event.id}`}
                                                            className="btn btn-sm btn-primary rounded-lg px-5 transition-transform hover:scale-105"
                                                        >
                                                            View Details
                                                        </Link>
                                                    </td>
                                                </tr>
                                            );

                                        })}
                                    </tbody>
                                </table>
                            </div>
                        ) : (
                            <div className="text-center py-24 bg-base-100 rounded-2xl shadow-sm">
                                <div className="mx-auto bg-primary/10 text-primary w-16 h-16 rounded-full flex items-center justify-center mb-6">
                                    <ThumbsUp className="w-9 h-9" />
                                </div>
                                <h3 className="text-2xl font-bold ">You haven't joined any events yet.</h3>
                                <p className=" mt-2 mb-6">Ready to make an impact? Find an event that inspires you!</p>
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
