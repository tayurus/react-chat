const WebSocketServer = new require("ws");
const bodyParser = require("body-parser");
const webSocketServer = new WebSocketServer.Server({ port: 5001 });
const express = require("express");
const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
const port = process.env.PORT || 5000;

let clients = {};
let maxClientId = 0;


webSocketServer.on("connection", function(ws) {
    clientId = maxClientId;
    clients[clientId] = ws;
    ws.on("message", function(message) {
        let messageData = JSON.parse(message);
        //if user needs to get his current state
        if (messageData.objective === "getState") {
            let user = getUserStateByMd5(clients[clientId].md5);
            // we need set relationship between user's id and his WebSocket's clientId for sending message etc.
            clients[clientId].id = user.id;
            clients[clientId].send(JSON.stringify(user));
        }
        //if user needs to send a message to someone
        if (messageData.objective === "sendMessage"){
            
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
        md5: "ccb1d796661ea9dc6f7886e0c411df71",
        currentDialog: 0,
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
    {
        id: 1,
        username: "User2",
        md5: "ccb1d796661ea9dc6f7886e0c411df71",
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

function getUserStateByMd5(md5) {
    let res;
    users.forEach(function(user) {
        if (user.md5 === md5) {
            res = user;
        }
    });

    return res;
}

app.listen(port, () => console.log(`Listening on port ${port}`));
