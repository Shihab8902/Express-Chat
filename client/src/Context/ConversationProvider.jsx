import { createContext, useCallback, useEffect, useState } from "react";
import PropType from 'prop-types';
import useAxiosSecure from "../hooks/useAxiosSecure";

export const ConversationContext = createContext(null);

const ConversationProvider = ({ children }) => {

    const axiosSecure = useAxiosSecure();
    const [receiver, setReceiver] = useState('');
    const [sender, setSender] = useState('');
    const [loading, setLoading] = useState(true);
    const [conversationId, setConversationId] = useState('');
    const [conversations, setConversations] = useState(null);
    const [message, setMessage] = useState({});

    //Fetch data on first render
    useEffect(() => {
        if (sender && receiver) {
            setLoading(true);
            axiosSecure.get(`/conversation?sender=${sender}&receiver=${receiver}`)
                .then(res => {
                    setConversations(res.data?.messages);
                    setConversationId(res.data?._id);
                    setLoading(false);
                })
        }
    }, [message, sender, receiver]);

    const setOwnMessage = useCallback(messageData => {
        if (conversations) {
            const newConversation = [...conversations, messageData];
            setConversations(newConversation);

            axiosSecure.post(`/conversation?sender=${sender}&receiver=${receiver}&id=${conversationId || ''}`, newConversation)


        } else {
            const data = [messageData]
            axiosSecure.post(`/conversation?sender=${sender}&receiver=${receiver}&id=${conversationId || ''}`, data)
                .then(() => {
                    setLoading(true);
                    setMessage(messageData);
                });
        }

    }, [conversations, sender, receiver, conversationId]);



    const conversationValues = {
        setSender,
        setReceiver,
        loading,
        conversations,
        setOwnMessage
    }


    return <ConversationContext.Provider value={conversationValues}>
        {children}
    </ConversationContext.Provider>


}

export default ConversationProvider



ConversationProvider.propTypes = {
    children: PropType.node
}