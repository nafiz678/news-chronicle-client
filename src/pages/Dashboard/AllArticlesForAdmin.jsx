import ArticleDeclineModal from "@/components/ArticleDeclineModal";
import { Button } from "@/components/ui/button";
import useAxiosPublic from "@/hooks/useAxiosPublic";
import useRole from "@/hooks/useRole";
import Loader from "@/shared/LoaderSpinner";
import { useQuery } from "@tanstack/react-query";
import { IoIosDoneAll } from "react-icons/io";
import { Tooltip } from "react-tooltip";
import { MdDeleteForever } from "react-icons/md";


const AllArticlesForAdmin = () => {

    const axiosPublic = useAxiosPublic()
    const [role,] = useRole()

    const { data: articles = [], isLoading } = useQuery({
        queryKey: ["articles"],
        queryFn: async () => {
            const { data } = await axiosPublic.get("/all-articles")
            return data
        }
    })

    console.log(articles)


    return (
        <div>
            {isLoading ? <div className="flex items-center justify-center gap-3 h-screen">
                <Loader></Loader> <h1 className="text-4xl">Loading</h1></div>
                :
                articles.length > 0 ?
                    <div className="overflow-x-auto w-11/12 mx-auto">
                        <table className="table">
                            {/* head */}
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>Image</th>
                                    <th>Title</th>
                                    <th>Name</th>
                                    <th>Email</th>
                                    <th>Status</th>
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
                                                            referrerPolicy="no-referrer"
                                                            src={article.authorPhoto}
                                                            alt="Avatar Tailwind CSS Component" />
                                                    </div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className=" font-semibold">{article.title}</td>
                                        <td className="capitalize">{article.authorName}</td>
                                        <th>
                                            {article.authorEmail}
                                        </th>
                                        <td className="capitalize">{article.status}</td>
                                        <td className="flex items-center justify-start gap-2">
                                            <Button data-tooltip-id="my-tooltip" data-tooltip-content="Approve!" disabled={article.status === "approved"} size="sm"><IoIosDoneAll></IoIosDoneAll></Button>

                                            <ArticleDeclineModal></ArticleDeclineModal>

                                            <Button data-tooltip-id="my-tooltip" data-tooltip-content="Delete!" size="sm"> <MdDeleteForever></MdDeleteForever> </Button>
                                            <Button data-tooltip-id="my-tooltip" data-tooltip-content="Make Premium">Premium</Button>
                                        </td>

                                    </tr>)}
                            </tbody>
                        </table>
                    </div>
                    :
                    <h2 className="text-3xl">Data not available</h2>
            }
            <Tooltip id="my-tooltip" />

        </div>
    );
};

export default AllArticlesForAdmin;