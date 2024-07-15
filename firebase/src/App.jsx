import { useEffect , useState } from "react";
import Navbar from "./components/Navbar";
import { IoMdSearch } from "react-icons/io";
import { IoAddCircleOutline } from "react-icons/io5";
import { collection , getDocs } from "firebase/firestore";
import { db } from "./config/firebase";
import ContactCard from "./components/ContactCard"; 
import AddAndUpdateContact from "./components/AddAndUpdateContact";
import useDisclosure from "./hooks/useDisclosure";
import { onSnapshot } from "firebase/firestore";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import NotFoundContact from "./components/NotFoundContact";

const App = () => {
  const [contacts , setContacts] = useState([]);
  
  const { isOpen , onClose , onOpen } = useDisclosure();

  useEffect(() => {
    const getContacts = async () => {
      try {
        const contactsRef = collection(db, "contacts");

        onSnapshot(contactsRef , (snapshot) => {
          const contactLists = snapshot.docs.map((doc) => {
            return {
              id: doc.id,
              ...doc.data(),
            };
          });
          setContacts(contactLists);
          return contactLists;
        })
      } catch (error) {
        console.log(error);
      }
    }
    getContacts();
  }, []);
  const filterContacts = (e) => {
    const value = e.target.value;
    const contactsRef = collection(db, "contacts");

    onSnapshot(contactsRef, (snapshot) => {
      const contactLists = snapshot.docs.map((doc) => {
        return {
          id: doc.id,
          ...doc.data(),
        };
      });
      const filteredContacts = contactLists.filter(contact => contact.name.toLowerCase().includes(value.toLowerCase()))
      setContacts(filteredContacts);
      return filteredContacts;
    })
  }
  return (
    <>
      <div className="mx-auto max-w-[370px] px-4">
        <Navbar />
        <div className="flex gap-2">
          <div className="relative flex flex-grow items-center">
            <IoMdSearch className="absolute ml-1 text-3xl text-white" />
            <input onChange={filterContacts} type="text" className="h-10 flex-grow rounded-md border border-white bg-transparent text-white pl-9" />
          </div>
          <IoAddCircleOutline onClick={onOpen} className="cursor-pointer text-5xl text-white" />
        </div>
        <div className="mt-4 flex flex-col gap-3">
          {contacts.length <= 0 ? (<NotFoundContact/>) : (contacts.map((contact) => (
            <ContactCard key={contact.id} contact={contact} />
          ))
        )}
        </div>
      </div>
      <AddAndUpdateContact onClose={onClose} isOpen={isOpen} />
      <ToastContainer position="bottom-center"/>
    </>
  )
}

export default App;