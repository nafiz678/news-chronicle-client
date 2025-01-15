import './navbar.css';
import { Link, NavLink } from 'react-router-dom';
import { ModeToggle } from '@/components/toggle';
import logo from "@/assets/logo.png"
import user2 from "@/assets/user.png"
import useAuth from '@/hooks/useAuth';

function Navbar() {
    const { user, loading, logOut } = useAuth()

    if (loading) return
    return (
        <div className="navbar md:w-11/12 mx-auto justify-between">
            <div className="justify-start ">
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
                        className="menu bg-white/90 menu-sm dropdown-content rounded-box z-[1] mt-3 w-52 p-2 shadow gap-2">
                        <div className=" flex items-center gap-10">
                            <div role="button" className="p-2 border inline-block rounded-full border-gray-400">
                                <img className='w-8 h-8' src={user} alt="" />
                            </div>
                            <Link to="/login" className="px-6 py-2 bg-gray-800 text-white dark:text-background font-medium rounded-md shadow-md dark:bg-gray-300 transition duration-300 mr-4">Login</Link>
                        </div>

                        <li><NavLink className={"mr-3 bg-background rounded-full border bg-[#DCDCDC] border-gray-400 dark:bg-[#DCDCDC] dark:text-background"} to={"/"}>Home</NavLink></li>
                        <li><NavLink className={"mr-3 bg-background rounded-full border bg-[#DCDCDC] border-gray-400 dark:bg-[#DCDCDC] dark:text-background"} to={"/all-articles"}>All Articles</NavLink></li>
                        <li><NavLink className={"mr-3 bg-background rounded-full border bg-[#DCDCDC] border-gray-400 dark:bg-[#DCDCDC] dark:text-background"} to={"/add-article"}>Add Articles</NavLink></li>
                        <li><NavLink className={"mr-3 bg-background rounded-full border bg-[#DCDCDC] border-gray-400 dark:bg-[#DCDCDC] dark:text-background"} to={"/subscription"}>Subscription</NavLink></li>
                        <li><NavLink className={"mr-3 bg-background rounded-full border bg-[#DCDCDC] border-gray-400 dark:bg-[#DCDCDC] dark:text-background"} to={"/dashboard"}>Dashboard</NavLink></li>
                        <li><NavLink className={"mr-3 bg-background rounded-full border bg-[#DCDCDC] border-gray-400 dark:bg-[#DCDCDC] dark:text-background"} to={"/my-articles"}>My Articles</NavLink></li>
                    </ul>
                </div>
                <Link to={"/"} className="flex items-center justify-center gap-3">
                    <div className='p-2 rounded-full bg-black'>
                        <img className='w-6 h-6 rounded-full' src={logo} alt="logo" />
                    </div>
                    <span className='text-xl text-[#2C2F54]'>News Chronicle</span>
                </Link>
            </div>
            <div className="navbar-end flex-1 hidden lg:flex">
                <ul className="menu menu-horizontal px-1 uppercase">
                    <li><NavLink className={"mr-3 bg-background rounded-full border bg-[#DCDCDC] border-gray-400 dark:bg-[#DCDCDC] dark:text-background"} to={"/"}>Home</NavLink></li>
                    <li><NavLink className={"mr-3 bg-background rounded-full border bg-[#DCDCDC] border-gray-400 dark:bg-[#DCDCDC] dark:text-background"} to={"/all-articles"}>All Articles</NavLink></li>
                    <li><NavLink className={"mr-3 bg-background rounded-full border bg-[#DCDCDC] border-gray-400 dark:bg-[#DCDCDC] dark:text-background"} to={"/add-article"}>Add Articles</NavLink></li>
                    <li><NavLink className={"mr-3 bg-background rounded-full border bg-[#DCDCDC] border-gray-400 dark:bg-[#DCDCDC] dark:text-background"} to={"/subscription"}>Subscription</NavLink></li>
                    <li><NavLink className={"mr-3 bg-background rounded-full border bg-[#DCDCDC] border-gray-400 dark:bg-[#DCDCDC] dark:text-background"} to={"/dashboard"}>Dashboard</NavLink></li>


                </ul>
            </div>
            {/* login or signup methods */}
            {user ?
                <button onClick={() => logOut()} className="px-6 hidden lg:inline-block py-2 bg-gray-800 text-white dark:text-background font-medium rounded-md shadow-md dark:bg-gray-300 transition duration-300 mr-4">Logout</button>
                :
                <Link to="/login" className="px-6 hidden lg:inline-block py-2 bg-gray-800 text-white dark:text-background font-medium rounded-md shadow-md dark:bg-gray-300 transition duration-300 mr-4">Login</Link>}
            <div className="dropdown hidden lg:inline-block dropdown-hover">
                <div tabIndex={0} role="button" className="p-1 border rounded-full border-gray-400">
                    <img src={user && user.photoURL ? user.photoURL : user2} className='w-8 h-8 rounded-full object-cover' alt="" />
                </div>
                <ul tabIndex={0} className="dropdown-content bg-white/55 absolute top-10 right-0 w-52 menu rounded-box z-[1] p-2 shadow">

                    <div>
                        <li><NavLink className={"mr-3 bg-background rounded-full border bg-[#DCDCDC] border-gray-400 dark:bg-[#DCDCDC] dark:text-background"} to={"/my-articles"}>My Articles</NavLink></li>

                        <ModeToggle></ModeToggle>
                    </div>
                </ul>
            </div>
            <div className='lg:hidden'>
                <ModeToggle></ModeToggle>
            </div>

        </div>
    );
}

export default Navbar