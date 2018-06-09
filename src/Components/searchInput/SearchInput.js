import React from 'react';
import './SearchInput.css';

export class SearchInput extends React.Component{

    constructor(props){
        super(props);
    }

    render(){
        return (
            <div className="search-input">
                <input type="search"
                       placeholder="Search"
                       className="search-input__field"/>
            </div>
        )
    }

}
