import { createBrowserRouter } from "react-router-dom";
import Home from "../Pages/Main/index.tsx";  
import Dashboard from "../Pages/Dashboard/index.tsx";
import Login from "../Pages/Login/index.tsx";
import NoFound from "../Pages/NoFound/index.tsx";

// loaders;
import { loader as loginLoader } from "../Pages/Login/loader.tsx";
import { loader as dashboardLoader } from "../Pages/Dashboard/loader.tsx";
import { loader as mainPageLoader } from "../Pages/Main/loader.ts";


// actions
import { action as loginAction } from "../Pages/Login/loginAction.tsx";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <Home/>,
        loader: mainPageLoader
    },
    {
        path: "/dashboard",
        element: <Dashboard/>,
        loader: dashboardLoader
    },
    {
        path: "/login",
        element: <Login/>,
        loader: loginLoader,
        action: loginAction
    },
    {
        path: "*",
        element: <NoFound/>,
    },
]);
