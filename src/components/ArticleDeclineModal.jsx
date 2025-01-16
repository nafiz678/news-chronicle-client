import { Dialog, DialogPanel, DialogTitle, Textarea } from '@headlessui/react'
import { useState } from 'react'
import { MdCancel } from "react-icons/md";
import { Button } from './ui/button';
import clsx from 'clsx'
import toast from 'react-hot-toast';


export default function ArticleDeclineModal() {
  let [isOpen, setIsOpen] = useState(false)
  // State to hold the textarea value
  const [text, setText] = useState("");
  const [disable, setDisable] = useState(false);

  function open() {
    setIsOpen(true)
  }

  function close() {
    setIsOpen(false)
  }


    // Handler for textarea input
    const handleChange = (event) => {
      setText(event.target.value);
    };
  
    // Handler for confirm button click
    const handleConfirm = () => {
      // setText("")
      // console.log("Textarea value:", text); // Log the textarea value or process it
      // Perform other actions with `text` (e.g., send to API, update state, etc.)
      if(text){
        console.log("Textarea value:", text)
        close()
        setDisable(true)
      }else{
        toast.error("Message cannot be empty")
      }
    };

  return (
    <>
      <Button
        disabled={disable}
        data-tooltip-id="my-tooltip"
        data-tooltip-content="Cancel"
        size="sm"
        onClick={open}
        className="rounded-md bg-black/90 py-2 px-3 text-xs font-medium text-white focus:outline-none data-[hover]:bg-black/30 data-[focus]:outline-1 data-[focus]:outline-white"
      >
        <MdCancel></MdCancel>
      </Button>

      <Dialog open={isOpen} as="div" className="relative z-10 focus:outline-none" onClose={close}>
        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4">
            <DialogPanel
              transition
              className="w-full max-w-md rounded-xl bg-black p-6 backdrop-blur-2xl duration-300 ease-out data-[closed]:transform-[scale(95%)] data-[closed]:opacity-0"
            >
              <DialogTitle as="h3" className="text-base/7 font-medium text-white">
                What is the reason for cancellation?
              </DialogTitle>
              <p className="mt-2 text-sm/6 text-white/50">
                <Textarea
                  onChange={handleChange}
                  className={clsx(
                    'mt-3 block w-full resize-none rounded-lg border-none bg-white/20 py-1.5 px-3 text-sm/6 text-white',
                    'focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-white/25'
                  )}
                  rows={3}
                />
              </p>
              <div className="mt-4 text-end">
                <Button
                  className="inline-flex items-center gap-2 rounded-md bg-gray-700 py-1.5 px-3 text-sm/6 font-semibold text-white shadow-inner shadow-white/10 focus:outline-none data-[hover]:bg-gray-600 data-[focus]:outline-1 data-[focus]:outline-white data-[open]:bg-gray-700 mr-4"
                  onClick={close}
                >
                  Cancel
                </Button>
                <Button
                  className="inline-flex items-center gap-2 rounded-md bg-gray-700 py-1.5 px-3 text-sm/6 font-semibold text-white shadow-inner shadow-white/10 focus:outline-none data-[hover]:bg-gray-600 data-[focus]:outline-1 data-[focus]:outline-white data-[open]:bg-gray-700 "
                  onClick={handleConfirm}
                >
                  Confirm
                </Button>
              </div>
            </DialogPanel>
          </div>
        </div>
        {/* <Tooltip id="my" /> */}
      </Dialog>
    </>
  )
}
