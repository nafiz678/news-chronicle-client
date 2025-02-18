import { Link, Navigate, useLocation, useNavigate } from "react-router-dom";
import { FaGoogle } from "react-icons/fa";
import useAuth from "@/hooks/useAuth";
import Loader from "@/shared/LoaderSpinner";
import toast from "react-hot-toast";
import { saveUser } from "@/api/Utils";
import Lottie from "lottie-react";
import loginAnim from "@/assets/login.json"
import useRole from "@/hooks/useRole";


const Login = () => {
    const { signin, googleSignIn, loading, setLoading, user, setIsSubscribe } = useAuth()
    const navigate = useNavigate()
    const [role] = useRole()
    const location = useLocation()
    const from = location?.state?.from?.pathname || '/'
    if (loading) return <Loader />
    if (user) return <Navigate to={from} replace={true} />

    const handleSubmit = async (e) => {
        e.preventDefault()
        const form = e.target
        const email = form.email.value
        const password = form.password.value

        try {
            //User Login
            await signin(email, password)
            navigate(from, { replace: true })
            toast.success('Login Successful')
        } catch (err) {
            
            setLoading(false)
            toast.error(err?.message)
        }
    }

    const handleGoogle = async () => {
        try {
            //User Registration using google
            const data = await googleSignIn()
            if (role === "premium" || user?.role === "admin") return setIsSubscribe(true)
            if (role === "user" || !role) return setIsSubscribe(false)
            // save user info in db if the user is new
            await saveUser(data?.user)
            navigate(from, { replace: true })
            toast.success('Login Successful')

        } catch (err) {
            
            toast.error(err?.message)
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="my-20 flex items-center justify-center ">
            {/* <Helmet>
                <title>Login || Bistro Boss</title>
            </Helmet> */}
            <div className="max-w-4xl w-full bg-white shadow-lg rounded-lg flex flex-col md:flex-row overflow-hidden">
                {/* Left Section: Image/Illustration */}
                <div className="md:w-1/2 p-6 flex items-center justify-center bg-gray-50">
                    <Lottie animationData={loginAnim} loop={false}></Lottie>
                </div>

                {/* Right Section: Form */}
                <div className="md:w-1/2 p-8">
                    <h2 className="text-2xl font-bold text-gray-800 mb-6">Login</h2>
                    <form onSubmit={handleSubmit}>
                        {/* Email Field */}
                        <div className="mb-4">
                            <label htmlFor="email" className="block text-sm font-medium text-gray-600">
                                Email
                            </label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                placeholder="Type here"
                                className="mt-1 block w-full border border-gray-300 bg-white rounded-md p-2.5 focus:ring-2 focus:ring-blue-500"
                            />
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
                                placeholder="Enter your password"
                                className="mt-1 block w-full border border-gray-300 bg-white rounded-md p-2.5 focus:ring-2 focus:ring-blue-500"
                            />
                        </div>

                        {/* Submit Button */}
                        <button
                            type="submit"
                            className="w-full hover:scale-[1.02] bg-slate-800 hover:bg-slate-900 text-white font-medium py-2.5 rounded-md transition duration-300 ease-out active:scale-[0.98]"
                        >
                            Sign In
                        </button>
                    </form>

                    {/* Register Link */}
                    <p className="mt-4 text-sm text-gray-600">
                        New here?{" "}
                        <Link to={"/register"} className="text-slate-700 font-medium hover:underline">
                            Create a New Account
                        </Link>
                    </p>

                    {/* google or github Sign-in */}
                    <div className="mt-6">
                        <p className="text-center text-sm text-gray-600">Or sign in with</p>
                        <div className="flex justify-center gap-4 mt-2">
                            <button onClick={handleGoogle} className="bg-white text-gray-800 border border-gray-300 px-3 py-2 rounded-lg w-full flex items-center justify-center gap-3 hover:bg-gray-100">
                                <FaGoogle size={20} className="text-red-500" />
                                <span className="font-medium">Login with Google</span>
                            </button>
                        </div>
                    </div>


                </div>
            </div>
        </div>
    );
};

export default Login;