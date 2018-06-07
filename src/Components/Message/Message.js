import React from "react";
import "./Message.css";

export const Message = props => {
    return (
        <div className="message message_incoming">
            <div className="message__text">Вот это ты пидр!</div>
            <div className="message__date">9.02 PM</div>
        </div>
    );
};
