import { FaUserCog } from 'react-icons/fa'
import { BsGraphUp } from 'react-icons/bs'
import MenuItem from './ui/MenuItem'
import { MdAddTask } from "react-icons/md";
import { GrArticle } from "react-icons/gr";


const AdminMenu = () => {
  return (
    <>
      <MenuItem
        icon={BsGraphUp}
        label='Statistics'
        address='/dashboard'
      />
      <MenuItem icon={FaUserCog} label='All Users' address='all-users' />
      <MenuItem icon={GrArticle} label='All Articles' address='all-articles' />
      <MenuItem icon={MdAddTask} label='Add Publisher' address='add-publisher' />
    </>
  )
}

export default AdminMenu
