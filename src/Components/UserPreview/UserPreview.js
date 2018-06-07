import React from 'react';
import './UserPreview.css';
let pidor = require('./img/pidor.png');

export class UserPreview extends React.Component{

    constructor(props){
        super(props);
    }

    render(){
        return (
            <div className="user-preview">
                <div className="user-preview__img user-preview__img_online" style={{background: 'url(' +pidor+') no-repeat center / cover'}}/>
                <div className="user-preview__info">
                    <div className="user-preview__name">Pidor</div>
                    <div className="user-preview__text">Hi, i know, that i looks like a pidor, but it's cause i am</div>
                </div>
            </div>
        )
    }

}
