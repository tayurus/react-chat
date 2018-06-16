import React from 'react';
import './UsersTable.css';
import { UserPreview } from '../UserPreview/UserPreview';
import { SearchInput } from "../searchInput/SearchInput";
export class UsersTable extends React.Component{
    constructor(props){
        super(props);
        this.state = {currentTab: "my"}
    }

    changeTab(tab){
        this.setState({currentTab: tab});
    }

    render(){

        return (
            <div className="users-table">
                <SearchInput searchUsers={this.props.searchUsers}/>
                <div className="user-table__tabs">
                    <div onClick={() => this.changeTab("my")} className={"user-table__tab user-table__tab_my-users " + ((this.state.currentTab === "my") ? "user-table__tab_active" : "")}>
                        My dialogs
                    </div>
                    <div onClick={() => this.changeTab("all")} className={"user-table__tab user-table__tab_all-users " + ((this.state.currentTab === "all") ? "user-table__tab_active" : "")}>
                        All users
                    </div>
                </div>
                {
                    (this.state.currentTab === "my") ?
                        this.props.dialogs.filter(dialog => dialog.visible)
                        .map((dialog) => {
                        return (<UserPreview status={dialog.status}
                                             username={dialog.username}
                                             text={dialog.messagesHistory.slice(-1)[0].text}
                                             id={dialog.id}
                                             showDialog={this.props.showDialog}
                                />)
                            })
                    :
                    this.props.users.map(function(user){
                        return (<UserPreview status={user.status}
                                             username={user.username}
                                             id={user.id}
                                />)
                            })

                }
            </div>
        )
    }
}
