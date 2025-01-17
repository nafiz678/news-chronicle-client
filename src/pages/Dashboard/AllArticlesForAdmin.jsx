import ArticleDeclineModal from "@/components/ArticleDeclineModal";
import { Button } from "@/components/ui/button";
import useAxiosPublic from "@/hooks/useAxiosPublic";
import useRole from "@/hooks/useRole";
import Loader from "@/shared/LoaderSpinner";
import { useQuery } from "@tanstack/react-query";
import { IoIosDoneAll } from "react-icons/io";
import { Tooltip } from "react-tooltip";
import { MdDeleteForever } from "react-icons/md";
import toast from "react-hot-toast";
import useAxiosSecure from "@/hooks/useAxiosSecure";
import Swal from "sweetalert2";


const AllArticlesForAdmin = () => {

    const axiosPublic = useAxiosPublic()
    const axiosSecure = useAxiosSecure()
    const [role,] = useRole()
    
  // State to hold the textarea value


    const { data: articles = [], isLoading, refetch } = useQuery({
        queryKey: ["articles"],
        queryFn: async () => {
            const { data } = await axiosPublic.get("/all-articles")
            return data
        }
    })



    // const handleChange = (event) => {
    //     setText(event.target.value);
    // };

    const handleApprove = async (id) => {
        Swal.fire({
            title: "Approve This Article?",
            icon: "question",
            showCancelButton: true,
            confirmButtonColor: "#2F2F31",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, Approve it!"
          }).then( async (result) => {
            if (result.isConfirmed) {
                const {data} = await axiosSecure.patch(`/approve-article/${id}`)
                if(data.modifiedCount > 0) {
                    Swal.fire({
                        title: "Approved",
                        text: "Article Approved Successfully.",
                        icon: "success"
                      });
                      refetch()
                }

            }
          });
    }

    const handleDecline = async (declineId, text) => {
        
        if (!declineId) {
            toast.error("Invalid article ID");
            return;
          }
        
          if (!text) {
            toast.error("Message is required to decline the article");
            return;
          }
        try {
            const { data } = await axiosSecure.patch(`/decline-article/${declineId}`, { message: text })
            if (data.modifiedCount > 0) {
                refetch(); // Refresh the data
                toast.success("Article declined successfully");
              } else {
                toast.error(data.message || "Failed to decline the article");
              }
        } catch (error) {
            console.log(error)
        }
    }


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
                                            <Button data-tooltip-id="my-tooltip" data-tooltip-content="Approve!"
                                                onClick={() => handleApprove(article._id)}
                                                disabled={article.status === "approved" || article.status === "declined"} size="sm"><IoIosDoneAll></IoIosDoneAll></Button>

                                            <ArticleDeclineModal handleDecline={handleDecline} id={article._id} status={article.status} ></ArticleDeclineModal>

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