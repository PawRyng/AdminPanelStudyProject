import { createBrowserRouter } from "react-router-dom";
import Home from "../Pages/Main/index";  
import Dashboard from "../Pages/Dashboard/index";
import Login from "../Pages/Login/index";
import NoFound from "../Pages/NoFound/index";
import { loader as dashboardLoader } from "../Pages/Dashboard/loader";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <Home/>,
    },
    {
        path: "/dashboard",
        element: <Dashboard/>,
        loader: dashboardLoader
    },
    {
        path: "/login",
        element: <Login/>,
    },
    {
        path: "*",
        element: <NoFound/>,
    },
]);
