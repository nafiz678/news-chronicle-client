import { Outlet } from "react-router-dom";
import Navbar from "../shared/Navbar";


const MainLayout = () => {
    return (
        <div>
            <Navbar></Navbar>
            
            <div className="h-screen">
                <Outlet></Outlet>
            </div>
        </div>
    );
};

export default MainLayout;