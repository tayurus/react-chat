import React from "react";
import "./MessageControls.css";

export class MessageControls extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="message-controls">
                <label className="message-controls__attach">
                    <input type="file" />
                </label>

                <textarea
                    ref="message"
                    className="message-controls__message-input"
                    placeholder="Type your message..."
                />

                <div className="message-controls__emojis-wrapper">
                    <div className="message-controls__emojis" />
                    <div className="message-controls__emojis-list">
                        <div onClick={() => this.props.sendMessage("bitch", 'emoji')} className="message-controls__emojis-item emoji__bitch" />
                        <div onClick={() => this.props.sendMessage("coolstory", 'emoji')} className="message-controls__emojis-item emoji__coolstory" />
                        <div onClick={() => this.props.sendMessage("fu", 'emoji')} className="message-controls__emojis-item emoji__fu" />
                        <div onClick={() => this.props.sendMessage("kaboom", 'emoji')} className="message-controls__emojis-item emoji__kaboom" />
                        <div onClick={() => this.props.sendMessage("perfect", 'emoji')} className="message-controls__emojis-item emoji__perfect" />
                        <div onClick={() => this.props.sendMessage("sup", 'emoji')} className="message-controls__emojis-item emoji__sup" />
                    </div>
                </div>

                <button
                    className="message-controls__send"
                    onClick={() => this.props.sendMessage(this.refs.message.value)}
                />
            </div>
        );
    }
}
