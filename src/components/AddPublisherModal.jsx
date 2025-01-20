import {
    Dialog,
    Transition,
    TransitionChild,
    DialogTitle,
    DialogPanel,
} from '@headlessui/react'
import { Fragment, useState } from 'react'
import "@/components/publisher.css"
import { imageUpload } from '@/api/Utils'
import useAxiosSecure from '@/hooks/useAxiosSecure'
import toast from 'react-hot-toast'


const AddPublisherModal = ({ closeModal, isOpen }) => {
    const axiosSecure = useAxiosSecure()

    const [imageUrl, setImageUrl] = useState(null)
    const [name, setName ] = useState(null)

    const handleChange = async (image) => {
        try {
            const upload = await imageUpload(image);
            setImageUrl(upload);
        } catch (error) {
            console.error("Error uploading image:", error);
        }
    };

    const handleSubmit = async() => {
        if(!imageUrl){
            return toast.error("Please preview or upload the image first")
        }
        const publisherData = {publisherImage: imageUrl, publisherName: name}
        
        const {data} = await axiosSecure.post("/add-publisher", publisherData)
        
        if(data.insertedId){
            toast.success("Publisher Added Successfully")
            closeModal()
            setImageUrl(null)
        }
        
    }



    return (
        <Transition appear show={isOpen} as={Fragment}>
            <Dialog as='div' className='relative z-10' onClose={closeModal}>
                <TransitionChild
                    as={Fragment}
                    enter='ease-out duration-300'
                    enterFrom='opacity-0'
                    enterTo='opacity-100'
                    leave='ease-in duration-200'
                    leaveFrom='opacity-100'
                    leaveTo='opacity-0'
                >
                    <div className='fixed inset-0 bg-black bg-opacity-25' />
                </TransitionChild>

                <div className='fixed inset-0 overflow-y-auto'>
                    <div className='flex min-h-full items-center justify-center p-4 text-center'>
                        <TransitionChild
                            as={Fragment}
                            enter='ease-out duration-300'
                            enterFrom='opacity-0 scale-95'
                            enterTo='opacity-100 scale-100'
                            leave='ease-in duration-200'
                            leaveFrom='opacity-100 scale-100'
                            leaveTo='opacity-0 scale-95'
                        >
                            <DialogPanel className='w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all'>
                                <DialogTitle
                                    as='h3'
                                    className='text-lg font-medium text-center leading-6 text-gray-900'
                                >
                                    Add a Publisher
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
                                                            <span className="block text-gray-500 font-semibold">Drag &amp; drop your files here</span>
                                                            <span className="block text-gray-400 font-normal mt-1">or click to upload</span>
                                                        </div>
                                                        <input onChange={(e) => handleChange(e.target.files[0])} className="h-full w-full opacity-0 cursor-pointer" type="file" />
                                                    </div>
                                                </div>
                                            </div>}
                                        <div className="max-w-md mt-4 mx-auto rounded-lg overflow-hidden md:max-w-lg px-2">
                                            <input
                                                onChange={(e)=> setName(e.target.value)}
                                                type="text"
                                                placeholder="Enter Publisher Name "
                                                className="block w-full rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:outline-none transition duration-200 ease-in-out"
                                            />
                                        </div>

                                    </div>


                                </form>
                                <hr className='mt-8 ' />
                                <div className='flex mt-2 justify-between gap-10'>
                                    <button
                                        type='button'
                                        className='inline-flex justify-center rounded-md border border-transparent bg-red-100 px-4 py-2 text-sm font-medium text-red-900 hover:bg-red-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-2'
                                        onClick={closeModal}
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        onClick={handleSubmit}
                                        type='submit'
                                        className='inline-flex justify-center rounded-md border border-transparent bg-slate-200 px-4 py-2 text-sm font-medium text-slate-900 hover:bg-slate-200 focus:outline-none focus-visible:ring-2 '
                                    >
                                        Add Publisher
                                    </button>

                                </div>
                            </DialogPanel>
                        </TransitionChild>
                    </div>
                </div>
            </Dialog>
        </Transition>
    )
}

export default AddPublisherModal
