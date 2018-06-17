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


var users = [
    {
        id: 0,
        username: "ChatCreator",
        md5: "1215a5c581427689ba073f9566216c6f",
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
    }
];

webSocketServer.on("connection", function(ws) {
    clientId = maxClientId++;
    ws.clientId = clientId+"key";
    clients[clientId+"key"] = ws;
    ws.on("message", function(message) {
        let messageData = JSON.parse(message);
        console.log("INCOMING! OBJECTIVE = " +messageData.objective);
        //if user needs to get his current state
        if (messageData.objective === "getState") {
            let user = JSON.parse(JSON.stringify(getUserStateByField("md5", messageData.md5)));
            user.users = users;
            console.log("NEW USER CONNECTED! HIS ID = " + user.id);
            // we need set relationship between user's id and his WebSocket's clientId for sending message etc.
            ws.id = user.id;
            clients[ws.clientId] = ws;
            sendAllClientsState(clients)
            // ws.send(JSON.stringify(user));
        }
        //if user needs to send a message to someone
        if (messageData.objective === "sendMessage"){
            console.log("NEW MESSAGE FROM USER with clientId" + ws.id + " TO USER " + messageData.id);
            //get sender's state and write his message to it
            let sender = getUserStateByField("id", ws.id);
            let senderDialogIndex = getDialogIndexByField(sender, "id",  messageData.id);
            sender['dialogs'][senderDialogIndex].messagesHistory.push({
                type : "outgoing",
                text: messageData.text,
                type: messageData.type,
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
                type: messageData.type,
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
        //change user's status to OFFLINE
        let user = getUserStateByField("id", ws.id);
        user.status = "offline";
        updateUser(user);

        //remove user connection from clients-array
        console.log("BEFORE REMOVING clients.length = ", Object.keys(clients).length);
        console.log("KEYS BEFORE");
        console.log(Object.keys(clients));

        console.log('TRYING TO REMOVE ws.clientId = ', ws.clientId);
        delete clients[ws.clientId];

        console.log("AFTER REMOVING clients.length = ", Object.keys(clients).length);
        console.log("KEYS AFTER");
        console.log(Object.keys(clients));

        sendAllClientsState(clients)

});

});

function sendAllClientsState(clients) {
    Object.keys(clients).forEach((key) => {
        let user = JSON.parse(JSON.stringify(getUserStateByField("id", clients[key].id)));
        user.users = users;
        clients[key].send(JSON.stringify(user));
    })
}

app.post("/login", function(req, res) {
    if (isUserExist(req.body.md5)) {

        //change user's status to ONLINE
        let user = getUserStateByField("md5", req.body.md5);
        user.status = "online";
        updateUser(user);

        res.send({ status: "success" });
    } else {
        res.send({ status: "fail" });
    }
});

app.post("/register", function(req, res) {
    if (registerUser(req.body.md5, req.body.username, users.length)) {
        res.send({ status: "success" });
    } else {
        res.send({ status: "fail" });
    }
});

function registerUser(md5, username, id) {
    let success = !isUserExist(md5);

    if (success) {
        let newUser = {
            id: id,
            username: username,
            status: "offline",
            md5: md5,
            currentDialog: 0,
            dialogs: []
        };
        users.push(newUser);
        console.log("ALL USERS ", users);
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
