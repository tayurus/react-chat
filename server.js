const express = require('express');

const app = express();
const port = process.env.PORT || 5000;

app.get('/users', (req, res) => {
  res.send({
    username: "User",
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

      {
        id: 2,
        username: "Petya",
        status: "offline",
        visible: true,
        messagesHistory: [
          {
            type: "outgoing",
            text: "Jopa?",
            date: new Date()
          },
          {
            type: "incoming",
            text: "No!?",
            date: new Date()
          },
          {
            type: "incoming emoji",
            text: "bitch",
            date: new Date()
          }
        ]
      }
    ]
  }
);
});

app.listen(port, () => console.log(`Listening on port ${port}`));
