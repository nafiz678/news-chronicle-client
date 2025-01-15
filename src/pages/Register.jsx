// import useAxiosPublic from "@/hooks/useAxiosPublic";
import useAxiosPublic from "@/hooks/useAxiosPublic";
import { AuthContext } from "@/provider/AuthProvider";
import { useContext } from "react";
import { Helmet } from "react-helmet-async";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
// import loginBg from "@/assets/login-illustration.png"; 


const Register = () => {
    const axiosPublic = useAxiosPublic()
    const { createUser, updateUser, googleSignIn } = useContext(AuthContext);
    const navigate = useNavigate()
    const {
        register,
        reset,
        handleSubmit,
        formState: { errors },
    } = useForm()

    const onSubmit = (data) => {
        
        createUser(data.email, data.password)
            .then(res => {
                const loggedUser = res.user
                console.log(loggedUser)
                const info = { displayName: data.name, photoURL: data.photo }
                updateUser(info)
                // crete user entry in the database
                // const userInfo = { name: data.name, email: data.email, }

                // axiosPublic.post("/users", userInfo)
                //     .then(res => {
                //         if (res.data.insertedId) {
                //             reset()
                //             navigate("/")
                //             toast.success("User Added to the database")
                //         }
                //     })

                    .then((data) => {
                        reset()
                        navigate("/")
                        toast.success("User created successfully")
                    })
                    .catch(() => {
                        
                    })
            })
            .catch(() => {
                
            })
    }


    const handleGoogle = () => {
        googleSignIn()
            .then(res => {
                
                const userInfo = {email: res.user?.email, name: res.user?.displayName}
                axiosPublic.post("/users", userInfo)
                .then(result=>{
                    
                    navigate("/")
                })

                // reset()
                // navigate("/")
                // toast.success("User created successfully")
            })
            .catch(err => {
                
            })
    }



    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <Helmet>
                <title>Register || Bistro Boss</title>
            </Helmet>
            <div className="max-w-4xl w-full bg-white shadow-lg rounded-lg flex flex-col md:flex-row overflow-hidden">
                {/* Left Section: Image/Illustration */}
                <div className="md:w-1/2 p-6 flex items-center justify-center bg-gray-50">
                    <img src="https://media.istockphoto.com/id/1457433817/photo/group-of-healthy-food-for-flexitarian-diet.jpg?b=1&s=612x612&w=0&k=20&c=V8oaDpP3mx6rUpRfrt2L9mZCD0_ySlnI7cd4nkgGAb8=" alt="Illustration" className="w-full h-auto" />
                </div>

                {/* Right Section: Form */}
                <div className="md:w-1/2 p-8">
                    <h2 className="text-2xl font-bold text-gray-800 mb-6">Register</h2>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        {/* Name Field */}
                        <div className="mb-4">
                            <label htmlFor="name" className="block text-sm font-medium text-gray-600">
                                Name
                            </label>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                {...register("name", { required: true })}
                                placeholder="Enter your name"
                                className="mt-1 block w-full border border-gray-300 bg-white rounded-md p-2.5 focus:ring-2 focus:ring-blue-500"
                            />
                            {errors.name && <span className="text-red-600">Name is required</span>}
                        </div>

                        {/* Email Field */}
                        <div className="mb-4">
                            <label htmlFor="email" className="block text-sm font-medium text-gray-600">
                                Email
                            </label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                {...register("email", { required: true })}
                                placeholder="Type here"
                                className="mt-1 block w-full border border-gray-300 bg-white rounded-md p-2.5 focus:ring-2 focus:ring-blue-500"
                            />
                            {errors.email && <span className="text-red-600">Email is required</span>}
                        </div>

                        {/* Password Field */}
                        <div className="mb-4">
                            <label htmlFor="password" className="block text-sm font-medium text-gray-600">
                                Password
                            </label>
                            <input
                                type="password"
                                id="password"
                                name="password"
                                {...register("password", { required: true, minLength: 6, maxLength: 24 })}
                                placeholder="Enter your password"
                                className="mt-1 block w-full border border-gray-300 bg-white rounded-md p-2.5 focus:ring-2 focus:ring-blue-500"
                            />
                        </div>

                        {/* Photo URL Field */}
                        <div className="mb-4">
                            <label htmlFor="photoUrl" className="block text-sm font-medium text-gray-600">
                                Photo URL
                            </label>
                            <input
                                type="url"
                                id="photoUrl"
                                name="photo"
                                {...register("photo", { required: true })}
                                placeholder="Enter photo URL"
                                className="mt-1 block w-full border border-gray-300 bg-white rounded-md p-2.5 focus:ring-2 focus:ring-blue-500"
                            />
                        </div>

                        {/* Submit Button */}
                        <button type="submit"
                            className="w-full hover:scale-[1.02] bg-yellow-500 hover:bg-yellow-400 text-white font-medium py-2.5 rounded-md transition duration-300 ease-out active:scale-[0.98]"
                        >
                            Register
                        </button>
                    </form>

                    {/* Login Link */}
                    <p className="mt-4 text-sm text-gray-600">
                        Already have an account?{" "}
                        <Link to="/login" className="text-yellow-500 font-medium hover:underline">
                            Login here
                        </Link>
                    </p>
                    <button onClick={handleGoogle} className="btn">Google</button>
                </div>
            </div>
        </div>
    );
};

export default Register;