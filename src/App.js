import React, { Component } from "react";
import "./App.css";

import { Message } from "./Components/Message/Message";
import { UserPreview } from "./Components/UserPreview/UserPreview";
import { UsersTable } from "./Components/UsersTable/UsersTable";
import { MessageTable } from "./Components/MessageTable/MessageTable";

class App extends Component {
    constructor(props){
        super(props);
        this.state = {
            username : "User",
            dialogs: [
                {
                    username : "User1",
                    status : "online",
                    messagesHistory: [
                        {
                            type : "incoming",
                            text : "Yo bro!",
                            date: new Date()
                        },
                        {
                            type : "outgoing",
                            text : "What do you want!?What do you want!?What do you want!?What do you want!?",
                            date: new Date()
                        }
                    ]
                },

                {
                    username : "User2",
                    status : "offline",
                    messagesHistory: [
                        {
                            type : "outgoing",
                            text : "May i have a momemnt of your time?",
                            date: new Date()
                        },
                        {
                            type : "incoming",
                            text : "What do you want!?",
                            date: new Date()
                        },
                        {
                            type : "incoming emoji",
                            text : "sup",
                            date: new Date()
                        }
                    ]
                }
            ]
        }
    }

    render() {
        return (
            <div className="App">
                <div className="App__wrapper">
                <UsersTable dialogs={this.state.dialogs} />
                <MessageTable dialog={this.state.dialogs[1]}/>
                </div>

            </div>
        );
    }
}

export default App;
