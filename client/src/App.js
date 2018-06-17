import React, { Component } from "react";
import "./App.css";

import { UsersTable } from "./Components/UsersTable/UsersTable";
import { MessageTable } from "./Components/MessageTable/MessageTable";
import { EnterTab } from "./Components/EnterTab/EnterTab";
import { HashRouter, Route, NavLink } from "react-router-dom";

class App extends Component {
    socket = "";

    constructor(props) {
        super(props);
        // binding methods
        this.searchUsers = this.searchUsers.bind(this);
        this.showDialog = this.showDialog.bind(this);
        this.login = this.login.bind(this);
        this.sendMessage = this.sendMessage.bind(this);
        this.getDialogIndexByField = this.getDialogIndexByField.bind(this);

        // setting start state
        this.state = { loaded: false, logged: false };
    }

    // just change current dialog index state
    showDialog(id) {
        this.setState({ currentDialog: id });
    }

    // goes across all users and hide users, which does not contain search-pharse
    searchUsers(phrase) {
        let state = this.state;
        state.dialogs = state.dialogs.map(dialog => {
            //searching for the pharse (ignoring case)
            if (dialog.username.toLowerCase().indexOf(phrase.toLowerCase()) !== -1) {
                return { ...dialog, visible: true };
            } else {
                return { ...dialog, visible: false };
            }
        });

        this.setState(state);
    }

    //Sends User's md5 (this functions will execute only after EnterTab-component checks that user exists)
    login(md5) {
        //to show user chat-window, we should change the state
        this.setState({ logged: true });

        //All next operations between user and server will use WebSockets
        this.socket = new WebSocket("ws://localhost:5001");
        this.socket.onopen = () => this.socket.send(JSON.stringify({ objective: "getState", md5: md5 }));
        this.socket.onmessage = message => {
            let state = JSON.parse(message.data);
            //to show UI, we change "loaded-field" to true
            state.loaded = true;
            console.log("NEW STATE!!!", state);
            this.setState(state);
        };
    }

    //Sends message(text) to user(id)
    sendMessage(text, type) {
        let message = {
            objective: "sendMessage",
            text: text,
            type: type,
            id: this.state.currentDialog // recepient's id
        };
        console.log("SOCKET IS ", this.socket);
        this.socket.send(JSON.stringify(message));
    }

    getDialogIndexByField(fieldName, value) {
        let res;
        this.state.dialogs.forEach(function(dialog, index) {
            if (dialog[fieldName] === value) {
                res = index;
            }
        });

        return res;
    }



    render() {
        if (!this.state.logged) {
            return (
                <HashRouter>
                    <div class="App">
                        <header className="App__header">
                            <NavLink activeStyle={{ color: "tomato" }} className="App__header-link" to="/login">
                                Login
                            </NavLink>
                            <NavLink activeStyle={{ color: "tomato" }} className="App__header-link" to="/register">
                                Register
                            </NavLink>
                        </header>
                        <Route path="/login" render={router => <EnterTab type="login" login={this.login} />} />
                        <Route path="/register" render={router => <EnterTab type="register" />} />
                    </div>
                </HashRouter>
            );
        } else {
            if (!this.state.loaded) {
                return (<div>Loading...</div>);
            } else {
                return (
                    <div className="App">
                        <div className="App__wrapper">
                            <UsersTable users = {this.state.users} searchUsers={this.searchUsers} dialogs={this.state.dialogs} showDialog={this.showDialog} />
                            {this.state.dialogs.length > 0 ? (
                                <MessageTable
                                    sendMessage={this.sendMessage}
                                    dialog={this.state.dialogs[this.getDialogIndexByField("id", this.state.currentDialog)]}
                                />
                            ) : (
                                ""
                            )}
                        </div>
                    </div>
                );
            }
        }
    }
}

export default App;
