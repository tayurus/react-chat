var WebSocketServer = new require('ws');
var bodyParser = require('body-parser');
var server = new WebSocketServer.Server({  port: 5001});
const express = require('express');
const app = express();
const port = process.env.PORT || 5000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var users = [
    {
      username: "User",
      md5: "ccb1d796661ea9dc6f7886e0c411df71",
      currentDialog: 0,
      dialogs: [
        {
          id: 0,
          username: "Yura",
          status: "online",
          visible: true,
          messagesHistory: [
            {
              type: "incoming",
              text: "Yo bro!",
              date: new Date()
            },
            {
              type: "outgoing",
              text:
                "What do you want!?What do you want!?What do you want!?What do you want!?",
              date: new Date()
            }
          ]
        },

        {
          id: 1,
          username: "Sasha",
          status: "offline",
          visible: true,
          messagesHistory: [
            {
              type: "outgoing",
              text: "May i have a momemnt of your time?",
              date: new Date()
            },
            {
              type: "incoming",
              text: "What do you want!?",
              date: new Date()
            },
            {
              type: "incoming emoji",
              text: "sup",
              date: new Date()
            }
          ]
        },
      ]
    }
]

app.get('/users', (req, res) => {
  res.send(users);
});




app.post("/login", function(req, res){
    console.log("LOGIN!");
    if (isUserExist(req.body.md5)){
        res.send({status: "success"});
    }
    else {
        res.send({status: "fail"});
    }
})

app.post("/register", function(req, res){
    if (registerUser(req.body.md5, req.body.username)){
        res.send({status: "success"});
    }else {
        res.send({status: "fail"});
    }
});



function registerUser(md5,username){
    let success = !isUserExist(md5);

    if (success){
        let newUser = {
            username: username,
            md5: md5
        }
        users.push(newUser);
    }
    return success;
}

function isUserExist(md5){
    let exist = false;
    //check if user with same md5 exists
    users.forEach(function(user) {
        if (user.md5 === md5){
            exist = true;
        }
    });

    return exist;
}

app.listen(port, () => console.log(`Listening on port ${port}`));
