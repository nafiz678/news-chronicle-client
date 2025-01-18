
import { AiOutlineCheck, AiOutlineClose } from 'react-icons/ai'; // Importing React Icons

const PlansSection = () => {



    return (
        <section className="plans-section  pt-24 pb-10 ">
            <div className="md:w-11/12 w-full flex flex-col items-center justify-center p-8 rounded-lg mx-auto text-center ">
                <h2 className="text-4xl font-semibold text-gray-800 mb-8">Explore Our Premium Plans</h2>
                <p className="text-lg text-gray-600 mb-12">Choose the best plan to suit your needs. Get more with exclusive content, features, and support!</p>
                <div className="plans-container grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">

                    {/* Plan 1 */}
                    <div className="bg-white shadow-lg rounded-xl p-6 flex flex-col items-start text-center transition-all transform hover:scale-105 hover:shadow-2xl hover:translate-y-2">
                        <div className='flex items-center mb-6 justify-between px-2 w-full'>
                            <h3 className="text-2xl font-semibold text-gray-700">Basic Plan</h3>
                            <div className="flex flex-col items-center">
                                <span className="text-2xl font-bold text-blue-600">FREE </span>
                            </div>
                        </div>
                        <p className="text-gray-600 text-start ml-4 mb-6">Great for casual readers seeking limited but valuable access to articles.</p>

                        <ul className="text-start text-gray-600 mt-4 space-y-3 pl-5">
                            <li className="flex items-center"><AiOutlineCheck className="inline text-green-500 mr-2" /> Limited post 1 article</li>
                            <li className="flex items-center"><AiOutlineCheck className="inline text-green-500 mr-2" /> Access to basic news</li>
                            <li className="flex items-center"><AiOutlineClose className="inline text-red-500 mr-2" /> No Premium Articles</li>
                            <li className="flex items-center"><AiOutlineClose className="inline text-red-500 mr-2" /> Ad-free experience</li>
                        </ul>
                        <div className="mt-6 flex justify-center place-self-end">
                            <button className="px-8 py-3 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition duration-300">
                                Base Plan For All
                            </button>
                        </div>
                    </div>

                    {/* Plan 2 */}
                    <div className="bg-white shadow-lg rounded-xl p-6 flex flex-col items-start text-center transition-all transform hover:scale-105 hover:shadow-2xl hover:translate-y-2">
                        <div className='flex items-center mb-6 justify-between px-2 w-full'>
                            <h3 className="text-2xl font-semibold text-gray-700 ">Standard Plan</h3>
                            <div className="flex flex-col items-center ">
                                <span className="text-2xl font-bold text-green-600 ">$19.99 <span className='text-sm font-normal'>/mo</span></span>
                            </div>
                        </div>
                        <p className="text-gray-600 mb-6">For regular readers who want more access and features.</p>
                        <ul className="text-left text-gray-600 mt-4 space-y-3 pl-5">
                            <li className="flex items-center"><AiOutlineCheck className="inline text-green-500 mr-2" /> Access to unlimited posts</li>
                            <li className="flex items-center"><AiOutlineCheck className="inline text-green-500 mr-2" /> Premium Content Access</li>
                            <li className="flex items-center"><AiOutlineCheck className="inline text-green-500 mr-2" /> Weekly newsletter</li>
                            <li className="flex items-center"><AiOutlineCheck className="inline text-green-500 mr-2" /> Ad-free experience</li>
                        </ul>
                        <div className="mt-6 flex justify-center place-self-end">
                            <button className="px-8 py-3 bg-green-600 text-white rounded-full hover:bg-green-700 transition duration-300">
                                Select Plan
                            </button>
                        </div>
                    </div>

                    {/* Plan 3 */}
                    <div className="bg-white shadow-lg rounded-xl p-6 flex flex-col items-start text-center transition-all transform hover:scale-105 hover:shadow-2xl hover:translate-y-2">
                    <div className='flex items-center mb-6 justify-between px-2 w-full'>
                            <h3 className="text-2xl font-semibold text-gray-700 ">Premium Plan</h3>
                            <div className="flex flex-col items-center ">
                                <span className="text-2xl font-bold text-orange-600 ">$29.99 <span className='text-sm font-normal'>/mo</span></span>
                            </div>
                        </div>
                        <p className="text-gray-600 mb-6">For those who want the ultimate experience with exclusive features and support.</p>
                        <ul className="text-left text-gray-600 mt-4 space-y-3 pl-5">
                            <li className="flex items-center"><AiOutlineCheck className="inline text-green-500 mr-2" /> Access to unlimited posts</li>
                            <li className="flex items-center"><AiOutlineCheck className="inline text-green-500 mr-2" /> Exclusive Premium Articles</li>
                            <li className="flex items-center"><AiOutlineCheck className="inline text-green-500 mr-2" /> Early access to new content</li>
                            <li className="flex items-center"><AiOutlineCheck className="inline text-green-500 mr-2" /> Ad-free experience</li>
                        </ul>
                        <div className="mt-6 flex justify-center place-self-end">
                            <button className="px-8 py-3 bg-orange-500 text-white rounded-full hover:bg-orange-700 transition duration-300">
                                Select Plan
                            </button>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
};

export default PlansSection;
