import { FaUserPlus } from "react-icons/fa";
import { useContext, useState } from "react";
import { UserContext } from "../../../Context/AuthProvider";
import ContactAddingModal from "../../../Components/Modal/ContactAddingModal";
import useGetSecure from "../../../hooks/useGetSecure";
import ContactManageModal from "../../../Components/Modal/ContactManageModal";
import { useNavigate } from "react-router-dom";





const Contacts = () => {

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isContactManageModalOpen, setIsContactManageModalOpen] = useState(false);
    const [currentlySelectedContact, setCurrentlySelectedContact] = useState({});

    const { user } = useContext(UserContext);

    const navigate = useNavigate();


    //Fetch available contacts
    const { data: contacts, refetch, isPending } = useGetSecure([user?.email, "contact"], `/contact?email=${user?.email}`);


    //Handle long press touch for mobile devices
    const handleTouchStart = (contact) => {
        setTimeout(() => {
            setCurrentlySelectedContact(contact);
            setIsContactManageModalOpen(!isContactManageModalOpen);
        }, 300);
    }


    //Handle conversation move
    const handleConversationMove = (contact) => {

    }



    return <div className="p-4 ">

        {/* Own contact */}
        <label htmlFor="own-contact" className="text-xs font-semibold text-gray-500 uppercase">
            My contact
        </label>
        <li className="list-none flex items-center  gap-3  py-2 px-5 rounded-lg border">
            <img className="w-12 h-12 rounded-full" src={user?.photoURL} alt="" />
            <div>
                <h3 className=" font-semibold">{user?.displayName}</h3>
                <p className="font-medium text-sm text-gray-500">{user?.email}</p>
            </div>
        </li>



        {/* Create new Contacts */}
        <div className="flex items-center gap-4 justify-center border border-primary rounded-lg py-4 mt-6">
            <span className="text-2xl"><FaUserPlus /></span>
            <button className="font-medium text-lg" onClick={() => setIsModalOpen(!isModalOpen)}> Create new contact</button>
        </div>

        <hr className="my-6" />




        {/* Available Contacts */}
        {
            isPending ? <div className="flex justify-center my-10 text-gray-500">
                <span className="loading loading-dots loading-xs"></span>
                <span className="loading loading-dots loading-sm"></span>
                <span className="loading loading-dots loading-md"></span>
                <span className="loading loading-dots loading-lg"></span>
            </div>
                : contacts?.length > 0 ? contacts?.map(contact => {
                    const { name, email, photo, _id } = contact;


                    return <li
                        onDoubleClick={() => {
                            setIsContactManageModalOpen(!isContactManageModalOpen);
                            setCurrentlySelectedContact(contact);
                        }}
                        onTouchStart={() => handleTouchStart(contact)}
                        onClick={() => {
                            navigate(`/chat/${email}`, { state: contact });
                            handleConversationMove(contact);
                        }}
                        key={_id}
                        className="list-none flex items-center mt-6 gap-3 shadow bg-gray-100 py-2 px-5 rounded-lg cursor-pointer">
                        <img className="w-12 h-12 rounded-full" src={photo} alt="user" />
                        <div>
                            <h3 className=" font-semibold">{name}</h3>
                            <p className="font-medium text-sm text-gray-500">{email}</p>
                        </div>
                    </li>




                })
                    : <div className="text-center my-20 text-gray-500 font-semibold text-2xl">
                        <h3>No contacts were found!</h3>
                    </div>
        }

        <ContactAddingModal isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} refetch={refetch} contacts={contacts} />
        <ContactManageModal isModalOpen={isContactManageModalOpen} setIsModalOpen={setIsContactManageModalOpen} contact={currentlySelectedContact} refetch={refetch} />

    </div>
}

export default Contacts