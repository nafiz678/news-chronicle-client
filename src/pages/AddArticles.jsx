import { imageUpload } from "@/api/Utils";
import useAxiosSecure from "@/hooks/useAxiosSecure";
import { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import Select from 'react-select';
import formImage from "../assets/add.jpg"
import useAuth from "@/hooks/useAuth";
import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "@/hooks/useAxiosPublic";
import { Helmet } from "react-helmet-async";

const AddArticles = () => {
    const { user } = useAuth()
    const axiosSecure = useAxiosSecure()
    const axiosPublic = useAxiosPublic()
    const navigate = useNavigate()

    const [formData, setFormData] = useState({
        title: '',
        image: null,
        publisher: '',
        tags: [],
        description: ''
    });

    const tagOptions = [
        { value: 'Technology', label: 'Technology' },
        { value: 'Health', label: 'Health' },
        { value: 'Sports', label: 'Sports' },
        { value: 'Business', label: 'Business' },
        { value: 'Entertainment', label: 'Entertainment' },
        { value: 'Innovation', label: 'Innovation' },
        { value: 'Environment', label: 'Environment' },
    ];



    const { data: publishers= [] } = useQuery({
        queryKey: ["publishers"],
        queryFn: async () => {
            const { data } = await axiosPublic.get("/all-publishers")
            return data
        }
    })


    // const publishers = [
    //     { id: 1, name: 'Publisher One' },
    //     { id: 2, name: 'Publisher Two' },
    //     { id: 3, name: 'Publisher Three' },
    // ];

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleFileChange = (e) => {
        setFormData({ ...formData, image: e.target.files[0] });
    };

    const handleTagsChange = (selectedOptions) => {
        setFormData({ ...formData, tags: selectedOptions });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        // Handle form submission logic here
        try {
            const imageURL = await imageUpload(formData.image)
            const newData = { ...formData, image: imageURL, status: "pending", isPremium: false, views: 0, postedDate: Date.now(), authorEmail: user.email, authorName: user.displayName, authorPhoto: user.photoURL }
            
            // post article in db
            await axiosSecure.post("/add-article", {article: newData, email: user?.email})
            toast.success("Article added please wait for admin approval", { duration: 5000 })
            e.target.reset();
            setFormData({
                title: '',
                image: null,
                publisher: '',
                tags: [],
                description: ''
            });
            navigate("/my-articles")
        } catch (error) {
            
            toast.error(error.response.data.message)
        }
    };


    return (
        <div className="flex items-center justify-center my-20 ">
            <Helmet>
                <title>Add Article || News Chronicle</title>
            </Helmet>
            <div className="md:w-11/12 lg:w-9/12 flex flex-col md:flex-row bg-white shadow-lg rounded-lg">
                {/* Animated Image Section */}
                <div className="md:w-3/6 p-6 flex items-center justify-center bg-gray-500 rounded-l-lg">
                    <img
                        src={formImage}
                        alt="Animation"
                        className="w-full h-auto"
                    />
                </div>

                {/* Form Section */}
                <div className="md:w-3/6 p-6">
                    <h2 className="text-2xl font-semibold text-gray-700 mb-4">Submit an Article</h2>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        {/* Title Field */}
                        <div>
                            <label htmlFor="title" className="block text-gray-600 mb-2">Title</label>
                            <input
                                type="text"
                                id="title"
                                name="title"
                                value={formData.title}
                                onChange={handleInputChange}
                                className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                                required
                            />
                        </div>

                        {/* Image Upload Field */}
                        <div>
                            <label htmlFor="image" className="block text-gray-600 mb-2">Upload Image</label>
                            <input
                                type="file"
                                id="image"
                                name="image"
                                onChange={handleFileChange}
                                className="w-full p-2 border border-gray-300 rounded focus:outline-none"
                            />
                        </div>

                        {/* Publisher Dropdown */}
                        <div>
                            <label htmlFor="publisher" className="block text-gray-600 mb-2">Publisher</label>
                            <select
                                id="publisher"
                                name="publisher"
                                value={formData.publisher}
                                onChange={handleInputChange}
                                className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                                required
                            >
                                <option value="" disabled>Select a Publisher</option>
                                {publishers.map((publisher) => (
                                    <option key={publisher._id} value={publisher.publisherName}>
                                        {publisher.publisherName}
                                    </option>
                                ))}
                            </select>
                        </div>

                        {/* Tags Multi-Select */}
                        <div>
                            <label htmlFor="tags" className="block text-gray-600 mb-2">Tags</label>
                            <Select
                                id="tags"
                                name="tags"
                                isMulti
                                options={tagOptions}
                                value={formData.tags}
                                onChange={handleTagsChange}
                                className="w-full"
                            />
                        </div>

                        {/* Description Field */}
                        <div>
                            <label htmlFor="description" className="block text-gray-600 mb-2">Description</label>
                            <textarea
                                id="description"
                                name="description"
                                value={formData.description}
                                onChange={handleInputChange}
                                rows="4"
                                className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                                required
                            />
                        </div>

                        {/* Submit Button */}
                        <button
                            type="submit"
                            className="w-full bg-gray-900 text-white py-2 px-4 rounded hover:bg-gray-800 transition hover:-translate-y-[2px] hover:scale-[1.01] active:scale-100 duration-200"
                        >
                            Submit
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default AddArticles;