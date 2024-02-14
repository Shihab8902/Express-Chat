import { createContext, useCallback, useContext, useState } from "react";
import PropType from 'prop-types';
import { UserContext } from "./AuthProvider";
import { v4 as uuidv4 } from 'uuid';

export const ConversationContext = createContext(null);

const ConversationProvider = ({ children }) => {

    const { user } = useContext(UserContext);

    const [receiver, setReceiver] = useState('');
    const [messages, setMessages] = useState([]);


    //Conversation data
    const conversationData = {
        sender: user?.email,
        receiver,
        messages
    }


    //Set own messages
    const setOwnMessages = useCallback((message) => {

        const yourMessageData = {
            messageId: uuidv4(),
            from: "You",
            to: receiver,
            content: message
        }

        setMessages((prevMessage) => [...prevMessage, yourMessageData])
    }, [receiver]);





    const conversationValues = {
        setReceiver,
        setOwnMessages

    }


    return <ConversationContext.Provider value={conversationValues}>
        {children}
    </ConversationContext.Provider>


}

export default ConversationProvider



ConversationProvider.propTypes = {
    children: PropType.node
}