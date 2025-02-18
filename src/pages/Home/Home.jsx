import AllPublishers from "@/components/AllPublisher";
import PlansSection from "@/components/PlansSection";
import Statistic from "@/components/Statistics";
import CarouselSlider from "./Slider";
import { Helmet } from "react-helmet-async";
import NewsletterSignup from "./NewsLatter";
import PollsSection from "./PollsSection";
import { Testimonial } from "./Testimonial";
import ChallengeOfTheWeek from "./WeekChallange";

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
                <CarouselSlider />
            </div>
            <div>
                <PlansSection />
            </div>

            <div>
                <Statistic stats={stats}></Statistic>
            </div>

            <div>
                <PollsSection />
            </div>

            <div>
                <AllPublishers />
            </div>

            <div>
                <Testimonial />
            </div>

            <div>
                <ChallengeOfTheWeek />
            </div>

            <div>
                <NewsletterSignup />
            </div>
        </div>
    );
};

export default Home;