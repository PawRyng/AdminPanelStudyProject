import { createBrowserRouter, redirect, Navigate } from "react-router-dom";
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
import { loader as productsLoading } from "../Components/Products/ShowProducts/LoadProducts.ts";
import { loader as getProductLoader } from "../Components/Products/EditProduct/loader.ts";
import { loader as getCategories } from "../Components/Categories/Show/loader.ts";
import { loader as getCategoryLoader } from "../Components/Categories/Edit/loader.ts";
import { loader as getOrders } from "../Components/Orders/LoadOrders.ts";
import { loader as getOrder } from "../Components/Order/LoadOrder.ts";


// actions
import { action as loginAction } from "../Pages/Login/loginAction.tsx";
import { action as deleteProductAction } from "../Components/Products/DeleteAction.tsx";
import { action as editProductAction } from "../Components/Products/EditProduct/action.ts";
import { action as addProductAction } from "../Components/Products/AddProduct/action.ts";
import { action as addCategoryAction } from "../Components/Categories/Add/action.ts";
import { action as editCategoryAction } from "../Components/Categories/Edit/action.ts";
import { action as deleteCategoryAction } from "../Components/Categories/Delete/action.ts";

const HomeView = React.lazy(() => import("../Components/Home/index.tsx"));
const Products = React.lazy(() => import("../Components/Products/ShowProducts/index.tsx"));
const Users = React.lazy(() => import("../Components/Users/index.tsx"));
const EditProduct = React.lazy(() => import("../Components/Products/EditProduct/index.tsx"));
const AddProduct = React.lazy(() => import("../Components/Products/AddProduct/index.tsx"));
const ShowCategories = React.lazy(() => import("../Components/Categories/Show/index.tsx"));
const AddCategory = React.lazy(() => import("../Components/Categories/Add/index.tsx"));
const EditCategory = React.lazy(() => import("../Components/Categories/Edit/index.tsx"));
const Orders = React.lazy(() => import("../Components/Orders/index.tsx"));
const Order = React.lazy(() => import("../Components/Order/index.tsx"));

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
                element: <HomeView />
            },
            {
                path: "/dashboard/products",
                element: (
                    <Suspense fallback={<Skeleton/>}>
                        <Products />
                    </Suspense>
                ),
                loader: productsLoading,
                children: [
                    {
                      path: ":page",
                      element: (
                        <Suspense fallback={<Skeleton />}>
                          <Products />
                        </Suspense>
                      ),
                      loader: productsLoading,
                    }                 
                ]
            },
            {
                path: "/dashboard/product",
                children: [
                    {
                      path: "/dashboard/product/edit/:id",
                      element: (
                        <Suspense fallback={<Skeleton />}>
                          <EditProduct />
                        </Suspense>
                      ),
                      loader: getProductLoader,
                      action: editProductAction
                    },
                    {
                      path: "/dashboard/product/add",
                      element: (
                        <Suspense fallback={<Skeleton />}>
                          <AddProduct />
                        </Suspense>
                      ),
                      action: addProductAction
                    },
                    {
                      path: "/dashboard/product/delete",
                      action: deleteProductAction
                    }             
                ]
            },
            {
              path: "/dashboard/categories",
              element: (
                  <Suspense fallback={<Skeleton/>}>
                      <ShowCategories />
                  </Suspense>
              ),
              loader: getCategories,
              children: [
                  {
                    path: ":page",
                    element: (
                      <Suspense fallback={<Skeleton />}>
                        <ShowCategories/>
                      </Suspense>
                    ),
                    loader: getCategories,
                  }                 
              ]
            },
            {
                path: "/dashboard/category",
                children: [
                    {
                      path: "/dashboard/category/add",
                      element: (
                        <Suspense fallback={<Skeleton />}>
                          <AddCategory />
                        </Suspense>
                      ),
                      action: addCategoryAction
                    },
                    {
                      path: "/dashboard/category/edit/:id",
                      element: (
                        <Suspense fallback={<Skeleton />}>
                          <EditCategory />
                        </Suspense>
                      ),
                      loader: getCategoryLoader,
                      action: editCategoryAction
                    },     
                    {
                      path: "/dashboard/category/delete",
                      action: deleteCategoryAction
                    },     
                ]
            },
            {
                path: "/dashboard/order",
                children: [
                    {
                      path: "/dashboard/order/edit/:id",
                      element: (
                        <Suspense fallback={<Skeleton />}>
                          <Order />
                        </Suspense>
                      ),
                      loader: getOrder
                    }
                ]
            },
            {
                path: "/dashboard/orders",
                element: <Orders/>,
                loader: getOrders,
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
