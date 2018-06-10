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
    this.state = {
      username: "User",
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
              text: "kek",
              date: new Date()
            }
          ]
        }
      ]
    };
  }

  searchUsers(phrase) {
    let state = this.state;
    state.dialogs = state.dialogs.map(dialog => {
      if (dialog.username.indexOf(phrase) != -1) {
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
          />
          <MessageTable dialog={this.state.dialogs[1]} />
        </div>
      </div>
    );
  }
}

export default App;
