import './navbar.css';
import { Link, NavLink } from 'react-router-dom';
import { ModeToggle } from '@/components/toggle';


const mainLinks = [
    { link: '#', label: 'Home' },
    { link: '#', label: 'Add Articles' },
    { link: '#', label: 'All Articles' },
    { link: '#', label: 'Subscription' },
    { link: '#', label: 'Dashboard ' },
    { link: '#', label: 'My Articles' },
];

function Navbar() {

    return (
        <div className="navbar ">
            <div className="navbar-start">
                <div className="dropdown">
                    <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor">
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M4 6h16M4 12h8m-8 6h16" />
                        </svg>
                    </div>
                    <ul
                        tabIndex={0}
                        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
                        <li><NavLink to={"/"}>Home</NavLink></li>
                        <li><NavLink to={"/"}>All Articles</NavLink></li>
                    </ul>
                </div>
                <a className="btn btn-ghost text-xl">daisyUI</a>
            </div>
            <div className="navbar-end hidden lg:flex">
                <ul className="menu menu-horizontal px-1">
                    <li><NavLink className={"mr-3 bg-background"} to={"/"}>Home</NavLink></li>
                    <li><NavLink className={"mr-3 bg-background"} to={"/all-articles"}>All Articles</NavLink></li>
                    <li><NavLink className={"mr-3 bg-background"} to={"/add-article"}>Add Articles</NavLink></li>
                    <li><NavLink className={"mr-3 bg-background"} to={"/subscription"}>Subscription</NavLink></li>
                    <li><NavLink className={"mr-3 bg-background"} to={"/dashboard"}>Dashboard</NavLink></li>
                    <li><NavLink className={"mr-3 bg-background"} to={"/my-articles"}>My Articles</NavLink></li>
                </ul>
            </div>
            {/* login or signup methods */}
                <Link to="/login" className="px-6 py-2 bg-gray-800 text-white font-medium rounded-md shadow-md hover:bg-blue-700 transition duration-300 mr-4">Login</Link>
                <ModeToggle></ModeToggle>

            </div>
    );
}

export default Navbar