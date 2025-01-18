import { Outlet } from "react-router-dom";
import Navbar from "../shared/Navbar";
import Footer from "@/shared/Footer";
import useAuth from "@/hooks/useAuth";
import Loader from "@/shared/LoaderSpinner";
import ScrollProgress from "@/components/ui/scroll-progress";

const MainLayout = () => {
    const { loading } = useAuth()


    if (loading) return <div className="flex items-center justify-center gap-3 h-screen">
        <Loader></Loader> <h1 className="text-4xl">Loading</h1></div>
    return (
        <div>
            <nav className="bg-[#E3E3E3]">
                <Navbar></Navbar>
            </nav>

            <div className="">
                <ScrollProgress className="top-[87px]" />
            </div>

            <div className=" pt-24">
                <Outlet></Outlet>
            </div>

            <footer>
                <Footer></Footer>
            </footer>
        </div>
    );
};

export default MainLayout;