/* eslint-disable react/prop-types */
import { Dialog, DialogPanel, DialogTitle, Textarea } from '@headlessui/react'
import { MdCancel } from "react-icons/md";
import { Button } from './ui/button';
import clsx from 'clsx'
import { useState } from 'react';


export default function ArticleDeclineModal({ handleDecline, status, id }) {
  
  let [isOpen, setIsOpen] = useState(false)
  const [text, setText] = useState("");

  function open() {
    setIsOpen(true)
  }

  const handleChange = (e)=>{
    setText(e.target.value)
  }

  function close() {
    setIsOpen(false)
  }

  return (
    <>
      <Button
        disabled={status === "declined" || status === "approved"}
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
                  onClick={async () => {
                    await handleDecline(id, text)
                    if(!text) return
                    close()
                  }}
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
