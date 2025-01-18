// import { Dialog, DialogPanel, DialogTitle } from '@headlessui/react'

// function CheckoutModal({ isOpen, handleSubscription, closeModal }) {
//     return (<>
//         <Dialog open={isOpen} as="div" className="relative z-10 focus:outline-none" onClose={closeModal}>
//             <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
//                 <div className="flex min-h-full items-center justify-center p-4">
//                     <DialogPanel
//                         transition
//                         className="w-full max-w-md rounded-xl bg-black p-6 backdrop-blur-2xl duration-300 ease-out data-[closed]:transform-[scale(95%)] data-[closed]:opacity-0"
//                     >
//                         <DialogTitle as="h3" className="text-base/7 font-medium text-white">
//                             Payment successful
//                         </DialogTitle>
//                         <p className="mt-2 text-sm/6 text-white/50">
//                             Your payment has been successfully submitted. We’ve sent you an email with all of the details of your
//                             order.
//                         </p>
//                         <div className="mt-4">
//                             <div className='flex mt-2 justify-between gap-10'>
//                                 <button
//                                     type='button'
//                                     className='inline-flex justify-center rounded-md border border-transparent bg-red-100 px-4 py-2 text-sm font-medium text-red-900 hover:bg-red-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-2'
//                                     onClick={closeModal}
//                                 >
//                                     Cancel
//                                 </button>
//                                 <button
//                                     onClick={handleSubscription}
//                                     type='submit'
//                                     className='inline-flex justify-center rounded-md border border-transparent bg-slate-200 px-4 py-2 text-sm font-medium text-slate-900 hover:bg-slate-200 focus:outline-none focus-visible:ring-2 '
//                                 >
//                                     Confirm
//                                 </button>

//                             </div>
//                         </div>
//                     </DialogPanel>
//                 </div>
//             </div>
//         </Dialog>
//     </>
//     )
// }

// export default CheckoutModal