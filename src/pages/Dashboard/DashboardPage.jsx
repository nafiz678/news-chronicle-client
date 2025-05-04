import BarChart from "@/components/BarChart";
import LineChart from "@/components/lineChart";
import PieChart from "@/components/PieChart";
import PopularArticles from "./PopularArticles";

const DashboardPage = () => {
    return (
        <>
            <div className="text-center ">
                <div className="flex items-center flex-col lg:flex-row justify-start w-screen">
                    <div className="w-6/12">
                        <PieChart></PieChart>
                    </div>
                    <div>
                        <LineChart></LineChart>
                    </div>

                </div>

                <div className="lg:w-9/12 w-full ">
                    {/* <BarChart></BarChart> */}
                </div>
            </div>
            <section className="min-h-screen bg-slate-50">
                <PopularArticles />
            </section>
        </>
    );
};

export default DashboardPage;