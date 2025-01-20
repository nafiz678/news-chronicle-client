import { Swiper, SwiperSlide } from "swiper/react";
import useAxiosPublic from "@/hooks/useAxiosPublic";
import { useQuery } from "@tanstack/react-query";
import { Navigation, Pagination, Autoplay, EffectCoverflow } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import useRole from "@/hooks/useRole";
import Loader from "@/shared/LoaderSpinner";

const SwiperSlider = () => {

    const axiosPublic = useAxiosPublic();
    const [role] = useRole()

    const { data: articles = [], isLoading } = useQuery({
        queryKey: ["article"],
        queryFn: async () => {
            const { data } = await axiosPublic.get(`/all-articles-user`);
            return data;
        },
    });

    const newArticles = articles.filter(article => {
        if (role === "user" || !role) {
          return !article.isPremium;
        }
        return true; // Show all articles for other roles
      }).filter(article => article.status === "approved").sort((a, b) => b.views - a.views).slice(0,6); 

    console.log(newArticles)


    return (
        isLoading ?
            <div className="flex items-center justify-center gap-3 h-screen">
                <Loader></Loader> <h1 className="text-4xl">Loading</h1></div>
            :
            <div className="relative w-full max-w-screen-xl mt-10 mx-auto">
                <h1 className="mb-10 lg:text-5xl md:text-4xl text-3xl text-center font-semibold text-foreground ">Most viewed news</h1>
                <Swiper
                    modules={[Navigation, Pagination, Autoplay, EffectCoverflow]}
                    effect="coverflow"
                    grabCursor={true}
                    centeredSlides={true}
                    slidesPerView="auto"
                    coverflowEffect={{
                        rotate: 50,
                        stretch: 0,
                        depth: 100,
                        modifier: 1,
                        slideShadows: true,
                    }}
                    autoplay={{ delay: 5000 }}
                    loop={true}
                    pagination={{ clickable: true }}
                    navigation
                    className="h-[300px] sm:h-[400px] lg:h-[600px]"
                >
                    {newArticles.map((article, index) => (
                        <SwiperSlide
                            key={index}
                            className="relative flex items-center justify-center"
                            style={{ width: "75%", height: "100%" }}
                        >
                            {/* Slide Content */}
                            <div className="relative w-full h-full rounded-xl overflow-hidden shadow-lg">
                                {/* Image */}
                                <img
                                    src={article.image}
                                    alt={article.title}
                                    className="w-full h-full object-cover"
                                />
                                {/* Overlay */}
                                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6">
                                    <h2 className="text-2xl sm:text-3xl font-bold text-white">
                                        {article.title}
                                    </h2>
                                    <p className="text-sm sm:text-base text-gray-300 mt-2 line-clamp-2">
                                        {article.description}
                                    </p>
                                </div>
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
    );
};

export default SwiperSlider;
