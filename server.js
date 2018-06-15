const WebSocketServer = new require("ws");
const bodyParser = require("body-parser");
const webSocketServer = new WebSocketServer.Server({ port: 5001 });
const express = require("express");
const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
const port = process.env.PORT || 5000;

let clients = [];
let maxClientId = 0;


webSocketServer.on("connection", function(ws) {
    clientId = maxClientId++;
    ws.id = clientId;
    clients[clientId] = ws;
    ws.on("message", function(message) {
        let messageData = JSON.parse(message);
        console.log("INCOMING! OBJECTIVE = " +messageData.objective);
        //if user needs to get his current state
        if (messageData.objective === "getState") {
            let user = getUserStateByField("md5", messageData.md5);
            console.log("NEW USER CONNECTED! HIS ID = " + user.id);
            // we need set relationship between user's id and his WebSocket's clientId for sending message etc.
            ws.id = user.id;
            ws.send(JSON.stringify(user));
        }
        //if user needs to send a message to someone
        if (messageData.objective === "sendMessage"){
            console.log("NEW MESSAGE FROM USER with clientID" + ws.id + " TO USER " + messageData.id);
            //get sender's state and write his message to it
            let sender = getUserStateByField("id", ws.id);
            let senderDialogIndex = getDialogIndexByField(sender, "id",  messageData.id);
            sender['dialogs'][senderDialogIndex].messagesHistory.push({
                type : "outgoing",
                text: messageData.text,
                date: new Date()
            });

            updateUser(sender);
            console.log("SENDER dialogs WAS UPDATED ", sender.dialogs[0].messagesHistory);

            //get recepient's state and write new message to it
            let recepient = getUserStateByField("id", messageData.id);
            let recepientDialogIndex = getDialogIndexByField(recepient, "id", ws.id);
            recepient['dialogs'][recepientDialogIndex].messagesHistory.push({
                type : "incoming",
                text: messageData.text,
                date: new Date()
            });

            updateUser(recepient);
            console.log("RECEPIENT dialogs WAS UPDATED ", recepient.dialogs[0].messagesHistory);

            // send new states to both users
            ws.send(JSON.stringify(sender));
            let recepientSocket = getWebSocketUserById(messageData.id);
            recepientSocket.send(JSON.stringify(recepient));
        }
    });

    ws.on("close", function() {
        delete clients[clientId];
    });
});


var users = [
    {
        id: 0,
        username: "User1",
        md5: "50b92537095361fbfc94812b625d2ea3",
        currentDialog: 1,
        dialogs: [
            {
                id: 1,
                username: "User2",
                status: "online",
                visible: true,
                messagesHistory: [
                    {
                        type: "outgoing",
                        text: "Yo bro!",
                        date: new Date()
                    }
                ]
            }
        ]
    },
    {
        id: 1,
        username: "User2",
        md5: "c0eb83af2ffa88dfe88319652007d7aa",
        currentDialog: 0,
        dialogs: [
            {
                id: 0,
                username: "User1",
                status: "online",
                visible: true,
                messagesHistory: [
                    {
                        type: "incoming",
                        text: "Yo bro!",
                        date: new Date()
                    }
                ]
            }
        ]
    }
];

app.post("/login", function(req, res) {
    if (isUserExist(req.body.md5)) {
        res.send({ status: "success" });
    } else {
        res.send({ status: "fail" });
    }
});

app.post("/register", function(req, res) {
    if (registerUser(req.body.md5, req.body.username)) {
        res.send({ status: "success" });
    } else {
        res.send({ status: "fail" });
    }
});

function registerUser(md5, username) {
    let success = !isUserExist(md5);

    if (success) {
        let newUser = {
            username: username,
            md5: md5,
            currentDialog: 0,
            dialogs: [
                {
                    id: 0,
                    username: "Chat Creator",
                    status: "online",
                    visible: true,
                    messagesHistory: [
                        {
                            type: "incoming",
                            text: "Yo bro!",
                            date: new Date()
                        }
                    ]
                }
            ]
        };
        users.push(newUser);
    }
    return success;
}

function isUserExist(md5) {
    let exist = false;
    //check if user with same md5 exists
    users.forEach(function(user) {
        if (user.md5 === md5) {
            exist = true;
        }
    });

    return exist;
}

function getUserStateByField(fieldName, value) {
    let res;
    users.forEach(function(user) {
        if (user[fieldName] === value) {
            res = user;
        }
    });

    return res;
}

function getDialogIndexByField(user, fieldName, value){
    let res;
    user.dialogs.forEach(function(dialog, index) {
        if (dialog[fieldName] === value) {
            res = index;
        }
    });

    return res;
}

function updateUser(user){
    //search user in users-array and remove it
    let newUsers = users.filter(function(currentUser){
        return (currentUser.id !== user.id)
    });

    newUsers.push(user);

    users = newUsers;
}

function getWebSocketUserById(id){
    let res;
    clients.forEach(function (connection) {
        if (connection.id === id)
            res = connection
    });

    return res;
}


app.listen(port, () => console.log(`Listening on port ${port}`));
