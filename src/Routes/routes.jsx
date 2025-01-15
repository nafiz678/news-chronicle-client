import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import Home from "@/pages/Home";
import AddArticles from "@/pages/AddArticles";
import AllArticles from "@/pages/AllArticles";
import Dashboard from "@/pages/Dashboard";

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
            element: <AddArticles></AddArticles>
        },
        {
            path: "/all-articles",
            element: <AllArticles></AllArticles>
        },
        {
            path: "/dashboard",
            element: <Dashboard></Dashboard>
        },
      ]
    },
  ]);

export default router