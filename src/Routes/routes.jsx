import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import Home from "@/pages/Home";
import AddArticles from "@/pages/AddArticles";
import AllArticles from "@/pages/AllArticles";
import Dashboard from "@/pages/Dashboard";
import Subscription from "@/pages/Subscription";
import MyArticles from "@/pages/MyArticles";
import Login from "@/pages/Login";
import Register from "@/pages/Register";
import PrivateRoute from "./PrivateRoute";
import ArticleDetails from "@/pages/ArticleDetails";

const router = createBrowserRouter([
    {
      path: "/",
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
            path: "/all-articles",
            element: <AllArticles></AllArticles>
        },
        {
            path: "/article/:id", 
            element: <ArticleDetails></ArticleDetails>,
            
        },
        {
            path: "/dashboard",
            element: <PrivateRoute><Dashboard></Dashboard></PrivateRoute>
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
  ]);

export default router