import { FaUserPlus } from "react-icons/fa";
import { useContext, useState } from "react";
import { UserContext } from "../../../Context/AuthProvider";
import ContactAddingModal from "../../../Components/Modal/ContactAddingModal";
import useGetSecure from "../../../hooks/useGetSecure";
import { CiEdit } from "react-icons/ci";




const Contacts = () => {

    const [isModalOpen, setIsModalOpen] = useState(false);

    const { user } = useContext(UserContext);


    //Fetch available contacts
    const { data: contacts, refetch, isPending } = useGetSecure([user?.email, "contact"], `/contact?email=${user?.email}`);

    console.log(contacts);



    //handle contact manage
    const handleContactManage = (id) => {
        console.log(id);
        //TODO: 1. do edit and delete contact
        //2. implement verify token
        //3. set interceptor in axios secure
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
            isPending ? ""
                : contacts?.length > 0 ? contacts?.map(contact => {
                    const { name, email, photo, _id } = contact;

                    return <>

                        <li onDoubleClick={() => handleContactManage(_id)} key={_id} className="list-none flex items-center mt-6 gap-3 shadow bg-gray-100 py-2 px-5 rounded-lg ">
                            <img className="w-12 h-12 rounded-full" src={photo} alt="" />
                            <div>
                                <h3 className=" font-semibold">{name}</h3>
                                <p className="font-medium text-sm text-gray-500">{email}</p>
                            </div>


                            {/* Action buttons */}
                            <div>
                                <button><CiEdit /></button>
                            </div>
                        </li>

                    </>
                })
                    : ""
        }

        <ContactAddingModal isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} />

    </div>
}

export default Contacts