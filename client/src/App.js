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
    this.state = { loaded: false };
  }

  componentDidMount() {
    this.callApi()
      .then(res => {
        res.loaded = true;
        this.setState(res);
      })
      .catch(err => console.log(err));
  }

  callApi = async () => {
    const response = await fetch("/users");
    const body = await response.json();

    if (response.status !== 200) throw Error(body.message);
    return body;
  };

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
    if (!this.state.loaded) {
      return <div>Loading...</div>;
    } else {
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
}

export default App;
