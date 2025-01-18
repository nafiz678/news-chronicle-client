import { FaUserCog } from 'react-icons/fa'
import MenuItem from './ui/MenuItem'
import { MdAddTask } from "react-icons/md";
import { GrArticle } from "react-icons/gr";
import AddPublisherModal from './AddPublisherModal';
import { useState } from 'react';
import useAuth from '@/hooks/useAuth';
import { MdOutlineSpaceDashboard } from "react-icons/md";


const AdminMenu = () => {

  const { user } = useAuth()
  const [isOpen, setIsOpen] = useState(false)

  const closeModal = () => {
    setIsOpen(false)
  }


  return (
    <>
      <MenuItem icon={MdOutlineSpaceDashboard} label='Dashboard' address='/dashboard' />
      <MenuItem icon={FaUserCog} label='All Users' address='all-users' />
      <MenuItem icon={GrArticle} label='All Articles' address='all-articles' />
      <button
        onClick={() => setIsOpen(true)}
        className='flex items-center px-4 py-2 mt-5  transition-colors duration-300 transform text-gray-600 w-full  hover:bg-gray-300   hover:text-gray-700 cursor-pointer'
      >
        <MdAddTask className='w-5 h-5' />

        <span className='mx-4 font-medium'>Add Publisher</span>
      </button>
      <AddPublisherModal  closeModal={closeModal} isOpen={isOpen} />
    </>
  )
}

export default AdminMenu
