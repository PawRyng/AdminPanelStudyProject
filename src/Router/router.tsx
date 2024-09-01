import { createBrowserRouter } from "react-router-dom";
import Home from "../Pages/Main/index.tsx";  
import Dashboard from "../Pages/Dashboard/index.tsx";
import Login from "../Pages/Login/index.tsx";
import NoFound from "../Pages/NoFound/index.tsx";
import { loader as dashboardLoader } from "../Pages/Dashboard/loader.tsx";

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
