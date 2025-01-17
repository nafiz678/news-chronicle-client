import { Button } from "@/components/ui/button";
import useAuth from "@/hooks/useAuth";
import useAxiosSecure from "@/hooks/useAxiosSecure";
import Loader from "@/shared/LoaderSpinner";
import { useQuery } from "@tanstack/react-query";
import { CiEdit } from "react-icons/ci";
import { TiDeleteOutline } from "react-icons/ti";
import { Link } from "react-router-dom";
import MessageModal from "@/components/MessageModal";



const MyArticles = () => {
    const { user } = useAuth()
    const axiosSecure = useAxiosSecure()

    const { data: articles = [], isLoading } = useQuery({
        queryKey: ["article"],
        queryFn: async () => {
            const { data } = await axiosSecure.get(`/articles/${user?.email}`)
            return data
        }
    })

    console.log(articles)

    return (
        <div>
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
                                                    {article.isPremium ? <div className="text-sm opacity-80 badge bg-orange-500">Premium</div> : ''}
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
                                            <Link><Button size="sm"> <CiEdit></CiEdit> </Button></Link>
                                            <Button size="sm"> <TiDeleteOutline></TiDeleteOutline> </Button>
                                        </td>

                                    </tr>)}
                            </tbody>
                        </table>
                    </div>
                    :
                    <div className="md:p-20"> <h2 className="text-6xl">No data available from &rdquo;{user.displayName}&rdquo;</h2></div>
            }
        </div>
    );
};

export default MyArticles;