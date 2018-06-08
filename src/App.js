import React, { Component } from "react";
import "./App.css";

import { Message } from "./Components/Message/Message";
import { UserPreview } from "./Components/UserPreview/UserPreview";
import { SearchInput } from "./Components/searchInput/SearchInput";
import { MessageControls } from "./Components/MessageControls/MessageControls";
import { UsersTable } from "./Components/UsersTable/UsersTable";

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
                            text : "What do you want!?",
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
                            text : "fu",
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
                <Message />
                <UserPreview />
                <SearchInput />
                <MessageControls />
                <UsersTable dialogs={this.state.dialogs} />
            </div>
        );
    }
}

export default App;
