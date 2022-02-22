//pages
import NotFound from "../../pages/NotFound";
import Login from "../../pages/Login";
import Register from "../../pages/Register";
import Dashboard from "../../pages/Overviews/Dashboard";
import Presensi from "../../pages/Overviews/Presensi";
import Details from "../../pages/Overviews/Details";
import Helps from "../../pages/Overviews/Helps";
import Settings from "../../pages/Overviews/Settings";

// components

export const routes = [
    //  404 ------
    {
        path: "/*",
        element: NotFound,
    },
    //  404 ------
    {
        path: "/",
        element: Login,
    },
    {
        path: "register",
        element: Register,
    },
    {
        path: "dashboard",
        element: Dashboard,
        isProtected: true,
    },
    {
        path: "presence",
        element: Presensi,
        isProtected: true,
    },
    {
        path: "details",
        element: Details,
        isProtected: true,
    },
    {
        path: "helps",
        element: Helps,
        isProtected: true,
    },
    {
        path: "settings",
        element: Settings,
        isProtected: true,
    },
];
