import React from "react";
import "./EnterTab.css";
var md5 = require("md5");
export class EnterTab extends React.Component {
    constructor(props) {
        super(props);
        this.validateOnSubmit = this.validateOnSubmit.bind(this);
        this.register = this.register.bind(this);
        this.state = {message: "", messageType: ""}
    }

    validateOnBlur(e) {
        let regexs = {
            username: /[a-z0-9]{3,20}/i,
            password: /^[a-z0-9]{8,32}$/i
        };
        let reg = regexs[e.target.getAttribute("data-type")];
        let inputValue = e.target.value;

        //validate
        if (!reg.test(inputValue)) e.target.classList.add("EnterTab__field_error");
        else e.target.classList.remove("EnterTab__field_error");
    }

    validateOnSubmit() {
        let dataValid = true;
        let regexs = {
            username: /[a-z0-9]{3,20}/i,
            password: /^[a-z0-9]{8,32}$/i
        };

        let username = this.refs.username.value;
        let password = this.refs.password.value;
        if (!regexs["username"].test(username) || !regexs["password"].test(password)) {
            this.setState({message: "Please check input data!", messageType: "error"});
            dataValid = false;
        } else {
            this.setState({message: ""});
        }

        if (this.props.type === "register" && dataValid) {
            this.register();
        }
        else if (this.props.type === "login" && dataValid) {
            this.checkLoginData();
        }
    }

    checkLoginData() {
        let username = this.refs.username.value;
        let password = this.refs.password.value;
        let loginData = md5(username + password);
        fetch("/login", {
            method: "post",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({md5: loginData})
        })
            .then(res => res.json())
            .then((res) =>{
                console.log(res)
                if (res.status === 'success'){
                    this.setState({message: "Enter success!", messageType: "success"});
                    this.props.login()
                }else {
                    this.setState({message: "This user does not exist!", messageType: "error"})
                }
            });
    }

    register() {
        let username = this.refs.username.value;
        let password = this.refs.password.value;
        let registerData = md5(username + password);
        fetch("/register", {
            method: "post",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ md5: registerData, username: username })
        })
            .then(res => res.json())
            .then((res) =>{
                console.log(res)
                if (res.status === 'success'){
                    this.setState({message: "Registration success!", messageType: "success"})
                }else {
                    this.setState({message: "This user already exists!", messageType: "error"})
                }
            });
    }

    showMessage(){
        if (this.state.message !== ""){
            return (
                <div className={"EnterTab__" + this.state.messageType}>
                    {this.state.message}
                </div>
            )
        }
    }

    render() {
        if (this.props.type === "login") {
            return (
                <div className="EnterTab">
                    <h2 className="EnterTab__title">Login</h2>
                    <input
                        type="text"
                        data-type="username"
                        ref="username"
                        className="EnterTab__field"
                        placeholder="Your nickname"
                        onBlur={e => this.validateOnBlur(e)}
                    />
                    <input
                        type="password"
                        ref="password"
                        data-type="password"
                        className="EnterTab__field"
                        placeholder="Your password"
                        onBlur={e => this.validateOnBlur(e)}
                    />
                    <button onClick={this.validateOnSubmit} class="EnterTab__button">
                        Login!
                    </button>
                    {this.showMessage()}
                </div>
            );
        } else if (this.props.type === "register") {
            return (
                <div className="EnterTab">
                    <h2 className="EnterTab__title">Create new user. Email is not needed!</h2>
                    <input
                        type="username"
                        ref="username"
                        data-type="username"
                        className="EnterTab__field"
                        placeholder="Your nickname"
                        onBlur={e => this.validateOnBlur(e)}
                    />
                    <input
                        type="password"
                        ref="password"
                        data-type="password"
                        className="EnterTab__field"
                        placeholder="Your password"
                        onBlur={e => this.validateOnBlur(e)}
                    />
                    <button onClick={this.validateOnSubmit} className="EnterTab__button">
                        Create!
                    </button>
                    {this.showMessage()}
                </div>
            );
        }
    }
}
