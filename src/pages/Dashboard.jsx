import React, { useState, useContext, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
    TrendingUp,
    Users,
    Calendar,
    Award,
    Clock,
    MapPin,
    Plus,
    ArrowRight,
    BarChart3,
    PieChart,
    Activity
} from 'lucide-react';
import { Link } from 'react-router';
import AuthContext from '../contexts/AuthContext';

const Dashboard = () => {
    const { user } = useContext(AuthContext);
    const [stats, setStats] = useState({
        totalEvents: 0,
        joinedEvents: 0,
        createdEvents: 0,
        hoursVolunteered: 0
    });

    // Mock data for demonstration - replace with actual API calls
    useEffect(() => {
        // Simulate API call
        setStats({
            totalEvents: 24,
            joinedEvents: 8,
            createdEvents: 3,
            hoursVolunteered: 42
        });
    }, []);

    const recentEvents = [
        {
            id: 1,
            title: "Community Beach Cleanup",
            date: "2025-08-15",
            type: "cleanup",
            participants: 25,
            status: "upcoming"
        },
        {
            id: 2,
            title: "Tree Plantation Drive",
            date: "2025-08-20",
            type: "plantation",
            participants: 40,
            status: "upcoming"
        },
        {
            id: 3,
            title: "Food Distribution",
            date: "2025-08-12",
            type: "donation",
            participants: 15,
            status: "completed"
        }
    ];

    const quickActions = [
        {
            title: "Create New Event",
            description: "Start organizing a community event",
            icon: Plus,
            link: "/create-event",
            color: "from-blue-500 to-blue-600",
            hoverColor: "hover:from-blue-600 hover:to-blue-700"
        },
        {
            title: "Browse Events",
            description: "Find events to participate in",
            icon: Calendar,
            link: "/upcoming-events",
            color: "from-green-500 to-green-600",
            hoverColor: "hover:from-green-600 hover:to-green-700"
        },
        {
            title: "Manage Events",
            description: "Edit your created events",
            icon: Award,
            link: "/manage-events",
            color: "from-purple-500 to-purple-600",
            hoverColor: "hover:from-purple-600 hover:to-purple-700"
        },
        {
            title: "Joined Events",
            description: "View events you've joined",
            icon: Users,
            link: "/joined-events",
            color: "from-orange-500 to-orange-600",
            hoverColor: "hover:from-orange-600 hover:to-orange-700"
        }
    ];

    const StatCard = ({ title, value, icon: Icon, change, changeType }) => (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            whileHover={{ y: -5 }}
            className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border border-gray-200 dark:border-gray-700"
        >
            <div className="flex items-center justify-between">
                <div>
                    <p className="text-sm font-medium text-gray-600 dark:text-gray-400">{title}</p>
                    <p className="text-3xl font-bold text-gray-900 dark:text-white mt-2">{value}</p>
                    {change && (
                        <div className={`flex items-center mt-2 text-sm ${
                            changeType === 'positive' ? 'text-green-600' : 'text-red-600'
                        }`}>
                            <TrendingUp className="w-4 h-4 mr-1" />
                            {change}
                        </div>
                    )}
                </div>
                <div className="p-3 bg-indigo-100 dark:bg-indigo-900/50 rounded-xl">
                    <Icon className="w-8 h-8 text-indigo-600 dark:text-indigo-400" />
                </div>
            </div>
        </motion.div>
    );

    const EventCard = ({ event }) => (
        <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-white dark:bg-gray-800 rounded-xl p-4 border border-gray-200 dark:border-gray-700 hover:shadow-md transition-shadow"
        >
            <div className="flex items-center justify-between mb-3">
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                    event.type === 'cleanup' ? 'bg-blue-100 text-blue-800 dark:bg-blue-900/50 dark:text-blue-300' :
                    event.type === 'plantation' ? 'bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-300' :
                    'bg-orange-100 text-orange-800 dark:bg-orange-900/50 dark:text-orange-300'
                }`}>
                    {event.type.charAt(0).toUpperCase() + event.type.slice(1)}
                </span>
                <span className={`px-2 py-1 rounded-full text-xs ${
                    event.status === 'upcoming' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/50 dark:text-yellow-300' :
                    'bg-gray-100 text-gray-800 dark:bg-gray-900/50 dark:text-gray-300'
                }`}>
                    {event.status.charAt(0).toUpperCase() + event.status.slice(1)}
                </span>
            </div>
            <h3 className="font-semibold text-gray-900 dark:text-white mb-2">{event.title}</h3>
            <div className="flex items-center text-sm text-gray-600 dark:text-gray-400 space-x-4">
                <div className="flex items-center">
                    <Clock className="w-4 h-4 mr-1" />
                    {new Date(event.date).toLocaleDateString()}
                </div>
                <div className="flex items-center">
                    <Users className="w-4 h-4 mr-1" />
                    {event.participants} joined
                </div>
            </div>
        </motion.div>
    );

    return (
        <div className="space-y-8">
            {/* Welcome Section */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl p-8 text-white"
            >
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold mb-2">
                            Welcome back, {user?.displayName || 'Community Member'}! 👋
                        </h1>
                        <p className="text-indigo-100 text-lg">
                            Ready to make a difference in your community today?
                        </p>
                    </div>
                    <div className="hidden md:block">
                        <div className="w-32 h-32 bg-white/10 rounded-full flex items-center justify-center">
                            <Activity className="w-16 h-16 text-white/80" />
                        </div>
                    </div>
                </div>
            </motion.div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <StatCard
                    title="Total Events"
                    value={stats.totalEvents}
                    icon={Calendar}
                    change="+12% this month"
                    changeType="positive"
                />
                <StatCard
                    title="Events Joined"
                    value={stats.joinedEvents}
                    icon={Users}
                    change="+8% this month"
                    changeType="positive"
                />
                <StatCard
                    title="Events Created"
                    value={stats.createdEvents}
                    icon={Award}
                />
                <StatCard
                    title="Hours Volunteered"
                    value={stats.hoursVolunteered}
                    icon={Clock}
                    change="+5 hours"
                    changeType="positive"
                />
            </div>

            {/* Quick Actions */}
            <div>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Quick Actions</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {quickActions.map((action, index) => {
                        const Icon = action.icon;
                        return (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.1 }}
                                whileHover={{ y: -5 }}
                                className="group"
                            >
                                <Link to={action.link}>
                                    <div className={`bg-gradient-to-r ${action.color} ${action.hoverColor} rounded-2xl p-6 text-white shadow-lg transition-all duration-300`}>
                                        <div className="flex items-center justify-between mb-4">
                                            <Icon className="w-8 h-8" />
                                            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                                        </div>
                                        <h3 className="font-bold text-lg mb-2">{action.title}</h3>
                                        <p className="text-white/80 text-sm">{action.description}</p>
                                    </div>
                                </Link>
                            </motion.div>
                        );
                    })}
                </div>
            </div>

            {/* Recent Events */}
            <div>
                <div className="flex items-center justify-between mb-6">
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Recent Events</h2>
                    <Link
                        to="/upcoming-events"
                        className="flex items-center text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300 font-medium"
                    >
                        View all
                        <ArrowRight className="w-4 h-4 ml-1" />
                    </Link>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {recentEvents.map((event, index) => (
                        <motion.div
                            key={event.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                        >
                            <EventCard event={event} />
                        </motion.div>
                    ))}
                </div>
            </div>

            {/* Activity Chart Placeholder */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border border-gray-200 dark:border-gray-700"
                >
                    <div className="flex items-center justify-between mb-6">
                        <h3 className="text-xl font-bold text-gray-900 dark:text-white">Activity Overview</h3>
                        <BarChart3 className="w-6 h-6 text-gray-400" />
                    </div>
                    <div className="h-64 flex items-center justify-center bg-gray-50 dark:bg-gray-900/50 rounded-xl">
                        <div className="text-center">
                            <BarChart3 className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                            <p className="text-gray-500 dark:text-gray-400">Chart placeholder</p>
                            <p className="text-sm text-gray-400">Activity data will be displayed here</p>
                        </div>
                    </div>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border border-gray-200 dark:border-gray-700"
                >
                    <div className="flex items-center justify-between mb-6">
                        <h3 className="text-xl font-bold text-gray-900 dark:text-white">Event Types</h3>
                        <PieChart className="w-6 h-6 text-gray-400" />
                    </div>
                    <div className="h-64 flex items-center justify-center bg-gray-50 dark:bg-gray-900/50 rounded-xl">
                        <div className="text-center">
                            <PieChart className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                            <p className="text-gray-500 dark:text-gray-400">Chart placeholder</p>
                            <p className="text-sm text-gray-400">Event distribution will be shown here</p>
                        </div>
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

export default Dashboard;
