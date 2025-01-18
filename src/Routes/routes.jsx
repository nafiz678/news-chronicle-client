import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import Home from "@/pages/Home";
import AddArticles from "@/pages/AddArticles";
import AllArticles from "@/pages/AllArticles";
import Dashboard from "@/pages/Dashboard/Dashboard";
import Subscription from "@/pages/SubscriptionPage";
import MyArticles from "@/pages/MyArticles";
import Login from "@/pages/Login";
import Register from "@/pages/Register";
import PrivateRoute from "./PrivateRoute";
import ArticleDetails from "@/pages/ArticleDetails";
import AllUsers from "@/pages/Dashboard/AllUsers";
import AllArticlesForAdmin from "@/pages/Dashboard/AllArticlesForAdmin";
import AddPublisher from "@/pages/Dashboard/AddPublisher";
import AdminRoute from "./AdminRoutes";
import ErrorPage from "@/components/ErrorElement";
import DashboardPage from "@/pages/Dashboard/DashboardPage";

const router = createBrowserRouter([
    {
        path: "/",
        errorElement: <ErrorPage></ErrorPage>,
        element: <MainLayout></MainLayout>,
        children: [
            {
                path: "/",
                element: <Home></Home>,
            },
            {
                path: "/add-article",
                element: <PrivateRoute><AddArticles></AddArticles></PrivateRoute>
            },
            {
                path: "/all-articles",
                element: <AllArticles></AllArticles>
            },
            {
                path: "/article/:id",
                element: <ArticleDetails></ArticleDetails>,

            },
            {
                path: "/subscription",
                element: <PrivateRoute><Subscription></Subscription></PrivateRoute>
            },
            {
                path: "/my-articles",
                element: <PrivateRoute><MyArticles></MyArticles></PrivateRoute>
            },
            {
                path: "/login",
                element: <Login></Login>
            },
            {
                path: "/register",
                element: <Register></Register>
            },

        ]
    },
    {
        path: "/dashboard",
        errorElement: <ErrorPage></ErrorPage>,
        element:
            <PrivateRoute>
                <AdminRoute><Dashboard></Dashboard></AdminRoute>
            </PrivateRoute>,
        children: [
            {
                index: true,
                element:
                    <PrivateRoute>
                        <AdminRoute><DashboardPage></DashboardPage> </AdminRoute>
                    </PrivateRoute>,
            },
            {
                path: "all-users",
                element:
                    <PrivateRoute>
                        <AdminRoute><AllUsers></AllUsers> </AdminRoute>
                    </PrivateRoute>,
            },
            {
                path: "all-articles",
                element:
                    <PrivateRoute>
                        <AdminRoute><AllArticlesForAdmin></AllArticlesForAdmin> </AdminRoute>
                    </PrivateRoute>,
            },
            {
                path: "add-publisher",
                element:
                    <PrivateRoute>
                        <AdminRoute><AddPublisher></AddPublisher></AdminRoute>
                    </PrivateRoute>,
            },
        ]
    },

]);

export default router