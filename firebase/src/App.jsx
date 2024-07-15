import { useEffect , useState } from "react";
import Navbar from "./components/Navbar";
import { IoMdSearch } from "react-icons/io";
import { IoAddCircleOutline } from "react-icons/io5";
import { collection , getDocs } from "firebase/firestore";
import { db } from "./config/firebase";
import ContactCard from "./components/ContactCard";
import Modal from "./components/Modal";
import AddAndUpdateContact from "./components/AddAndUpdateContact";


const App = () => {
  const [contacts , setContacts] = useState([]);
  const [isOpen , setOpen] = useState(false);
  const onOpen = () => {
    setOpen(true);
  };
  const onClose = () => {
    setOpen(false);
  }
  useEffect(() => {
    const getContacts = async () => {
      try {
        const contactsRef = collection(db, "contacts");
        const contactsSnapshot = await getDocs(contactsRef);
        const contactLists = contactsSnapshot.docs.map((doc) => {
          return {
            id: doc.id,
            ...doc.data(),
          };
        });
        setContacts(contactLists);
      } catch (error) {
        console.log(error);
      }
    }
    getContacts();
  }, []);
  return (
    <>
      <div className="mx-auto max-w-[370px] px-4">
        <Navbar />
        <div className="flex gap-2">
          <div className="relative flex flex-grow items-center">
            <IoMdSearch className="absolute ml-1 text-3xl text-white" />
            <input type="text" className="h-10 flex-grow rounded-md border border-white bg-transparent text-white pl-9" />
          </div>
          <IoAddCircleOutline onClick={onOpen} className="cursor-pointer text-5xl text-white" />
        </div>
        <div className="mt-4 flex flex-col gap-3">
          {contacts.map((contact) => (
            <ContactCard key={contact.id} contact={contact} />
          ))}
        </div>
      </div>
      <AddAndUpdateContact onClose={onClose} isOpen={isOpen} />
    </>
  )
}

export default App;