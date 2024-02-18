import { useLocation, useNavigate } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa6";
import { HiOutlineStatusOnline } from "react-icons/hi";
import { IoIosSend } from "react-icons/io";
import { useContext, useEffect, useRef, useState } from "react";
import { UserContext } from "../../../Context/AuthProvider";
import "./chatField.css";
import { ConversationContext } from "../../../Context/ConversationProvider";
import useAxiosSecure from "../../../hooks/useAxiosSecure";



const ChatField = () => {

    const navigate = useNavigate();

    const scrollRef = useRef();
    const textAreaRef = useRef();

    const { user } = useContext(UserContext);
    const [message, setMessage] = useState('');
    const axiosSecure = useAxiosSecure();


    //Get contact details
    const contact = useLocation().state;
    const { photo, name, email } = contact;
    const { setSender, setReceiver, setOwnMessage, conversations, loading, socket } = useContext(ConversationContext);

    //Set sender and receiver on initial component mount
    useEffect(() => {
        setSender(user?.email);
        setReceiver(email);
    }, [user, contact]);


    const handleSubmit = e => {
        e.preventDefault();
        const messageData = {
            from: user?.email,
            to: email,
            content: message
        }
        socket.current.emit("sendMessage", {
            senderId: messageData.from,
            receiverId: messageData.to,
            message: messageData.content
        });
        setOwnMessage(messageData);
        setMessage('');

        //Set the contact to another person message request
        if (!conversations) {
            const messageRequestData = {
                name: user.displayName,
                email: user.email,
                photo: user.photoURL,
                recipientEmail: email
            }

            axiosSecure.post("/messageRequest", messageRequestData);
        }
    }


    useEffect(() => {
        scrollRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [conversations])



    //Handle text area height
    const handleTextAreaHeight = () => {
        const textarea = textAreaRef.current;
        if (textarea) {
            textarea.style.height = "50px";
            textarea.style.height = `${textarea.scrollHeight}px`;
            textarea.scrollTop = textarea.scrollHeight;
        }
    };




    return <section className=" h-screen overflow-hidden flex flex-col">

        {/* Upper section */}
        <div className="w-full bg-green-600 sticky top-0 z-20  min-h-14  flex justify-between items-center px-5 py-4">

            {/* Back button for mobile devices */}
            <div className="lg:hidden">
                <button onClick={() => navigate("/")} className="text-white text-xl"><FaArrowLeft /></button>
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


            {/* Active status */}
            <div>
                <span className="flex items-center gap-1 text-sm  text-white font-medium "><HiOutlineStatusOnline className="text-xl md:text-lg " /> </span>
            </div>


        </div>

        {/* Message body */}
        <div className="overflow-y-auto  h-full ">
            {
                loading ? <div className="flex h-full justify-center items-center text-gray-500">
                    <span className="loading loading-dots loading-xs"></span>
                    <span className="loading loading-dots loading-sm"></span>
                    <span className="loading loading-dots loading-md"></span>
                    <span className="loading loading-dots loading-lg"></span>
                </div> :
                    <div className="flex overflow-y-auto h-full flex-col gap-4 w-full px-3 pt-4 lg:px-5">
                        {
                            conversations?.map(message => {

                                return <>
                                    {
                                        message.from === user.email ? <div className="chat chat-end">
                                            <div ref={scrollRef} key={message._id} className="chat-image avatar">
                                                <div className="w-10 rounded-full">
                                                    <img alt={user?.displayName} src={user?.photoURL} />
                                                </div>
                                            </div>
                                            <div className="chat-bubble bg-green-500 text-white">{message.content}</div>
                                            <div className="chat-footer text-xs opacity-60">
                                                You
                                            </div>
                                        </div>
                                            :

                                            <div ref={scrollRef} key={message._id} className="chat chat-start">
                                                <div className="chat-image avatar">
                                                    <div className="w-10 rounded-full">
                                                        <img alt={name} src={photo} />
                                                    </div>
                                                </div>

                                                <div className="chat-bubble  text-white">{message.content}</div>
                                                <div className="chat-footer text-xs opacity-60">
                                                    {name || email}
                                                </div>
                                            </div>

                                    }

                                </>

                            })
                        }
                    </div>
            }
        </div>

        {/* Message input */}
        <div className=" bg-white justify-end items-end  w-full py-2 px-5 ">
            <form onSubmit={handleSubmit} className="flex items-center gap-2  ">
                <textarea
                    className="w-full outline-none border-2 hide-scrollbar py-2 px-4 focus:border-green-600 rounded-2xl focus:border resize-none max-h-32 overflow-auto"
                    onChange={(e) => {
                        setMessage(e.target.value);
                        handleTextAreaHeight()
                    }}
                    ref={textAreaRef}
                    style={{ height: '50px' }}
                    value={message}
                    name="messageInput"
                    id="messageInput"
                    placeholder="Compose Message" />
                <button disabled={!message} className=" p-3 rounded-full bg-green-600 text-xl text-white  "><IoIosSend /></button>
            </form>
        </div>


    </section>
}

export default ChatField