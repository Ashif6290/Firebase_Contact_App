import { IoMdContact } from "react-icons/io";
import { FaRegTrashAlt } from "react-icons/fa";
import { RiEditCircleLine } from "react-icons/ri";
import { deleteDoc, doc } from "firebase/firestore";
import { db } from "../config/firebase";
import AddAndUpdateContact from "./AddAndUpdateContact";
import useDisclosure from "../hooks/useDisclosure";
import { toast } from "react-toastify";


const ContactCard = ({ contact }) => {
    const { isOpen , onClose , onOpen } = useDisclosure();

    const deleteContact = async (id) => {
        try {
            await deleteDoc(doc(db, "contacts", id));
            toast.success("Contact Deleted Successfully!");
        } catch (error) {
            console.log(error);
        }
    }
    return (
        <>
            <div key={contact.id} className="bg-yellow flex items-center justify-around p-2 rounded-lg">
                <div className="flex gap-1">
                    <IoMdContact className="text-orange text-4xl" />
                    <div className="">
                        <h2 className="text-medium">{contact.name}</h2>
                        <p className="text-sm">{contact.email}</p>
                    </div>
                </div>
                <div className="flex text-2xl">
                    <RiEditCircleLine onClick={onOpen} className="cursor-pointer"/>
                    <FaRegTrashAlt onClick={() => deleteContact(contact.id)} className="text-orange cursor-pointer" />
                </div>
            </div>
            <AddAndUpdateContact contact = {contact} isUpdate isOpen={isOpen} onClose={onClose} />
        </>

    )
}

export default ContactCard