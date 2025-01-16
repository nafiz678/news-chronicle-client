import useAxiosPublic from "@/hooks/useAxiosPublic";
import useRole from "@/hooks/useRole";
import { useQuery } from "@tanstack/react-query";

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
            all articles for admin
        </div>
    );
};

export default AllArticlesForAdmin;