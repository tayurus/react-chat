import React, { Component } from "react";
import "./App.css";

import { UsersTable } from "./Components/UsersTable/UsersTable";
import { MessageTable } from "./Components/MessageTable/MessageTable";
import { EnterTab } from "./Components/EnterTab/EnterTab";
import { HashRouter, Route, NavLink } from "react-router-dom";

class App extends Component {
    constructor(props) {
        super(props);
        this.searchUsers = this.searchUsers.bind(this);
        this.showDialog = this.showDialog.bind(this);
        this.login = this.login.bind(this);
        this.state = { loaded: false, logged: false };
    }

    componentWillMount() {
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
            if (dialog.username.toLowerCase().indexOf(phrase.toLowerCase()) !== -1) {
                return { ...dialog, visible: true };
            } else {
                return { ...dialog, visible: false };
            }
        });

        this.setState(state);
    }

    login(){
        this.setState({logged: true})
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
                        <Route path="/login" render={router => <EnterTab type="login" login={this.login}/>} />
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
                            <UsersTable searchUsers={this.searchUsers} dialogs={this.state.dialogs} showDialog={this.showDialog} />
                            <MessageTable dialog={this.state.dialogs[this.state.currentDialog]} />
                        </div>
                    </div>
                );
            }
        }
    }
}

export default App;
