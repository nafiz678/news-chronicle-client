import useAuth from "@/hooks/useAuth";
import useAxiosPublic from "@/hooks/useAxiosPublic";
import useAxiosSecure from "@/hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Select from 'react-select';
import updateImg from "../assets/update.jpg";
import { imageUpload } from "@/api/Utils";
import toast from "react-hot-toast";
import { Helmet } from "react-helmet-async";

const UpdateArticle = () => {

    const { user } = useAuth()
    const axiosSecure = useAxiosSecure()
    const axiosPublic = useAxiosPublic()
    const navigate = useNavigate()
    const {id} = useParams()

    const { data: article = {} } = useQuery({
        queryKey: ['article', id], 
        queryFn: async () => {
          const { data } = await axiosPublic.get(`/article/${id}`);
          return data;
        },
      });

    const [formData, setFormData] = useState({
        title: "",
        image: null,
        publisher: "",
        tags: [],
        description: "",
      });

      // Update formData when article data is fetched
  useEffect(() => {
    if (article && Object.keys(article).length > 0) {
      setFormData({
        title: article.title || "",
        image: article.image || "",
        publisher: article.publisher || "",
        tags: article?.tags || [],
        description: article.description || "",
      });
    }
  }, [article]);



    const tagOptions = [
        { value: 'Technology', label: 'Technology' },
        { value: 'Health', label: 'Health' },
        { value: 'Sports', label: 'Sports' },
        { value: 'Business', label: 'Business' },
        { value: 'Entertainment', label: 'Entertainment' },
        { value: 'Innovation', label: 'Innovation' },
        { value: 'Environment', label: 'Environment' },
    ];



    const { data: publishers = [] } = useQuery({
        queryKey: ["publishers"],
        queryFn: async () => {
            const { data } = await axiosPublic.get("/all-publishers")
            return data
        }
    })


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

    const handleUpdate = async (e) => {
        

        // Handle form submission logic here
        try {
            e.preventDefault();
            const imageURL = await imageUpload(formData.image)
            const updatedData = { ...formData, tags: formData.tags, image: imageURL }
            console.log(updatedData)
            // post article in db
            await axiosSecure.patch(`/update-article/${id}`, updatedData)
            toast.success("Article Updated successfully")
            navigate("/my-articles")
        } catch (error) {
            console.log(error)
        }
    };


    return (
        <div className="flex items-center justify-center my-20">
            <Helmet>
                <title>Update Article || News Chronicle</title>
            </Helmet>
            <div className="md:w-11/12 lg:w-9/12 flex flex-col-reverse md:flex-row bg-white shadow-lg rounded-lg">
                <div className="md:w-3/6 p-6">
                    <h1 className="text-2xl font-semibold text-gray-700 mb-4"> Update an article</h1>
                    <form onSubmit={handleUpdate} className="space-y-4">
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
                {/* Animated Image Section */}
                <div className="md:w-3/6 p-6 flex items-center justify-center  rounded-r-lg">
                    <img
                        src={updateImg}
                        alt="Animation"
                        className="w-full h-auto"
                    />
                </div>
            </div>
        </div>
    );
};

export default UpdateArticle;