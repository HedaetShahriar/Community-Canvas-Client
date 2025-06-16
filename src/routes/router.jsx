import {
  createBrowserRouter
} from "react-router";
import MainLayout from "../layouts/MainLayout";
import Home from "../pages/Home";
import SignIn from "../pages/SignIn";
import Register from "../pages/Register";

const router = createBrowserRouter([
    {
        path: "/",
        element: <MainLayout />,
        children: [
            {
                index: true,
                element: <Home />
            },
            {
                path: "/upcoming-events",
                element: <div className='text-2xl font-bold'>Upcoming Events</div>
            },
            {
                path: "/create-event",
                element: <div className='text-2xl font-bold'>Create Event</div>
            },
            {
                path: "/joined-events",
                element: <div className='text-2xl font-bold'>Joined Events</div>
            },
            {
                path: "/manage-events",
                element: <div className='text-2xl font-bold'>Manage Events</div>
            },
            {
                path: "/about",
                element: <div className='text-2xl font-bold'>About</div>
            },
            {
                path: "/contact",
                element: <div className='text-2xl font-bold'>Contact</div>
            }
        ]
    },
    {
        path: "/auth/login",
        element:<SignIn />
    },
    {
        path: "/auth/register",
        element: <Register />
    }
]);

export default router;