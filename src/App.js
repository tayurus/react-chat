import React, { Component } from "react";
import "./App.css";

import { Message } from "./Components/Message/Message";
import { UserPreview } from "./Components/UserPreview/UserPreview";

class App extends Component {
    render() {
        return (
            <div className="App">
                <Message />
                <UserPreview />
            </div>
        );
    }
}

export default App;
