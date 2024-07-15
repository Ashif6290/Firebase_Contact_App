import { createPortal } from "react-dom";
import { IoIosClose } from "react-icons/io";

const Modal = ( {onClose , isOpen , children }) => {
  return createPortal(
    <>
    {isOpen && (
        <>
            && <div className="relative z-50 m-auto min-h-[200px] max-w-[80%] bg-white p-4">
                <div className="flex justify-end">
                    <IoIosClose onClick={onClose} className="text-2xl self-end" />
                </div>
                {children}
            </div>
            <div onClick={onClose} className="absolute top-0 z-40 h-screen w-screen backdrop-blur"/>
        </>
    )} 
    </>
  ,document.getElementById("modal-root"))
}

export default Modal