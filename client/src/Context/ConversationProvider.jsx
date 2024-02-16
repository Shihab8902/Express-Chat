import { createContext, useCallback, useContext, useEffect, useRef, useState } from "react";
import PropType from 'prop-types';
import useAxiosSecure from "../hooks/useAxiosSecure";
import { io } from 'socket.io-client';
import { UserContext } from "./AuthProvider";

export const ConversationContext = createContext(null);

const ConversationProvider = ({ children }) => {
    const { user } = useContext(UserContext);
    const axiosSecure = useAxiosSecure();
    const [receiver, setReceiver] = useState('');
    const [sender, setSender] = useState('');
    const [loading, setLoading] = useState(true);
    const [conversations, setConversations] = useState([]);
    const socket = useRef(io("ws://localhost:5000"));


    //Fetch data on first render
    useEffect(() => {
        if (sender && receiver) {
            setLoading(true);
            axiosSecure.get(`/conversation?sender=${sender}&receiver=${receiver}`)
                .then(res => {
                    setConversations(res.data?.messages);
                    setLoading(false);
                })
        }
    }, [sender, receiver, axiosSecure]);


    //Setting message
    const setOwnMessage = useCallback(messageData => {
        if (conversations) {
            const newConversation = [...conversations, messageData];
            setConversations(newConversation);
            axiosSecure.post(`/conversation?sender=${sender || ''}&receiver=${receiver || ''}`, newConversation);

        } else {
            const newConversation = [messageData];
            setConversations(newConversation);
            axiosSecure.post(`/conversation?sender=${sender || ''}&receiver=${receiver || ''}`, newConversation);
        }


    }, [conversations, sender, receiver]);


    useEffect(() => {
        socket.current = io("ws://localhost:5000");
    }, []);


    //Assign socket after component re-render
    useEffect(() => {
        socket.current.on("getMessage", data => {
            const messageData = {
                from: data.sender.userId,
                to: data.receiver.userId,
                content: data.message
            }
            setOwnMessage(messageData);

        });
    }, [setOwnMessage]);


    //Send user email
    useEffect(() => {
        socket.current?.emit("addUser", user?.email || '');
        socket.current?.on("getUsers", () => {

        })
    }, [user]);



    const conversationValues = {
        setSender,
        setReceiver,
        loading,
        conversations,
        setOwnMessage,
        socket
    }


    return <ConversationContext.Provider value={conversationValues}>
        {children}
    </ConversationContext.Provider>


}

export default ConversationProvider



ConversationProvider.propTypes = {
    children: PropType.node
}