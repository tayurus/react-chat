import React from 'react';
import './MessageTable.css';
import pidor from '../UserPreview/img/pidor.png';
import { Message } from "../Message/Message";
import { MessageControls } from "../MessageControls/MessageControls";
export class MessageTable extends React.Component{
    constructor(props){
        super(props);
    }

    render(){
        return (
            <div className="message-table">
                <div className="message-table__user-info">
                    <div className="message-table__user-img" style={{background: 'url(' + pidor + ') no-repeat center / contain'}}/>
                    <div className="message-table__user-wrapper">
                        <span className="message-table__user-name">
                            Chat with {this.props.dialog.username}
                        </span>
                        <br/>
                        <span className="message-table__user-status">
                            {
                                (this.props.dialog.status === "online") ? "online" : "offline"
                            }
                        </span>
                    </div>
                </div>

                <div className="message-table__messages">
                    {this.props.dialog.messagesHistory.map((message) => {
                        return (
                            <Message type={message.type}
                                     text={message.text}
                                     date={message.date}/>
                        )
                    })}
                </div>

                <MessageControls sendMessage={this.props.sendMessage}/>
            </div>
        )
    }
}
