import { Button } from "@/components/ui/button";
import useAxiosSecure from "@/hooks/useAxiosSecure";
import useRole from "@/hooks/useRole";
import Loader from "@/shared/LoaderSpinner";
import { useQuery } from "@tanstack/react-query";

const AllUsers = () => {
    const axiosSecure = useAxiosSecure()

    const { data: users = [], isLoading, refetch } = useQuery({
        queryKey: ["articles"],
        queryFn: async () => {
            const { data } = await axiosSecure.get("/all-users")
            return data
        }
    })

    console.log(users)

    const handleAdmin = async (email) => {
        // make admin api call
        const {data} = await axiosSecure.patch(`/make-admin/${email}`)
        console.log(data)
        refetch()
    }


    return (
        <div>
            {isLoading
                ?
                <div className="flex items-center justify-center gap-3 h-screen">
                    <Loader></Loader> <h1 className="text-4xl">Loading</h1></div>
                :
                users.length > 0 ?
                    <div className="overflow-x-auto w-11/12 mx-auto">
                        <table className="table">
                            {/* head */}
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>Image</th>
                                    <th>Name</th>
                                    <th>Email</th>
                                    <th>Status</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {/* row 1 */}
                                {users.map((user, idx) =>
                                    <tr key={user._id}>
                                        <th>{idx + 1}</th>
                                        <td>
                                            <div className="flex items-center gap-3">
                                                <div className="avatar">
                                                    <div className="mask mask-squircle h-12 w-12">
                                                        <img
                                                            referrerPolicy="no-referrer"
                                                            src={user.image}
                                                            alt="Avatar Tailwind CSS Component" />
                                                    </div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="capitalize">{user.name}</td>
                                        <th>
                                            {user.email}
                                        </th>
                                        <td className="capitalize">{user.role}</td>
                                        <td className="">
                                            {user.role === "admin" ? 
                                            <p  className="px-6 inline py-1 rounded-md bg-black text-white">Admin</p>
                                                :
                                                <Button onClick={()=> handleAdmin(user.email) } size="sm"> make admin </Button>
                                            }
                                        </td>

                                    </tr>)}
                            </tbody>
                        </table>
                    </div>
                    :
                    <div className="md:p-20"> <h2 className="text-6xl">No data available</h2></div>
            }
        </div>
    );
};

export default AllUsers;