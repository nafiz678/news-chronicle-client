import { Button } from "@/components/ui/button";
import useAuth from "@/hooks/useAuth";
import useAxiosSecure from "@/hooks/useAxiosSecure";
import Loader from "@/shared/LoaderSpinner";
import { useQuery } from "@tanstack/react-query";
import { CiEdit } from "react-icons/ci";
import { TiDeleteOutline } from "react-icons/ti";
import { Link } from "react-router-dom";
import MessageModal from "@/components/MessageModal";
import Swal from "sweetalert2";
import { Helmet } from "react-helmet-async";



const MyArticles = () => {
    const { user } = useAuth()
    const axiosSecure = useAxiosSecure()




    const { data: articles = [], isLoading, refetch } = useQuery({
        queryKey: ["articles", user?.email],
        queryFn: async () => {
            const { data } = await axiosSecure.get(`/articles/${user?.email}`)
            return data
        }
    })

    const handleDelete = async (id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "question",
            showCancelButton: true,
            confirmButtonColor: "#2F2F31",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, Delete it!"
        }).then(async (result) => {
            if (result.isConfirmed) {
                const { data } = await axiosSecure.delete(`delete-article/${id}`)
                if (data.deletedCount > 0) {
                    Swal.fire({
                        title: "Deleted!",
                        text: "Article Deleted Successfully.",
                        icon: "success"
                    });
                    refetch()
                }

            }
        });
    }


    return (
        <div>
            <Helmet>
                <title>My Articles || News Chronicle</title>
            </Helmet>
            {isLoading
                ?
                <div className="flex items-center justify-center gap-3 h-screen">
                    <Loader></Loader> <h1 className="text-4xl">Loading</h1></div>
                :
                articles.length > 0 ?
                    <div className="overflow-x-auto w-11/12 mx-auto">
                        <table className="table">
                            {/* head */}
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>Article title</th>
                                    <th>Status</th>
                                    <th></th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {/* row 1 */}
                                {articles.map((article, idx) =>
                                    <tr key={article._id}>
                                        <th>{idx + 1}</th>
                                        <td>
                                            <div className="flex items-center gap-3">
                                                <div className="avatar">
                                                    <div className="mask mask-squircle h-12 w-12">
                                                        <img
                                                            src={article.image}
                                                            alt="Avatar Tailwind CSS Component" />
                                                    </div>
                                                </div>
                                                <div>
                                                    <div className="font-bold">{article.title}</div>
                                                    {article.isPremium ? <div className="text-sm opacity-80 badge bg-orange-500">Premium: Yes</div> : <p>Premium: No</p>}
                                                </div>
                                            </div>
                                        </td>
                                        <td className="capitalize flex items-center justify-start gap-4">
                                            {article.status}

                                            {article.message && <MessageModal message={article.message} ></MessageModal>}

                                        </td>
                                        <th>
                                            <Link to={`/article/${article._id}`} className="btn btn-ghost btn-xs">Details</Link>
                                        </th>
                                        <td className="flex items-center justify-start gap-10">

                                            <Link to={`/update-article/${article?._id}`}>
                                                <Button
                                                    size="sm"
                                                    className="rounded-md  text-sm font-medium text-white focus:outline-none"
                                                >
                                                    <CiEdit></CiEdit>
                                                </Button>
                                            </Link>


                                            <Button onClick={() => handleDelete(article._id)} size="sm"> <TiDeleteOutline></TiDeleteOutline> </Button>
                                        </td>

                                    </tr>)}
                            </tbody>
                        </table>
                    </div>
                    :
                    <div className="p-4 md:p-10 lg:p-20 text-center">
                        <h2 className="text-xl sm:text-3xl md:text-5xl lg:text-6xl font-bold">
                            No data available from &rdquo;{user.displayName}&rdquo;
                        </h2>
                    </div>
            }
        </div>
    );
};

export default MyArticles;