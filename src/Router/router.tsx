import { createBrowserRouter } from "react-router-dom";
import React, { Suspense } from "react";

// views
import Home from "../Pages/Main/index.tsx";  
import Dashboard from "../Pages/Dashboard/index.tsx";
import Login from "../Pages/Login/index.tsx";
import NoFound from "../Pages/NoFound/index.tsx";

// loaders;
import { loader as loginLoader } from "../Pages/Login/loader.tsx";
import { loader as dashboardLoader } from "../Pages/Dashboard/loader.tsx";
import { loader as mainPageLoader } from "../Pages/Main/loader.ts";
import { loader as usersLoader } from "../Components/Users/loader.ts";


// actions
import { action as loginAction } from "../Pages/Login/loginAction.tsx";
import { action as deleteProductAction } from "../Components/Products/DeleteAction.tsx";

const Products = React.lazy(() => import("../Components/Products/index.tsx"));
const Users = React.lazy(() => import("../Components/Users/index.tsx"));

const Skeleton = () => <div>Ładowanie...</div>;

export const router = createBrowserRouter([
    {
        path: "/",
        element: <Home/>,
        loader: mainPageLoader
    },
    {
        path: "/dashboard",
        element: <Dashboard/>,
        loader: dashboardLoader,
        children: [
            {
                path: "/dashboard/",
                element: "dashboard"
            },
            {
                path: "/dashboard/products",
                element: (
                    <Suspense fallback={<Skeleton/>}>
                        <Products />
                    </Suspense>
                ),
                children: [
                    {
                        path: "/dashboard/products/delete",
                        action: deleteProductAction
                    }
                ]
            },
            {
                path: "/dashboard/orders",
                element: "orders"
            },
            {
                path: "/dashboard/users",
                element: (
                    <Suspense fallback={<Skeleton/>}>
                        <Users />
                    </Suspense>
                ),
                loader: usersLoader
            },
        ]
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
