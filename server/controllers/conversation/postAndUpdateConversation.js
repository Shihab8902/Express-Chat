const conversationCollection = require("../../model/conversation");


const postAndUpdateConversation = async (req, res) => {
    try {
        const sender = req.query.sender;
        const receiver = req.query.receiver;
        const conversationId = req.query.id;
        const data = req.body;

        //If a conversation id is provided from the client it will just update the previous conversation
        if (conversationId) {
            const filter = { sender, receiver };
            const swappedFilter = { sender: receiver, receiver: sender };

            await conversationCollection.updateOne(filter, { sender, receiver, messages: data.messages });
            await conversationCollection.updateOne(swappedFilter, { sender: receiver, receiver: sender, messages: data.messages });

            return res.send("Updated both!");

        }

        //Check if either of the user have their conversation 
        else {
            const existingConversation = await conversationCollection.findOne(
                {
                    $or: [
                        { sender, receiver },
                        { sender: receiver, receiver: sender }
                    ]
                }
            );

            //Update the available conversation or create new conversation for the deleted user
            if (existingConversation) {
                const newMessages = [...existingConversation.messages, ...data.messages];
                await conversationCollection.updateOne({ sender: existingConversation.sender, receiver: existingConversation.receiver }, { messages: newMessages });
                await conversationCollection.create({ sender: existingConversation.receiver, receiver: existingConversation.sender, messages: data.messages });
                return res.send("updated one!");
            } else {
                //Create new data for the first time
                await conversationCollection.create({
                    sender,
                    receiver,
                    messages: data.messages
                });

                await conversationCollection.create({
                    sender: receiver,
                    receiver: sender,
                    messages: data.messages
                });
            }

            return res.send("Created new!");
        }


    }

    catch (error) {
        console.log(error);
    }
}

module.exports = postAndUpdateConversation;