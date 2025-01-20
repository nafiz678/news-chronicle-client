import useAxiosPublic from '@/hooks/useAxiosPublic';
import Loader from '@/shared/LoaderSpinner';
import { useQuery } from '@tanstack/react-query';
import moment from 'moment';
import { useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';

const ArticleDetails = () => {
    const axiosPublic = useAxiosPublic()
    const { id } = useParams()
    const isCalled = useRef(false);

    const { data: article = {}, isLoading, refetch } = useQuery({
        queryKey: ["articleDetails", id],
        queryFn: async () => {
            const { data } = await axiosPublic.get(`article/${id}`)
            return data
        }
    })

    useEffect(() => {
        const incrementViews = async () => {
            try {
                await axiosPublic.patch(`/inc-views/${id}`);
                refetch()
            } catch (error) {
                console.error("Failed to increment views:", error);
            }
        };


        if (!isCalled.current) {
            incrementViews();
            isCalled.current = true;
        }
    }, [id])

    const { title, description, postedDate, status, image, tags, views, isPremium, authorName } = article || {}


    return (
        <div className=''>
            {isLoading ?
                <div className="flex items-center justify-center gap-3 h-screen">
                    <Loader></Loader> <h1 className="text-4xl">Loading</h1></div>
                :
                <div className='bg-white/65 pb-10 pt-2'>
                    <div className='my-10 w-11/12 mx-auto p-6'>
                        <div className="flex items-start justify-between">
                            <div className="w-8/12 relative bg-gradient-to-b from-white to-white">
                                <img className='rounded-l-lg h-[700px] w-auto object-cover' src={image} alt="" />
                                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6">
                                    <h2 className="text-2xl sm:text-3xl font-bold text-white">
                                        {article.title}
                                    </h2>

                                </div>
                            </div>
                            <div className='md:w-4/12 h-[700px]  rounded-r-lg bg-background pt-6 pl-4 '>
                                {/* sidebar information */}

                                <h1 className='text-2xl mb-4'><span className='font-medium'>Title:</span> {title}</h1>
                                <div className='space-y-2'>
                                    <p><b>Author:</b> {authorName}</p>
                                    <p><b>Publisher:</b> {authorName}</p>
                                    <p className=''><b>Tags:</b> {tags.map((tag, idx) => <span className='badge badge-outline mr-2 p-2' key={idx}>{tag.value}</span>)}</p>
                                    <p className='capitalize '><b>Status:</b> <span className='badge bg-green-500'>{status}</span></p>
                                    <p><b>Is Premium:</b> {isPremium ? "Yes" : "No"}</p>
                                    <p><b>Views:</b> {views}</p>
                                    <p><b>Posted Date: </b>{moment(postedDate).format('LLLL')}</p>
                                    <p className='w-10/12 '><b>Description: </b>{description}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            }
        </div>
    );
};

export default ArticleDetails;