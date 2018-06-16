import React from "react";
import "./UserPreview.css";
let pidor = require("./img/pidor.png");

export class UserPreview extends React.Component {

  render() {
    return (
      <div
        className="user-preview"
        onClick={() => this.props.showDialog(this.props.id)}
      >
        <div
          className={
            "user-preview__img " +
            (this.props.status === "online" ? " user-preview__img_online" : "")
          }
          style={{ background: "url(" + pidor + ") no-repeat center / cover" }}
        />
        <div className="user-preview__info">
          <div className="user-preview__name">{this.props.username}</div>
          <div className="user-preview__text">{this.props.text}</div>
          <div className="user-preview__unread-count">1</div>
        </div>
      </div>
    );
  }
}
