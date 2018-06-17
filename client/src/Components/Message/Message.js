import React from "react";
import "./Message.css";


const formatDate = (date) => {
  console.log("DATE IS ",date);
    let currentDate = new Date();
    let regForTime = /\d{2}:\d{2}:\d{2}/g;
    let regDayMonthYear = /\d{2} \S{3,} \d{4}/gi;
    let time = regForTime.exec(date.toUTCString());
    let dayMonthYear = regDayMonthYear.exec(date.toUTCString());
    if (date.getDay() === currentDate.getDay() && date.getYear() === currentDate.getYear()){
        return time[0];
    }
    else {
        return dayMonthYear[0] + " " + time[0];
    }
}

export const Message = props => {
    if (props.type.indexOf('emoji') !== -1){
        return(
            <div className={"message message_" + props.type + "__" + props.text }>
                <div className="message__date">{formatDate(new Date(props.date))}</div>
            </div>
        )

    }
    else {
        return (
            <div className={"message message_" + props.type }>
                <div className="message__text">{props.text}</div>
                <div className="message__date">{formatDate(new Date(props.date))}</div>
            </div>
        );
    }

};


Message.defaultProps = {
    type: ""
}
