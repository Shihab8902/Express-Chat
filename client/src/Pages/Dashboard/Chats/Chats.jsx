import { useContext, useState } from "react"
import { UserContext } from "../../../Context/AuthProvider"
import useGetSecure from "../../../hooks/useGetSecure";
import { useNavigate } from "react-router-dom";
import ChatManageModal from "../../../Components/Modal/ChatManageModal";
import MessageRequestModal from "../../../Components/Modal/MessageRequestModal";



const Chats = () => {

    const { user } = useContext(UserContext);
    const navigate = useNavigate();

    //States
    const [chatData, setChatData] = useState({});
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isMessageRequestModalOpen, setIsMessageRequestModalOpen] = useState(false);
    const [messageRequestData, setMessageRequestData] = useState([]);


    //Fetch available chats
    const { data: chats = [], isPending, refetch } = useGetSecure([user?.email, "chats"], `/chat?email=${user?.email}`);

    //Fetch available message requests
    const { data: messageRequests = [], refetch: messageRequestRefetch } = useGetSecure([user?.email, "Message-requests"], `/messageRequest?email=${user?.email}`);


    //Handle long press touch for mobile devices
    const handleTouchStart = (chat) => {
        setTimeout(() => {
            const chatDa = {
                id: chat._id,
                sender: user.email,
                receiver: chat.email
            }
            setChatData(chatDa);
            setIsModalOpen(!isModalOpen);
        }, 300);
    }

    return <div className="p-4 ">

        {/* Message requests */}
        <li className="list-none flex items-center  gap-3 bg-gray-100  py-2 px-5 rounded-lg border">
            <button onClick={() => {
                setIsMessageRequestModalOpen(!isMessageRequestModalOpen);
                setMessageRequestData(messageRequests);
            }}
                className="w-full font-semibold flex  items-center justify-center gap-2">Message Requests <span className="bg-red-600 w-5 h-5  flex justify-center items-center rounded-full text-xs text-white">{messageRequests?.length || 0}</span> </button>
        </li>




        {/* Available Chats */}
        {
            isPending ? <div className="flex justify-center my-10 text-gray-500">
                <span className="loading loading-dots loading-xs"></span>
                <span className="loading loading-dots loading-sm"></span>
                <span className="loading loading-dots loading-md"></span>
                <span className="loading loading-dots loading-lg"></span>
            </div>
                : chats?.length > 0 ? chats?.map(chat => {
                    const { name, email, photo, _id } = chat;


                    return <li
                        onDoubleClick={() => {
                            setIsModalOpen(!isModalOpen);
                            const chatDa = {
                                id: _id,
                                sender: user.email,
                                receiver: chat.email
                            }
                            setChatData(chatDa);
                        }}
                        onTouchStart={() => handleTouchStart(chat)}
                        onClick={() => {
                            navigate(`/chat/${email}`, { state: chat });
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
                        <h3>You don't have any conversation yet!</h3>
                    </div>
        }



        <ChatManageModal isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} chatData={chatData} refetch={refetch} />

        <MessageRequestModal isModalOpen={isMessageRequestModalOpen} setIsModalOpen={setIsMessageRequestModalOpen} data={messageRequestData} refetch={messageRequestRefetch} />

    </div>




}

export default Chats