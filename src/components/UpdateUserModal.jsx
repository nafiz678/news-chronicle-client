import { imageUpload } from '@/api/Utils';
import { Button, Dialog, DialogPanel, DialogTitle } from '@headlessui/react'
import { useState } from 'react'
import toast from 'react-hot-toast';
import "./update.css"
import useAuth from '@/hooks/useAuth';
import useAxiosSecure from '@/hooks/useAxiosSecure';

export default function UpdateUserProfile({ isOpen, close }) {

    const { updateUser, user, setUser } = useAuth()
    const [imageUrl, setImageUrl] = useState(null)
    const [name, setName] = useState(null)
    const axiosSecure = useAxiosSecure()

    const handleChange = async (image) => {
        try {
            const upload = await imageUpload(image);
            setImageUrl(upload);
        } catch (error) {
            console.error("Error uploading image:", error);
        }
    };

    const handleUpdateUser = async () => {
        if (!name || !imageUrl) {
            return toast.error("Name and image are required.");
        }
        if (!imageUrl || imageUrl === "") {
            return toast.error("Please preview or upload the image first");
        }
        try {
            await updateUser(name, imageUrl);
            const { data } = await axiosSecure.patch(`/update-user`, { name: name, image: imageUrl, email: user?.email })
            console.log(data)
            if (data.modifiedCount > 0) {
                toast.success("User updated successfully");
                close()
                const newUser = { ...user, name: name, photoURL: imageUrl }
                setUser(newUser)
            }
        } catch (err) {
            console.error(err);
            toast.error("An error occurred while updating user data.");
        }
    }

    return (
        <>
            <Dialog open={isOpen} as="div" className="relative z-10 focus:outline-none" onClose={close}>
                <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
                    <div className="flex min-h-full items-center justify-center p-4">
                        <DialogPanel
                            transition
                            className="w-full max-w-md rounded-xl bg-black/70 p-6 backdrop-blur-2xl duration-300 ease-out data-[closed]:transform-[scale(95%)] data-[closed]:opacity-0"
                        >
                            <DialogTitle as="h3" className="text-2xl/7 uppercase text-center font-medium text-white">
                                Update User
                            </DialogTitle>
                            <form className='mt-2'>
                                {/* make a form that admin can add publisher */}
                                <div className="max-w-md mx-auto rounded-lg overflow-hidden md:max-w-lg">
                                    {imageUrl ?
                                        <div className='flex items-center justify-center'>
                                            <h3></h3>
                                            <img src={imageUrl} className='rounded-lg' alt="Uploaded" style={{ maxWidth: '300px' }} />
                                        </div>
                                        :
                                        <div className="md:flex">
                                            <div className="w-full p-3">
                                                <div className="relative h-48 rounded-lg border-2 border-blue-500 bg-gray-50 flex justify-center items-center shadow-lg hover:shadow-xl transition-shadow duration-300 ease-in-out">
                                                    <div className="absolute flex flex-col items-center">
                                                        <img alt="File Icon" className="mb-3" src="https://img.icons8.com/dusk/64/000000/file.png" />
                                                        <span className="block text-gray-500 font-semibold">Drag &amp; drop your image here</span>
                                                        <span className="block text-gray-400 font-normal mt-1">or click to upload</span>
                                                    </div>
                                                    <input onChange={(e) => handleChange(e.target.files[0])} className="h-full w-full opacity-0 cursor-pointer" type="file" />
                                                </div>
                                            </div>
                                        </div>}
                                    <div className="max-w-md mt-4 mx-auto rounded-lg overflow-hidden md:max-w-lg px-2">
                                        <input
                                            onChange={(e) => setName(e.target.value)}
                                            type="text"
                                            placeholder="Enter Publisher Name "
                                            className="block w-full rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:outline-none transition duration-200 ease-in-out"
                                        />
                                    </div>

                                </div>


                            </form>
                            <div className="mt-4">
                                <div className='flex items-center justify-end gap-5'>
                                    <Button
                                        className="inline-flex items-center gap-2 rounded-md bg-gray-700 py-1.5 px-3 text-sm/6 font-semibold text-white shadow-inner shadow-white/10 focus:outline-none data-[hover]:bg-gray-600 data-[focus]:outline-1 data-[focus]:outline-white data-[open]:bg-gray-700"
                                        onClick={close}
                                    >
                                        Cancel
                                    </Button>
                                    <Button
                                        className="inline-flex items-center gap-2 rounded-md bg-gray-700 py-1.5 px-3 text-sm/6 font-semibold text-white shadow-inner shadow-white/10 focus:outline-none data-[hover]:bg-gray-600 data-[focus]:outline-1 data-[focus]:outline-white data-[open]:bg-gray-700"
                                        onClick={handleUpdateUser}
                                    >
                                        Update
                                    </Button>
                                </div>
                            </div>
                        </DialogPanel>
                    </div>
                </div>
            </Dialog>
        </>
    )
}