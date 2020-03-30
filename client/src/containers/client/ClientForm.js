import React, { Component } from 'react';
// import { connect } from 'react-redux';
import { reduxForm } from 'redux-form';
import { withRouter } from 'react-router';
import { Link } from 'react-router-dom';
import axios from 'axios';
// import * as actions from '../../store/actions';

import AddressCard from '../../components/client/addressCard';
import PhoneForm from './PhoneForm';
import EmailForm from './EmailForm';

class ClientForm extends Component {

    state = {
        name: '',
        addresses: [],
        addressIds: [],
        phones: [],
        phoneIds: [],
        emails: [],
        emailIds: []
    }
    handleChange = this.handleChange.bind(this);
    handleSubmit = this.handleSubmit.bind(this);
    addAddress = this.addAddress.bind(this);
    removeAddress = this.removeAddress.bind(this);

    // clientSubmitHandler = () => {
    //     let client = this.state.name;
    //     alert('You are trying to submit a new client: ' + client);
    //     axios.post('/api/clients', client)
    //         .then(response => console.log(response))
    //         .catch(error => console.log(error));
    // }

    // inputChangedHandler(event) {
    //     this.setState({name: event.target.value});
    // }

    handleChange(event) {
        this.setState({name: event.target.value});
    }

    handleSubmit(event) {
        event.preventDefault();
        let client = this.state.name;
        alert('This is the name: ' + client);
        axios.post('/api/projects', this.state)
            .then(response => console.log(response))
            .catch(error => console.log(error));
        this.props.history.push('/');
    }

    async addAddress(val) {
        let address = await axios.post('/api/projects/addresses', val);
        console.log('[addAddress] address = ', address.data);
        this.setState({ addresses: [...this.state.addresses, address.data]});
        this.setState({ addressIds: [...this.state.addressIds, address.data._id ]});
        console.log('[addAddress] this.state = ', this.state);
        this.setState({ addressForm: [] });
    }

    removeAddress(id) {
        console.log('[removeAddress] id = ', id);
    }

    render() {
        
        return (
            <div>
                <form onSubmit={this.handleSubmit}>
                    <label>Project Name</label>
                    <input text="text" value={this.state.name} onChange={this.handleChange} />
                    <AddressCard addAddress={this.addAddress} addresses={this.state.addresses} />
                    <PhoneForm />
                    <EmailForm />
                    <Link to="/" className="red btn-flat white-text">
                        Cancel
                    </Link>
                    <button type="submit" className="teal btn-flat right white-text">
                        Next
                        <i className="material-icons right">done</i>
                    </button>
                </form>
            </div>
        );
    }
};

// const mapStateToProps = state = {
//         ings: state.burgerBuilder.ingredients
// };

// const mapDispatchToProps = dispatch => {
//         onClientSubmit: clientData => console.log('You did it, dickhead!')
// };

ClientForm =  reduxForm({
    form: 'clientForm',
    destroyOnUnmount: false
})(ClientForm);

export default withRouter(ClientForm);
