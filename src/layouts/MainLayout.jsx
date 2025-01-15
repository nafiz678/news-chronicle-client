import { Outlet } from "react-router-dom";
import Navbar from "../shared/Navbar";


const MainLayout = () => {
    return (
        <div>
            <nav className="bg-[#E3E3E3]">
                <Navbar></Navbar>
            </nav>

            <div className="h-screen ">
                <Outlet></Outlet>
            </div>

            <footer>
                ajdlkfjlsjdf
            </footer>
        </div>
    );
};

export default MainLayout;