import { Navigate, useLocation } from 'react-router-dom'
import Loader from '@/shared/LoaderSpinner'
import useAuth from '@/hooks/useAuth'

const PrivateRoute = ({ children }) => {
  const { user, loading } = useAuth()
  const location = useLocation()

  if (loading) return <Loader />
  if (user) return children
  return <Navigate to='/login' state={{ from: location }} replace='true' />
}


export default PrivateRoute
