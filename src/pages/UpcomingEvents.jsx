import React, { use, useEffect, useState } from 'react';
import SearchFilter from '../components/Event/SearchFilter';

import { motion, AnimatePresence } from 'framer-motion';
import GridCard from '../components/Event/GridCard';
import EventRow from '../components/Event/EventRow';
import Pagination from '../components/Pagination';
import axios from 'axios';

const UpcomingEvents = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [eventType, setEventType] = useState('All');
    const [hasJoined, setHasJoined] = useState(false);
    const [upcomingEvent, setUpcomingEvents] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(8); // You can change the page size


    const [layout, setLayout] = useState(() => {
        return localStorage.getItem('eventLayout') || 'grid';
    });

    useEffect(() => {
        axios.get(`${import.meta.env.VITE_API_URL}/events`).then(response => {
            const events = response.data;
            setUpcomingEvents(events);
        }).catch(error => {
            console.error("Error fetching events:", error);
        }
        );
    }, [hasJoined]);

    if (!upcomingEvent || upcomingEvent.length === 0) {
        return (
            <div className="bg-base-300 min-h-screen flex items-center justify-center">
                <div className="text-center p-6 bg-base-100 rounded-lg shadow-md">
                    <h2 className="text-2xl font-bold mb-4">No Upcoming Events</h2>
                    <p className="">There are currently no upcoming events. Please
                        check back later or create your own event to get started!</p>
                </div>
            </div>
        );
    }

    const filteredEvents = upcomingEvent.filter(event => {
        const matchesSearch = event.title.toLowerCase().includes(searchQuery.toLowerCase()) || event.location.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesType = eventType === 'All' || event.type === eventType;
        return matchesSearch && matchesType;
    });

    // pagination: calculate which events to show
    const indexOfLastEvent = currentPage * itemsPerPage;
    const indexOfFirstEvent = indexOfLastEvent - itemsPerPage;
    const currentEvents = filteredEvents.slice(indexOfFirstEvent, indexOfLastEvent);


    return (
        <div className="bg-base-300 min-h-screen antialiased">
            <div className="container mx-auto px-6 py-6 md:py-10">
                <header className="text-center max-w-3xl mx-auto mb-12">
                    <h1 className="text-4xl md:text-5xl font-extrabold">Upcoming Events</h1>
                    <p className="text-lg mt-4">Find opportunities to volunteer and contribute to your community. Here’s what’s happening soon.</p>
                </header>

                <SearchFilter
                    searchQuery={searchQuery}
                    setSearchQuery={setSearchQuery}
                    eventType={eventType}
                    setEventType={setEventType}
                    layout={layout}
                    setLayout={setLayout}
                />

                <main>
                    <AnimatePresence mode="wait">
                        {currentEvents.length > 0 ? (
                            layout === 'list' ? (
                                <motion.div key="list" className="space-y-4">
                                    {currentEvents.map(event => <EventRow key={event._id} event={event} hasJoined={hasJoined} setHasJoined={setHasJoined} />)}
                                </motion.div>
                            ) : (
                                <motion.div key="grid" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                                    {currentEvents.map(event => <GridCard key={event._id} event={event} hasJoined={hasJoined} setHasJoined={setHasJoined} />)}
                                </motion.div>
                            )
                        ) : (
                            <motion.div
                                key="no-results"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                className="text-center py-16 bg-base-100 rounded-2xl"
                            >
                                <h3 className="text-2xl font-bold">No Events Found</h3>
                                <p className="mt-2">Try adjusting your search or filter to find other opportunities.</p>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </main>

                <Pagination
                    currentPage={currentPage}
                    totalItems={filteredEvents.length}
                    itemsPerPage={itemsPerPage}
                    onPageChange={(page) => setCurrentPage(page)}
                />

            </div>
        </div>
    );
};

export default UpcomingEvents;