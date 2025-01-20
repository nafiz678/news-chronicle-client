import moment from "moment";
import { Link } from "react-router-dom";

const ArticleCard = ({ article }) => {

    const { title, description, postedDate, image, _id, authorName, authorPhoto } = article || {}

    return (
        <Link className="group w-full border border-black/20 rounded-xl" to={`/article/${_id}`}>
            <div className="h-auto hover:shadow-xl p-4 overflow-hidden rounded-xl transition-all ease-in-out duration-300 flex items-center justify-center flex-col">
                <div className="w-full overflow-hidden rounded-xl">
                    <img src={image} className="w-72 h-56 group-hover:scale-110 transition-all duration-300 ease-in-out  rounded-xl object-cover" alt="" />
                </div>
                <div className="mt-4 space-y-3">
                    {/* all information here */}
                    <div className="flex items-center justify-start gap-2">
                        <div className="text-xs flex items-center justify-normal gap-1">
                            <img src={authorPhoto} className="w-5 h-5 rounded-full object-cover" alt="" />
                            <p>{authorName.slice(0, 6)}..</p>
                        </div>
                        <p>●</p>
                        <p>{moment(postedDate).format('ll')}</p>
                    </div>
                    <h1 className="text-2xl font-medium h-16 overflow-auto">{title}</h1>
                    <p className="text-black/80 h-24 overflow-auto">{description.slice(0, 100)}...<Link to={`/article/${_id}`} className="font-semibold">see more</Link></p>
                </div>
                <div className="flex items-center justify-end w-full">
                    <button className="btn btn-outline btn-sm my-2 justify-self-end">Details</button>
                </div>
            </div>

        </Link>
    );
};

export default ArticleCard;