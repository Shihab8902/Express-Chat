import { useLocation, useNavigate } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa6";
import { BsThreeDotsVertical } from "react-icons/bs";
import { IoIosSend } from "react-icons/io";
import { useContext, useEffect } from "react";
import { ConversationContext } from "../../../Context/ConversationProvider";




const ChatField = () => {

    const navigate = useNavigate();

    //Get contact details
    const contact = useLocation().state;
    const { photo, name, email } = contact;

    const { setReceiver, setOwnMessages } = useContext(ConversationContext);

    useEffect(() => {
        setReceiver(email);
    }, []);

    const handleSubmit = e => {
        e.preventDefault();
        setOwnMessages(e.target.messageInput.value);
        e.target.reset();
    }

    //Update the receiver on page render




    return <section className=" h-screen overflow-y-auto relative">

        {/* Upper section */}
        <div className="w-full bg-green-600 sticky top-0  min-h-14  flex justify-between items-center px-5 py-4">

            {/* Back button for mobile devices */}
            <div className="lg:hidden">
                <button onClick={() => navigate(-1)} className="text-white text-xl"><FaArrowLeft /></button>
            </div>

            {/* Contact details */}
            <div className="flex items-center gap-1 text-white">
                <img className="w-12 h-12 rounded-full" src={photo} alt="user" />

                {/* String limit version for mobile devices */}
                <div className="md:hidden">
                    <h3 className="text-sm font-semibold">
                        {
                            name?.length > 12 ? name?.slice(0, 12) + "..." : name
                        }
                    </h3>
                    <p className="text-sm font-semibold">
                        {
                            email?.length > 21 ? email?.slice(0, 21) + "..." : email
                        }
                    </p>
                </div>

                {/* Full version for bigger screens */}
                <div className="hidden md:block">
                    <h3 className="text-sm font-semibold">{name}</h3>
                    <p className="text-sm font-semibold">{email}</p>
                </div>

            </div>

            {/* Three dot menu */}
            <div className="dropdown dropdown-end">
                <div tabIndex={0} role="button" >
                    <div className="indicator">
                        <button className="text-xl text-white"><BsThreeDotsVertical /></button>
                    </div>
                </div>
                <div tabIndex={0} className="mt-3 z-[1] card card-compact dropdown-content w-52 bg-base-100 shadow">
                    <div className="card-body">
                        <span className="font-bold text-lg">8 Items</span>
                        <span className="text-info">Subtotal: $999</span>
                        <div className="card-actions">
                            <button className="btn btn-primary btn-block">View cart</button>
                        </div>
                    </div>
                </div>
            </div>


        </div>

        {/* Message body */}
        <div>

        </div>

        {/* Message input */}
        <div className="absolute bottom-0 left-0 w-full py-2 px-5 ">
            <form onSubmit={handleSubmit} className="flex items-center gap-2">
                <input className=" w-full border border-slate-600 px-5 py-2 font-semibold placeholder:font-normal rounded-full outline-none" type="text" name="messageInput" id="messageInput" placeholder="Compose Message" />
                <button className=" p-3 rounded-full bg-green-600 text-xl text-white  "><IoIosSend /></button>
            </form>
        </div>





    </section>
}

export default ChatField