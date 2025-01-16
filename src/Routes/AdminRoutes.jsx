import useAuth from "@/hooks/useAuth";
import useRole from "@/hooks/useRole";
import Loader from "@/shared/LoaderSpinner";
import { Navigate } from "react-router-dom";


const AdminRoute = ({children}) => {
    const { user, loading } = useAuth()
    const [role, isLoading] = useRole()

    if (isLoading) return <div className="flex items-center justify-center gap-3 h-screen"> <Loader></Loader></div>
    if (role=== "admin") return children
    return <Navigate to='/dashboard' replace='true' />

};



export default AdminRoute;