import { useState } from 'react'
import { GrLogout } from 'react-icons/gr'
import { AiOutlineBars } from 'react-icons/ai'
import { Link } from 'react-router-dom'
import useRole from '@/hooks/useRole'
import useAuth from '@/hooks/useAuth'
import logo from "@/assets/logo.png";
import AdminMenu from './AdminMenu'
import { FaHome } from 'react-icons/fa'
import MenuItem from './ui/MenuItem'
const Sidebar = () => {
  const { user, loading, logOut } = useAuth()
  const [isActive, setActive] = useState(false)
  const [role, isLoading] = useRole()


  // Sidebar Responsive Handler
  const handleToggle = () => {
    setActive(!isActive)
  }
  return (
    <>
      {/* Small Screen Navbar */}
      <div className='bg-gray-100 text-gray-800 flex justify-between md:hidden'>
        <div>
          <div className='p-4'>
            <Link to={"/"} className="flex items-center justify-center gap-3">
              <div className='p-2 rounded-full bg-black'>
                <img className='w-6 h-6 rounded-full' src={logo} alt="logo" />
              </div>
              <span className='text-xl text-[#2C2F54]'>News Chronicle</span>
            </Link>
          </div>
        </div>

        <button
          onClick={handleToggle}
          className='mobile-menu-button p-4 focus:outline-none focus:bg-gray-200'
        >
          <AiOutlineBars className='h-5 w-5' />
        </button>
      </div>

      {/* Sidebar */}
      <div
        className={`z-10 md:fixed flex flex-col justify-between overflow-x-hidden bg-gray-100 w-64 space-y-6 px-2 py-4 absolute inset-y-0 left-0 transform ${isActive && '-translate-x-full'
          }  md:translate-x-0  transition duration-200 ease-in-out`}
      >
        <div>
          <div>
            <Link to={"/"} className="flex items-center justify-center gap-3">
              <div className='p-2 rounded-full bg-black'>
                <img className='w-6 h-6 rounded-full' src={logo} alt="logo" />
              </div>
              <span className='text-xl text-[#2C2F54]'>News Chronicle</span>
            </Link>
          </div>

          {/* Nav Items */}
          <div className='flex flex-col justify-between flex-1 mt-6'>
            <nav>
              {/*  Menu Items */}
              <AdminMenu></AdminMenu>

            </nav>
          </div>
        </div>

        <div>
          <hr />

          <MenuItem
            icon={FaHome}
            label='Home'
            address='/'
          />
        </div>
      </div>
    </>
  )
}

export default Sidebar
