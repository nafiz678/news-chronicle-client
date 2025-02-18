import ArticleDeclineModal from "@/components/ArticleDeclineModal";
import { Button } from "@/components/ui/button";
import useAxiosPublic from "@/hooks/useAxiosPublic";
import Loader from "@/shared/LoaderSpinner";
import { useQuery } from "@tanstack/react-query";
import { IoIosDoneAll } from "react-icons/io";
import { Tooltip } from "react-tooltip";
import { MdDeleteForever } from "react-icons/md";
import toast from "react-hot-toast";
import useAxiosSecure from "@/hooks/useAxiosSecure";
import Swal from "sweetalert2";
import { useState } from "react";
import moment from "moment";
import { Helmet } from "react-helmet-async";


const AllArticlesForAdmin = () => {

    const axiosPublic = useAxiosPublic()
    const axiosSecure = useAxiosSecure()
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const limit = 6;


    const { data: articles = [], isLoading, refetch } = useQuery({
        queryKey: ["articles", page],
        queryFn: async () => {
            const { data } = await axiosPublic.get(`/all-articles?page=${page}&limit=${limit}`)
            setTotalPages(data.totalPages)
            return data.result
        },
        keepPreviousData: true,
    })

    // pagination logics

    const handleNextPage = () => {
        if (page < totalPages) setPage((prev) => prev + 1);
    };

    const handlePreviousPage = () => {
        if (page > 1) setPage((prev) => prev - 1);
    };


    const handleApprove = async (id) => {
        Swal.fire({
            title: "Approve This Article?",
            icon: "question",
            showCancelButton: true,
            confirmButtonColor: "#2F2F31",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, Approve it!"
        }).then(async (result) => {
            if (result.isConfirmed) {
                const { data } = await axiosSecure.patch(`/approve-article/${id}`)
                if (data.modifiedCount > 0) {
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
            
        }
    }

    const handleDeleteArticle = (id) => {
        
        Swal.fire({
            title: "Are you sure?",
            text: "You wont be able to recover this",
            icon: "question",
            showCancelButton: true,
            confirmButtonColor: "#2F2F31",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, Delete it!"
        }).then(async (result) => {
            if (result.isConfirmed) {
                const { data } = await axiosSecure.delete(`/delete-article/${id}`)
                if (data.deletedCount > 0) {
                    Swal.fire({
                        title: "Deleted",
                        text: "Article Deleted Successfully.",
                        icon: "success"
                    });
                    refetch()
                }

            }
        });
    }

    const handleMakePremium = (id) => {
        Swal.fire({
            title: "Make Article premium?",
            icon: "question",
            showCancelButton: true,
            confirmButtonColor: "#2F2F31",
            cancelButtonColor: "#d33",
            confirmButtonText: "Make it premium"
        }).then(async (result) => {
            if (result.isConfirmed) {
                const { data } = await axiosSecure.patch(`/make-premium/${id}`)
                if (data.modifiedCount > 0) {
                    Swal.fire({
                        title: "Success",
                        text: "This article is now premium.",
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
                <title>All Articles || News Chronicle</title>
            </Helmet>
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
                                    <th>Author Email</th>
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
                                        <td className=" font-semibold">
                                            <h1>{article.title}</h1>
                                            {article.isPremium && <h2 className="p-2 badge bg-orange-400">Premium</h2>}
                                        </td>
                                        <td className="capitalize text-nowrap">{article.authorName}
                                            {article.postedDate &&
                                                <p data-tooltip-id="my-tooltip" data-tooltip-content={moment(article.postedDate).format('lll')}
                                                    className="p-0">Date: {moment(article.postedDate).format('ll')}</p>}
                                        </td>
                                        <th>
                                            {article.authorEmail}
                                            <p className="font-normal">Publisher: {article.publisher}</p>
                                        </th>
                                        <td className="capitalize">{article.status}</td>
                                        <td className="flex items-center justify-start gap-2">
                                            <Button data-tooltip-id="my-tooltip" data-tooltip-content="Approve!"
                                                onClick={() => handleApprove(article._id)}
                                                disabled={article.status === "approved" || article.status === "declined"} size="sm"><IoIosDoneAll></IoIosDoneAll></Button>

                                            <ArticleDeclineModal handleDecline={handleDecline} id={article._id} status={article.status} ></ArticleDeclineModal>

                                            <Button onClick={() => handleDeleteArticle(article._id)}
                                                data-tooltip-id="my-tooltip" data-tooltip-content="Delete!" size="sm"> <MdDeleteForever></MdDeleteForever> </Button>

                                            <Button disabled={article.status === "declined" || article.isPremium}
                                                onClick={() => handleMakePremium(article._id)}
                                                data-tooltip-id="my-tooltip" data-tooltip-content="Make Premium">Premium</Button>
                                        </td>

                                    </tr>)}
                            </tbody>
                        </table>
                        {/* Pagination Controls */}
                        <div className="flex justify-between items-center mt-4">
                            <button
                                onClick={handlePreviousPage}
                                disabled={page === 1}
                                className="px-4 py-2 bg-gray-500 text-white rounded disabled:bg-gray-300"
                            >
                                Previous
                            </button>
                            <span>
                                Page {page} of {totalPages}
                            </span>
                            <button
                                onClick={handleNextPage}
                                disabled={page === totalPages}
                                className="px-4 py-2 bg-gray-500 text-white rounded disabled:bg-gray-300"
                            >
                                Next
                            </button>
                        </div>
                    </div>
                    :
                    <h2 className="text-3xl">Data not available</h2>
            }
            <Tooltip id="my-tooltip" />

        </div>
    );
};

export default AllArticlesForAdmin;