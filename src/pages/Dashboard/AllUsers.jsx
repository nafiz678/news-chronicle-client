import { Button } from "@/components/ui/button";
import useAuth from "@/hooks/useAuth";
import useAxiosSecure from "@/hooks/useAxiosSecure";
import Loader from "@/shared/LoaderSpinner";
import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";

const AllUsers = () => {
    const axiosSecure = useAxiosSecure()
    const { user } = useAuth()

    const { data: users = [], isLoading, refetch } = useQuery({
        queryKey: ["users"],
        queryFn: async () => {
            const { data } = await axiosSecure.get(`/all-users/${user?.email}`)
            return data
        }
    })

    console.log(users)

    const handleAdmin = async (email) => {
        // make admin api call
        Swal.fire({
            title: "Make this user Admin?",
            icon: "question",
            showCancelButton: true,
            confirmButtonColor: "#2F2F31",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, Make Admin!"
        }).then(async (result) => {
            if (result.isConfirmed) {
                const { data } = await axiosSecure.patch(`/make-admin/${email}`)
                if (data.modifiedCount > 0) {
                    console.log(data)
                    refetch()
                    Swal.fire({
                        title: "Approved",
                        text: "Article Approved Successfully.",
                        icon: "success"
                    });
                }

            }
        });
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
                                        <td className="">
                                            {user.role === "admin" ?
                                                <p className="px-6 inline py-1 rounded-md bg-black text-white">Admin</p>
                                                :
                                                <Button onClick={() => handleAdmin(user.email)} size="sm"> make admin </Button>
                                            }
                                        </td>

                                    </tr>)}
                            </tbody>
                        </table>
                    </div>
                    :
                    <div className="md:p-20"> <h2 className="text-6xl">No users found at the moment.</h2></div>
            }
        </div>
    );
};

export default AllUsers;