import {
  createBrowserRouter
} from "react-router";
import MainLayout from "../layouts/MainLayout";
import Home from "../pages/Home";
import SignIn from "../pages/SignIn";
import Register from "../pages/Register";
import UpcomingEvents from "../pages/UpcomingEvents";
import ContactUs from "../pages/ContactUs";
import JoinedEvents from "../pages/JoinedEvents";
import ManageEvents from "../pages/ManageEvents";
import ViewEvent from "../pages/ViewEvent";
import CreateEvent from "../pages/CreateEvent";

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
                element: <UpcomingEvents />
            },
            {
                path: "upcoming-events/:id",
                element: <ViewEvent/>
            },
            {
                path: "/create-event",
                element: <CreateEvent />
            },
            {
                path: "/joined-events",
                element: <JoinedEvents />
            },
            {
                path: "/manage-events",
                element: <ManageEvents/>
            },
            {
                path: "/about",
                element: <div className='text-2xl font-bold'>About</div>
            },
            {
                path: "/contact",
                element: <ContactUs />
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