import AllPublishers from "@/components/AllPublisher";
import PlansSection from "@/components/PlansSection";
import Statistic from "@/components/Statistics";
import CarouselSlider from "./Slider";
import { Helmet } from "react-helmet-async";

const Home = () => {
    const stats = {
        totalUsers: 1200,
        normalUsers: 950,
        premiumUsers: 250,
    };
    return (
        <div>
            <Helmet>
                <title>Home || News Chronicle</title>
            </Helmet>
            <div>
                <CarouselSlider></CarouselSlider>
            </div>
            <div>
                <PlansSection></PlansSection>
            </div>

            <div>
                <Statistic stats={stats}></Statistic>
            </div>

            <div>
                <AllPublishers></AllPublishers>
            </div>

        </div>
    );
};

export default Home;