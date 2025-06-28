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
import PrivateRoutes from "./PrivateRoutes";

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
                element: <PrivateRoutes><ViewEvent /></PrivateRoutes>
            },
            {
                path: "/create-event",
                element: <PrivateRoutes><CreateEvent /></PrivateRoutes>
            },
            {
                path: "/joined-events",
                element: <PrivateRoutes><JoinedEvents /></PrivateRoutes>
            },
            {
                path: "/manage-events",
                element: <PrivateRoutes><ManageEvents /></PrivateRoutes>
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