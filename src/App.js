import React, { Component } from "react";
import "./App.css";

import { Message } from "./Components/Message/Message";
import { UserPreview } from "./Components/UserPreview/UserPreview";
import { UsersTable } from "./Components/UsersTable/UsersTable";
import { MessageTable } from "./Components/MessageTable/MessageTable";

class App extends Component {
  constructor(props) {
    super(props);
    this.searchUsers = this.searchUsers.bind(this);
    this.showDialog = this.showDialog.bind(this);
    this.state = {
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
    };
  }

  componentDidMount(){
    var sock = new SockJS('http://127.0.0.1:3000');
    sock.onopen = function() {
        console.log('open');
    };
    sock.onmessage = function(e) {
        console.log('message', e.data);
    };
    sock.onclose = function() {
        console.log('close');
    };

    sock.send('test');
    sock.close();
  }

  showDialog(id) {
    this.setState({ currentDialog: id });
  }

  searchUsers(phrase) {
    let state = this.state;
    state.dialogs = state.dialogs.map(dialog => {
      if (dialog.username.toLowerCase().indexOf(phrase.toLowerCase()) != -1) {
        console.log({ dialog, visible: true });
        return { ...dialog, visible: true };
      } else {
        return { ...dialog, visible: false };
      }
    });

    this.setState(state);
  }

  render() {
    return (
      <div className="App">
        <div className="App__wrapper">
          <UsersTable
            searchUsers={this.searchUsers}
            dialogs={this.state.dialogs}
            showDialog={this.showDialog}
          />
          <MessageTable
            dialog={this.state.dialogs[this.state.currentDialog]}
          />
        </div>
      </div>
    );
  }
}

export default App;
