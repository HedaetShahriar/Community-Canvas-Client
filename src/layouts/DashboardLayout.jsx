import React, { useState, useContext } from 'react';
import { Outlet, NavLink, useLocation } from 'react-router';
import { motion } from 'framer-motion';
import {
    LayoutDashboard,
    PlusCircle,
    Calendar,
    Users,
    Settings,
    User,
    Bell,
    Search,
    Menu,
    X,
    LogOut,
    ChevronDown,
    Home,
    Award,
    BarChart3
} from 'lucide-react';
import AuthContext from '../contexts/AuthContext';

const DashboardLayout = () => {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
    const { user, logOut } = useContext(AuthContext);
    const location = useLocation();

    const handleSignOut = () => {
        logOut()
            .then(() => {
                console.log('User signed out successfully');
            })
            .catch((error) => {
                console.error('Error signing out:', error);
            });
    };

    const sidebarItems = [
        {
            path: '/',
            name: 'Home',
            icon: Home,
            description: 'Go to main site'
        },
        {
            path: '/dashboard',
            name: 'Dashboard',
            icon: LayoutDashboard,
            description: 'Overview & Analytics'
        },
        {
            path: '/create-event',
            name: 'Create Event',
            icon: PlusCircle,
            description: 'Add new event'
        },
        {
            path: '/manage-events',
            name: 'Manage Events',
            icon: Settings,
            description: 'Edit your events'
        },
        {
            path: '/joined-events',
            name: 'Joined Events',
            icon: Users,
            description: 'Events you joined'
        },
        {
            path: '/upcoming-events',
            name: 'Browse Events',
            icon: Calendar,
            description: 'Discover events'
        }
    ];

    const isActivePath = (path) => {
        if (path === '/dashboard') {
            return location.pathname === '/dashboard';
        }
        return location.pathname === path;
    };

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
            {/* Mobile sidebar backdrop */}
            {sidebarOpen && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
                    onClick={() => setSidebarOpen(false)}
                />
            )}

            {/* Sidebar */}
            <motion.div
                initial={{ x: -280 }}
                animate={{ x: sidebarOpen ? 0 : -280 }}
                transition={{ type: "spring", damping: 25, stiffness: 200 }}
                className="fixed left-0 top-0 h-full w-72 bg-white dark:bg-gray-800 shadow-xl z-50 lg:translate-x-0 lg:static lg:inset-0"
            >
                <div className="flex flex-col h-full">
                    {/* Logo Section */}
                    <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
                        <div className="flex items-center space-x-3">
                            <div className="w-10 h-10 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-xl flex items-center justify-center">
                                <LayoutDashboard className="w-6 h-6 text-white" />
                            </div>
                            <div>
                                <h1 className="text-xl font-bold text-gray-900 dark:text-white">CommunityCanvas</h1>
                                <p className="text-sm text-gray-500 dark:text-gray-400">Dashboard</p>
                            </div>
                        </div>
                        <button
                            onClick={() => setSidebarOpen(false)}
                            className="lg:hidden p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg"
                        >
                            <X className="w-5 h-5 text-gray-500" />
                        </button>
                    </div>

                    {/* Navigation */}
                    <nav className="flex-1 px-4 py-6 space-y-2 overflow-y-auto">
                        {sidebarItems.map((item) => {
                            const Icon = item.icon;
                            const isActive = isActivePath(item.path);
                            
                            return (
                                <NavLink
                                    key={item.path}
                                    to={item.path}
                                    className={`group flex items-center px-4 py-3 text-sm font-medium rounded-xl transition-all duration-200 ${
                                        isActive
                                            ? 'bg-indigo-100 dark:bg-indigo-900/50 text-indigo-700 dark:text-indigo-300 shadow-sm'
                                            : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700/50 hover:text-gray-900 dark:hover:text-white'
                                    }`}
                                    onClick={() => setSidebarOpen(false)}
                                >
                                    <Icon className={`mr-3 h-5 w-5 transition-colors ${
                                        isActive ? 'text-indigo-600 dark:text-indigo-400' : 'text-gray-500 dark:text-gray-400 group-hover:text-gray-700 dark:group-hover:text-gray-300'
                                    }`} />
                                    <div className="flex-1">
                                        <div className="font-medium">{item.name}</div>
                                        <div className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">{item.description}</div>
                                    </div>
                                    {isActive && (
                                        <motion.div
                                            layoutId="sidebar-active"
                                            className="w-2 h-2 bg-indigo-600 dark:bg-indigo-400 rounded-full"
                                        />
                                    )}
                                </NavLink>
                            );
                        })}
                    </nav>

                    {/* User Profile Section */}
                    <div className="p-4 border-t border-gray-200 dark:border-gray-700">
                        <div className="relative">
                            <button
                                onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
                                className="w-full flex items-center px-4 py-3 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                            >
                                <div className="w-10 h-10 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full flex items-center justify-center mr-3">
                                    <User className="w-5 h-5 text-white" />
                                </div>
                                <div className="flex-1 text-left">
                                    <div className="font-medium text-gray-900 dark:text-white truncate">
                                        {user?.displayName || 'User'}
                                    </div>
                                    <div className="text-sm text-gray-500 dark:text-gray-400 truncate">
                                        {user?.email}
                                    </div>
                                </div>
                                <ChevronDown className={`w-4 h-4 text-gray-500 transition-transform ${profileDropdownOpen ? 'rotate-180' : ''}`} />
                            </button>

                            {/* Profile Dropdown */}
                            {profileDropdownOpen && (
                                <motion.div
                                    initial={{ opacity: 0, y: -10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -10 }}
                                    className="absolute bottom-full left-0 right-0 mb-2 bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 py-2"
                                >
                                    <button
                                        onClick={handleSignOut}
                                        className="w-full flex items-center px-4 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
                                    >
                                        <LogOut className="w-4 h-4 mr-2" />
                                        Sign Out
                                    </button>
                                </motion.div>
                            )}
                        </div>
                    </div>
                </div>
            </motion.div>

            {/* Main Content */}
            <div className="flex-1 lg:ml-0">
                {/* Top Header */}
                <header className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700 sticky top-0 z-30">
                    <div className="flex items-center justify-between px-4 py-4 lg:px-8">
                        {/* Mobile menu button */}
                        <div className="flex items-center space-x-4">
                            <button
                                onClick={() => setSidebarOpen(true)}
                                className="lg:hidden p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg"
                            >
                                <Menu className="w-6 h-6 text-gray-600 dark:text-gray-300" />
                            </button>

                            {/* Page Title */}
                            <div>
                                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                                    {sidebarItems.find(item => isActivePath(item.path))?.name || 'Dashboard'}
                                </h2>
                                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                                    {sidebarItems.find(item => isActivePath(item.path))?.description || 'Welcome to your dashboard'}
                                </p>
                            </div>
                        </div>

                        {/* Right side header content */}
                        <div className="flex items-center space-x-4">
                            {/* Search Bar */}
                            <div className="hidden md:flex relative">
                                <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                                <input
                                    type="text"
                                    placeholder="Search events..."
                                    className="pl-10 pr-4 py-2 bg-gray-100 dark:bg-gray-700 border-0 rounded-lg focus:ring-2 focus:ring-indigo-500 text-sm w-64"
                                />
                            </div>

                            {/* Notifications */}
                            <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg relative">
                                <Bell className="w-6 h-6 text-gray-600 dark:text-gray-300" />
                                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
                            </button>

                            {/* User Avatar (Desktop) */}
                            <div className="hidden lg:flex items-center space-x-3">
                                <div className="w-10 h-10 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full flex items-center justify-center">
                                    <User className="w-5 h-5 text-white" />
                                </div>
                                <div className="text-sm">
                                    <div className="font-medium text-gray-900 dark:text-white">
                                        {user?.displayName || 'User'}
                                    </div>
                                    <div className="text-gray-500 dark:text-gray-400">
                                        {user?.email}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </header>

                {/* Main Content Area */}
                <main className="flex-1 p-4 lg:p-8">
                    <div className="max-w-7xl mx-auto">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5 }}
                        >
                            <Outlet />
                        </motion.div>
                    </div>
                </main>
            </div>

            {/* Click outside to close dropdowns */}
            {profileDropdownOpen && (
                <div
                    className="fixed inset-0 z-10"
                    onClick={() => setProfileDropdownOpen(false)}
                />
            )}
        </div>
    );
};

export default DashboardLayout;