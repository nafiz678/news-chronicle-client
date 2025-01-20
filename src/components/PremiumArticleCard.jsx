import moment from "moment";
import { Link } from "react-router-dom";

const PremiumArticleCard = ({article}) => {
    const { title, description, postedDate, publisher,  image, isPremium, _id,  } = article || {}
    return (
        <div className={`group w-full border border-black/20 ${isPremium ? "bg-orange-50 hover:bg-orange-300" : ""} rounded-xl transition-all duration-300 ease-in-out`}>
            <div className="h-auto hover:shadow-xl p-4 overflow-hidden rounded-xl transition-all ease-in-out duration-300 flex items-center justify-center flex-col">
                <div className="w-full overflow-hidden rounded-xl">
                    <img src={image} className="w-72 h-56 group-hover:scale-110 transition-all duration-300 ease-in-out  rounded-xl object-cover" alt="" />
                </div>
                <div className="mt-4 space-y-3">
                    {/* all information here */}
                    <div className="flex items-center justify-start gap-2">
                        <div className="text-sm flex items-center justify-normal gap-1">
                            
                            <p>{publisher.slice(0,8)}...</p>
                        </div>
                        <p>●</p>
                        <p>{moment(postedDate).format('ll')}</p>
                        {isPremium && <p className="badge bg-orange-500">Premium</p> }
                    </div>
                    <h1 className="text-2xl font-medium h-16 overflow-auto">{title}</h1>
                    <p className="text-black/80 h-24 overflow-auto">{description.slice(0, 100)}...<button disabled={isPremium} className="font-semibold"> see more </button></p>
                </div>
                <div className="flex items-center justify-end w-full">
                    <button className="btn btn-outline btn-sm my-2 justify-self-end"> <Link to={`/article/${_id}`}>Details</Link> </button>
                </div>
            </div>

        </div>
    );
};

export default PremiumArticleCard;