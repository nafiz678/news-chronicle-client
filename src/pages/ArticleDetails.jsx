import useAxiosPublic from '@/hooks/useAxiosPublic';
import Loader from '@/shared/LoaderSpinner';
import { useQuery } from '@tanstack/react-query';
import { useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';

const ArticleDetails = () => {
    const axiosPublic = useAxiosPublic()
    const { id } = useParams()
    const isCalled = useRef(false);

    const { data: article = {}, isLoading } = useQuery({
        queryKey: ["articleDetails", id],
        queryFn: async () => {
            const { data } = await axiosPublic.get(`article/${id}`)
            return data
        }
    })

    useEffect(()=>{
        const incrementViews = async () => {
            try {
              await axiosPublic.patch(`/inc-views/${id}`);
            } catch (error) {
              console.error("Failed to increment views:", error);
            }
          };
      
          
        if (!isCalled.current) {
            incrementViews();
            isCalled.current = true; 
        }
    },[id])


    return (
        <div>
            {isLoading ?
                <div className="flex items-center justify-center gap-3 h-screen">
                    <Loader></Loader> <h1 className="text-4xl">Loading</h1></div>
                :
                <div>
                    This is article number {article.title}
                </div>
            }
        </div>
    );
};

export default ArticleDetails;