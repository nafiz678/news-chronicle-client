import UpdateUserProfile from '@/components/UpdateUserModal';
import useAuth from '@/hooks/useAuth';
import useAxiosSecure from '@/hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import moment from 'moment';
import { useState } from 'react';

const UserProfile = () => {
    const { user, logOut } = useAuth()
    const axiosSecure = useAxiosSecure()
    let [isOpen, setIsOpen] = useState(false)

    function open() {
        setIsOpen(true)
    }
    function close() {
        setIsOpen(false)
    }


    const { data: articles = [] } = useQuery({
        queryKey: ["articles", user?.email],
        queryFn: async () => {
            const { data } = await axiosSecure.get(`/articles/${user?.email}`)
            return data
        }
    })

    const { data: DBuser = {} } = useQuery({
        queryKey: ["user", user?.email],
        queryFn: async () => {
            const { data } = await axiosSecure.get(`/user/${user?.email}`)
            return data
        }
    })

    


    return (
        <div className="bg-gray-50 py-16 px-4 sm:px-6 lg:px-8">
            <div className="max-w-screen-xl mx-auto">
                {/* Profile Header with Background Image */}
                <div className="relative rounded-lg shadow-lg overflow-hidden">
                    <div className="w-full h-full bg-gradient-to-r from-blue-500 to-teal-400 absolute top-0 left-0 z-0" />
                    <div className="relative z-10 flex items-center justify-center p-6 py-10">
                        <div className="flex flex-col items-center md:flex-row md:items-center text-center md:text-left">
                            {/* Profile Picture */}
                            <div className="w-44 h-44 rounded-full border-4 border-white overflow-hidden mb-6 md:mb-0 md:mr-8">
                                <img
                                    src={user?.photoURL}
                                    alt="User Profile"
                                    className="w-full h-full object-cover"
                                />
                            </div>

                            {/* User Info */}
                            <div className="text-white">
                                <h1 className="text-4xl font-bold">{user.displayName}</h1>
                                <p className="text-lg">{user.email}</p>
                                <p className="mt-4 text-lg font-light">{user.description || "No description available."}</p>
                                {DBuser.premiumTaken ? <p className='text-black/80 inline-block px-2 rounded-full bg-orange-500'>Premium Ends {moment(DBuser?.premiumTaken).endOf('second',).fromNow()}</p>:""}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Main Content */}
                <div className="mt-12 grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-3">
                    {/* Personal Details Card */}
                    <div className="bg-white rounded-xl shadow-lg p-6">
                        <h2 className="text-2xl font-semibold mb-4">Personal Information</h2>
                        <div className="space-y-4">
                            <div className="flex justify-between">
                                <span className="font-medium">Full Name:</span>
                                <span>{user.displayName}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="font-medium">Email:</span>
                                <span>{user.email}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="font-medium">Location:</span>
                                <span>{user.location || "Not provided"}</span>
                            </div>
                        </div>
                    </div>

                    {/* Posts & Stats Card */}
                    <div className="bg-white rounded-xl shadow-lg p-6">
                        <h2 className="text-2xl font-semibold mb-4">Statistics</h2>
                        <div className="space-y-4">
                            <div className="flex justify-between">
                                <span className="font-medium">Total Posts:</span>
                                <span>{articles.length}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="font-medium">Followers:</span>
                                <span>{user?.followersCount || "Coming soon"}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="font-medium">Following:</span>
                                <span>{user.followingCount || "Coming soon"}</span>
                            </div>
                        </div>
                    </div>

                    {/* Recent Posts Card */}
                    <div className="bg-white rounded-xl shadow-lg p-6">
                        <h2 className="text-2xl font-semibold mb-4">Recent Posts</h2>
                        <ul className="space-y-4">
                            {articles && articles.length > 0 ? (
                                articles.map((post, index) => (
                                    <li key={index} className="flex items-center gap-3">
                                        <div className="flex-shrink-0 w-12 h-12 rounded-full bg-gray-300">
                                            <img
                                                src={post.image}
                                                alt={post.title}
                                                className="w-full h-full object-cover rounded-full"
                                            />
                                        </div>
                                        <div>
                                            <p className="font-medium">{post.title}</p>
                                            <p className="text-sm text-gray-500">{moment(post.postedDate).format('lll')}</p>
                                        </div>
                                    </li>
                                )).slice(0, 2)
                            ) : (
                                <p className="text-sm text-gray-500">No recent posts available.</p>
                            )}
                        </ul>
                    </div>
                </div>

                {/* Footer Actions */}
                <div className="mt-12 text-center">
                    <button
                        onClick={open}
                        className="px-8 py-3 bg-teal-600 text-white font-semibold rounded-lg hover:bg-teal-700 transition duration-300 mx-4"
                    >
                        Update User
                    </button>
                    <button
                        onClick={logOut}
                        className="px-8 py-3 bg-transparent border-2 border-teal-600 text-teal-600 font-semibold rounded-lg hover:bg-teal-600 hover:text-white transition duration-300 mx-4"
                    >
                        Log Out
                    </button>
                </div>
            </div>
            <UpdateUserProfile isOpen={isOpen} close={close}  ></UpdateUserProfile>
        </div>
    );
};

export default UserProfile;
