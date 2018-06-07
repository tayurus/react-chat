import React, { Component } from "react";
import "./App.css";

import { Message } from "./Components/Message/Message";
import { UserPreview } from "./Components/UserPreview/UserPreview";
import { SearchInput } from "./Components/searchInput/SearchInput";
import { MessageControls } from "./Components/MessageControls/MessageControls";

class App extends Component {
    render() {
        return (
            <div className="App">
                <Message />
                <UserPreview />
                <SearchInput />
                <MessageControls />
            </div>
        );
    }
}

export default App;
