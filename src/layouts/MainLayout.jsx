import { Outlet } from "react-router-dom";
import Navbar from "../shared/Navbar";
import Footer from "@/shared/Footer";


const MainLayout = () => {
    return (
        <div>
            <nav className="bg-[#E3E3E3]">
                <Navbar></Navbar>
            </nav>

            <div className="">
                <Outlet></Outlet>
            </div>

            <footer>
                <Footer></Footer>
            </footer>
        </div>
    );
};

export default MainLayout;