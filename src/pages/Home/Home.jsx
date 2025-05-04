import AllPublishers from "@/components/AllPublisher";
import PlansSection from "@/components/PlansSection";
import Statistic from "@/components/Statistics";
import CarouselSlider from "./Slider";
import { Helmet } from "react-helmet-async";
import NewsletterSignup from "./NewsLatter";
import PollsSection from "./PollsSection";
import { Testimonial } from "./Testimonial";
import ChallengeOfTheWeek from "./WeekChallange";
import BreakingNews from "./recent-articles/BreakingNews";
import CategoryHighlights from "./recent-articles/HeiglightCategories";

const Home = () => {

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
                <Statistic />
            </div>

            <div>
                <AllPublishers />
            </div>

            <CategoryHighlights />

            <div>
                <ChallengeOfTheWeek />
            </div>

            <div>
                <PollsSection />
            </div>

            <div>
                <Testimonial />
            </div>

            <div>
                <NewsletterSignup />
            </div>
            <BreakingNews />
        </div>
    );
};

export default Home;