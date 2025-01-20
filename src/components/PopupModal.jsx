import { Button, Dialog, DialogPanel, DialogTitle } from '@headlessui/react'
import { useEffect, useState } from 'react'
import subscribe from "@/assets/file.png"
import { Link } from 'react-router-dom'
import useRole from '@/hooks/useRole'


function PopupModal() {
    let [isOpen, setIsOpen] = useState(false)
    const [role] = useRole()

    function close() {
        setIsOpen(false)
    }

    useEffect(() => {
        setTimeout(() => {
            if(role=== "user") {
                setIsOpen(true)
            }
        }, 10000);
    }, [role])

    return (
        <>
            <Dialog open={isOpen} as="div" className="relative z-[999999] focus:outline-none" onClose={close}>
                <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
                    <div className="flex min-h-full items-center justify-center p-6">
                        <DialogPanel className="w-full max-w-md bg-gradient-to-br from-gray-800 to-gray-700 text-white backdrop-blur-2xl duration-300 ease-out data-[closed]:transform-[scale(95%)] data-[closed]:opacity-0 rounded-xl shadow-lg overflow-hidden">
                            <div className="p-6">
                                <DialogTitle as="h3" className="text-3xl text-orange-400 font-bold uppercase text-center mb-4">
                                    Unlock Premium Access
                                </DialogTitle>
                                <p className="text-sm text-gray-300 text-center mb-6 leading-relaxed">
                                    Subscribe now to access exclusive content, premium features. Take your journey to the next level with our premium packages!
                                </p>
                                <p className='text-sm text-gray-300 text-center mb-6 leading-relaxed'>Don’t miss the chance to elevate your experience.🤍</p>
                                <div className="flex items-center justify-center">
                                    <img
                                        src={subscribe}
                                        alt="Premium Benefits"
                                        className="rounded-lg w-4/5"
                                    />
                                </div>
                                <div className="flex flex-col items-center">
                                    <Link className=' transition transform hover:-translate-y-1 hover:scale-105 text-center w-3/4' to={"/subscription"}>
                                        <button onClick={close} className="uppercase py-2 px-4 bg-blue-500 hover:bg-blue-600 text-white font-semibold w-full rounded-full mb-3">
                                            Subscribe Now
                                        </button></Link>
                                    <Button onClick={close} className="bg-transparent border border-gray-500 text-gray-300 font-medium py-2 px-4 rounded-full w-3/4 hover:bg-gray-700 hover:text-white transition transform hover:-translate-y-1 hover:scale-105 shadow-lg uppercase">
                                        Remind me later.
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

export default PopupModal