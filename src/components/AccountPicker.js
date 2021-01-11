import React from 'react';

import Loading from '../common/Loading';
import uuid from 'uuid';

import getAccounts from '../services/account.service';

export default  class AccountPicker extends React.Component {
    account = this.props.account;
    constructor(props) {
        super(props);
        this.state = {
            accounts: [],
            loading: true
        };
    }

    componentDidMount() {
        console.log(`props.account ${JSON.stringify(this.props.account)}`);
        this.setState({ loading: true});
        getAccounts((accounts) =>{
            this.setState({ accounts });
            this.setState({ loading: false });
        })
    }

    onChange(event) {
        this.props.onChange(event.target.value);
    }

    render() {
        const options = this.state.accounts.map((account) => {
            const key = account.key ? account.key : uuid.v1();
            return (
                <option key={key} value={account.id}>{account.name}</option>
            );            
        });

        return (
            this.state.loading? <Loading />  :
            <div className="ccypair-picker__div">        
            <select className="ccypair-picker__select" 
                        value={this.props.account}
                        name="accounts"
                        onChange={this.onChange.bind(this)}>{options}</select>
            </div>
        )
    }
}
