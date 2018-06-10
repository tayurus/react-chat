import React from 'react';
import './UsersTable.css';
import { UserPreview } from '../UserPreview/UserPreview';
import { SearchInput } from "../searchInput/SearchInput";
export class UsersTable extends React.Component{
    constructor(props){
        super(props);
    }

    render(){console.log(this.props);
        return (
            <div className="users-table">
                <SearchInput searchUsers={this.props.searchUsers}/>
                {this.props.dialogs.filter(dialog => dialog.visible)
                    .map((dialog) => {
                    return (<UserPreview status={dialog.status}
                                         username={dialog.username}
                                         text={dialog.messagesHistory.slice(-1)[0].text}
                            />)
                        })
                }
            </div>
        )
    }
}
