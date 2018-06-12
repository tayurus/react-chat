import React from "react";
import "./EnterTab.css";
var md5 = require("md5");
export class EnterTab extends React.Component {
    constructor(props) {
        super(props);
        this.validateOnSubmit = this.validateOnSubmit.bind(this);
    }

    validateOnBlur(e) {
        let regexs = {
            username: /[a-z0-9]{3,20}/i,
            password: /^[a-z0-9]{8,32}$/i
        };
        let reg = regexs[e.target.getAttribute("data-type")];
        let inputValue = e.target.value;

        //validate
        if (!reg.test(inputValue))
            e.target.classList.add("EnterTab__field_error");
        else e.target.classList.remove("EnterTab__field_error");
    }

    validateOnSubmit() {
        let regexs = {
            username: /[a-z0-9]{3,20}/i,
            password: /^[a-z0-9]{8,32}$/i
        }

        let username = this.refs.username.value;
        let password = this.refs.password.value;
        if (!regexs['username'].test(username) || !regexs['password'].test(password)){
            document.querySelector('.EnterTab__error').removeAttribute('hidden');
        }
        else{
            document.querySelector('.EnterTab__error').setAttribute('hidden','true');
        }

        if (this.props.type === "login"){
            this.checkLoginData()
        }
    }

    checkLoginData(){
        let username = this.refs.username.value;
        let password = this.refs.password.value;
        let loginData = md5(username+password);
        console.log(loginData);
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
                    <button
                        onClick={this.validateOnSubmit}
                        class="EnterTab__button"
                    >
                        Login!
                    </button>
                    <div className="EnterTab__error" hidden>Please check input data!</div>
                </div>
            );
        } else if (this.props.type === "register") {
            return (
                <div className="EnterTab">
                    <h2 className="EnterTab__title">
                        Create new user. Email is not needed!
                    </h2>
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
                    <button
                        onClick={this.validateOnSubmit}
                        className="EnterTab__button"
                    >
                        Create!
                    </button>
                    <div className="EnterTab__error" hidden>Please check input data!</div>
                </div>
            );
        }
    }
}
