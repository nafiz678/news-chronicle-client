import { Link, Navigate, useNavigate } from 'react-router-dom'
import { toast } from 'react-hot-toast'
import useAuth from '@/hooks/useAuth'
import { imageUpload, saveUser } from '@/api/Utils'
import { Helmet } from 'react-helmet-async'
import { FaGoogle } from 'react-icons/fa'
import Loader from '@/shared/LoaderSpinner'
import Lottie from 'lottie-react'
import register from "@/assets/registration.json"

const SignUp = () => {
    const { createUser, user, updateUser, googleSignIn, setUser, loading, setLoading } = useAuth()
    const navigate = useNavigate()
    if (user) return <Navigate to={"/"} replace={true} />
    // form submit handler
    const handleSubmit = async event => {
        event.preventDefault()
        const form = event.target
        const name = form.name.value
        const email = form.email.value
        const password = form.password.value
        const image = form.image.files[0]

        const passwordRegex = /^(?=.{6,})(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).*$/;

        // setLoading(true)
        const imageURL = await imageUpload(image)
        
        try {
            if (!passwordRegex.test(password)) {
                return toast.error("Must be 6+ chars with a number, uppercase, & special character.")
            }
            setLoading(true)
            //2. User Registration
            const result = await createUser(email, password)
            //3. Save username & profile photo
            await updateUser(name, imageURL)
            
            const user = result.user
            const newUser = { ...user, name, imageURL }
            setUser(newUser)

            // save user info in db if the user is new
            await saveUser({ ...result?.user, displayName: name, photoURL: imageURL })
            setUser(result.user)
            navigate('/')
            toast.success('Signup Successful')

        } catch (err) {
            
            toast.error(err?.message)

        } finally {
            setLoading(false)
        }
    }

    // Handle Google Signin
    const handleGoogleSignIn = async () => {
        try {
            //User Registration using google
            const data = await googleSignIn()
            // save user info in db if the user is new
            await saveUser(data?.user)

            navigate('/')
            toast.success('Signup Successful')
        } catch (err) {
            
            toast.error(err?.message)
        }finally{
            setLoading(false)
            
        }

    }

    if (loading) return <div className='flex items-center justify-center h-screen'><Loader></Loader></div>
    return (
        <div className="my-10 flex items-center justify-center ">
            <Helmet>
                <title>Register || News Chronicle</title>
            </Helmet>
            <div className="max-w-4xl w-full bg-white shadow-lg rounded-lg flex flex-col md:flex-row overflow-hidden">
                {/* Left Section: Image/Illustration */}
                <div className="md:w-1/2 p-6 flex items-center justify-center bg-gray-50">
                    <Lottie animationData={register} loop={true}></Lottie>
                </div>

                {/* Right Section: Form */}
                <div className="md:w-1/2 p-8">
                    <h2 className="text-2xl font-bold text-gray-800 mb-6">Register</h2>
                    <form onSubmit={handleSubmit}>
                        {/* Name Field */}
                        <div className="mb-4">
                            <label htmlFor="name" className="block text-sm font-medium text-gray-600">
                                Name
                            </label>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                required
                                placeholder="Enter your name"
                                className="mt-1 block w-full border border-gray-300 bg-white rounded-md p-2.5 focus:ring-2 focus:ring-blue-500"
                            />
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
                                required
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
                                required
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
                                type="file"
                                id="photoUrl"
                                name="image"
                                required
                                placeholder="Enter photo URL"
                                className="mt-1 block w-full border border-gray-300 bg-white rounded-md p-2.5 focus:ring-2 focus:ring-blue-500"
                            />
                        </div>

                        {/* Submit Button */}
                        <button type="submit"
                            className="w-full hover:scale-[1.02] bg-slate-800 hover:bg-slate-900 text-white font-medium py-2.5 rounded-md transition duration-300 ease-out active:scale-[0.98]"
                        >
                            Register
                        </button>
                    </form>


                    {/* Login Link */}
                    <p className="mt-4 text-sm text-gray-600">
                        Already have an account?{" "}
                        <Link to="/login" className="text-slate-900 font-medium hover:underline">
                            Login here
                        </Link>
                    </p>
                    <div className="divider">OR</div>
                    <div className="flex justify-center gap-4 mt-2">
                        <button onClick={handleGoogleSignIn} className="bg-white text-gray-800 border border-gray-300 px-3 py-2 rounded-lg w-full flex items-center justify-center gap-3 hover:bg-gray-100">
                            <FaGoogle size={20} className="text-red-500" />
                            <span className="font-medium">Login with Google</span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SignUp
