const io = require("socket.io")(process.env.PORT || 5000, {
    cors: {
        origin: "http://localhost:5173"
    }
});


let users = [];


//Check for duplicate user
const addUser = (userId, socketId) => {
    !users?.some(user => user.userId === userId) &&
        users.push({ userId, socketId });
}

//Remove user after disconnect
const removeUser = (socketId) => {
    users = users.filter(user => user.socketId !== socketId);
}


//Get user 
const getUser = userId => {
    return users.find(user => user.userId === userId);
}



//listen the socket server
io.on("connection", (socket) => {
    console.log("A user is connected");

    //Connect user
    socket.on("addUser", userId => {
        if (userId) {
            addUser(userId, socket.id);
            io.emit("getUsers", users);
        }
    });


    //Send and receive messages
    socket.on("sendMessage", ({ senderId, receiverId, message }) => {
        const sender = getUser(senderId);
        const receiver = getUser(receiverId);
        io.to(receiver?.socketId).emit("getMessage", {
            sender,
            receiver,
            message
        });
    });



    //Disconnect user
    socket.on("disconnect", () => {
        console.log("A user disconnected")
        removeUser(socket.id);
        io.emit("getUsers", users);
    })
});