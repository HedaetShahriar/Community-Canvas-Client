import React from 'react';
import createEvent from '../../assets/createEvents.png';
import manageEvent from '../../assets/manageEvents.png';
import volunteerProfile from '../../assets/volunteers Working.png';

import { 
    CheckCircle2
} from 'lucide-react';
const Features = () => {
    return (
        <section className="bg-light pt-16 md:pt-20">
            <div className="container mx-auto px-6">
                <div className="text-center mb-12 md:mb-16">
                    <h2 className="text-3xl md:text-4xl font-bold text-dark">A Platform Built for Action</h2>
                    <p className="mt-4 text-base md:text-lg max-w-3xl mx-auto">We provide all the tools you need to create, manage, and participate in community service.</p>
                </div>
                <div className="space-y-16 md:space-y-24">
                    <div className="grid md:grid-cols-2 items-center gap-8 md:gap-12">
                        <div className="text-center md:text-left">
                            <span className="inline-block bg-secondary text-secondary-content font-semibold px-4 py-1 rounded-full mb-4">For Organizers</span>
                            <h3 className="text-2xl md:text-3xl font-bold text-dark">Create Events Seamlessly</h3>
                            <p className="mt-4 text-base md:text-lg text-body">Bring your community initiative to life. Our simple form lets you set up your event, define your goals, and start gathering volunteers in minutes.</p>
                            <ul className="mt-6 space-y-4 text-base md:text-lg">
                                <li className="flex items-start"><CheckCircle2 className="w-6 h-6 text-secondary-content mr-3 mt-1 flex-shrink-0" /><span><strong>Set Clear Goals:</strong> Define volunteer numbers and objectives.</span></li>
                                <li className="flex items-start"><CheckCircle2 className="w-6 h-6 text-secondary-content mr-3 mt-1 flex-shrink-0" /><span><strong>Schedule & Locate:</strong> Pinpoint the exact time and location on a map.</span></li>
                            </ul>
                        </div>
                        <div className="bg-gray-100 p-6 md:p-8 rounded-2xl shadow-md"><img src={createEvent} alt="Create Event Form Mockup" className="rounded-xl w-full h-auto" /></div>
                    </div>
                    <div className="grid md:grid-cols-2 items-center gap-8 md:gap-12">
                        <div className="md:order-last text-center md:text-left">
                            <span className="inline-block bg-primary text-primary-content font-semibold px-4 py-1 rounded-full mb-4">For Organizers</span>
                            <h3 className="text-2xl md:text-3xl font-bold text-dark">Manage Like a Pro</h3>
                            <p className="mt-4 text-base md:text-lg text-body">Your organizer dashboard gives you a bird's-eye view of your event. Communicate with volunteers, track sign-ups, and make updates on the fly.</p>
                            <ul className="mt-6 space-y-4 text-base md:text-lg">
                                <li className="flex items-start"><CheckCircle2 className="w-6 h-6 text-primary mr-3 mt-1 flex-shrink-0" /><span><strong>Volunteer List:</strong> See who's coming and manage attendance.</span></li>
                                <li className="flex items-start"><CheckCircle2 className="w-6 h-6 text-primary mr-3 mt-1 flex-shrink-0" /><span><strong>Send Updates:</strong> Easily send announcements to all participants.</span></li>
                            </ul>
                        </div>
                        <div className="bg-gray-100 p-6 md:p-8 rounded-2xl shadow-md"><img src={manageEvent} alt="Event Management Dashboard Mockup" className="rounded-xl w-full h-auto" /></div>
                    </div>
                    <div className="grid md:grid-cols-2 items-center gap-8 md:gap-12">
                        <div className="text-center md:text-left">
                            <span className="inline-block bg-accent text-white font-semibold px-4 py-1 rounded-full mb-4">For Volunteers</span>
                            <h3 className="text-2xl md:text-3xl font-bold text-dark">Your Volunteer Hub</h3>
                            <p className="mt-4 text-base md:text-lg text-body">Find events you're passionate about and join with one click. Your personal dashboard keeps track of your schedule and contribution history.</p>
                            <ul className="mt-6 space-y-4 text-base md:text-lg">
                                <li className="flex items-start"><CheckCircle2 className="w-6 h-6 text-accent mr-3 mt-1 flex-shrink-0" /><span><strong>My Events:</strong> View your upcoming and past events in one place.</span></li>
                                <li className="flex items-start"><CheckCircle2 className="w-6 h-6 text-accent mr-3 mt-1 flex-shrink-0" /><span><strong>Impact History:</strong> See a summary of your volunteer hours.</span></li>
                            </ul>
                        </div>
                        <div className="bg-gray-100 p-6 md:p-8 rounded-2xl shadow-md"><img src={volunteerProfile} alt="Volunteer Profile Mockup" className="rounded-xl w-full h-auto" /></div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Features;