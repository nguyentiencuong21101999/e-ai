import React, { FC, ReactNode } from "react"
import { CloseIcon, LoadingIcon } from "@/components/Common/Icons"
import Button from "@/components/Common/Button"

interface ModalProps {
  isOpen: boolean
  onClose: () => void
  onCreate: () => void
  title: string
  loading: boolean
}

const Modal: FC<ModalProps> = ({
  isOpen,
  onClose,
  title,
  loading,
  onCreate,
}) => {
  if (!isOpen) return null

  return (
    <div className="fixed text-black top-0 left-0 w-full h-full bg-black/50 flex justify-center items-center">
      <div className="bg-white relative w-[500px] p-[20px] rounded-[5px] shadow-[0px_2px_5px_rgba(0, 0, 0, 0.3)] ">
        <div className="absolute right-4 top-4" onClick={onClose}>
          <CloseIcon
            color="black"
            className=" cursor-pointer"
            width="14"
            height="13"
          />
        </div>
        <div className="my-4 text-center font-semibold text-[20px]">
          {title}
        </div>
        {/* {children} */}
        <div className="flex justify-center gap-6 items-center mt-8">
          <Button
            className="bg-gray-500 rounded-[8px] w-[131px] hover:bg-gray-400 "
            onClick={onClose}
          >
            <p className=" text-[14px] font-semibold text-white">Cancel</p>
          </Button>
          <Button
            onClick={onCreate}
            className="bg-success-100 rounded-[8px] w-[131px] hover:bg-success-400 "
          >
            {loading ? (
              <LoadingIcon className="fill-success-100" />
            ) : (
              <p className=" text-[14px] font-semibold text-white">Logout</p>
            )}
          </Button>
        </div>
      </div>
    </div>
  )
}

export default Modal
