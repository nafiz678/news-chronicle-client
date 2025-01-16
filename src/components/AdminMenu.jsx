import { FaUserCog } from 'react-icons/fa'
import { BsGraphUp } from 'react-icons/bs'
import MenuItem from './ui/MenuItem'

const AdminMenu = () => {
  return (
    <>
      <MenuItem
        icon={BsGraphUp}
        label='Statistics'
        address='/dashboard'
      />
      <MenuItem icon={FaUserCog} label='Manage Users' address='all-users' />
      <MenuItem icon={FaUserCog} label='Manage Users' address='all-articles' />
      <MenuItem icon={FaUserCog} label='Manage Users' address='add-publisher' />
    </>
  )
}

export default AdminMenu
