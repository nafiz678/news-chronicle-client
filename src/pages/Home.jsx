import AllPublishers from "@/components/AllPublisher";
import PlansSection from "@/components/PlansSection";
import Statistic from "@/components/Statistics";

const Home = () => {
    const stats = {
        totalUsers: 1200,
        normalUsers: 950,
        premiumUsers: 250,
    };
    return (
        <div>
            <h1 className="text-2xl font-bold">this section is for slider</h1>
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